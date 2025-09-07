// Amazon Clone Application JavaScript

// Application State
let state = {
    products: [],
    categories: ["Electronics", "Fashion", "Home & Garden", "Sports", "Books", "Beauty"],
    cart: [],
    user: {
        name: "",
        email: "",
        isLoggedIn: false
    },
    currentProduct: null,
    filteredProducts: [],
    searchQuery: "",
    currentCategory: "all"
};

// Sample product data
const productsData = [
    {
        "_id": "1",
        "name": "iPhone 13 Pro",
        "image": "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400",
        "description": "Latest iPhone with advanced camera system and A15 Bionic chip. Features include ProRAW photography, cinematic video mode, and all-day battery life.",
        "brand": "Apple",
        "category": "Electronics",
        "price": 999.99,
        "countInStock": 10,
        "rating": 4.5,
        "numReviews": 12
    },
    {
        "_id": "2",
        "name": "Samsung Galaxy S22",
        "image": "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400",
        "description": "Flagship Android phone with excellent display and camera. Features 120Hz display, 50MP camera, and 5G connectivity.",
        "brand": "Samsung",
        "category": "Electronics",
        "price": 799.99,
        "countInStock": 7,
        "rating": 4.0,
        "numReviews": 8
    },
    {
        "_id": "3",
        "name": "MacBook Pro 16\"",
        "image": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400",
        "description": "Powerful laptop for professionals with M1 Pro chip. Perfect for video editing, coding, and creative work with stunning Retina display.",
        "brand": "Apple",
        "category": "Electronics",
        "price": 2399.99,
        "countInStock": 5,
        "rating": 5.0,
        "numReviews": 20
    },
    {
        "_id": "4",
        "name": "Sony WH-1000XM4",
        "image": "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400",
        "description": "Industry-leading noise cancelling wireless headphones. Premium sound quality with 30-hour battery life and quick charging.",
        "brand": "Sony",
        "category": "Electronics",
        "price": 349.99,
        "countInStock": 15,
        "rating": 4.8,
        "numReviews": 25
    },
    {
        "_id": "5",
        "name": "Nike Air Jordan 1",
        "image": "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400",
        "description": "Classic basketball sneakers with iconic style. Premium leather construction with Air-Sole unit for cushioning.",
        "brand": "Nike",
        "category": "Fashion",
        "price": 159.99,
        "countInStock": 20,
        "rating": 4.3,
        "numReviews": 30
    },
    {
        "_id": "6",
        "name": "Amazon Echo Dot",
        "image": "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?w=400",
        "description": "Smart speaker with Alexa voice control. Stream music, control smart home devices, and get information hands-free.",
        "brand": "Amazon",
        "category": "Electronics",
        "price": 49.99,
        "countInStock": 25,
        "rating": 4.2,
        "numReviews": 45
    },
    {
        "_id": "7",
        "name": "Samsung 55\" 4K TV",
        "image": "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400",
        "description": "Crystal clear 4K display with smart TV features. HDR support, built-in streaming apps, and voice remote included.",
        "brand": "Samsung",
        "category": "Electronics",
        "price": 699.99,
        "countInStock": 8,
        "rating": 4.6,
        "numReviews": 18
    },
    {
        "_id": "8",
        "name": "Adidas Ultra Boost",
        "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
        "description": "Premium running shoes with boost technology. Responsive cushioning and adaptive fit for ultimate comfort during runs.",
        "brand": "Adidas",
        "category": "Fashion",
        "price": 189.99,
        "countInStock": 12,
        "rating": 4.4,
        "numReviews": 22
    }
];

// Global function declarations for HTML onclick handlers
window.showPage = function(pageId) {
    console.log('Navigating to:', pageId);
    
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageId + 'Page');
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Load page-specific content
        switch(pageId) {
            case 'home':
                loadFeaturedProducts();
                break;
            case 'products':
                loadAllProducts();
                break;
            case 'cart':
                loadCart();
                break;
            case 'profile':
                loadProfile();
                break;
            case 'checkout':
                loadCheckout();
                break;
        }
        
        // Scroll to top
        window.scrollTo(0, 0);
    } else {
        console.error('Page not found:', pageId + 'Page');
    }
};

window.showProductDetail = function(productId) {
    console.log('Showing product detail for:', productId);
    
    const product = state.products.find(p => p._id === productId);
    if (!product) {
        console.error('Product not found:', productId);
        return;
    }
    
    state.currentProduct = product;
    const content = document.getElementById('productDetailContent');
    if (!content) {
        console.error('Product detail content element not found');
        return;
    }
    
    const stars = generateStars(product.rating);
    
    content.innerHTML = `
        <div class="product-detail">
            <div>
                <img src="${product.image}" alt="${product.name}" class="product-detail-image">
            </div>
            <div class="product-detail-info">
                <div class="product-detail-brand">${product.brand}</div>
                <h1>${product.name}</h1>
                <div class="product-rating">
                    <div class="stars">${stars}</div>
                    <span class="rating-text">(${product.numReviews} reviews)</span>
                </div>
                <div class="product-detail-price">$${product.price.toFixed(2)}</div>
                <p class="product-detail-description">${product.description}</p>
                
                <div class="quantity-selector">
                    <label>Quantity:</label>
                    <button class="quantity-btn" onclick="updateQuantity(-1)">-</button>
                    <input type="number" value="1" min="1" max="10" class="quantity-input" id="productQuantity">
                    <button class="quantity-btn" onclick="updateQuantity(1)">+</button>
                </div>
                
                <div class="product-actions">
                    <button class="btn btn--primary btn--lg" onclick="addToCartWithQuantity()">
                        Add to Cart
                    </button>
                    <button class="btn btn--secondary btn--lg" onclick="showPage('cart')">
                        View Cart
                    </button>
                </div>
                
                <div class="stock-info">
                    <p><strong>In Stock:</strong> ${product.countInStock} available</p>
                </div>
            </div>
        </div>
    `;
    
    showPage('productDetail');
};

window.addToCart = function(productId, quantity = 1) {
    console.log('Adding to cart:', productId, 'quantity:', quantity);
    
    const product = state.products.find(p => p._id === productId);
    if (!product) {
        console.error('Product not found:', productId);
        return;
    }
    
    const existingItem = state.cart.find(item => item._id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        state.cart.push({
            ...product,
            quantity: quantity
        });
    }
    
    saveCartToStorage();
    updateCartCount();
    showNotification('Product added to cart!');
};

window.addToCartWithQuantity = function() {
    if (!state.currentProduct) {
        console.error('No current product selected');
        return;
    }
    
    const quantityInput = document.getElementById('productQuantity');
    const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
    addToCart(state.currentProduct._id, quantity);
};

window.updateQuantity = function(change) {
    const input = document.getElementById('productQuantity');
    if (!input) return;
    
    let newValue = parseInt(input.value) + change;
    
    if (newValue < 1) newValue = 1;
    if (newValue > 10) newValue = 10;
    
    input.value = newValue;
};

window.removeFromCart = function(productId) {
    console.log('Removing from cart:', productId);
    state.cart = state.cart.filter(item => item._id !== productId);
    saveCartToStorage();
    updateCartCount();
    loadCart();
};

window.updateCartItemQuantity = function(productId, quantity) {
    const item = state.cart.find(item => item._id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            saveCartToStorage();
            updateCartCount();
            loadCart();
        }
    }
};

window.performSearch = function() {
    console.log('Performing search...');
    
    const searchInput = document.getElementById('searchInput');
    const categorySelect = document.getElementById('searchCategory');
    
    if (!searchInput || !categorySelect) {
        console.error('Search elements not found');
        return;
    }
    
    const query = searchInput.value.toLowerCase();
    const category = categorySelect.value;
    
    console.log('Search query:', query, 'Category:', category);
    
    state.filteredProducts = state.products.filter(product => {
        const matchesQuery = query === '' || 
                           product.name.toLowerCase().includes(query) ||
                           product.brand.toLowerCase().includes(query) ||
                           product.description.toLowerCase().includes(query);
        
        const matchesCategory = category === 'all' || product.category === category;
        
        return matchesQuery && matchesCategory;
    });
    
    console.log('Filtered products:', state.filteredProducts.length);
    
    showPage('products');
    const titleElement = document.getElementById('productsTitle');
    if (titleElement) {
        if (query) {
            titleElement.textContent = `Search Results for "${query}" (${state.filteredProducts.length} items)`;
        } else {
            titleElement.textContent = `${category === 'all' ? 'All Products' : category} (${state.filteredProducts.length} items)`;
        }
    }
};

window.filterByCategory = function(category) {
    console.log('Filtering by category:', category);
    
    state.currentCategory = category;
    const categorySelect = document.getElementById('searchCategory');
    if (categorySelect) {
        categorySelect.value = category === 'all' ? 'all' : category;
    }
    
    // Clear search input when filtering by category
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
    }
    
    if (category === 'all') {
        state.filteredProducts = [...state.products];
    } else {
        state.filteredProducts = state.products.filter(product => product.category === category);
    }
    
    console.log('Filtered products:', state.filteredProducts.length);
    
    showPage('products');
    const titleElement = document.getElementById('productsTitle');
    if (titleElement) {
        titleElement.textContent = category === 'all' ? 'All Products' : `${category} (${state.filteredProducts.length} items)`;
    }
};

window.sortProducts = function() {
    const sortSelect = document.getElementById('sortSelect');
    if (!sortSelect) return;
    
    const sortBy = sortSelect.value;
    console.log('Sorting by:', sortBy);
    
    switch(sortBy) {
        case 'price-low':
            state.filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            state.filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            state.filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        default:
            // Restore original order
            const originalOrder = state.products.filter(product => 
                state.filteredProducts.some(fp => fp._id === product._id)
            );
            state.filteredProducts = originalOrder;
    }
    
    loadAllProducts();
};

window.toggleUserMenu = function() {
    console.log('Toggling user menu');
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
        console.log('User menu toggled, active:', dropdown.classList.contains('active'));
    } else {
        console.error('User dropdown element not found');
    }
};

window.logout = function() {
    console.log('Logging out user');
    state.user = {
        name: "",
        email: "",
        isLoggedIn: false
    };
    
    localStorage.removeItem('amazonUser');
    updateUserUI();
    showPage('home');
    showNotification('Logged out successfully!');
};

window.placeOrder = function() {
    console.log('Placing order');
    showLoading();
    
    setTimeout(() => {
        state.cart = [];
        saveCartToStorage();
        updateCartCount();
        
        hideLoading();
        showNotification('Order placed successfully!', 'success');
        showPage('home');
        
        const checkoutForm = document.getElementById('checkoutForm');
        if (checkoutForm) {
            checkoutForm.reset();
        }
    }, 2000);
};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Amazon Clone app...');
    initializeApp();
    loadProducts();
    updateCartCount();
    setupEventListeners();
    hideLoading();
});

// Initialize application state
function initializeApp() {
    state.products = [...productsData];
    state.filteredProducts = [...productsData];
    
    // Load saved state from localStorage
    try {
        const savedCart = localStorage.getItem('amazonCart');
        if (savedCart) {
            state.cart = JSON.parse(savedCart);
            console.log('Loaded cart from storage:', state.cart.length, 'items');
        }
        
        const savedUser = localStorage.getItem('amazonUser');
        if (savedUser) {
            state.user = JSON.parse(savedUser);
            updateUserUI();
            console.log('Loaded user from storage:', state.user.name);
        }
    } catch (e) {
        console.log('Error loading saved data:', e);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });
    }
    
    // Form submissions
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const checkoutForm = document.getElementById('checkoutForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckout);
    }
    
    // Click outside to close dropdowns
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.user-account')) {
            const dropdown = document.getElementById('userDropdown');
            if (dropdown && dropdown.classList.contains('active')) {
                dropdown.classList.remove('active');
            }
        }
    });
    
    console.log('Event listeners setup complete');
}

// Load and display products
function loadProducts() {
    loadFeaturedProducts();
    loadAllProducts();
}

function loadFeaturedProducts() {
    const grid = document.getElementById('featuredProductsGrid');
    if (!grid) {
        console.error('Featured products grid not found');
        return;
    }
    
    const featured = state.products.slice(0, 4);
    grid.innerHTML = featured.map(product => createProductCard(product)).join('');
    console.log('Featured products loaded:', featured.length);
}

function loadAllProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) {
        console.error('Products grid not found');
        return;
    }
    
    grid.innerHTML = state.filteredProducts.map(product => createProductCard(product)).join('');
    console.log('All products loaded:', state.filteredProducts.length);
}

function createProductCard(product) {
    const stars = generateStars(product.rating);
    
    return `
        <div class="product-card" onclick="showProductDetail('${product._id}')">
            <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
            <div class="product-info">
                <div class="product-brand">${product.brand}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-rating">
                    <div class="stars">${stars}</div>
                    <span class="rating-text">(${product.numReviews})</span>
                </div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart('${product._id}')">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

function loadCart() {
    const container = document.getElementById('cartItems');
    if (!container) {
        console.error('Cart items container not found');
        return;
    }
    
    if (state.cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart" style="font-size: 4rem; color: var(--color-text-secondary); margin-bottom: var(--space-16);"></i>
                <h3>Your cart is empty</h3>
                <p>Add some products to get started!</p>
                <button class="btn btn--primary" onclick="showPage('products')">Continue Shopping</button>
            </div>
        `;
    } else {
        container.innerHTML = state.cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <h3 class="cart-item-title">${item.name}</h3>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-controls">
                        <div class="quantity-selector">
                            <button class="quantity-btn" onclick="updateCartItemQuantity('${item._id}', ${item.quantity - 1})">-</button>
                            <input type="number" value="${item.quantity}" min="1" class="quantity-input" 
                                   onchange="updateCartItemQuantity('${item._id}', parseInt(this.value))">
                            <button class="quantity-btn" onclick="updateCartItemQuantity('${item._id}', ${item.quantity + 1})">+</button>
                        </div>
                        <button class="remove-btn" onclick="removeFromCart('${item._id}')">Remove</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    updateCartSummary();
    console.log('Cart loaded with', state.cart.length, 'items');
}

function updateCartSummary() {
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = state.cart.length > 0 ? 9.99 : 0;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    
    const elements = {
        cartSubtotal: document.getElementById('cartSubtotal'),
        cartShipping: document.getElementById('cartShipping'),
        cartTax: document.getElementById('cartTax'),
        cartTotal: document.getElementById('cartTotal')
    };
    
    if (elements.cartSubtotal) elements.cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    if (elements.cartShipping) elements.cartShipping.textContent = shipping > 0 ? `$${shipping.toFixed(2)}` : 'FREE';
    if (elements.cartTax) elements.cartTax.textContent = `$${tax.toFixed(2)}`;
    if (elements.cartTotal) elements.cartTotal.textContent = `$${total.toFixed(2)}`;
}

function updateCartCount() {
    const count = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = count;
    }
}

function saveCartToStorage() {
    try {
        localStorage.setItem('amazonCart', JSON.stringify(state.cart));
    } catch (e) {
        console.log('Error saving cart:', e);
    }
}

// Search functionality
function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    const categorySelect = document.getElementById('searchCategory');
    
    if (!searchInput || !categorySelect) return;
    
    const query = searchInput.value.toLowerCase();
    const category = categorySelect.value;
    
    state.filteredProducts = state.products.filter(product => {
        const matchesQuery = query === '' || 
                           product.name.toLowerCase().includes(query) ||
                           product.brand.toLowerCase().includes(query) ||
                           product.description.toLowerCase().includes(query);
        
        const matchesCategory = category === 'all' || product.category === category;
        
        return matchesQuery && matchesCategory;
    });
    
    if (document.getElementById('productsPage').classList.contains('active')) {
        loadAllProducts();
    }
}

// User authentication
function handleLogin(e) {
    e.preventDefault();
    
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    
    if (!emailInput || !passwordInput) return;
    
    const email = emailInput.value;
    const password = passwordInput.value;
    
    if (email && password) {
        state.user = {
            name: email.split('@')[0],
            email: email,
            isLoggedIn: true
        };
        
        localStorage.setItem('amazonUser', JSON.stringify(state.user));
        updateUserUI();
        showPage('home');
        showNotification('Login successful!');
        
        emailInput.value = '';
        passwordInput.value = '';
    }
}

function handleRegister(e) {
    e.preventDefault();
    
    const nameInput = document.getElementById('registerName');
    const emailInput = document.getElementById('registerEmail');
    const passwordInput = document.getElementById('registerPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    if (!nameInput || !emailInput || !passwordInput || !confirmPasswordInput) return;
    
    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match!', 'error');
        return;
    }
    
    if (name && email && password) {
        state.user = {
            name: name,
            email: email,
            isLoggedIn: true
        };
        
        localStorage.setItem('amazonUser', JSON.stringify(state.user));
        updateUserUI();
        showPage('home');
        showNotification('Account created successfully!');
        
        nameInput.value = '';
        emailInput.value = '';
        passwordInput.value = '';
        confirmPasswordInput.value = '';
    }
}

function updateUserUI() {
    const userName = document.getElementById('userName');
    const authButtons = document.getElementById('authButtons');
    const userActions = document.getElementById('userActions');
    
    if (userName) {
        if (state.user.isLoggedIn) {
            userName.textContent = state.user.name;
            if (authButtons) authButtons.style.display = 'none';
            if (userActions) userActions.style.display = 'block';
        } else {
            userName.textContent = 'Sign in';
            if (authButtons) authButtons.style.display = 'block';
            if (userActions) userActions.style.display = 'none';
        }
    }
}

// Profile functionality
function loadProfile() {
    const container = document.getElementById('profileInfo');
    if (!container) return;
    
    if (state.user.isLoggedIn) {
        container.innerHTML = `
            <div class="profile-field">
                <strong>Name:</strong>
                <span>${state.user.name}</span>
            </div>
            <div class="profile-field">
                <strong>Email:</strong>
                <span>${state.user.email}</span>
            </div>
            <div class="profile-field">
                <strong>Member since:</strong>
                <span>${new Date().toLocaleDateString()}</span>
            </div>
        `;
    } else {
        container.innerHTML = `
            <p>Please <a href="#" onclick="showPage('login')">sign in</a> to view your profile.</p>
        `;
    }
}

// Checkout functionality
function loadCheckout() {
    if (!state.user.isLoggedIn) {
        showPage('login');
        showNotification('Please sign in to continue checkout', 'warning');
        return;
    }
    
    if (state.cart.length === 0) {
        showPage('cart');
        showNotification('Your cart is empty', 'warning');
        return;
    }
    
    const shippingNameInput = document.getElementById('shippingName');
    if (shippingNameInput) {
        shippingNameInput.value = state.user.name;
    }
    
    const container = document.getElementById('checkoutItems');
    if (container) {
        container.innerHTML = state.cart.map(item => `
            <div class="checkout-item">
                <img src="${item.image}" alt="${item.name}" class="checkout-item-image">
                <div class="checkout-item-info">
                    <div class="checkout-item-name">${item.name}</div>
                    <div class="checkout-item-details">Qty: ${item.quantity} × $${item.price.toFixed(2)}</div>
                </div>
            </div>
        `).join('');
    }
    
    updateCheckoutSummary();
}

function updateCheckoutSummary() {
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 9.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    
    const elements = {
        checkoutSubtotal: document.getElementById('checkoutSubtotal'),
        checkoutShipping: document.getElementById('checkoutShipping'),
        checkoutTax: document.getElementById('checkoutTax'),
        checkoutTotal: document.getElementById('checkoutTotal')
    };
    
    if (elements.checkoutSubtotal) elements.checkoutSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    if (elements.checkoutShipping) elements.checkoutShipping.textContent = `$${shipping.toFixed(2)}`;
    if (elements.checkoutTax) elements.checkoutTax.textContent = `$${tax.toFixed(2)}`;
    if (elements.checkoutTotal) elements.checkoutTotal.textContent = `$${total.toFixed(2)}`;
}

function handleCheckout(e) {
    e.preventDefault();
    placeOrder();
}

// Utility functions
function showLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.classList.remove('hidden');
    }
}

function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.classList.add('hidden');
    }
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `status status--${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        animation: fadeIn 0.3s ease-in-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease-in-out';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS for notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateX(100%); }
        to { opacity: 1; transform: translateX(0); }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(100%); }
    }
`;
document.head.appendChild(style);

console.log('Amazon Clone JavaScript loaded successfully');