// Car Gallery Management System
class CarGallery {
    constructor() {
        this.carContainer = document.querySelector('#cars .row');
        this.carImages = [
            {
                src: 'car.jpg',
                title: 'Premium Sports Car',
                description: 'Experience luxury and performance in one package.',
                price: '$45,000.00'
            },
            {
                src: 'backimg.jpg',
                title: 'Classic Sedan',
                description: 'Reliable and comfortable for everyday driving.',
                price: '$28,000.00'
            },
            {
                src: 'img 1.jpg',
                title: 'Electric Vehicle',
                description: 'Eco-friendly and efficient transportation.',
                price: '$35,000.00'
            },
            {
                src: 'img 2.jpg',
                title: 'Luxury SUV',
                description: 'Spacious and powerful for family adventures.',
                price: '$55,000.00'
            },
            {
                src: 'img 3.jpg',
                title: 'Compact City Car',
                description: 'Perfect for urban commuting and parking.',
                price: '$22,000.00'
            },
            {
                src: 'img 4.jpg',
                title: 'Convertible Roadster',
                description: 'Feel the wind in your hair with this stylish ride.',
                price: '$48,000.00'
            }
        ];
        this.init();
    }

    // Initialize the gallery
    init() {
        this.createAddCarButton();
        this.bindEvents();
    }

    // Create a car card HTML element
    createCarCard(carData) {
        return `
            <div class="col">
                <div class="card h-100 product-card shadow-sm">
                    <img src="${carData.src}" class="card-img-top" alt="${carData.title}" style="height: 250px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${carData.title}</h5>
                        <p class="card-text text-muted">${carData.description}</p>
                        <p class="card-text fs-4 text-primary">${carData.price}</p>
                        <div class="d-flex gap-2">
                            <a href="#" class="btn btn-outline-primary flex-fill">View Details</a>
                            <button class="btn btn-outline-danger remove-car-btn" data-car-title="${carData.title}">Remove</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Add a new car to the gallery
    addCar(carData) {
        if (this.carContainer) {
            const carCard = this.createCarCard(carData);
            this.carContainer.insertAdjacentHTML('beforeend', carCard);
            this.bindRemoveEvents();
        }
    }

    // Remove a car from the gallery
    removeCar(carTitle) {
        const carCards = document.querySelectorAll('.remove-car-btn');
        carCards.forEach(button => {
            if (button.dataset.carTitle === carTitle) {
                button.closest('.col').remove();
            }
        });
    }

    // Create add car button
    createAddCarButton() {
        const carsSection = document.querySelector('#cars .container');
        if (carsSection) {
            const addCarButton = document.createElement('div');
            addCarButton.className = 'text-center mt-3';
            addCarButton.innerHTML = `
                <button class="btn btn-primary" id="addCarBtn">Add New Car</button>
                <button class="btn btn-secondary ms-2" id="loadMoreCarsBtn">Load More Cars</button>
            `;
            carsSection.appendChild(addCarButton);
        }
    }

    // Bind event listeners
    bindEvents() {
        // Add car button event
        document.addEventListener('click', (e) => {
            if (e.target.id === 'addCarBtn') {
                this.showAddCarModal();
            }
            
            if (e.target.id === 'loadMoreCarsBtn') {
                this.loadMoreCars();
            }
        });

        this.bindRemoveEvents();
    }

    // Bind remove car events
    bindRemoveEvents() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-car-btn')) {
                const carTitle = e.target.dataset.carTitle;
                if (confirm(`Are you sure you want to remove "${carTitle}"?`)) {
                    this.removeCar(carTitle);
                }
            }
        });
    }

    // Show add car modal (simplified version)
    showAddCarModal() {
        const carTitle = prompt('Enter car title:');
        const carDescription = prompt('Enter car description:');
        const carPrice = prompt('Enter car price (e.g., $30,000.00):');
        const carImage = prompt('Enter image filename (e.g., car.jpg):');

        if (carTitle && carDescription && carPrice && carImage) {
            const newCar = {
                src: carImage,
                title: carTitle,
                description: carDescription,
                price: carPrice
            };
            this.addCar(newCar);
        }
    }

    // Load more cars from the predefined array
    loadMoreCars() {
        const currentCars = document.querySelectorAll('#cars .col').length;
        const availableCars = this.carImages.slice(currentCars, currentCars + 3);
        
        availableCars.forEach(car => {
            this.addCar(car);
        });

        if (currentCars + 3 >= this.carImages.length) {
            document.getElementById('loadMoreCarsBtn').style.display = 'none';
        }
    }

    // Get all current cars
    getAllCars() {
        const carCards = document.querySelectorAll('#cars .card');
        return Array.from(carCards).map(card => {
            return {
                title: card.querySelector('.card-title').textContent,
                description: card.querySelector('.card-text').textContent,
                price: card.querySelector('.fs-4').textContent,
                src: card.querySelector('img').src
            };
        });
    }

    // Clear all cars
    clearAllCars() {
        if (confirm('Are you sure you want to remove all cars?')) {
            this.carContainer.innerHTML = '';
        }
    }
}

// Initialize the car gallery when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const carGallery = new CarGallery();
    
    // Make it globally accessible for debugging
    window.carGallery = carGallery;
    
    console.log('Car Gallery initialized successfully!');
});

// Utility functions for car image management
const CarImageUtils = {
    // Validate image file
    validateImage(file) {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        const maxSize = 5 * 1024 * 1024; // 5MB
        
        if (!validTypes.includes(file.type)) {
            alert('Please select a valid image file (JPEG, PNG, or GIF)');
            return false;
        }
        
        if (file.size > maxSize) {
            alert('Image file size should be less than 5MB');
            return false;
        }
        
        return true;
    },

    // Create image preview
    createImagePreview(file, callback) {
        const reader = new FileReader();
        reader.onload = function(e) {
            callback(e.target.result);
        };
        reader.readAsDataURL(file);
    },

    // Resize image (basic implementation)
    resizeImage(file, maxWidth, maxHeight, callback) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = function() {
            const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
            canvas.width = img.width * ratio;
            canvas.height = img.height * ratio;
            
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            canvas.toBlob(callback, 'image/jpeg', 0.8);
        };
        
        img.src = URL.createObjectURL(file);
    }
};
