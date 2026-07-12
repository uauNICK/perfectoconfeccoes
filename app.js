// initial Mock Data
const INITIAL_PRODUCTS = [
  {
    id: "p1",
    name: "Camisa Polo Algodão Pima",
    category: "Polos",
    priceRetail: 89.90,
    priceWholesale: 59.90,
    sizes: ["P", "M", "G", "GG"],
    colors: ["#2d3748", "#1a365d", "#742a2a", "#2f855a"], // slate, blue, red, green
    colorNames: ["Preto", "Marinho", "Bordô", "Militar"],
    image: "assets/images/camisa_polo.png",
    description: "Camisa polo clássica confeccionada em algodão Pima peruano legítimo. Fibra nobre que garante toque extremamente macio, alta durabilidade, brilho natural e frescor ideal. Possui peitilho reforçado com botões perolados e modelagem semi-ajustada premium.",
    isNew: true,
    isPromo: false,
    stock: 60,
    reserved: 0,
    sold: 0
  },
  {
    id: "p2",
    name: "Moletom Canguru Unissex",
    category: "Moletons",
    priceRetail: 129.90,
    priceWholesale: 89.90,
    sizes: ["P", "M", "G", "GG"],
    colors: ["#4a5568", "#1a202c", "#cbd5e0"], // gray, dark, light gray
    colorNames: ["Cinza Mescla", "Preto", "Off-White"],
    image: "assets/images/moletom.png",
    description: "Moletom pesado com felpa interna (3 cabos), perfeito para dias frios. Modelagem canguru com capuz ajustável por cordão, bolso frontal espaçoso, e punhos e barra em ribana elástica para melhor isolamento térmico. Costura dupla ombro a ombro.",
    isNew: false,
    isPromo: true,
    stock: 45,
    reserved: 0,
    sold: 0
  },
  {
    id: "p3",
    name: "Calça Jeans Premium Slim",
    category: "Calças",
    priceRetail: 149.90,
    priceWholesale: 99.90,
    sizes: ["38", "40", "42", "44", "46"],
    colors: ["#2b6cb0", "#1a365d"], // blue jeans, dark jeans
    colorNames: ["Jeans Médio", "Jeans Escuro"],
    image: "assets/images/calca_jeans.png",
    description: "Calça jeans modelagem Slim Fit com elastano para máximo conforto e mobilidade. Lavação artesanal com leves marcações de desgaste que dão um tom moderno e sofisticado. Aviamentos personalizados em cobre e costuras internas super resistentes.",
    isNew: false,
    isPromo: false,
    stock: 30,
    reserved: 0,
    sold: 0
  },
  {
    id: "p4",
    name: "Camiseta Básica Algodão Penteado",
    category: "Camisetas",
    priceRetail: 49.90,
    priceWholesale: 34.90,
    sizes: ["P", "M", "G", "GG"],
    colors: ["#ffffff", "#1a202c", "#718096", "#9b2c2c"], // white, black, gray, red
    colorNames: ["Branco", "Preto", "Grafite", "Vinho"],
    image: "assets/images/camiseta_basica.png",
    description: "Camiseta básica gola careca, confeccionada em malha 100% Algodão Penteado Fio 30.1. Passa por processo de amaciamento que confere um toque aveludado e evita encolhimento pós-lavagem. Essencial para compor visuais versáteis no dia a dia.",
    isNew: true,
    isPromo: true,
    stock: 80,
    reserved: 0,
    sold: 0
  }
];

const INITIAL_SETTINGS = {
  whatsapp: "5519999998888",
  wholesaleMin: 10,
  wholesaleDiscount: 20,
  pixKey: "financeiro@perfectoconfeccoes.com.br",
  address: "Rua Têxtil, 450, Distrito Industrial - Americana/SP",
  email: "contato@perfectoconfeccoes.com.br",
  instagram: "https://instagram.com/perfecto.confeccoes",
  phone: "+55 (19) 3456-7890",
  adminUser: "admin",
  adminPass: "perfecto",
  theme: "midnight",
  logoUrl: "assets/images/logo.png",
  faviconUrl: "assets/images/logo.png",
  logoHeightHeader: 60,
  logoHeightFooter: 100,
  storeTitle: "Perfecto Confecções",
  storeDescription: "Venda Online de Vestuário no Varejo e Atacado Direto de Fábrica.",
  footerAboutText: "Fabricação de vestuário de alta durabilidade e estilo desde 2012. Vestindo o Brasil com excelência.",
  copyrightText: "© 2026 Perfecto Confecções. Todos os direitos reservados. CNPJ: 12.345.678/0001-99",
  headerHeight: 80,
  headerHeightScrolled: 60,
  headerOpacity: 85,
  headerOpacityScrolled: 95
};

// Application State
let products = [];
let cart = [];
let settings = {};
let orders = [];

let currentCategory = "all";
let currentSize = "all";
let currentSort = "default";
let currentViewMode = "retail"; // "retail" | "wholesale"
let searchText = "";

// Initialize State
function initState() {
  const localProducts = localStorage.getItem("perfecto_products");
  if (localProducts) {
    products = JSON.parse(localProducts);
    // Schema migration for stock controls
    products.forEach(p => {
      if (p.stock === undefined) p.stock = 60;
      if (p.reserved === undefined) p.reserved = 0;
      if (p.sold === undefined) p.sold = 0;
    });
    localStorage.setItem("perfecto_products", JSON.stringify(products));
  } else {
    products = [...INITIAL_PRODUCTS];
    localStorage.setItem("perfecto_products", JSON.stringify(products));
  }

  const localSettings = localStorage.getItem("perfecto_settings");
  if (localSettings) {
    settings = { ...INITIAL_SETTINGS, ...JSON.parse(localSettings) };
    if (!settings.logoUrl || settings.logoUrl === "") {
      settings.logoUrl = "assets/images/logo.png";
    }
    if (!settings.faviconUrl || settings.faviconUrl === "") {
      settings.faviconUrl = "assets/images/logo.png";
    }
    if (!settings.logoHeightHeader) {
      settings.logoHeightHeader = 60;
    }
    if (!settings.logoHeightFooter) {
      settings.logoHeightFooter = 100;
    }
    if (!settings.storeTitle) {
      settings.storeTitle = INITIAL_SETTINGS.storeTitle;
    }
    if (!settings.storeDescription) {
      settings.storeDescription = INITIAL_SETTINGS.storeDescription;
    }
    if (!settings.footerAboutText) {
      settings.footerAboutText = INITIAL_SETTINGS.footerAboutText;
    }
    if (!settings.copyrightText) {
      settings.copyrightText = INITIAL_SETTINGS.copyrightText;
    }
    if (!settings.headerHeight) {
      settings.headerHeight = 80;
    }
    if (!settings.headerHeightScrolled) {
      settings.headerHeightScrolled = 60;
    }
    if (settings.headerOpacity === undefined) {
      settings.headerOpacity = 85;
    }
    if (settings.headerOpacityScrolled === undefined) {
      settings.headerOpacityScrolled = 95;
    }
    localStorage.setItem("perfecto_settings", JSON.stringify(settings));
  } else {
    settings = { ...INITIAL_SETTINGS };
    localStorage.setItem("perfecto_settings", JSON.stringify(settings));
  }

  const localCart = localStorage.getItem("perfecto_cart");
  if (localCart) {
    cart = JSON.parse(localCart);
  } else {
    cart = [];
  }

  const localOrders = localStorage.getItem("perfecto_orders");
  if (localOrders) {
    orders = JSON.parse(localOrders);
  } else {
    orders = [];
  }

  // Update dynamic texts on HTML based on settings
  updateBrandingDOM();
}

function updateBrandingDOM() {
  // Apply navigation bar height and opacity settings
  document.documentElement.style.setProperty("--header-height", `${settings.headerHeight || 80}px`);
  document.documentElement.style.setProperty("--header-height-scrolled", `${settings.headerHeightScrolled || 60}px`);
  document.documentElement.style.setProperty("--header-opacity", (settings.headerOpacity !== undefined ? settings.headerOpacity : 85) / 100);
  document.documentElement.style.setProperty("--header-opacity-scrolled", (settings.headerOpacityScrolled !== undefined ? settings.headerOpacityScrolled : 95) / 100);

  document.getElementById("wholesale-trigger-num").innerText = settings.wholesaleMin;
  document.getElementById("wholesale-discount-num").innerText = `${settings.wholesaleDiscount}%`;
  
  // Footer Updates
  document.getElementById("footer-text-address").innerText = settings.address;
  document.getElementById("footer-text-email").innerText = settings.email;
  document.getElementById("footer-text-phone").innerText = settings.phone;
  
  const instaBtn = document.getElementById("social-instagram");
  if (instaBtn) instaBtn.href = settings.instagram || "#";
  
  const whatsappBtn = document.getElementById("social-whatsapp");
  if (whatsappBtn) whatsappBtn.href = `https://wa.me/${settings.whatsapp}`;

  const contactWhatsapp = document.getElementById("contact-whatsapp-btn");
  if (contactWhatsapp) contactWhatsapp.href = `https://wa.me/${settings.whatsapp}`;

  const contactEmail = document.getElementById("contact-email-btn");
  if (contactEmail) contactEmail.href = `mailto:${settings.email}`;

  // Update site title and meta description
  document.title = `${settings.storeTitle} | Moda & Fabricação Própria Premium`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", settings.storeDescription);

  // Update footer text and copyright
  const footerAbout = document.getElementById("footer-text-about");
  if (footerAbout) footerAbout.innerText = settings.footerAboutText;

  const footerCopyright = document.getElementById("footer-text-copyright");
  if (footerCopyright) footerCopyright.innerHTML = settings.copyrightText;

  // Apply Theme class
  document.body.classList.remove("theme-emerald", "theme-light");
  if (settings.theme === "emerald") {
    document.body.classList.add("theme-emerald");
  } else if (settings.theme === "light") {
    document.body.classList.add("theme-light");
  }

  // Apply Logo Images/Text fallback
  const headerLogo = document.getElementById("logo-branding");
  const footerLogo = document.getElementById("footer-branding-logo");
  
  if (headerLogo) {
    headerLogo.innerHTML = settings.logoUrl ? 
      `<img src="${settings.logoUrl}" alt="Perfecto Logo" class="logo-img">` :
      `<i class="fa-solid fa-shirt"></i> Perfecto <span>Confecções</span>`;
  }
  if (footerLogo) {
    footerLogo.innerHTML = settings.logoUrl ? 
      `<img src="${settings.logoUrl}" alt="Perfecto Logo" class="footer-logo-img">` :
      `<i class="fa-solid fa-shirt"></i> Perfecto <span>Confecções</span>`;
  }

  // Set logo sizes in CSS variables
  document.documentElement.style.setProperty("--logo-height-header", `${settings.logoHeightHeader || 60}px`);
  document.documentElement.style.setProperty("--logo-height-footer", `${settings.logoHeightFooter || 100}px`);

  // Apply Favicon (tab icon)
  let favLink = document.querySelector("link[rel~='icon']");
  if (!favLink) {
    favLink = document.createElement("link");
    favLink.rel = "icon";
    document.getElementsByTagName("head")[0].appendChild(favLink);
  }
  favLink.href = settings.faviconUrl || "assets/images/camiseta_basica.png";
}

function saveState(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Format Currency
function formatCurrency(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Render Catalog Category Filter Buttons
function renderCategoryFilters() {
  const container = document.getElementById("categories-filter-container");
  if (!container) return;

  // Get unique categories from active products
  const categories = ["all", ...new Set(products.map(p => p.category))];
  
  container.innerHTML = "";
  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = `filter-btn ${currentCategory === cat ? 'active' : ''}`;
    btn.dataset.category = cat;
    btn.innerText = cat === "all" ? "Todos" : cat;
    
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = cat;
      renderCatalog();
    });
    
    container.appendChild(btn);
  });
}

// Render Catalog Grid
function renderCatalog() {
  const grid = document.getElementById("products-grid-container");
  if (!grid) return;

  grid.innerHTML = "";

  // Apply filters
  let filtered = products.filter(product => {
    // Category check
    const matchesCategory = currentCategory === "all" || product.category === currentCategory;
    
    // Size check
    const matchesSize = currentSize === "all" || product.sizes.includes(currentSize);
    
    // Search text check
    const matchesSearch = searchText === "" || 
      product.name.toLowerCase().includes(searchText.toLowerCase()) || 
      product.category.toLowerCase().includes(searchText.toLowerCase()) ||
      product.description.toLowerCase().includes(searchText.toLowerCase());
      
    return matchesCategory && matchesSize && matchesSearch;
  });

  // Apply Sorting
  if (currentSort === "price-asc") {
    filtered.sort((a, b) => {
      const priceA = currentViewMode === "wholesale" ? a.priceWholesale : a.priceRetail;
      const priceB = currentViewMode === "wholesale" ? b.priceWholesale : b.priceRetail;
      return priceA - priceB;
    });
  } else if (currentSort === "price-desc") {
    filtered.sort((a, b) => {
      const priceA = currentViewMode === "wholesale" ? a.priceWholesale : a.priceRetail;
      const priceB = currentViewMode === "wholesale" ? b.priceWholesale : b.priceRetail;
      return priceB - priceA;
    });
  } else if (currentSort === "newest") {
    // Put products flagged with isNew first
    filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-products">
        <i class="fa-solid fa-magnifying-glass"></i>
        <h3>Nenhum produto encontrado</h3>
        <p>Tente ajustar seus filtros ou termos de pesquisa.</p>
      </div>
    `;
    return;
  }

  filtered.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card glass-panel";
    
    const displayPrice = currentViewMode === "wholesale" ? product.priceWholesale : product.priceRetail;
    const oldPrice = currentViewMode === "retail" && product.isPromo ? product.priceRetail * 1.25 : null;

    const isEsgotado = (product.stock || 0) <= 0;

    card.innerHTML = `
      <div class="product-card-visual" style="${isEsgotado ? 'opacity: 0.8;' : ''}">
        <img src="${product.image}" alt="${product.name}" class="product-card-image" onerror="this.src='https://placehold.co/400x500/131b2e/f8fafc?text=Vestuario'">
        <div class="product-card-badges">
          ${isEsgotado ? '<span class="product-badge-discount" style="background: var(--accent-rose);">Esgotado</span>' : ''}
          ${product.isNew && !isEsgotado ? '<span class="product-badge-new">Novo</span>' : ''}
          ${oldPrice && !isEsgotado ? '<span class="product-badge-discount">Promoção</span>' : ''}
        </div>
        <div class="product-card-actions">
          <button class="product-action-btn flex-center quick-view-btn" data-id="${product.id}" title="Espiar Produto">
            <i class="fa-solid fa-eye"></i>
          </button>
          <button class="product-action-btn flex-center quick-add-btn" data-id="${product.id}" title="Adicionar ao Carrinho" ${isEsgotado ? 'disabled style="opacity: 0.4; cursor: not-allowed;"' : ''}>
            <i class="fa-solid fa-cart-plus"></i>
          </button>
        </div>
      </div>
      <div class="product-card-info">
        <span class="product-card-category">${product.category}</span>
        <h3 class="product-card-title">${product.name}</h3>
        <div class="product-card-prices">
          ${oldPrice ? `<span class="price-old">${formatCurrency(oldPrice)}</span>` : ''}
          <span class="price-main">${formatCurrency(displayPrice)}</span>
          <span class="price-wholesale-label">${currentViewMode === "wholesale" ? 'Atacado' : 'Varejo'}</span>
        </div>
        <div style="font-size: 0.75rem; margin-top: 6px; color: ${isEsgotado ? 'var(--accent-rose)' : 'var(--text-secondary)'}; font-weight: 500;">
          ${isEsgotado ? 'Esgotado' : `Estoque: ${product.stock} un.`}
        </div>
      </div>
    `;

    // Quick add click
    card.querySelector(".quick-add-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      if (isEsgotado) {
        alert("Desculpe, este produto está esgotado.");
        return;
      }
      // Default to first size and color
      addToCart(product.id, product.sizes[0], product.colorNames ? product.colorNames[0] : "Padrão", 1);
    });

    // Quick view click
    card.querySelector(".quick-view-btn").addEventListener("click", () => {
      openProductModal(product.id);
    });

    // Main card click (opens modal)
    card.addEventListener("click", (e) => {
      if (!e.target.closest(".product-card-actions")) {
        openProductModal(product.id);
      }
    });

    grid.appendChild(card);
  });
}

// Product Details Modal
function openProductModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const modalOverlay = document.getElementById("product-modal-overlay");
  const modalContainer = document.getElementById("product-modal-container");
  const modalContent = document.getElementById("product-modal-content");

  const displayPrice = currentViewMode === "wholesale" ? product.priceWholesale : product.priceRetail;
  const oldPrice = currentViewMode === "retail" && product.isPromo ? product.priceRetail * 1.25 : null;

  // Build sizes options
  let sizesHTML = "";
  product.sizes.forEach((size, idx) => {
    sizesHTML += `<button class="option-size-btn ${idx === 0 ? 'active' : ''}" data-size="${size}">${size}</button>`;
  });

  // Build colors options
  let colorsHTML = "";
  if (product.colors && product.colors.length > 0) {
    product.colors.forEach((color, idx) => {
      colorsHTML += `
        <button class="option-color-btn ${idx === 0 ? 'active' : ''}" 
                style="background-color: ${color};" 
                data-color-name="${product.colorNames[idx]}" 
                title="${product.colorNames[idx]}">
        </button>`;
    });
  } else {
    colorsHTML = `<span style="font-size: 0.85rem; color: var(--text-secondary);">Cor Única</span>`;
  }

  const isEsgotado = (product.stock || 0) <= 0;
  const stockColor = (product.stock || 0) > 10 ? 'var(--success)' : ((product.stock || 0) > 0 ? 'var(--accent-gold)' : 'var(--accent-rose)');
  const stockText = isEsgotado ? 'Produto Esgotado' : ((product.stock || 0) <= 10 ? `Apenas ${product.stock} unidades disponíveis!` : `Estoque: ${product.stock} unidades disponíveis`);

  modalContent.innerHTML = `
    <div class="product-detail-image-wrapper">
      <img src="${product.image}" alt="${product.name}" onerror="this.src='https://placehold.co/400x500/131b2e/f8fafc?text=Vestuario'">
    </div>
    <div class="product-detail-info">
      <span class="product-detail-category">${product.category}</span>
      <h2 class="product-detail-title">${product.name}</h2>
      
      <div class="product-detail-prices">
        ${oldPrice ? `<span class="price-old" style="font-size: 1.1rem;">${formatCurrency(oldPrice)}</span>` : ''}
        <span class="price-main">${formatCurrency(displayPrice)}</span>
        <span class="price-wholesale-label" style="font-size: 0.8rem; padding: 4px 8px;">${currentViewMode === "wholesale" ? 'Tabela Atacado' : 'Tabela Varejo'}</span>
      </div>
      
      <p class="product-detail-desc">${product.description}</p>
      
      <div class="product-option-group" style="margin-bottom: 15px; margin-top: -5px;">
        <div style="display: flex; align-items: center; gap: 8px; font-size: 0.85rem; font-weight: 500; color: ${stockColor};">
          <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background-color: ${stockColor};"></span>
          ${stockText}
        </div>
      </div>
      
      <div class="product-option-group">
        <h4 class="product-option-title">Selecione o Tamanho</h4>
        <div class="product-options-flex size-options-container">
          ${sizesHTML}
        </div>
      </div>
      
      <div class="product-option-group">
        <h4 class="product-option-title">Opções de Cores</h4>
        <div class="product-options-flex color-options-container">
          ${colorsHTML}
        </div>
      </div>
      
      <div class="detail-actions">
        <div class="quantity-selector" style="${isEsgotado ? 'opacity: 0.4; pointer-events: none;' : ''}">
          <button class="quantity-btn flex-center" id="modal-qty-minus"><i class="fa-solid fa-minus"></i></button>
          <span class="quantity-val" id="modal-qty-val">1</span>
          <button class="quantity-btn flex-center" id="modal-qty-plus"><i class="fa-solid fa-plus"></i></button>
        </div>
        <button class="btn-primary btn-add-cart" id="modal-add-to-cart-btn" ${isEsgotado ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''}>
          <i class="fa-solid fa-bag-shopping"></i> ${isEsgotado ? 'Esgotado' : 'Adicionar ao Carrinho'}
        </button>
      </div>
    </div>
  `;

  // Size selections
  modalContent.querySelectorAll(".option-size-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      modalContent.querySelectorAll(".option-size-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  // Color selections
  modalContent.querySelectorAll(".option-color-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      modalContent.querySelectorAll(".option-color-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  // Quantity controls
  let qty = 1;
  const qtyVal = modalContent.querySelector("#modal-qty-val");
  
  modalContent.querySelector("#modal-qty-minus").addEventListener("click", () => {
    if (qty > 1) {
      qty--;
      qtyVal.innerText = qty;
    }
  });

  modalContent.querySelector("#modal-qty-plus").addEventListener("click", () => {
    qty++;
    qtyVal.innerText = qty;
  });

  // Add to cart click
  modalContent.querySelector("#modal-add-to-cart-btn").addEventListener("click", () => {
    const selectedSizeBtn = modalContent.querySelector(".option-size-btn.active");
    const selectedSize = selectedSizeBtn ? selectedSizeBtn.dataset.size : product.sizes[0];
    
    const selectedColorBtn = modalContent.querySelector(".option-color-btn.active");
    const selectedColor = selectedColorBtn ? selectedColorBtn.dataset.colorName : (product.colorNames ? product.colorNames[0] : "Padrão");

    addToCart(product.id, selectedSize, selectedColor, qty);
    
    // Close modal
    modalOverlay.classList.remove("active");
    modalContainer.classList.remove("active");
  });

  // Open modal visual
  modalOverlay.classList.add("active");
  modalContainer.classList.add("active");
}

// Shopping Cart Core
function addToCart(productId, size, color, quantity) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  // Check if item already exists in cart with same size and color
  const existingIdx = cart.findIndex(item => item.id === productId && item.size === size && item.color === color);
  
  let newQuantity = quantity;
  if (existingIdx > -1) {
    newQuantity += cart[existingIdx].quantity;
  }

  // Validate against stock
  if (newQuantity > (product.stock || 0)) {
    alert(`Desculpe! Temos apenas ${product.stock} unidades de "${product.name}" em estoque.`);
    return;
  }

  if (existingIdx > -1) {
    cart[existingIdx].quantity = newQuantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      category: product.category,
      priceRetail: product.priceRetail,
      priceWholesale: product.priceWholesale,
      image: product.image,
      size: size,
      color: color,
      quantity: quantity
    });
  }

  saveState("perfecto_cart", cart);
  updateCartUI();
  
  // Slide open the cart drawer automatically to show addition
  document.getElementById("cart-drawer-panel").classList.add("active");
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveState("perfecto_cart", cart);
  updateCartUI();
}

function updateCartQty(index, delta) {
  const item = cart[index];
  const product = products.find(p => p.id === item.id);
  
  if (product && delta > 0) {
    if (item.quantity + delta > (product.stock || 0)) {
      alert(`Desculpe! Temos apenas ${product.stock} unidades de "${product.name}" em estoque.`);
      return;
    }
  }

  cart[index].quantity += delta;
  
  if (cart[index].quantity <= 0) {
    removeFromCart(index);
  } else {
    saveState("perfecto_cart", cart);
    updateCartUI();
  }
}

function updateCartUI() {
  const cartList = document.getElementById("cart-items-list");
  const cartCount = document.getElementById("cart-count");
  const subtotalDOM = document.getElementById("cart-subtotal");
  const discountRow = document.getElementById("cart-discount-row");
  const discountValDOM = document.getElementById("cart-discount-value");
  const totalDOM = document.getElementById("cart-total-value");
  const wholesaleBadge = document.getElementById("wholesale-badge-applied");

  if (!cartList) return;

  // Total quantity in cart
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.innerText = totalQty;

  cartList.innerHTML = "";

  if (cart.length === 0) {
    cartList.innerHTML = `
      <div class="cart-empty-state">
        <i class="fa-solid fa-bag-shopping"></i>
        <p>Seu carrinho está vazio.</p>
      </div>
    `;
    subtotalDOM.innerText = "R$ 0,00";
    discountRow.style.display = "none";
    totalDOM.innerText = "R$ 0,00";
    wholesaleBadge.style.display = "none";
    return;
  }

  // Check wholesale threshold
  const isWholesaleActive = totalQty >= settings.wholesaleMin;
  
  let subtotal = 0;
  
  cart.forEach((item, idx) => {
    // If wholesale is active, force use wholesale price, else use retail price
    const priceToUse = isWholesaleActive ? item.priceWholesale : item.priceRetail;
    const itemTotal = priceToUse * item.quantity;
    subtotal += itemTotal;

    const itemRow = document.createElement("div");
    itemRow.className = "cart-item";
    itemRow.innerHTML = `
      <div class="cart-item-image">
        <img src="${item.image}" alt="${item.name}" onerror="this.src='https://placehold.co/100x100/131b2e/f8fafc?text=Roupas'">
      </div>
      <div class="cart-item-details">
        <h4 class="cart-item-title">${item.name}</h4>
        <span class="cart-item-meta">Tam: ${item.size} | Cor: ${item.color}</span>
        <div class="cart-item-prices">
          <span class="cart-item-price">${formatCurrency(priceToUse)}</span>
          <div class="cart-item-qty">
            <button class="qty-dec flex-center" data-idx="${idx}"><i class="fa-solid fa-minus"></i></button>
            <span>${item.quantity}</span>
            <button class="qty-inc flex-center" data-idx="${idx}"><i class="fa-solid fa-plus"></i></button>
          </div>
        </div>
      </div>
      <button class="cart-item-remove flex-center" data-idx="${idx}"><i class="fa-solid fa-trash-can"></i></button>
    `;

    itemRow.querySelector(".qty-dec").addEventListener("click", () => updateCartQty(idx, -1));
    itemRow.querySelector(".qty-inc").addEventListener("click", () => updateCartQty(idx, 1));
    itemRow.querySelector(".cart-item-remove").addEventListener("click", () => removeFromCart(idx));

    cartList.appendChild(itemRow);
  });

  // Calculate discounts
  subtotalDOM.innerText = formatCurrency(subtotal);

  if (isWholesaleActive) {
    wholesaleBadge.style.display = "flex";
    
    // We already calculated using wholesale price, but let's show the breakdown if they bought at retail vs wholesale
    const retailEquivalent = cart.reduce((sum, item) => sum + (item.priceRetail * item.quantity), 0);
    const savings = retailEquivalent - subtotal;
    
    discountRow.style.display = "flex";
    discountValDOM.innerText = `-${formatCurrency(savings)}`;
    
    // Subtotal will show retail equivalent, discount shows savings, total shows wholesale total
    subtotalDOM.innerText = formatCurrency(retailEquivalent);
    totalDOM.innerText = formatCurrency(subtotal);
  } else {
    wholesaleBadge.style.display = "none";
    discountRow.style.display = "none";
    totalDOM.innerText = formatCurrency(subtotal);
  }
}

// Checkout Flow
function initCheckoutUI() {
  const checkoutSection = document.getElementById("checkout-section");
  const mainContent = document.getElementById("main-content");
  const cartDrawer = document.getElementById("cart-drawer-panel");

  // Show checkout
  document.getElementById("go-to-checkout-btn").addEventListener("click", () => {
    if (cart.length === 0) return;
    
    cartDrawer.classList.remove("active");
    mainContent.style.display = "none";
    checkoutSection.style.display = "block";
    window.scrollTo(0, 0);
    
    renderCheckoutSummary();
  });

  // Back to Catalog
  document.getElementById("back-to-catalog").addEventListener("click", (e) => {
    e.preventDefault();
    checkoutSection.style.display = "none";
    mainContent.style.display = "block";
    window.scrollTo(0, 0);
  });

  // Payment Method Tabs Selection
  const methodCards = document.querySelectorAll(".payment-method-card");
  methodCards.forEach(card => {
    card.addEventListener("click", () => {
      methodCards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      
      const method = card.dataset.method;
      
      // Hide all panels
      document.querySelectorAll(".payment-details-panel").forEach(p => p.classList.remove("active"));
      
      // Show correct panel
      const panel = document.getElementById(`panel-${method}`);
      if (panel) panel.classList.add("active");
      
      // If card selected, focus credit card number input
      if (method === "card") {
        document.getElementById("card-number-input").focus();
      }
    });
  });

  // Credit Card interactive visual styling bindings
  const cardNumberInput = document.getElementById("card-number-input");
  const cardHolderInput = document.getElementById("card-holder-input");
  const cardExpiryInput = document.getElementById("card-expiry-input");
  const cardCvvInput = document.getElementById("card-cvv-input");
  const creditCardMock = document.getElementById("credit-card-mock");

  // Live Card number formatting
  cardNumberInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.match(/.{1,4}/g)?.join(" ") || "";
    e.target.value = value;
    document.getElementById("mock-card-number").innerText = value || "•••• •••• •••• ••••";
  });

  // Live Holder name
  cardHolderInput.addEventListener("input", (e) => {
    document.getElementById("mock-card-holder").innerText = e.target.value.toUpperCase() || "NOME COMPLETO";
  });

  // Live Expiry
  cardExpiryInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 2) {
      value = value.substring(0, 2) + "/" + value.substring(2, 4);
    }
    e.target.value = value;
    document.getElementById("mock-card-expiry").innerText = value || "MM/AA";
  });

  // Flip Card on CVV focus
  cardCvvInput.addEventListener("focus", () => {
    creditCardMock.classList.add("flipped");
  });

  cardCvvInput.addEventListener("blur", () => {
    creditCardMock.classList.remove("flipped");
  });

  cardCvvInput.addEventListener("input", (e) => {
    document.getElementById("mock-card-cvv").innerText = e.target.value || "•••";
  });

  // Copy Buttons (PIX / Boleto)
  document.getElementById("copy-pix-btn").addEventListener("click", () => {
    const text = document.getElementById("pix-code-text");
    text.select();
    navigator.clipboard.writeText(text.value);
    alert("Código Pix copia e cola copiado com sucesso!");
  });

  document.getElementById("copy-boleto-btn").addEventListener("click", () => {
    const text = document.getElementById("boleto-barcode-text");
    text.select();
    navigator.clipboard.writeText(text.value);
    alert("Código de barras do boleto copiado!");
  });

  document.getElementById("download-boleto-btn").addEventListener("click", () => {
    alert("Simulando download do boleto bancário PDF... Pronto!");
  });

  // Handle Form Submission
  document.getElementById("checkout-form").addEventListener("submit", handleCheckoutSubmit);
}

function renderCheckoutSummary() {
  const summaryContainer = document.getElementById("checkout-summary-items-list");
  const subtotalDOM = document.getElementById("checkout-subtotal");
  const discountRow = document.getElementById("checkout-discount-row");
  const discountValDOM = document.getElementById("checkout-discount-value");
  const totalDOM = document.getElementById("checkout-total-value");
  const discountPercentDOM = document.getElementById("checkout-discount-percent");

  if (!summaryContainer) return;

  summaryContainer.innerHTML = "";

  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  const isWholesaleActive = totalQty >= settings.wholesaleMin;
  
  let subtotal = 0;

  cart.forEach(item => {
    const priceToUse = isWholesaleActive ? item.priceWholesale : item.priceRetail;
    const itemTotal = priceToUse * item.quantity;
    subtotal += itemTotal;

    const row = document.createElement("div");
    row.className = "checkout-summary-item";
    row.innerHTML = `
      <div class="checkout-summary-item-info">
        <span class="checkout-summary-item-name">${item.name} (${item.size}/${item.color})</span>
        <span class="checkout-summary-item-qty">Qtd: ${item.quantity} x ${formatCurrency(priceToUse)}</span>
      </div>
      <span class="checkout-summary-item-price">${formatCurrency(itemTotal)}</span>
    `;
    summaryContainer.appendChild(row);
  });

  discountPercentDOM.innerText = `${settings.wholesaleDiscount}%`;

  if (isWholesaleActive) {
    const retailEquivalent = cart.reduce((sum, item) => sum + (item.priceRetail * item.quantity), 0);
    const savings = retailEquivalent - subtotal;
    
    subtotalDOM.innerText = formatCurrency(retailEquivalent);
    discountRow.style.display = "flex";
    discountValDOM.innerText = `-${formatCurrency(savings)}`;
    totalDOM.innerText = formatCurrency(subtotal);
  } else {
    subtotalDOM.innerText = formatCurrency(subtotal);
    discountRow.style.display = "none";
    totalDOM.innerText = formatCurrency(subtotal);
  }
}

function handleCheckoutSubmit(e) {
  e.preventDefault();

  const activeMethodCard = document.querySelector(".payment-method-card.active");
  const method = activeMethodCard ? activeMethodCard.dataset.method : "whatsapp";

  const clientName = document.getElementById("client-name").value;
  const clientPhone = document.getElementById("client-phone").value;
  const clientEmail = document.getElementById("client-email").value;
  const clientType = document.getElementById("client-type").value;
  const clientCep = document.getElementById("client-cep").value;
  const clientAddress = document.getElementById("client-address").value;
  const clientNumber = document.getElementById("client-number").value;
  const clientCityState = document.getElementById("client-city-state").value;

  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  const isWholesaleActive = totalQty >= settings.wholesaleMin;
  const subtotal = cart.reduce((sum, item) => sum + ((isWholesaleActive ? item.priceWholesale : item.priceRetail) * item.quantity), 0);

  const orderId = "PED-" + Math.floor(100000 + Math.random() * 900000);
  
  // Payment status
  let status = "Pendente";
  if (method === "card") {
    status = "Pago (Aprovado)";
  }

  // Create new order object
  const newOrder = {
    id: orderId,
    date: new Date().toLocaleDateString("pt-BR") + " às " + new Date().toLocaleTimeString("pt-BR", {hour: '2-digit', minute:'2-digit'}),
    clientName,
    clientPhone,
    clientEmail,
    clientType,
    clientAddress: `${clientAddress}, nº ${clientNumber} - ${clientCityState} (CEP: ${clientCep})`,
    paymentMethod: method.toUpperCase(),
    paymentStatus: status,
    items: [...cart],
    total: subtotal
  };

  // Subtract stock from catalog and update reserved / sold counters
  cart.forEach(item => {
    const prod = products.find(p => p.id === item.id);
    if (prod) {
      prod.stock = Math.max(0, (prod.stock || 0) - item.quantity);
      if (status === "Pago (Aprovado)") {
        prod.sold = (prod.sold || 0) + item.quantity;
      } else {
        prod.reserved = (prod.reserved || 0) + item.quantity;
      }
    }
  });
  saveState("perfecto_products", products);
  renderCatalog();
  renderAdminProducts();

  // Add order to local list
  orders.unshift(newOrder);
  saveState("perfecto_orders", orders);
  
  // Trigger specific flows
  if (method === "whatsapp") {
    sendWhatsAppMessage(newOrder);
  } else {
    alert(`Pedido ${orderId} efetuado com sucesso via ${method.toUpperCase()}! Você pode acompanhar este pedido no Painel do Administrador.`);
  }

  // Clear cart
  cart = [];
  saveState("perfecto_cart", cart);
  updateCartUI();

  // Reset UI and form
  document.getElementById("checkout-form").reset();
  
  // Hide checkout, show catalog
  document.getElementById("checkout-section").style.display = "none";
  document.getElementById("main-content").style.display = "block";
  window.scrollTo(0, 0);
  
  // Update orders badges in admin panel
  updateAdminOrdersBadge();
}

function sendWhatsAppMessage(order) {
  let message = `*Olá, Perfecto Confecções!*\n`;
  message += `Gostaria de finalizar meu pedido realizado no site.\n\n`;
  message += `*ID do Pedido:* ${order.id}\n`;
  message += `*Cliente:* ${order.clientName}\n`;
  message += `*Contato:* ${order.clientPhone}\n`;
  message += `*Tipo:* ${order.clientType.toUpperCase()}\n`;
  message += `*Endereço:* ${order.clientAddress}\n\n`;
  message += `*--- ITENS DO PEDIDO ---*\n`;

  order.items.forEach(item => {
    const isWholesaleActive = order.items.reduce((sum, i) => sum + i.quantity, 0) >= settings.wholesaleMin;
    const price = isWholesaleActive ? item.priceWholesale : item.priceRetail;
    message += `• ${item.name} (${item.size}/${item.color}) - Qtd: ${item.quantity} x ${formatCurrency(price)}\n`;
  });

  message += `\n*Total:* ${formatCurrency(order.total)}\n`;
  message += `*Forma de Pagamento:* WHATSAPP (A Combinar)\n\n`;
  message += `Aguardando a confirmação do frete para realizar o pagamento. Obrigado!`;

  const encoded = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${settings.whatsapp}?text=${encoded}`;
  
  // Open in new window
  window.open(whatsappUrl, "_blank");
}

function updateAdminOrdersBadge() {
  const badge = document.getElementById("admin-orders-badge");
  if (badge) {
    badge.innerText = orders.length;
  }
}

// Admin Panel Dashboard Logics
function initAdminUI() {
  const adminSection = document.getElementById("admin-section");
  const adminLoginSection = document.getElementById("admin-login-section");
  const mainContent = document.getElementById("main-content");
  const checkoutSection = document.getElementById("checkout-section");

  const isLoggedIn = () => sessionStorage.getItem("perfecto_admin_logged") === "true";

  const openAdminView = () => {
    mainContent.style.display = "none";
    checkoutSection.style.display = "none";
    
    if (isLoggedIn()) {
      adminSection.style.display = "block";
      adminLoginSection.style.display = "none";
      renderAdminProducts();
      renderAdminOrders();
      loadAdminSettings();
      updateAdminOrdersBadge();
    } else {
      adminSection.style.display = "none";
      adminLoginSection.style.display = "block";
      document.getElementById("login-error-msg").style.display = "none";
      document.getElementById("admin-login-form").reset();
    }
    window.scrollTo(0, 0);
  };

  // Show Admin Panel
  const triggerBtn = document.getElementById("admin-panel-trigger");
  if (triggerBtn) {
    triggerBtn.addEventListener("click", openAdminView);
  }

  // Footer admin trigger
  const footerTrigger = document.getElementById("footer-admin-trigger");
  if (footerTrigger) {
    footerTrigger.addEventListener("click", (e) => {
      e.preventDefault();
      openAdminView();
    });
  }

  // Back to catalog from login
  document.getElementById("back-to-catalog-from-login").addEventListener("click", (e) => {
    e.preventDefault();
    adminLoginSection.style.display = "none";
    mainContent.style.display = "block";
  });

  // Toggle login password visibility
  const passInput = document.getElementById("login-password");
  const togglePassBtn = document.getElementById("toggle-login-password");
  togglePassBtn.addEventListener("click", () => {
    const isPass = passInput.type === "password";
    passInput.type = isPass ? "text" : "password";
    togglePassBtn.innerHTML = isPass ? '<i class="fa-regular fa-eye-slash"></i>' : '<i class="fa-regular fa-eye"></i>';
  });

  // Handle Admin Login submission
  document.getElementById("admin-login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const user = document.getElementById("login-username").value;
    const pass = document.getElementById("login-password").value;

    if (user === settings.adminUser && pass === settings.adminPass) {
      sessionStorage.setItem("perfecto_admin_logged", "true");
      openAdminView();
    } else {
      const errorMsg = document.getElementById("login-error-msg");
      errorMsg.style.display = "block";
      // Shake animation
      const card = e.target.closest(".checkout-card");
      card.style.animation = "none";
      setTimeout(() => {
        card.style.animation = "shake 0.5s ease";
      }, 10);
    }
  });

  // Exit Admin (Go to Site)
  document.getElementById("exit-admin-btn").addEventListener("click", () => {
    adminSection.style.display = "none";
    mainContent.style.display = "block";
    window.scrollTo(0, 0);
    
    // Refresh products catalog in case changes were made
    renderCatalog();
    renderCategoryFilters();
  });

  // Logout Admin
  document.getElementById("logout-admin-btn").addEventListener("click", () => {
    if (confirm("Deseja realmente sair da sua conta administrativa?")) {
      sessionStorage.removeItem("perfecto_admin_logged");
      adminSection.style.display = "none";
      adminLoginSection.style.display = "none";
      mainContent.style.display = "block";
      window.scrollTo(0, 0);
    }
  });

  // Admin tabs sidebar switches
  const tabs = document.querySelectorAll(".admin-menu-item");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      
      const targetTab = tab.dataset.tab;
      document.querySelectorAll(".admin-content-section").forEach(sec => sec.classList.remove("active"));
      document.getElementById(`tab-${targetTab}`).classList.add("active");
    });
  });

  // Logo & Favicon local file reader uploads
  document.getElementById("settings-logo-file").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      document.getElementById("settings-logo-url").value = event.target.result;
    };
    reader.readAsDataURL(file);
  });
  
  document.getElementById("settings-favicon-file").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      document.getElementById("settings-favicon-url").value = event.target.result;
    };
    reader.readAsDataURL(file);
  });
  
  // Custom Product Image direct file reader & URL inputs
  const productBase64 = document.getElementById("edit-product-image-base64");
  const productUrlInput = document.getElementById("edit-product-image-url");
  const productPreview = document.getElementById("edit-product-image-preview");

  document.getElementById("edit-product-image-file").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      productBase64.value = event.target.result;
      productUrlInput.value = ""; // Clear URL if uploading a file
      productPreview.src = event.target.result;
      productPreview.style.display = "block";
    };
    reader.readAsDataURL(file);
  });

  productUrlInput.addEventListener("input", (e) => {
    const val = e.target.value;
    if (val) {
      productBase64.value = ""; // Clear file base64 if typing a URL
      document.getElementById("edit-product-image-file").value = "";
      productPreview.src = val;
      productPreview.style.display = "block";
    } else {
      productPreview.style.display = "none";
      productPreview.src = "";
    }
  });

  // Settings form submit
  document.getElementById("admin-settings-form").addEventListener("submit", (e) => {
    e.preventDefault();
    settings.whatsapp = document.getElementById("settings-whatsapp").value;
    settings.wholesaleMin = parseInt(document.getElementById("settings-wholesale-min").value);
    settings.wholesaleDiscount = parseInt(document.getElementById("settings-wholesale-discount").value);
    settings.pixKey = document.getElementById("settings-pix-key").value;
    settings.address = document.getElementById("settings-address").value;
    settings.instagram = document.getElementById("settings-instagram").value;
    settings.email = document.getElementById("settings-email").value;
    
    // Save appearance preferences & credentials
    settings.theme = document.getElementById("settings-theme").value;
    settings.logoUrl = document.getElementById("settings-logo-url").value;
    settings.faviconUrl = document.getElementById("settings-favicon-url").value;
    settings.logoHeightHeader = parseInt(document.getElementById("settings-logo-height-header").value) || 60;
    settings.logoHeightFooter = parseInt(document.getElementById("settings-logo-height-footer").value) || 100;
    
    settings.headerHeight = parseInt(document.getElementById("settings-header-height").value) || 80;
    settings.headerHeightScrolled = parseInt(document.getElementById("settings-header-height-scrolled").value) || 60;
    settings.headerOpacity = parseInt(document.getElementById("settings-header-opacity").value);
    if (isNaN(settings.headerOpacity)) settings.headerOpacity = 85;
    settings.headerOpacityScrolled = parseInt(document.getElementById("settings-header-opacity-scrolled").value);
    if (isNaN(settings.headerOpacityScrolled)) settings.headerOpacityScrolled = 95;
    
    // Save text properties
    settings.storeTitle = document.getElementById("settings-store-title").value;
    settings.storeDescription = document.getElementById("settings-store-meta-desc").value;
    settings.footerAboutText = document.getElementById("settings-footer-about").value;
    settings.copyrightText = document.getElementById("settings-copyright-text").value;

    settings.adminUser = document.getElementById("settings-admin-user").value;
    settings.adminPass = document.getElementById("settings-admin-pass").value;

    saveState("perfecto_settings", settings);
    updateBrandingDOM();
    updateCartUI();
    alert("Configurações da loja e preferências salvas com sucesso!");
  });

  // Clear orders
  document.getElementById("btn-clear-orders").addEventListener("click", () => {
    if (confirm("Tem certeza que deseja apagar todo o histórico de pedidos fictícios do sistema?")) {
      orders = [];
      saveState("perfecto_orders", orders);
      renderAdminOrders();
      updateAdminOrdersBadge();
    }
  });

  // Add Product Form
  const modalOverlay = document.getElementById("admin-modal-overlay");
  const editModal = document.getElementById("admin-product-edit-modal");
  
  document.getElementById("btn-add-product-modal").addEventListener("click", () => {
    document.getElementById("admin-product-form").reset();
    document.getElementById("edit-product-id").value = "";
    document.getElementById("edit-product-image-base64").value = "";
    document.getElementById("edit-product-image-url").value = "";
    document.getElementById("edit-product-image-preview").src = "";
    document.getElementById("edit-product-image-preview").style.display = "none";
    document.getElementById("admin-modal-title").innerText = "Adicionar Novo Produto";
    
    modalOverlay.classList.add("active");
    editModal.classList.add("active");
  });

  document.getElementById("close-admin-product-modal").addEventListener("click", () => {
    modalOverlay.classList.remove("active");
    editModal.classList.remove("active");
  });

  document.getElementById("cancel-product-edit").addEventListener("click", () => {
    modalOverlay.classList.remove("active");
    editModal.classList.remove("active");
  });

  document.getElementById("admin-product-form").addEventListener("submit", handleProductFormSubmit);
}

function loadAdminSettings() {
  document.getElementById("settings-whatsapp").value = settings.whatsapp;
  document.getElementById("settings-wholesale-min").value = settings.wholesaleMin;
  document.getElementById("settings-wholesale-discount").value = settings.wholesaleDiscount;
  document.getElementById("settings-pix-key").value = settings.pixKey;
  document.getElementById("settings-address").value = settings.address;
  document.getElementById("settings-instagram").value = settings.instagram || "";
  document.getElementById("settings-email").value = settings.email;

  // Populate Customizations and Credentials
  document.getElementById("settings-theme").value = settings.theme || "midnight";
  document.getElementById("settings-logo-url").value = settings.logoUrl || "";
  document.getElementById("settings-favicon-url").value = settings.faviconUrl || "";
  document.getElementById("settings-logo-height-header").value = settings.logoHeightHeader || 60;
  document.getElementById("settings-logo-height-footer").value = settings.logoHeightFooter || 100;
  
  document.getElementById("settings-header-height").value = settings.headerHeight || 80;
  document.getElementById("settings-header-height-scrolled").value = settings.headerHeightScrolled || 60;
  document.getElementById("settings-header-opacity").value = settings.headerOpacity !== undefined ? settings.headerOpacity : 85;
  document.getElementById("settings-header-opacity-scrolled").value = settings.headerOpacityScrolled !== undefined ? settings.headerOpacityScrolled : 95;
  
  // Populate site texts
  document.getElementById("settings-store-title").value = settings.storeTitle || "";
  document.getElementById("settings-store-meta-desc").value = settings.storeDescription || "";
  document.getElementById("settings-footer-about").value = settings.footerAboutText || "";
  document.getElementById("settings-copyright-text").value = settings.copyrightText || "";

  document.getElementById("settings-admin-user").value = settings.adminUser || "admin";
  document.getElementById("settings-admin-pass").value = settings.adminPass || "perfecto";
}

function renderAdminProducts() {
  const container = document.getElementById("admin-products-container");
  if (!container) return;

  container.innerHTML = "";

  if (products.length === 0) {
    container.innerHTML = `<p style="padding: 20px; text-align: center; color: var(--text-secondary);">Nenhum produto cadastrado no catálogo.</p>`;
    return;
  }

  products.forEach(p => {
    const row = document.createElement("div");
    row.className = "admin-product-row";
    row.innerHTML = `
      <img src="${p.image}" alt="${p.name}" onerror="this.src='https://placehold.co/100x100/131b2e/f8fafc?text=Vestuario'">
      <div class="admin-product-info">
        <h4>${p.name}</h4>
        <span>${p.category} | Tam: ${p.sizes.join(", ")}</span>
      </div>
      <div class="admin-product-price retail">
        <span style="font-size: 0.75rem; color: var(--text-muted); display: block;">Varejo</span>
        ${formatCurrency(p.priceRetail)}
      </div>
      <div class="admin-product-price wholesale">
        <span style="font-size: 0.75rem; color: var(--text-muted); display: block;">Atacado</span>
        ${formatCurrency(p.priceWholesale)}
      </div>
      <div class="admin-product-stock-details" style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4; text-align: left; min-width: 110px;">
        <div>Estoque: <strong style="color: var(--success);">${p.stock}</strong></div>
        <div>Reservado: <strong style="color: var(--accent-gold);">${p.reserved || 0}</strong></div>
        <div>Vendido: <strong style="color: var(--text-primary);">${p.sold || 0}</strong></div>
      </div>
      <div class="admin-product-actions">
        <button class="admin-btn-icon edit" data-id="${p.id}" title="Editar"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="admin-btn-icon delete" data-id="${p.id}" title="Excluir"><i class="fa-solid fa-trash-can"></i></button>
      </div>
    `;

    row.querySelector(".edit").addEventListener("click", () => openEditProductModal(p.id));
    row.querySelector(".delete").addEventListener("click", () => deleteProduct(p.id));

    container.appendChild(row);
  });
}

function openEditProductModal(productId) {
  const p = products.find(prod => prod.id === productId);
  if (!p) return;

  document.getElementById("edit-product-id").value = p.id;
  document.getElementById("edit-product-name").value = p.name;
  document.getElementById("edit-product-price-retail").value = p.priceRetail;
  document.getElementById("edit-product-price-wholesale").value = p.priceWholesale;
  document.getElementById("edit-product-category").value = p.category;
  document.getElementById("edit-product-stock").value = p.stock || 0;
  document.getElementById("edit-product-desc").value = p.description;

  const isCustomImg = p.image.startsWith("data:image/");
  const base64Input = document.getElementById("edit-product-image-base64");
  const urlInput = document.getElementById("edit-product-image-url");
  const previewImg = document.getElementById("edit-product-image-preview");
  
  if (isCustomImg) {
    base64Input.value = p.image;
    urlInput.value = "";
  } else {
    base64Input.value = "";
    urlInput.value = p.image;
  }
  
  if (p.image) {
    previewImg.src = p.image;
    previewImg.style.display = "block";
  } else {
    previewImg.style.display = "none";
  }

  // Populate sizes comma-separated string
  document.getElementById("edit-product-sizes-text").value = p.sizes ? p.sizes.join(", ") : "";

  document.getElementById("admin-modal-title").innerText = "Editar Produto";
  
  document.getElementById("admin-modal-overlay").classList.add("active");
  document.getElementById("admin-product-edit-modal").classList.add("active");
}

function deleteProduct(productId) {
  if (confirm("Tem certeza que deseja remover este produto permanentemente do catálogo?")) {
    products = products.filter(p => p.id !== productId);
    saveState("perfecto_products", products);
    renderAdminProducts();
    alert("Produto excluído com sucesso!");
  }
}

function handleProductFormSubmit(e) {
  e.preventDefault();

  const id = document.getElementById("edit-product-id").value;
  const name = document.getElementById("edit-product-name").value;
  const priceRetail = parseFloat(document.getElementById("edit-product-price-retail").value);
  const priceWholesale = parseFloat(document.getElementById("edit-product-price-wholesale").value);
  const category = document.getElementById("edit-product-category").value;
  const stock = parseInt(document.getElementById("edit-product-stock").value) || 0;
  
  let image = "";
  const base64Val = document.getElementById("edit-product-image-base64").value;
  const urlVal = document.getElementById("edit-product-image-url").value;
  
  if (base64Val) {
    image = base64Val;
  } else if (urlVal) {
    image = urlVal;
  } else {
    alert("Por favor, selecione um arquivo de foto do produto ou insira uma URL.");
    return;
  }

  const description = document.getElementById("edit-product-desc").value;

  // Parse comma-separated sizes from text field
  const sizesInputVal = document.getElementById("edit-product-sizes-text").value;
  const sizes = sizesInputVal.split(",").map(s => s.trim()).filter(s => s !== "");

  if (sizes.length === 0) {
    alert("Por favor, insira pelo menos um tamanho para o produto.");
    return;
  }

  if (id) {
    // EDIT
    const idx = products.findIndex(p => p.id === id);
    if (idx > -1) {
      products[idx] = {
        ...products[idx],
        name,
        priceRetail,
        priceWholesale,
        category,
        image,
        description,
        sizes,
        stock
      };
      alert("Produto atualizado com sucesso!");
    }
  } else {
    // CREATE
    const newId = "p" + Date.now();
    const colors = ["#2d3748", "#1a365d"]; // default
    const colorNames = ["Preto", "Marinho"];
    
    products.push({
      id: newId,
      name,
      priceRetail,
      priceWholesale,
      category,
      image,
      description,
      sizes,
      colors,
      colorNames,
      isNew: true,
      isPromo: false,
      stock,
      reserved: 0,
      sold: 0
    });
    alert("Produto adicionado com sucesso!");
  }

  saveState("perfecto_products", products);
  renderAdminProducts();

  // Close Modal
  document.getElementById("admin-modal-overlay").classList.remove("active");
  document.getElementById("admin-product-edit-modal").classList.remove("active");
}

function renderAdminOrders() {
  const container = document.getElementById("admin-orders-container");
  if (!container) return;

  container.innerHTML = "";

  if (orders.length === 0) {
    container.innerHTML = `<p style="padding: 20px; text-align: center; color: var(--text-secondary);">Nenhum pedido efetuado até o momento.</p>`;
    return;
  }

  orders.forEach(order => {
    const card = document.createElement("div");
    card.className = "admin-order-card";
    
    let itemsHTML = "";
    order.items.forEach(item => {
      const isWholesaleActive = order.items.reduce((sum, i) => sum + i.quantity, 0) >= settings.wholesaleMin;
      const price = isWholesaleActive ? item.priceWholesale : item.priceRetail;
      itemsHTML += `<div>• ${item.name} (${item.size}/${item.color}) - <strong>${item.quantity}x</strong> (${formatCurrency(price)})</div>`;
    });

    const isPaid = order.paymentStatus.toLowerCase().includes("pago");
    const isCancelado = order.paymentStatus.toLowerCase().includes("cancelado");
    const isPendente = !isPaid && !isCancelado;
    
    let badgeColor = "var(--accent-gold)";
    let badgeBg = "rgba(245, 158, 11, 0.15)";
    if (isPaid) {
      badgeColor = "var(--success)";
      badgeBg = "rgba(16, 185, 129, 0.15)";
    } else if (isCancelado) {
      badgeColor = "var(--accent-rose)";
      badgeBg = "rgba(239, 68, 68, 0.15)";
    }

    let actionsHTML = "";
    if (isPendente) {
      actionsHTML = `
        <div class="admin-order-actions-bar" style="margin-top: 15px; padding-top: 15px; border-top: 1px solid var(--glass-border); display: flex; gap: 10px; justify-content: flex-end;">
          <button class="btn-primary approve-order-btn" data-id="${order.id}" style="padding: 6px 12px; font-size: 0.75rem; height: auto; background: var(--success); border-color: var(--success);"><i class="fa-solid fa-check"></i> Confirmar Pagamento</button>
          <button class="btn-secondary cancel-order-btn" data-id="${order.id}" style="padding: 6px 12px; font-size: 0.75rem; height: auto; border-color: var(--accent-rose); color: var(--accent-rose);"><i class="fa-solid fa-xmark"></i> Cancelar</button>
        </div>
      `;
    } else if (isCancelado) {
      actionsHTML = `
        <div class="admin-order-actions-bar" style="margin-top: 15px; padding-top: 15px; border-top: 1px solid var(--glass-border); display: flex; gap: 10px; justify-content: flex-end;">
          <span style="font-size: 0.75rem; color: var(--accent-rose); font-weight: 500;"><i class="fa-solid fa-ban"></i> Cancelado (Itens devolvidos ao estoque)</span>
        </div>
      `;
    } else {
      actionsHTML = `
        <div class="admin-order-actions-bar" style="margin-top: 15px; padding-top: 15px; border-top: 1px solid var(--glass-border); display: flex; gap: 10px; justify-content: flex-end;">
          <span style="font-size: 0.75rem; color: var(--success); font-weight: 500;"><i class="fa-solid fa-circle-check"></i> Pagamento Aprovado (Pedido Finalizado)</span>
        </div>
      `;
    }

    card.innerHTML = `
      <div class="admin-order-header">
        <div>
          <span class="admin-order-id">${order.id}</span>
          <span class="admin-order-date">${order.date}</span>
        </div>
        <span class="order-badge-status" style="background: ${badgeBg}; color: ${badgeColor}; padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 600;">${order.paymentStatus}</span>
      </div>
      <div class="admin-order-details">
        <div class="admin-order-client-info">
          <p><strong>Cliente:</strong> ${order.clientName}</p>
          <p><strong>Tel:</strong> ${order.clientPhone}</p>
          <p><strong>E-mail:</strong> ${order.clientEmail || 'Não informado'}</p>
          <p><strong>Tipo:</strong> ${order.clientType.toUpperCase()}</p>
          <p><strong>Envio:</strong> ${order.clientAddress}</p>
          <div class="admin-order-items">
            <strong>Produtos:</strong>
            ${itemsHTML}
          </div>
        </div>
        <div class="admin-order-total">
          <p style="font-size: 0.8rem; color: var(--text-secondary);">Método: ${order.paymentMethod}</p>
          <div class="admin-order-total-price">${formatCurrency(order.total)}</div>
        </div>
      </div>
      ${actionsHTML}
    `;

    if (isPendente) {
      card.querySelector(".approve-order-btn").addEventListener("click", () => {
        approveOrder(order.id);
      });
      card.querySelector(".cancel-order-btn").addEventListener("click", () => {
        cancelOrder(order.id);
      });
    }

    container.appendChild(card);
  });
}

function approveOrder(orderId) {
  const order = orders.find(o => o.id === orderId);
  if (!order) return;
  
  if (confirm(`Confirmar o pagamento do pedido ${orderId}?`)) {
    order.paymentStatus = "Pago (Aprovado)";
    
    // Convert reserved items to sold items
    order.items.forEach(item => {
      const prod = products.find(p => p.id === item.id);
      if (prod) {
        prod.reserved = Math.max(0, (prod.reserved || 0) - item.quantity);
        prod.sold = (prod.sold || 0) + item.quantity;
      }
    });
    
    saveState("perfecto_orders", orders);
    saveState("perfecto_products", products);
    renderCatalog();
    renderAdminProducts();
    renderAdminOrders();
    alert(`Pagamento do pedido ${orderId} confirmado com sucesso!`);
  }
}

function cancelOrder(orderId) {
  const order = orders.find(o => o.id === orderId);
  if (!order) return;
  
  if (confirm(`Tem certeza que deseja CANCELAR o pedido ${orderId}? Os produtos retornarão para o estoque disponível.`)) {
    order.paymentStatus = "Cancelado";
    
    // Return items to available stock
    order.items.forEach(item => {
      const prod = products.find(p => p.id === item.id);
      if (prod) {
        prod.stock = (prod.stock || 0) + item.quantity;
        prod.reserved = Math.max(0, (prod.reserved || 0) - item.quantity);
      }
    });
    
    saveState("perfecto_orders", orders);
    saveState("perfecto_products", products);
    renderCatalog();
    renderAdminProducts();
    renderAdminOrders();
    alert(`Pedido ${orderId} cancelado. Produtos devolvidos ao estoque.`);
  }
}

// Global UI Layout Binding (navbar, search, cart toggle)
function initLayoutUI() {
  const header = document.getElementById("header");
  const cartDrawer = document.getElementById("cart-drawer-panel");
  const modalOverlay = document.getElementById("product-modal-overlay");
  const productModal = document.getElementById("product-modal-container");

  // Header Scroll Effect & Hide on Scroll Down
  let lastScrollY = window.scrollY;
  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    
    // Add/remove scrolled shrink styling
    if (currentScrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
    
    // Auto hide on scroll down (if passed header area), show on scroll up
    if (currentScrollY > lastScrollY && currentScrollY > 150) {
      header.classList.add("header-hidden");
    } else {
      header.classList.remove("header-hidden");
    }
    
    lastScrollY = currentScrollY;
  });

  // Cart Drawer open/close
  document.getElementById("cart-toggle").addEventListener("click", () => {
    cartDrawer.classList.add("active");
  });

  document.getElementById("close-cart-btn").addEventListener("click", () => {
    cartDrawer.classList.remove("active");
  });

  // Close modals clicking on overlay
  modalOverlay.addEventListener("click", () => {
    modalOverlay.classList.remove("active");
    productModal.classList.remove("active");
  });

  document.getElementById("close-product-modal").addEventListener("click", () => {
    modalOverlay.classList.remove("active");
    productModal.classList.remove("active");
  });

  // Category Retail / Wholesale filter button in dynamic banner
  const btnRetail = document.getElementById("btn-view-retail");
  const btnWholesale = document.getElementById("btn-view-wholesale");

  btnRetail.addEventListener("click", () => {
    btnWholesale.classList.remove("active");
    btnRetail.classList.add("active");
    currentViewMode = "retail";
    renderCatalog();
  });

  btnWholesale.addEventListener("click", () => {
    btnRetail.classList.remove("active");
    btnWholesale.classList.add("active");
    currentViewMode = "wholesale";
    renderCatalog();
  });

  // Size Filter Select
  document.getElementById("filter-size").addEventListener("change", (e) => {
    currentSize = e.target.value;
    renderCatalog();
  });

  // Sort Filter Select
  document.getElementById("filter-sort").addEventListener("change", (e) => {
    currentSort = e.target.value;
    renderCatalog();
  });

  // Search input binding
  document.getElementById("search-input").addEventListener("input", (e) => {
    searchText = e.target.value;
    renderCatalog();
  });

  // Mobile menu stub
  document.getElementById("mobile-menu-toggle").addEventListener("click", () => {
    alert("Menu lateral celular simulado com sucesso. Para esta versão SPA, use os atalhos de navegação da tela.");
  });

  // Add click links on Navbar scroll to section
  document.querySelectorAll(".nav-links a, .logo").forEach(link => {
    link.addEventListener("click", (e) => {
      // Exit admin & checkout before scrolling if active
      document.getElementById("admin-section").style.display = "none";
      document.getElementById("checkout-section").style.display = "none";
      document.getElementById("main-content").style.display = "block";

      const navTarget = link.dataset.nav;
      if (navTarget === "home") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (navTarget === "catalog") {
        e.preventDefault();
        document.getElementById("catalog-section").scrollIntoView({ behavior: "smooth" });
      } else if (navTarget === "about") {
        e.preventDefault();
        document.getElementById("features-section").scrollIntoView({ behavior: "smooth" });
      } else if (navTarget === "contact") {
        e.preventDefault();
        openContactModal();
      }
      
      document.querySelectorAll(".nav-links a").forEach(l => l.classList.remove("active"));
      if (link.dataset.nav) link.classList.add("active");
    });
  });

  // Contact Modal Logic
  const contactOverlay = document.getElementById("contact-modal-overlay");
  const contactModal = document.getElementById("contact-modal");

  function openContactModal() {
    contactOverlay.classList.add("active");
    contactModal.classList.add("active");
  }

  function closeContactModal() {
    contactOverlay.classList.remove("active");
    contactModal.classList.remove("active");
  }

  const heroContact = document.getElementById("hero-contact-btn");
  if (heroContact) {
    heroContact.addEventListener("click", (e) => {
      e.preventDefault();
      openContactModal();
    });
  }

  document.getElementById("close-contact-modal").addEventListener("click", closeContactModal);
  contactOverlay.addEventListener("click", closeContactModal);
}

// App Entry Point
window.addEventListener("DOMContentLoaded", () => {
  initState();
  initLayoutUI();
  renderCategoryFilters();
  renderCatalog();
  updateCartUI();
  initCheckoutUI();
  initAdminUI();
});
