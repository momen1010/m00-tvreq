// Moo-Store 2D JavaScript - Image Grid, Products, Cart, Filters

// Sample Products Data (same as before, with 3D positioning)
const products = [
    { id: 1, name: 'Classic White T-Shirt', price: 29.99, category: 'men', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', description: 'Comfortable cotton t-shirt.', x: -4, y: 1.5, z: -4 },

    { id: 2, name: 'Black Hoodie', price: 59.99, category: 'men', image: 'https://enrage.pl/cdn/shop/files/black_star_hoodie_07242f72-b195-4ac1-a733-c24e934ae85c.jpg?v=1743754979', description: 'Cozy oversized hoodie.', x: -2, y: 1, z: -4 },

    { id: 3, name: 'Slim Fit Jeans', price: 79.99, category: 'men', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNDIGnNesRdQ-HPQ86F59xZAvy-C6-30xR6g&s', description: 'Stretch denim jeans.', x: 0, y: 1.2, z: -4 },
    { id: 4, name: 'Graphic Tee', price: 34.99, category: 'men', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA7ATmZp9j6yXiydB1iQVy0mPdgLcosYO8VQ&s', description: 'Bold print t-shirt.', x: 2, y: 1.5, z: -4 },

    { id: 5, name: 'Cargo Pants', price: 89.99, category: 'men', image: 'https://arafastores.com/cdn/shop/files/2520256880160.jpg?v=1744026898&width=1080', description: 'Multi-pocket cargos.', x: -4, y: 0.8, z: -2 },
    { id: 6, name: 'Crewneck Sweater', price: 49.99, category: 'men', image: 'https://mobaco.com/wp-content/uploads/2026/01/JM091_0191_1.jpg', description: 'Soft knit sweater.', x: -2, y: 1.2, z: -2 },



    { id: 7, name: 'Floral Blouse', price: 44.99, category: 'women', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQEjI91m6arFWgmWADsRmH3mGb0D4aPP-AnQ&s', description: 'Elegant floral top.', x: 0, y: 1.5, z: -2 },
    { id: 8, name: 'High Waist Jeans', price: 69.99, category: 'women', image: 'https://img.kwcdn.com/product/fancy/d970b924-e49e-4f5a-963f-c26f1b5e7e0f.jpg?imageView2/2/w/800/q/70/format/avif', description: 'Flattering high-waist.', x: 2, y: 1, z: -2 },
    { id: 9, name: 'Oversized Shirt', price: 39.99, category: 'women', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7pyS4r9g5T3P2g9X-g2gUE1AwI2GXNQSWjA&s', description: 'Relaxed fit shirt.', x: -4, y: 1.8, z: 0 },
    { id: 10, name: 'Knit Dress', price: 99.99, category: 'women', image: 'https://content.purecollection.com/img/b/111624_lkzm6_oatmeal_w_5.jpg', description: 'Flowy knit dress.', x: -2, y: 1.2, z: 0 },
    { id: 11, name: 'Crop Top', price: 24.99, category: 'women', image: 'https://www.beginningboutique.com.au/cdn/shop/files/Frosty-Ruffle-White-Crop-Top-2_5d3691c5-9faa-474c-9dfb-c0146e81201b.jpg?v=1773025462', description: 'Trendy crop top.', x: 0, y: 1.5, z: 0 },
    { id: 12, name: 'Denim Jacket', price: 79.99, category: 'women', image: 'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/AA4645s.jpg?im=Resize,width=750', description: 'Classic denim jacket.', x: 2, y: 1.2, z: 0 }
];

// Cart Array
let cart = JSON.parse(localStorage.getItem('mooStoreCart')) || [];

// Global Variables
let currentFilter = 'all';

// DOM Elements
const productsGrid = document.getElementById('products-grid');
const cartSidebar = document.getElementById('cart-sidebar');
const cartLink = document.getElementById('cart-link');
const closeCart = document.getElementById('close-cart');
const overlay = document.getElementById('overlay');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const cartItemsEl = document.getElementById('cart-items');
const filterBtns = document.querySelectorAll('.filter-btn');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderProductsGrid();
    setupEventListeners();
    updateCart();
});





function renderProductsGrid() {
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card" data-category="${product.category}">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="product-add-btn" data-product-id="${product.id}">Add to Cart</button>
            </div>
        </div>
    `).join('');

    // Add event listeners to new buttons
    document.querySelectorAll('.product-add-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = parseInt(btn.dataset.productId);
            addToCart(productId);
        });
    });
}



// Cart & Filters (existing logic adapted)
function setupEventListeners() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.category;
            applyFilter();
        });
    });

    cartLink.addEventListener('click', toggleCart);
    closeCart.addEventListener('click', toggleCart);
    overlay.addEventListener('click', toggleCart);

    document.getElementById('checkout-btn').addEventListener('click', () => {
        alert('Checkout complete! Cart cleared for demo.');
        cart = [];
        localStorage.removeItem('mooStoreCart');
        updateCart();
        toggleCart();
        renderCartItems();
    });
}

function applyFilter() {
    document.querySelectorAll('.product-card').forEach(card => {
        const category = card.dataset.category;
        if (currentFilter === 'all' || category === currentFilter) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
    localStorage.setItem('mooStoreCart', JSON.stringify(cart));
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    localStorage.setItem('mooStoreCart', JSON.stringify(cart));
    renderCartItems();
}

function updateQuantity(productId, change) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += change;
        if (cartItem.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
            localStorage.setItem('mooStoreCart', JSON.stringify(cart));
        }
    }
}

function renderCartItems() {
    cartItemsEl.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)}</p>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        </div>
    `).join('') || '<p>Your cart is empty. Browse our products!</p>';
}

function updateCart() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartCount.textContent = totalItems;
    cartTotal.textContent = totalPrice.toFixed(2);
    renderCartItems();
}

function toggleCart() {
    cartSidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}
