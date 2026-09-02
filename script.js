const PRODUCTS = [
  {
    id: "p1",
    name: "Audífonos inalámbricos Apple Max Pro",
    category: "Electrónica",
    price: 899,
    stock: 12,
    rating: 4.6,
    ratingCount: 128,
    image: "https://http2.mlstatic.com/D_NQ_NP_698621-MLA45715455036_042021-O.webp",
    description: "Audífonos over-ear con cancelación de ruido activa, 30 horas de batería y estuche de carga rápida. Ideales para el día a día y viajes largos."
  },
  {
    id: "p2",
    name: "Cafetera de goteo Café",
    category: "Hogar y Cocina",
    price: 649,
    stock: 5,
    rating: 4.3,
    ratingCount: 64,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkmU-0jrA1IaECxjyUE8u6mtD0y_Ogb2iBo3MLKzT3sQ&s",
    description: "Cafetera de 12 tazas con jarra térmica, filtro reutilizable y apagado automático. Prepara café de grano o molido en minutos."
  },
  {
    id: "p3",
    name: "Chamarra impermeable Sendero",
    category: "Moda",
    price: 1199,
    stock: 0,
    rating: 4.8,
    ratingCount: 41,
    image: "https://yakadventure.com.mx/wp-content/uploads/2022/11/chamarra-impermeable-senderismo-naturaleza-nh100-raincut-azul-turquesa-mujer.jpg",
    description: "Chamarra ligera e impermeable con capucha ajustable, ideal para lluvia y viento. Tejido transpirable y bolsillos sellados."
  },
  {
    id: "p4",
    name: "Tenis running Nike",
    category: "Deportes y Aire libre",
    price: 1450,
    stock: 8,
    rating: 4.5,
    ratingCount: 210,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRz6A-fcZbiFTMFCvkvm9wp4yZOtGyYC0ebxfdLprx6w&s=10",
    description: "Tenis para correr con amortiguación de espuma reactiva y malla transpirable. Diseñados para asfalto y pista."
  },
  {
    id: "p5",
    name: "Set de brochas de maquillaje Luna",
    category: "Belleza y Cuidado",
    price: 329,
    stock: 20,
    rating: 4.2,
    ratingCount: 87,
    image: "https://http2.mlstatic.com/D_Q_NP_2X_905631-MLA92999570251_092025-P.webp",
    description: "Set de 12 brochas profesionales con cerdas suaves sintéticas, libres de crueldad animal, y estuche de viaje incluido."
  },
  {
    id: "p6",
    name: "Parlante Bluetooth JBL Charguer 5",
    category: "Electrónica",
    price: 549,
    stock: 15,
    rating: 4.4,
    ratingCount: 156,
    image: "https://i5.walmartimages.com/asr/c386e2d1-bf46-4371-a34f-9c7b463c5ba7.3c586c73854ea34169bfe9f2653e8dcf.png?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    description: "Parlante portátil resistente al agua (IPX6), 12 horas de batería y sonido envolvente de 360°. Perfecto para exteriores."
  },
  {
    id: "p7",
    name: "Juego de sartenes antiadherentes Cobre 5pz",
    category: "Hogar y Cocina",
    price: 1099,
    stock: 3,
    rating: 4.7,
    ratingCount: 52,
    image: "https://http2.mlstatic.com/D_Q_NP_2X_883849-MLA107603496753_022026-P.webp",
    description: "Set de 5 sartenes con recubrimiento antiadherente reforzado, aptas para todo tipo de estufas, incluida inducción."
  },
  {
    id: "p8",
    name: "Mochila urbana Nómada 25L",
    category: "Moda",
    price: 799,
    stock: 10,
    rating: 4.5,
    ratingCount: 98,
    image: "https://http2.mlstatic.com/D_NQ_NP_721992-MLA105752489908_022026-O.webp",
    description: "Mochila resistente al agua con compartimento acolchado para laptop de 15\", puerto USB externo y espalda ergonómica."
  },
  {
    id: "p9",
    name: "Colchoneta de yoga ZenGrip",
    category: "Deportes y Aire libre",
    price: 399,
    stock: 25,
    rating: 4.6,
    ratingCount: 173,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHDMJ3xEvTNA3i6Y2pMdq1Sbn4P7CIH59eXA_fs8bcOAXkYReL37Y7RH0k&s=10",
    description: "Colchoneta antiderrapante de 6mm de grosor, material ecológico y ligera. Incluye correa de transporte."
  },
  {
    id: "p10",
    name: "Kit de skincare facial Japan Sakura",
    category: "Belleza y Cuidado",
    price: 499,
    stock: 0,
    rating: 4.1,
    ratingCount: 39,
    image: "https://m.media-amazon.com/images/I/711ySIV-X4L._AC_UF1000,1000_QL80_.jpg",
    description: "Rutina de 4 pasos: limpiador, tónico, sérum de vitamina C e hidratante. Formulado para todo tipo de piel."
  }
];

const CATEGORIES = [...new Set(PRODUCTS.map(p => p.category))];

/* Ícono de carrito reutilizable dentro de los botones "Agregar al carrito" */
const CART_ICON_SVG = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink:0;">
  <circle cx="9" cy="21" r="1.4"/><circle cx="19" cy="21" r="1.4"/>
  <path d="M2.5 3h2.4l2.5 12.4a2 2 0 0 0 2 1.6h8.3a2 2 0 0 0 2-1.6l1.6-8.4H6"/>
</svg>`;

/* ---------------------- ESTADO ---------------------- */
const state = {
  search: "",
  category: "Todas",
  onlyStock: false,
  maxPrice: 2000,
  minRating: 0,
  sort: "relevance",
};

/* ---------------------- CUENTAS ----------------------
   Cada cuenta (por correo) guarda sus propios datos y su propio carrito,
   para que al cerrar sesión y volver a entrar todo siga como lo dejaste. */
function loadAccounts(){
  try{ return JSON.parse(localStorage.getItem("mv_accounts")) || {}; }catch(e){ return {}; }
}
function saveAccounts(accounts){ localStorage.setItem("mv_accounts", JSON.stringify(accounts)); }

function cartKeyFor(email){ return "mv_cart_" + (email || "guest"); }

function loadCartFor(email){
  try{ return JSON.parse(localStorage.getItem(cartKeyFor(email))) || []; }catch(e){ return []; }
}
function saveCart(){
  localStorage.setItem(cartKeyFor(currentUser ? currentUser.email : null), JSON.stringify(cart));
}

/* Sesión activa: qué correo está actualmente conectado (o ninguno = invitado) */
function loadCurrentUser(){
  const email = localStorage.getItem("mv_current_email");
  if(!email) return null;
  const accounts = loadAccounts();
  return accounts[email] || null;
}

let currentUser = loadCurrentUser();               // objeto usuario o null (invitado)
let cart = loadCartFor(currentUser ? currentUser.email : null); // [{id, qty}] del usuario activo
let reviews = loadReviews();    // { productId: [{author, rating, text, date}] }
let activeProductId = null;

/* Cambia de cuenta activa (o a invitado con email=null) y carga su carrito guardado */
function switchToAccount(user){
  currentUser = user;
  if(user){
    localStorage.setItem("mv_current_email", user.email);
  }else{
    localStorage.removeItem("mv_current_email");
  }
  cart = loadCartFor(user ? user.email : null);
  updateLoginUI();
  renderCartBadge();
  renderCartDrawer();
}

function logout(){
  const name = currentUser ? currentUser.fullName.split(" ")[0] : "";
  switchToAccount(null);
  showToast(name ? `Hasta pronto, ${name}. Tu carrito quedó guardado para la próxima vez.` : "Cerraste sesión.");
}

function loadReviews(){
  try{
    const stored = JSON.parse(localStorage.getItem("mv_reviews"));
    if(stored) return stored;
  }catch(e){ /* ignore */ }
  // Reseñas semilla para que la tienda no se sienta vacía
  return {
    p1: [
      { author: "Marisol T.", rating: 5, text: "Excelente cancelación de ruido, los uso todos los días en el camión.", date: "2026-06-14" },
      { author: "Iván R.", rating: 4, text: "Muy cómodos, la batería sí rinde lo que dicen.", date: "2026-05-02" }
    ],
    p4: [
      { author: "Carla G.", rating: 5, text: "Corrí mi primer 10K con ellos, cero rozaduras.", date: "2026-07-20" }
    ],
    p9: [
      { author: "Renata M.", rating: 5, text: "Grosor perfecto, no resbala nada.", date: "2026-04-11" },
      { author: "Diego P.", rating: 4, text: "Buena calidad, huele fuerte los primeros días.", date: "2026-03-30" }
    ]
  };
}
function saveReviews(){ localStorage.setItem("mv_reviews", JSON.stringify(reviews)); }

/* ---------------------- UTILIDADES ---------------------- */
function formatPrice(n){
  return n.toLocaleString("es-MX", { style: "currency", currency: "MXN" });
}
function starString(rating){
  const full = Math.round(rating);
  return "★".repeat(full) + "☆".repeat(5 - full);
}
function getProduct(id){ return PRODUCTS.find(p => p.id === id); }

function showToast(message, { actionLabel, onAction, isError } = {}){
  const region = document.getElementById("toastRegion");
  const toast = document.createElement("div");
  toast.className = "toast" + (isError ? " toast--error" : "");
  toast.setAttribute("role", "status");
  toast.innerHTML = `<span>${message}</span>`;
  if(actionLabel){
    const btn = document.createElement("button");
    btn.textContent = actionLabel;
    btn.addEventListener("click", () => { onAction && onAction(); toast.remove(); });
    toast.appendChild(btn);
  }
  region.appendChild(toast);
  setTimeout(() => toast.remove(), 4500);
}

/* =========================================================
   RENDER: BARRA DE CATEGORÍAS
   ========================================================= */
function renderCategoryBar(){
  const list = document.getElementById("categoryList");
  const listMobile = document.getElementById("categoryListMobile");
  const catFilters = document.getElementById("categoryFilters");

  const all = ["Todas", ...CATEGORIES];

  list.innerHTML = all.map(cat =>
    `<li><button data-cat="${cat}" class="${state.category === cat ? "active" : ""}">${cat}</button></li>`
  ).join("");

  listMobile.innerHTML = all.map(cat =>
    `<li><button data-cat="${cat}" class="${state.category === cat ? "active" : ""}">${cat}</button></li>`
  ).join("");

  catFilters.innerHTML = all.map(cat => `
    <label class="checkbox-row">
      <input type="radio" name="catRadio" value="${cat}" ${state.category === cat ? "checked" : ""}>
      <span>${cat}</span>
    </label>
  `).join("");

  [list, listMobile].forEach(el => {
    el.querySelectorAll("button").forEach(btn => {
      btn.addEventListener("click", () => {
        state.category = btn.dataset.cat;
        closeCategoryDrawer();
        renderCategoryBar();
        renderProducts();
      });
    });
  });

  catFilters.querySelectorAll("input").forEach(input => {
    input.addEventListener("change", () => {
      state.category = input.value;
      renderCategoryBar();
      renderProducts();
    });
  });
}

/* =========================================================
   RENDER: FILTRO DE CALIFICACIÓN
   ========================================================= */
function renderRatingFilters(){
  const container = document.getElementById("ratingFilters");
  const options = [0, 3, 4, 4.5];
  container.innerHTML = options.map(val => `
    <label class="checkbox-row">
      <input type="radio" name="ratingRadio" value="${val}" ${state.minRating === val ? "checked" : ""}>
      <span>${val === 0 ? "Todas" : `${val}+ ${starString(val).slice(0,1)}`}</span>
    </label>
  `).join("");
  container.querySelectorAll("input").forEach(input => {
    input.addEventListener("change", () => {
      state.minRating = parseFloat(input.value);
      renderProducts();
    });
  });
}

/* =========================================================
   FILTRADO + ORDEN
   ========================================================= */
function getFilteredProducts(){
  let list = PRODUCTS.filter(p => {
    if(state.category !== "Todas" && p.category !== state.category) return false;
    if(state.onlyStock && p.stock <= 0) return false;
    if(p.price > state.maxPrice) return false;
    if(p.rating < state.minRating) return false;
    if(state.search){
      const q = state.search.toLowerCase();
      if(!p.name.toLowerCase().includes(q) && !p.category.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  switch(state.sort){
    case "price-asc": list.sort((a,b) => a.price - b.price); break;
    case "price-desc": list.sort((a,b) => b.price - a.price); break;
    case "rating-desc": list.sort((a,b) => b.rating - a.rating); break;
    default: break;
  }
  return list;
}

/* =========================================================
   RENDER: GRID DE PRODUCTOS
   ========================================================= */
function renderProducts(){
  const grid = document.getElementById("productGrid");
  const empty = document.getElementById("emptyState");
  const resultsCount = document.getElementById("resultsCount");
  const list = getFilteredProducts();

  resultsCount.textContent = list.length === PRODUCTS.length
    ? `Mostrando los ${list.length} productos`
    : `Mostrando ${list.length} de ${PRODUCTS.length} productos`;

  if(list.length === 0){
    grid.innerHTML = "";
    empty.hidden = false;
    return;
  }
  empty.hidden = true;

  grid.innerHTML = list.map(p => {
    const outOfStock = p.stock <= 0;
    const lowStock = !outOfStock && p.stock <= 5;
    return `
    <article class="product-card">
      <div class="product-card__imgwrap">
        ${outOfStock ? `<span class="badge badge--out">Agotado</span>` : (lowStock ? `<span class="badge">¡Últimas piezas!</span>` : "")}
        <img src="${p.image}" alt="${p.name}" loading="lazy" width="500" height="375">
      </div>
      <div class="product-card__body">
        <span class="product-card__category">${p.category}</span>
        <button class="product-card__title" data-open="${p.id}">${p.name}</button>
        <div class="stars">
          <span class="stars__icons" aria-hidden="true">${starString(p.rating)}</span>
          <span>${p.rating.toFixed(1)} (${p.ratingCount + (reviews[p.id]?.length || 0)})</span>
        </div>
        <div class="product-card__price-row">
          <span class="product-card__price">${formatPrice(p.price)}</span>
          <span class="product-card__stock ${outOfStock ? "product-card__stock--out" : lowStock ? "product-card__stock--low" : ""}">
            ${outOfStock ? "Sin existencia" : `${p.stock} disponibles`}
          </span>
        </div>
      </div>
      <div class="product-card__actions">
        <button class="btn btn--primary btn--full" data-add="${p.id}" ${outOfStock ? "disabled" : ""}>
          ${outOfStock ? "Agotado" : `${CART_ICON_SVG} Agregar al carrito`}
        </button>
      </div>
    </article>`;
  }).join("");

  grid.querySelectorAll("[data-open]").forEach(btn => {
    btn.addEventListener("click", () => openProductModal(btn.dataset.open));
  });
  grid.querySelectorAll("[data-add]").forEach(btn => {
    btn.addEventListener("click", () => addToCart(btn.dataset.add));
  });
}

/* =========================================================
   CARRITO
   ========================================================= */
function addToCart(productId, qty = 1){
  const product = getProduct(productId);
  if(!product || product.stock <= 0) return;

  const existing = cart.find(item => item.id === productId);
  const currentQty = existing ? existing.qty : 0;

  if(currentQty + qty > product.stock){
    showToast(`Solo quedan ${product.stock} de "${product.name}" en existencia.`, { isError: true });
    return;
  }

  if(existing){ existing.qty += qty; }
  else{ cart.push({ id: productId, qty }); }

  saveCart();
  renderCartBadge();
  renderCartDrawer();
  showToast(`"${product.name}" se agregó al carrito.`, {
    actionLabel: "Ver carrito",
    onAction: openCart
  });
}

function updateQty(productId, delta){
  const item = cart.find(i => i.id === productId);
  if(!item) return;
  const product = getProduct(productId);
  const newQty = item.qty + delta;

  if(newQty <= 0){
    removeFromCart(productId, { silent: true });
    return;
  }
  if(newQty > product.stock){
    showToast(`Solo hay ${product.stock} unidades disponibles.`, { isError: true });
    return;
  }
  item.qty = newQty;
  saveCart();
  renderCartBadge();
  renderCartDrawer();
}

function removeFromCart(productId, { silent } = {}){
  const removedItem = cart.find(i => i.id === productId);
  const product = getProduct(productId);
  cart = cart.filter(i => i.id !== productId);
  saveCart();
  renderCartBadge();
  renderCartDrawer();

  if(!silent && removedItem){
    showToast(`Se quitó "${product.name}" del carrito.`, {
      actionLabel: "Deshacer",
      onAction: () => {
        cart.push(removedItem);
        saveCart();
        renderCartBadge();
        renderCartDrawer();
      }
    });
  }
}

function clearCart(){
  if(cart.length === 0) return;
  if(!confirm("¿Vaciar todo el carrito? Esta acción no se puede deshacer.")) return;
  cart = [];
  saveCart();
  renderCartBadge();
  renderCartDrawer();
  showToast("Se vació el carrito.");
}

function cartCount(){ return cart.reduce((sum, i) => sum + i.qty, 0); }
function cartSubtotal(){
  return cart.reduce((sum, i) => {
    const p = getProduct(i.id);
    return sum + (p ? p.price * i.qty : 0);
  }, 0);
}

function renderCartBadge(){
  document.getElementById("cartBadge").textContent = cartCount();
}

function renderCartDrawer(){
  const body = document.getElementById("cartBody");
  const subtotalEl = document.getElementById("cartSubtotal");
  const checkoutBtn = document.getElementById("checkoutBtn");

  if(cart.length === 0){
    body.innerHTML = `<div class="cart-empty">Tu carrito está vacío.<br>Explora los productos y agrega lo que te guste.</div>`;
    checkoutBtn.disabled = true;
  }else{
    checkoutBtn.disabled = false;
    body.innerHTML = cart.map(item => {
      const p = getProduct(item.id);
      if(!p) return "";
      return `
      <div class="cart-item">
        <img src="${p.image}" alt="${p.name}" width="64" height="64">
        <div class="cart-item__info">
          <div class="cart-item__name">${p.name}</div>
          <div class="cart-item__price">${formatPrice(p.price)} c/u</div>
          <div class="qty-control">
            <button data-dec="${p.id}" aria-label="Quitar una unidad de ${p.name}">−</button>
            <span aria-live="polite">${item.qty}</span>
            <button data-inc="${p.id}" aria-label="Agregar una unidad de ${p.name}">+</button>
          </div>
        </div>
        <button class="cart-item__remove" data-remove="${p.id}" aria-label="Eliminar ${p.name} del carrito" title="Eliminar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
            <path d="M10 11v6"/><path d="M14 11v6"/>
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
          </svg>
        </button>
      </div>`;
    }).join("");
  }

  subtotalEl.textContent = formatPrice(cartSubtotal());

  body.querySelectorAll("[data-inc]").forEach(b => b.addEventListener("click", () => updateQty(b.dataset.inc, 1)));
  body.querySelectorAll("[data-dec]").forEach(b => b.addEventListener("click", () => updateQty(b.dataset.dec, -1)));
  body.querySelectorAll("[data-remove]").forEach(b => b.addEventListener("click", () => removeFromCart(b.dataset.remove)));
}

/* Cierra cualquier panel/modal que esté abierto (evita tener dos a la vez) */
function closeAllOverlays(){
  closeCart();
  closeLoginModal();
  closeProductModal();
  closeCategoryDrawer();
}

/* Abrir / cerrar carrito */
function openCart(){
  closeLoginModal();
  closeProductModal();
  closeCategoryDrawer();
  document.getElementById("cartOverlay").hidden = false;
  const drawer = document.getElementById("cartDrawer");
  drawer.hidden = false;
  document.getElementById("closeCart").focus();
  document.body.style.overflow = "hidden";
}
function closeCart(){
  document.getElementById("cartOverlay").hidden = true;
  document.getElementById("cartDrawer").hidden = true;
  document.body.style.overflow = "";
}

/* =========================================================
   LOGIN / SESIÓN
   ========================================================= */
const REQUIRED_FIELDS = ["fullName", "email", "phone", "street", "neighborhood", "zip", "city", "state"];

function validateField(id, value){
  switch(id){
    case "fullName":
      return value.trim().length >= 3 ? "" : "Escribe tu nombre completo.";
    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Escribe un correo válido.";
    case "phone":
      return /^\d{10}$/.test(value.replace(/\s/g, "")) ? "" : "Escribe un teléfono a 10 dígitos.";
    case "zip":
      return /^\d{4,5}$/.test(value.trim()) ? "" : "Escribe un código postal válido.";
    default:
      return value.trim().length >= 2 ? "" : "Este campo es obligatorio.";
  }
}

function handleLoginSubmit(e){
  e.preventDefault();
  const form = e.target;
  let hasError = false;
  const data = {};

  REQUIRED_FIELDS.forEach(id => {
    const input = document.getElementById(id);
    const error = validateField(id, input.value);
    data[id] = input.value.trim();
    const errEl = document.getElementById("err-" + id);
    if(error){
      hasError = true;
      input.setAttribute("aria-invalid", "true");
      errEl.textContent = error;
    }else{
      input.removeAttribute("aria-invalid");
      errEl.textContent = "";
    }
  });

  if(hasError){
    showToast("Revisa los campos marcados en rojo.", { isError: true });
    form.querySelector('[aria-invalid="true"]')?.focus();
    return;
  }

  data.references = document.getElementById("references").value.trim();

  const accounts = loadAccounts();
  const isNewAccount = !accounts[data.email];
  accounts[data.email] = data;
  saveAccounts(accounts);

  switchToAccount(data);
  closeLoginModal();
  showToast(isNewAccount
    ? `¡Bienvenido/a, ${data.fullName.split(" ")[0]}! Guardamos tu domicilio para tus envíos.`
    : `¡Qué bueno verte de nuevo, ${data.fullName.split(" ")[0]}!`);
}

function updateLoginUI(){
  const label = document.getElementById("loginLabel");
  const logoutBtn = document.getElementById("logoutBtn");
  if(currentUser){
    label.textContent = currentUser.fullName.split(" ")[0];
    logoutBtn.hidden = false;
  }else{
    label.textContent = "Iniciar sesión";
    logoutBtn.hidden = true;
  }
}

function prefillLoginForm(){
  if(!currentUser) return;
  Object.entries(currentUser).forEach(([key, value]) => {
    const input = document.getElementById(key);
    if(input) input.value = value;
  });
}

function openLoginModal(){
  closeCart();
  closeProductModal();
  closeCategoryDrawer();
  document.getElementById("loginOverlay").hidden = false;
  document.getElementById("loginModal").hidden = false;
  prefillLoginForm();
  document.getElementById("fullName").focus();
  document.body.style.overflow = "hidden";
}
function closeLoginModal(){
  document.getElementById("loginOverlay").hidden = true;
  document.getElementById("loginModal").hidden = true;
  document.body.style.overflow = "";
}

/* =========================================================
   MODAL DE PRODUCTO + RESEÑAS
   ========================================================= */
let selectedStars = 0;

function openProductModal(productId){
  activeProductId = productId;
  const p = getProduct(productId);
  if(!p) return;

  const content = document.getElementById("productModalContent");
  const productReviews = reviews[productId] || [];
  const outOfStock = p.stock <= 0;

  content.innerHTML = `
    <div class="product-detail">
      <div class="product-detail__img"><img src="${p.image}" alt="${p.name}"></div>
      <div class="product-detail__info">
        <span class="product-detail__meta">${p.category}</span>
        <h2 id="productModalTitle">${p.name}</h2>
        <div class="stars">
          <span class="stars__icons" aria-hidden="true">${starString(p.rating)}</span>
          <span>${p.rating.toFixed(1)} · ${p.ratingCount + productReviews.length} reseñas</span>
        </div>
        <div class="product-detail__price">${formatPrice(p.price)}</div>
        <p class="product-detail__desc">${p.description}</p>
        <p class="product-card__stock ${outOfStock ? "product-card__stock--out" : ""}">${outOfStock ? "Sin existencia por ahora" : `${p.stock} piezas disponibles`}</p>
        <button class="btn btn--primary btn--full" id="modalAddBtn" ${outOfStock ? "disabled" : ""}>
          ${outOfStock ? "Agotado" : `${CART_ICON_SVG} Agregar al carrito`}
        </button>
      </div>

      <div class="reviews">
        <h3>Reseñas de clientes (${productReviews.length})</h3>
        <div id="reviewsList">
          ${productReviews.length === 0
            ? `<p class="cart-hint">Aún no hay reseñas. ¡Sé la primera persona en opinar!</p>`
            : productReviews.map(r => `
              <div class="review-item">
                <div class="review-item__head">
                  <span class="review-item__author">${r.author}</span>
                  <span class="review-item__date">${r.date}</span>
                </div>
                <div class="stars__icons" aria-hidden="true">${starString(r.rating)}</div>
                <p class="review-item__text">${r.text}</p>
              </div>
            `).join("")}
        </div>

        <form class="review-form" id="reviewForm">
          <label for="reviewText">Escribe tu reseña</label>
          <p class="review-form__note" id="reviewRatingLabel">Selecciona tu calificación:</p>
          <div class="star-picker" id="starPicker" role="radiogroup" aria-label="Calificación en estrellas">
            ${[1,2,3,4,5].map(n => `<button type="button" data-star="${n}" role="radio" aria-checked="false" aria-label="${n} estrella${n>1?"s":""}">★</button>`).join("")}
          </div>
          <textarea id="reviewText" placeholder="¿Qué te pareció el producto?" required></textarea>
          <p class="error-msg" id="reviewError"></p>
          <button type="submit" class="btn btn--secondary" style="margin-top:10px;">Publicar reseña</button>
        </form>
      </div>
    </div>
  `;

  selectedStars = 0;
  document.getElementById("modalAddBtn")?.addEventListener("click", () => {
    addToCart(productId);
  });

  const starPicker = document.getElementById("starPicker");
  starPicker.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      selectedStars = parseInt(btn.dataset.star, 10);
      starPicker.querySelectorAll("button").forEach(b => {
        const active = parseInt(b.dataset.star, 10) <= selectedStars;
        b.classList.toggle("selected", active);
        b.setAttribute("aria-checked", parseInt(b.dataset.star,10) === selectedStars ? "true" : "false");
      });
    });
  });

  document.getElementById("reviewForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const textEl = document.getElementById("reviewText");
    const errorEl = document.getElementById("reviewError");

    if(selectedStars === 0){
      errorEl.textContent = "Selecciona una calificación en estrellas.";
      return;
    }
    if(textEl.value.trim().length < 5){
      errorEl.textContent = "Escribe un poco más sobre tu experiencia.";
      textEl.focus();
      return;
    }
    errorEl.textContent = "";

    const author = currentUser ? currentUser.fullName : "Usuario invitado";
    const newReview = {
      author,
      rating: selectedStars,
      text: textEl.value.trim(),
      date: new Date().toISOString().slice(0, 10)
    };
    if(!reviews[productId]) reviews[productId] = [];
    reviews[productId].unshift(newReview);
    saveReviews();
    showToast("¡Gracias por tu reseña!");
    openProductModal(productId); // re-render con la nueva reseña
    renderProducts(); // actualiza conteo en la tarjeta
  });

  closeCart();
  closeLoginModal();
  closeCategoryDrawer();
  document.getElementById("productOverlay").hidden = false;
  document.getElementById("productModal").hidden = false;
  document.body.style.overflow = "hidden";
  document.getElementById("closeProduct").focus();
}

function closeProductModal(){
  document.getElementById("productOverlay").hidden = true;
  document.getElementById("productModal").hidden = true;
  document.body.style.overflow = "";
  activeProductId = null;
}

/* =========================================================
   DRAWER DE CATEGORÍAS (móvil)
   ========================================================= */
function openCategoryDrawer(){
  closeCart();
  closeLoginModal();
  closeProductModal();
  document.getElementById("categoryOverlay").hidden = false;
  document.getElementById("categoryDrawer").hidden = false;
  document.getElementById("menuToggle").setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
}
function closeCategoryDrawer(){
  document.getElementById("categoryOverlay").hidden = true;
  document.getElementById("categoryDrawer").hidden = true;
  document.getElementById("menuToggle").setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}

/* =========================================================
   INICIALIZACIÓN Y EVENTOS GLOBALES
   ========================================================= */
function init(){
  renderCategoryBar();
  renderRatingFilters();
  renderProducts();
  renderCartBadge();
  renderCartDrawer();
  updateLoginUI();

  // Buscador
  document.getElementById("searchForm").addEventListener("submit", (e) => {
    e.preventDefault();
    state.search = document.getElementById("searchInput").value;
    renderProducts();
  });
  document.getElementById("searchInput").addEventListener("input", (e) => {
    state.search = e.target.value;
    renderProducts();
  });

  // Filtros
  document.getElementById("onlyStock").addEventListener("change", (e) => {
    state.onlyStock = e.target.checked;
    renderProducts();
  });
  document.getElementById("priceRange").addEventListener("input", (e) => {
    state.maxPrice = parseInt(e.target.value, 10);
    document.getElementById("priceOutput").textContent = formatPrice(state.maxPrice);
    renderProducts();
  });
  document.getElementById("sortSelect").addEventListener("change", (e) => {
    state.sort = e.target.value;
    renderProducts();
  });
  document.getElementById("clearFilters").addEventListener("click", resetFilters);
  document.getElementById("emptyReset").addEventListener("click", resetFilters);

  // Carrito
  document.getElementById("cartToggle").addEventListener("click", openCart);
  document.getElementById("closeCart").addEventListener("click", () => { closeCart(); document.getElementById("cartToggle").focus(); });
  document.getElementById("cartOverlay").addEventListener("click", closeCart);
  document.getElementById("clearCartBtn").addEventListener("click", clearCart);
  document.getElementById("checkoutBtn").addEventListener("click", () => {
    if(!currentUser){
      closeCart();
      showToast("Inicia sesión para guardar tu domicilio antes de finalizar la compra.", { isError: true });
      openLoginModal();
      return;
    }
    showToast(`¡Gracias por tu compra, ${currentUser.fullName.split(" ")[0]}! Se enviará a ${currentUser.street}, ${currentUser.neighborhood}.`);
    cart = [];
    saveCart();
    renderCartBadge();
    renderCartDrawer();
    closeCart();
  });

  // Login
  document.getElementById("loginBtn").addEventListener("click", openLoginModal);
  document.getElementById("logoutBtn").addEventListener("click", logout);
  document.getElementById("closeLogin").addEventListener("click", () => { closeLoginModal(); document.getElementById("loginBtn").focus(); });
  document.getElementById("loginOverlay").addEventListener("click", closeLoginModal);
  document.getElementById("loginForm").addEventListener("submit", handleLoginSubmit);

  // Producto / reseñas
  document.getElementById("closeProduct").addEventListener("click", closeProductModal);
  document.getElementById("productOverlay").addEventListener("click", closeProductModal);

  // Drawer categorías móvil
  document.getElementById("menuToggle").addEventListener("click", openCategoryDrawer);
  document.getElementById("closeCategoryDrawer").addEventListener("click", () => { closeCategoryDrawer(); document.getElementById("menuToggle").focus(); });
  document.getElementById("categoryOverlay").addEventListener("click", closeCategoryDrawer);

  // Ayuda (heurística: ayuda y documentación)
  document.getElementById("helpBtn").addEventListener("click", () => {
    alert("LocalStore:\n\n1) Usa los filtros o la barra de categorías para explorar productos.\n2) Da clic en un producto para ver detalles y reseñas.\n3) Agrega productos al carrito y ajusta cantidades con + y -.\n4) Inicia sesión para guardar tu domicilio y finalizar tu compra.");
  });

  // Cerrar modales con tecla Escape (heurística: control y libertad del usuario)
  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape") closeAllOverlays();
  });
}

function resetFilters(){
  state.search = "";
  state.category = "Todas";
  state.onlyStock = false;
  state.maxPrice = 2000;
  state.minRating = 0;
  state.sort = "relevance";

  document.getElementById("searchInput").value = "";
  document.getElementById("onlyStock").checked = false;
  document.getElementById("priceRange").value = 2000;
  document.getElementById("priceOutput").textContent = formatPrice(2000);
  document.getElementById("sortSelect").value = "relevance";

  renderCategoryBar();
  renderRatingFilters();
  renderProducts();
}

document.addEventListener("DOMContentLoaded", init);
