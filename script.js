// 1. SET DE 10 PRODUCTOS CON DESCRIPCIONES COMPLETAS
const products = [
  {
    id: 1,
    name: "Audífonos Inalámbricos Pro",
    price: 899.00,
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    description: "Cancelación de ruido activa, sonido de alta fidelidad y batería de hasta 30 horas. Ideales para trabajar, viajar o disfrutar de tu música favorita."
  },
  {
    id: 2,
    name: "Teclado Mecánico RGB",
    price: 1299.00,
    img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
    description: "Switches mecánicos táctiles con retroiluminación RGB personalizable. Construcción de aluminio duradera y respuesta ultra rápida para juegos."
  },
  {
    id: 3,
    name: "Mouse Ergonómico Inalámbrico",
    price: 450.00,
    img: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500",
    description: "Diseñado para reducir la tensión muscular en la muñeca. Sensor óptico de alta precisión y batería recargable de larga duración."
  },
  {
    id: 4,
    name: "Monitor Gamer 24 pulgadas",
    price: 3499.00,
    img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500",
    description: "Pantalla Full HD con tasa de refresco de 144Hz y 1ms de tiempo de respuesta. Colores vibrantes y tecnología AMD FreeSync."
  },
  {
    id: 5,
    name: "Mochila Impermeable para Laptop",
    price: 650.00,
    img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    description: "Compartimento acolchado para laptops de hasta 15.6 pulgadas. Materiales resistentes al agua, puerto de carga USB exterior y diseño antirrobo."
  },
  {
    id: 6,
    name: "Soporte Ajustable de Aluminio",
    price: 380.00,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4ABChmbiGMHcjx_GgnmJkwKwgKPJiCTrNfxEf7wS5MA&s=10",
    description: "Mejora tu postura elevando tu laptop a la altura de la vista. Plegable, portátil y compatible con todas las marcas y tamaños de laptop."
  },
  {
    id: 7,
    name: "Cámara Web Full HD 1080p",
    price: 820.00,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmNNZq9TmOy5z8zAO25sg9YJwBXoJxmK3FeM2JGyr3hQ&s=10",
    description: "Micrófono estéreo integrado y corrección automática de luz. Perfecta para videoconferencias, clases en línea y transmisiones en vivo."
  },
  {
    id: 8,
    name: "Lámpara LED de Escritorio",
    price: 290.00,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0buILxgC9stG4kfoY91RXeVCXBXotEKYBD7ew7KrBFw&s=10",
    description: "Múltiples niveles de brillo y temperaturas de color para proteger la vista. Control táctil y base con cargador inalámbrico para celular."
  },
  {
    id: 9,
    name: "Hub USB-C 7 en 1",
    price: 540.00,
    img: "https://m.media-amazon.com/images/I/71bfhlTw+1L._AC_UF894,1000_QL80_.jpg",
    description: "Expande tus puertos con salida HDMI 4K, 3 puertos USB 3.0, lector de tarjetas SD/TF y puerto de carga Power Delivery de 100W."
  },
  {
    id: 10,
    name: "Batería Portátil 20000mAh",
    price: 499.00,
    img: "https://i5.walmartimages.com/asr/011d884d-c5cc-4b33-a76e-31f162552f50.cfe2e2530aa2d2fd4a904c378bc9c6da.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    description: "Carga rápida para múltiples dispositivos simultáneamente. Indicador digital de carga restante y diseño compacto para viajar."
  }
];

// Estado del Carrito
let cart = [];

// Elementos del DOM
const catalogView = document.getElementById("catalog-view");
const detailView = document.getElementById("detail-view");
const productGrid = document.getElementById("product-grid");
const productDetailContent = document.getElementById("product-detail-content");
const recommendationsGrid = document.getElementById("recommendations-grid");
const cartModal = document.getElementById("cart-modal");

// Renderizar el catálogo principal
function renderCatalog() {
  productGrid.innerHTML = products.map(product => `
    <article class="product-card" onclick="openProductDetail(${product.id})">
      <img src="${product.img}" alt="${product.name}" class="product-img" />
      <h3 class="product-title">${product.name}</h3>
      <div class="product-price">$${product.price.toFixed(2)}</div>
      <button class="add-btn" onclick="event.stopPropagation(); addToCart(${product.id})">
        Agregar al carrito
      </button>
    </article>
  `).join('');
}

// Abrir detalle del producto
function openProductDetail(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  // Render Detalle
  productDetailContent.innerHTML = `
    <img src="${product.img}" alt="${product.name}" class="detail-img" />
    <div class="detail-info">
      <h1>${product.name}</h1>
      <div class="detail-price">$${product.price.toFixed(2)}</div>
      <p class="detail-desc">${product.description}</p>
      <button class="add-btn" style="padding: 0.9rem; font-size: 1.05rem;" onclick="addToCart(${product.id})">
        🛒 Agregar al Carrito
      </button>
    </div>
  `;

  // Render Recomendaciones (Los demás productos excluyendo el actual)
  const recommendations = products.filter(p => p.id !== productId);
  recommendationsGrid.innerHTML = recommendations.map(p => `
    <article class="product-card" onclick="openProductDetail(${p.id})">
      <img src="${p.img}" alt="${p.name}" class="product-img" />
      <h3 class="product-title">${p.name}</h3>
      <div class="product-price">$${p.price.toFixed(2)}</div>
      <button class="add-btn" onclick="event.stopPropagation(); addToCart(${p.id})">
        Agregar al carrito
      </button>
    </article>
  `).join('');

  // Cambiar vistas y hacer scroll arriba
  catalogView.classList.add("hidden");
  detailView.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Volver al catálogo
function showCatalog() {
  detailView.classList.add("hidden");
  catalogView.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// AGREGAR AL CARRITO (Control del Usuario)
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCartUI();
  showToast(`¡"${product.name}" añadido al carrito!`);
}

// Modificar cantidad (+ / -)
function updateQuantity(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.id !== productId);
    }
  }
  updateCartUI();
}

// Vaciar Carrito
function clearCart() {
  if (cart.length === 0) return;
  cart = [];
  updateCartUI();
  showToast("El carrito ha sido vaciado");
}

// Finalizar Compra
function checkout() {
  if (cart.length === 0) {
    showToast("Tu carrito está vacío");
    return;
  }
  showToast("¡Gracias por tu compra en LocalStore!");
  cart = [];
  updateCartUI();
  toggleCartModal();
}

// ACTUALIZAR INTERFAZ DEL CARRITO Y CONTADORES (Estado del sistema)
function updateCartUI() {
  const cartItemsList = document.getElementById("cart-items-list");
  const cartCount = document.getElementById("cart-count");
  const cartTotalPrice = document.getElementById("cart-total-price");

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  cartCount.textContent = totalItems;
  cartTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;

  if (cart.length === 0) {
    cartItemsList.innerHTML = `<p class="empty-cart-msg">No has agregado nada a tu carrito todavía.</p>`;
    return;
  }

  cartItemsList.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div>
        <div class="cart-item-title">${item.name}</div>
        <div class="cart-item-price">$${item.price.toFixed(2)} c/u</div>
        <div class="qty-controls">
          <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
          <span><strong>${item.quantity}</strong></span>
          <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
        </div>
      </div>
      <div>
        <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
      </div>
    </div>
  `).join('');
}

// TOGGLE Y CONTROL DEL MODAL DE CARRITO (Visibilidad total)
function toggleCartModal() {
  cartModal.classList.toggle("active");
}

function closeCartOnOverlay(event) {
  if (event.target === cartModal) {
    toggleCartModal();
  }
}

// TOAST DE NOTIFICACIÓN (Visibilidad del estado)
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

// Inicialización
renderCatalog();
updateCartUI();