/* =========================================================
   Chatbot LocalStore
   Se carga DESPUÉS de script.js: reutiliza PRODUCTS, CATEGORIES,
   state, cart, addToCart(), openProductModal(), etc.
   - Sin apiUrl: responde con reglas (gratis, sin servidor).
   - Con apiUrl: usa IA vía tu backend; si falla, cae a las reglas.
   ========================================================= */
(() => {
  if (typeof PRODUCTS === "undefined") {
    console.warn("chat.js: carga script.js antes que chat.js");
    return;
  }

  const CONFIG = {
    name: "Asistente LocalStore",
    apiUrl: "",                                  // ej. "/api/chat"
    placeholder: "Ej.: audífonos de menos de $1,000",
    disclaimer: "Este asistente es una IA y puede equivocarse. Verifica lo importante.",
    chips: ["¿Qué puedes hacer?", "Ver categorías", "Lo mejor calificado", "Algo de menos de $500"],
  };

  const $ = (id) => document.getElementById(id);
  const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
  const firstName = () => (typeof currentUser !== "undefined" && currentUser) ? currentUser.fullName.split(" ")[0] : "";
  const short = (p) => p.name.length > 24 ? p.name.slice(0, 23).trim() + "…" : p.name;

  /* ---------- Acciones sobre la tienda ---------- */
  const scrollToProducts = () => $("contenido")?.scrollIntoView({ behavior: "smooth" });

  function showInStore({ search = "", category = "Todas", maxPrice = null } = {}) {
    state.search = search;
    state.category = category;
    if (maxPrice) {
      state.maxPrice = Math.min(maxPrice, 2000);
      $("priceRange").value = state.maxPrice;
      $("priceOutput").textContent = formatPrice(state.maxPrice);
    }
    $("searchInput").value = search;
    renderCategoryBar();
    renderProducts();
    scrollToProducts();
  }

  /* ---------- Búsqueda de productos (sin importar acentos) ---------- */
  const STOP = new Set(("busca buscar buscame busco quiero necesito tienes tienen tiene hay muestrame muestra mostrar dame ver " +
    "un una unos unas el la los las de del para por con sin en y o al me mi mis que cual cuales cuanto cuesta cuestan " +
    "precio precios pesos peso mxn producto productos algo mas menos hasta maximo menor debajo favor agrega agregar " +
    "agregame anade anadir ponme mete comprar comprame carrito existencia stock disponible disponibles barato baratos " +
    "barata baratas economico economicos economica mejor mejores calificado calificados calificada recomienda " +
    "recomiendame recomiendas sugieres sugiere popular populares quisiera puedes podrias es son esta estan lo ese esa " +
    "tu tus se si hola gracias porfa").split(" "));

  function parseQuery(raw) {
    let t = norm(raw), maxPrice = null, sort = null;
    const pm = t.match(/(?:menos de|hasta|maximo|menor a|menor de|debajo de|no mas de)\s*\$?\s*(\d[\d,]*)/);
    if (pm) { maxPrice = parseFloat(pm[1].replace(/,/g, "")); t = t.replace(pm[0], " "); }
    if (/barat|economic/.test(t)) sort = "cheap";
    else if (/mejor(es)? (calificad|valorad)|recomien|sugier|popular/.test(t)) sort = "best";
    const tokens = t.split(/[^a-z0-9]+/)
      .filter((w) => w.length >= 3 && !STOP.has(w))
      .map((w) => (w.length > 3 ? w.replace(/s$/, "") : w));
    return { tokens, maxPrice, sort };
  }

  function findProducts({ tokens, maxPrice, sort }) {
    const full = (p) => norm(`${p.name} ${p.category} ${p.description}`);
    const head = (p) => norm(`${p.name} ${p.category}`);
    let partial = false;
    let list = PRODUCTS.filter((p) => tokens.every((k) => full(p).includes(k)));
    if (!list.length && tokens.length > 1) {
      list = PRODUCTS.filter((p) => tokens.some((k) => head(p).includes(k)));
      partial = list.length > 0;
    }
    if (maxPrice) list = list.filter((p) => p.price <= maxPrice);
    if (sort) {
      const inStock = list.filter((p) => p.stock > 0);
      if (inStock.length) list = inStock;
      list = [...list].sort(sort === "cheap" ? (a, b) => a.price - b.price : (a, b) => b.rating - a.rating);
    }
    return { list, partial };
  }

  // Palabra (con acentos) del nombre del producto que coincide con la búsqueda,
  // para que el buscador de la tienda (sensible a acentos) sí la encuentre.
  function storeSearchTerm(list, tokens) {
    if (!tokens.length || !list.length) return "";
    const word = list[0].name.split(/\s+/).find((w) => norm(w).includes(tokens[0]));
    return word ? word.toLowerCase() : "";
  }

  function productLine(p) {
    const stock = p.stock > 0 ? `${p.stock} disponibles` : "agotado";
    return `• ${p.name} — ${formatPrice(p.price)} (${stock}, ${p.rating.toFixed(1)}★)`;
  }

  function productReply(raw, q = parseQuery(raw)) {
    const { list, partial } = findProducts(q);
    if (!list.length) {
      return {
        text: q.maxPrice && !q.tokens.length
          ? `No hay productos de menos de ${formatPrice(q.maxPrice)}.`
          : "No encontré productos con eso. Prueba con otra palabra, por ejemplo “tenis” o “cafetera”, o mira las categorías.",
        btns: [["Ver categorías", () => send("Ver categorías"), true], ["¿Qué puedes hacer?", () => send("¿Qué puedes hacer?"), true]],
      };
    }
    const top = list.slice(0, 3);
    const more = list.length - top.length;
    const intro = partial ? "No hallé todo junto, pero esto se parece:" :
      q.sort === "cheap" ? "Lo más económico disponible:" :
      q.sort === "best" ? "Lo mejor calificado:" :
      `Encontré ${list.length} producto${list.length > 1 ? "s" : ""}:`;
    const btns = [];
    top.forEach((p) => {
      btns.push([`Ver ${short(p)}`, () => openProductModal(p.id)]);
      if (list.length <= 2 && p.stock > 0) btns.push([`Agregar ${short(p)}`, () => addToCart(p.id), true]);
    });
    const cats = [...new Set(list.map((p) => p.category))];
    btns.push(["Verlos en la tienda", () => showInStore({
      search: storeSearchTerm(list, q.tokens),
      category: !q.tokens.length && cats.length === 1 ? cats[0] : "Todas",
      maxPrice: q.maxPrice,
    })]);
    return { text: `${intro}\n${top.map(productLine).join("\n")}${more > 0 ? `\ny ${more} más.` : ""}`, btns };
  }

  /* ---------- Respuestas locales ---------- */
  const cartCountSafe = () => cart.reduce((s, i) => s + i.qty, 0);
  const cartSubtotalSafe = () => cart.reduce((s, i) => { const p = getProduct(i.id); return s + (p ? p.price * i.qty : 0); }, 0);
  const B_CART = ["Abrir carrito", () => openCart()];
  const B_LOGIN = ["Iniciar sesión", () => openLoginModal()];

  function localReply(text) {
    const t = norm(text);
    const words = t.split(/\s+/).length;

    if (words <= 3 && /^(hola|buenas|buenos dias|buenas tardes|buenas noches|hey|que tal)/.test(t))
      return { text: `¡Hola${firstName() ? ", " + firstName() : ""}! ¿Qué te gustaría buscar hoy?`, btns: [] };
    if (/^(muchas )?gracias/.test(t)) return { text: "¡Con gusto! Aquí sigo si necesitas algo más.", btns: [] };

    if (/que puedes|que haces|ayuda|como funciona|instrucciones/.test(t))
      return {
        text: "Puedo:\n• Buscar productos por nombre, categoría o precio (“tenis de menos de $1,500”)\n• Recomendarte lo mejor calificado o lo más económico\n• Agregar productos a tu carrito (“agrega la mochila”)\n• Resolver dudas de envío, cuenta y carrito",
        btns: [["Ver categorías", () => send("Ver categorías"), true], ["Lo más barato", () => send("Lo más barato"), true]],
      };

    // "agrega X al carrito"
    if (/\b(agrega|agregame|agregar|anade|anadir|ponme|mete|comprame|comprar)\b/.test(t)) {
      const q = parseQuery(text);
      if (q.tokens.length) {
        const { list } = findProducts(q);
        if (list.length === 1) {
          const p = list[0];
          if (p.stock <= 0) return { text: `“${p.name}” está agotado por ahora.`, btns: [["Ver similares", () => send(p.category), true]] };
          addToCart(p.id);
          return { text: `Listo, agregué “${p.name}” a tu carrito.`, btns: [B_CART] };
        }
        if (list.length > 1)
          return {
            text: "Encontré varios, ¿cuál quieres agregar?",
            btns: list.slice(0, 4).filter((p) => p.stock > 0).map((p) => [`Agregar ${short(p)}`, () => addToCart(p.id), true]),
          };
      }
    }

    if (/categoria|departamento|que venden|que tienen|que hay\b/.test(t))
      return {
        text: "Estas son las categorías:\n" + CATEGORIES.map((c) => `• ${c} (${PRODUCTS.filter((p) => p.category === c).length})`).join("\n"),
        btns: CATEGORIES.map((c) => [c, () => showInStore({ category: c })]),
      };

    if (/carrito|mi compra|mis productos/.test(t)) {
      const n = cartCountSafe();
      return {
        text: n ? `Tienes ${n} producto${n > 1 ? "s" : ""} en tu carrito. Subtotal: ${formatPrice(cartSubtotalSafe())}.` : "Tu carrito está vacío por ahora.",
        btns: n ? [B_CART] : [],
      };
    }

    if (/como compro|como pago|pagar|finalizar|checkout/.test(t))
      return {
        text: "Agrega tus productos al carrito, ábrelo y toca “Finalizar compra”. Necesitas iniciar sesión para guardar tu domicilio de envío.",
        btns: firstName() ? [B_CART] : [B_LOGIN, B_CART],
      };

    if (/envio|entrega|paqueteria|flete/.test(t)) {
      const u = typeof currentUser !== "undefined" && currentUser;
      return {
        text: "El envío y los impuestos se calculan al finalizar la compra." + (u ? ` Tu pedido iría a ${u.street}, ${u.neighborhood}.` : " Si inicias sesión y guardas tu domicilio, todo es más rápido."),
        btns: u ? [["Editar mis datos", () => openLoginModal()]] : [B_LOGIN],
      };
    }

    if (/sesion|cuenta|registr|iniciar|entrar|domicilio|direccion|mis datos/.test(t)) {
      const u = typeof currentUser !== "undefined" && currentUser;
      return u
        ? { text: `Ya iniciaste sesión como ${u.fullName}. Tu domicilio de envío está guardado.`, btns: [["Editar mis datos", () => openLoginModal()]] }
        : { text: "Inicia sesión con tu nombre, correo, teléfono y domicilio. Así guardamos tu carrito y calculamos tus envíos.", btns: [B_LOGIN] };
    }

    if (/filtro|ordenar/.test(t))
      return {
        text: "A la izquierda puedes filtrar por categoría, existencia, precio máximo y calificación, y ordenar por precio o calificación.",
        btns: [["Quitar filtros", () => resetFilters()]],
      };

    if (/pago|tarjeta|efectivo|devoluc|garantia|factura|horario|telefono|contacto|whatsapp|pedido/.test(t))
      return { text: "Esa información todavía no la tengo disponible aquí. Puedo ayudarte con productos, carrito, cuenta y envíos.", btns: [] };

    return productReply(text);
  }

  async function aiReply() {
    const res = await fetch(CONFIG.apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: history.slice(-10),
        catalog: PRODUCTS.map(({ name, category, price, stock, rating, description }) => ({ name, category, price, stock, rating, description })),
      }),
    });
    if (!res.ok) throw new Error("API " + res.status);
    const data = await res.json();
    if (!data.reply) throw new Error("Sin respuesta");
    return { text: data.reply, btns: [] };
  }

  /* ---------- Interfaz ---------- */
  const root = document.createElement("div");
  root.innerHTML = `
    <button class="chat-fab" id="chatFab" aria-haspopup="dialog" aria-controls="chatPanel"><span aria-hidden="true">💬</span> Ayuda</button>
    <section class="chat-panel" id="chatPanel" role="dialog" aria-label="${CONFIG.name}" hidden>
      <header class="chat-head">
        <div><h2>${CONFIG.name}</h2><small>Pregúntame lo que necesites</small></div>
        <button class="chat-close" id="chatClose" aria-label="Cerrar chat">✕</button>
      </header>
      <div class="chat-log" id="chatLog" role="log" aria-live="polite"></div>
      <form class="chat-form" id="chatForm" autocomplete="off">
        <label for="chatInput" class="sr-only">Escribe tu mensaje</label>
        <input id="chatInput" placeholder="${CONFIG.placeholder}" maxlength="500">
        <button class="chat-send" id="chatSend" aria-label="Enviar">➤</button>
      </form>
      <p class="chat-note">${CONFIG.disclaimer}</p>
    </section>`;
  document.body.appendChild(root);

  const fab = $("chatFab"), panel = $("chatPanel"), log = $("chatLog"), form = $("chatForm"), input = $("chatInput");
  const history = [];
  let started = false, busy = false;

  function add(text, who) {
    const el = document.createElement("div");
    el.className = `chat-msg chat-msg--${who}`;
    el.textContent = text;                      // textContent: nunca inyecta HTML
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;
    return el;
  }

  // btns: [[etiqueta, función, quedarseAbierto?], ...]
  function addButtons(list) {
    if (!list || !list.length) return;
    const box = document.createElement("div");
    box.className = "chat-actions";
    list.forEach(([label, fn, stay]) => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "chat-chip"; b.textContent = label;
      b.addEventListener("click", () => {
        fn();
        if (!stay && window.innerWidth < 640) closePanel(false);   // en móvil, libera la vista
      });
      box.appendChild(b);
    });
    log.appendChild(box);
    log.scrollTop = log.scrollHeight;
  }

  function openPanel() {
    panel.hidden = false; fab.hidden = true;
    if (!started) {
      started = true;
      const n = firstName();
      add(`¡Hola${n ? ", " + n : ""}! Soy el asistente de LocalStore. Puedo buscar productos, agregarlos a tu carrito y resolver dudas sobre envíos.`, "bot");
      addButtons(CONFIG.chips.map((c) => [c, () => send(c), true]));
    }
    input.focus();
  }
  function closePanel(refocus = true) { panel.hidden = true; fab.hidden = false; if (refocus) fab.focus(); }

  fab.addEventListener("click", openPanel);
  $("chatClose").addEventListener("click", () => closePanel());
  panel.addEventListener("keydown", (e) => { if (e.key === "Escape") closePanel(); });
  form.addEventListener("submit", (e) => { e.preventDefault(); send(input.value); });

  async function send(raw) {
    const text = (raw || "").trim();
    if (!text || busy) return;
    input.value = "";
    add(text, "user");
    history.push({ role: "user", content: text });
    busy = true; $("chatSend").disabled = true;

    let reply;
    if (CONFIG.apiUrl) {
      const typing = add("Escribiendo…", "bot");
      typing.classList.add("chat-msg--typing");
      try { reply = await aiReply(); } catch { reply = localReply(text); }
      typing.remove();
    } else {
      reply = localReply(text);
    }

    add(reply.text, "bot");
    history.push({ role: "assistant", content: reply.text });
    addButtons(reply.btns);
    busy = false; $("chatSend").disabled = false; input.focus();
  }

  window.__chat = { localReply };               // útil para pruebas en consola
})();
