// ElectroShop JavaScript Functionality
// This file contains all the interactive features for the ElectroShop website

// Shopping Cart functionality
let cart = [];
let cartTotal = 0;

// Add item to cart
function addToCart(productName, price) {
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: price,
            quantity: 1
        });
    }
    
    updateCartUI();
    
    // Show success notification
    showNotification(`${productName} added to cart!`, 'success');
}

// Remove item from cart
function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCartUI();
    showNotification(`${productName} removed from cart!`, 'info');
}

// Update cart UI
function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart total
    cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalElement.textContent = cartTotal.toFixed(2);
    
    // Update cart items display
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-center text-muted">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="d-flex justify-content-between align-items-center py-2 border-bottom">
                <div>
                    <h6 class="mb-0">${item.name}</h6>
                    <small class="text-muted">$${item.price.toFixed(2)} x ${item.quantity}</small>
                </div>
                <div>
                    <span class="fw-bold me-3">$${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart('${item.name}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }
}

// Toggle cart modal
function toggleCart() {
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    cartModal.show();
}

// Clear cart
function clearCart() {
    cart = [];
    updateCartUI();
    showNotification('Cart cleared!', 'info');
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'warning');
        return;
    }
    
    showNotification('Proceeding to checkout...', 'success');
    // Here you would typically redirect to a checkout page
    console.log('Checkout with items:', cart);
}

// Product filtering
function filterProducts(category) {
    const products = document.querySelectorAll('.product-item');
    const filters = document.querySelectorAll('.category-filter');
    
    // Update active filter
    filters.forEach(filter => filter.classList.remove('active'));
    event.target.classList.add('active');
    
    // Show/hide products
    products.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
            product.style.display = 'block';
            product.classList.add('fade-in');
        } else {
            product.style.display = 'none';
        }
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Fade-in animation on scroll
function handleScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    // Simulate form submission
    showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
    this.reset();
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartUI();
    handleScrollAnimations();
    
    // Add scroll event listener for animations
    window.addEventListener('scroll', handleScrollAnimations);
    
    // Trigger initial animation for elements in viewport
    setTimeout(handleScrollAnimations, 100);
});

// Update navbar on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('bg-dark');
    } else {
        navbar.classList.remove('bg-dark');
    }
});

// Event Listeners for Interactive Elements
document.addEventListener('DOMContentLoaded', function() {
    // Add to Cart buttons
    document.querySelectorAll('.btn-outline-primary').forEach(button => {
        if (button.textContent.includes('Add to Cart')) {
            button.addEventListener('click', function() {
                const card = this.closest('.product-card');
                const productName = card.querySelector('.card-title').textContent;
                const priceText = card.querySelector('.price-badge').textContent;
                const price = parseFloat(priceText.replace('$', '').replace(',', ''));
                addToCart(productName, price);
            });
        }
    });
    
    // Category filter buttons
    document.querySelectorAll('.category-filter').forEach(button => {
        button.addEventListener('click', function() {
            const category = this.textContent.toLowerCase().replace(' ', '');
            const categoryMap = {
                'allproducts': 'all',
                'laptops': 'laptops',
                'smartphones': 'smartphones',
                'audio': 'audio',
                'wearables': 'wearables',
                'cameras': 'cameras'
            };
            filterProducts(categoryMap[category] || 'all');
        });
    });
    
    // Cart toggle
    document.querySelector('[href="#cart"]').addEventListener('click', function(e) {
        e.preventDefault();
        toggleCart();
    });
    
    // Clear cart button
    document.querySelector('.btn-outline-secondary').addEventListener('click', clearCart);
    
    // Checkout button
    document.querySelector('.btn-primary.w-100').addEventListener('click', checkout);
});
