import React, { useState } from 'react';
import './electroshop.css';

const ElectroShop = () => {
  const [cartCount, setCartCount] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      text: "ElectroShop offers an amazing selection and their delivery was super fast! Very happy with my new laptop.",
      author: "Jane Doe",
      title: "Satisfied Customer"
    },
    {
      text: "Great prices and top-notch customer service. My go-to for all electronics now.",
      author: "John Smith",
      title: "Tech Enthusiast"
    },
    {
      text: "The headphones I bought are fantastic! The quality is superb, and the website was easy to navigate.",
      author: "Alice Brown",
      title: "Music Lover"
    }
  ];

  const products = [
    {
      id: 1,
      name: "Laptop Pro X",
      description: "Powerful and sleek, perfect for work and play.",
      price: 1200.00,
      image: "img1.jpg"
    },
    {
      id: 2,
      name: "Quantum Phone 10",
      description: "Capture life's moments with stunning clarity.",
      price: 800.00,
      image: "img2.jpg"
    },
    {
      id: 3,
      name: "Aero Sound Headphones",
      description: "Immersive audio experience for music lovers.",
      price: 150.00,
      image: "img3.jpg"
    },
    {
      id: 4,
      name: "Connect Smartwatch",
      description: "Stay connected and track your fitness.",
      price: 250.00,
      image: "img4.jpg"
    },
    {
      id: 5,
      name: "ProCam DSLR",
      description: "Professional photography made easy.",
      price: 950.00,
      image: "img5.jpg"
    },
    {
      id: 6,
      name: "UltraPad Tablet",
      description: "Your portable entertainment and productivity hub.",
      price: 400.00,
      image: "img6.jpg"
    }
  ];

  const handleAddToCart = (productId) => {
    setCartCount(prevCount => prevCount + 1);
    // Add your cart logic here
    console.log(`Added product ${productId} to cart`);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const contactData = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    };
    console.log('Contact form submitted:', contactData);
    // Add your form submission logic here
    alert('Thank you for your message! We will get back to you soon.');
    e.target.reset();
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="electroshop">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container">
          <a className="navbar-brand" href="#hero">ElectroShop</a>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <button 
                  className="nav-link btn btn-link active" 
                  onClick={() => scrollToSection('hero')}
                >
                  Home
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className="nav-link btn btn-link" 
                  onClick={() => scrollToSection('products')}
                >
                  Products
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className="nav-link btn btn-link" 
                  onClick={() => scrollToSection('about')}
                >
                  About Us
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className="nav-link btn btn-link" 
                  onClick={() => scrollToSection('contact')}
                >
                  Contact
                </button>
              </li>
              <li className="nav-item">
                <span className="nav-link">
                  🛒 Cart <span className="badge bg-primary">{cartCount}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="container">
          <h1>Discover the Latest in Electronics</h1>
          <p className="lead">High-quality gadgets for every need, at unbeatable prices.</p>
          <button 
            className="btn btn-primary btn-lg mt-3"
            onClick={() => scrollToSection('products')}
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Our Popular Products</h2>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {products.map((product) => (
              <div key={product.id} className="col">
                <div className="card h-100 product-card shadow-sm">
                  <img 
                    src={product.image} 
                    className="card-img-top" 
                    alt={product.name}
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/300x200?text=${encodeURIComponent(product.name)}`;
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text text-muted">{product.description}</p>
                    <p className="card-text fs-4 text-primary">${product.price.toFixed(2)}</p>
                    <button 
                      className="btn btn-outline-primary"
                      onClick={() => handleAddToCart(product.id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <button className="btn btn-lg btn-success">View All Products</button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img 
                src="https://via.placeholder.com/600x400?text=About+Us" 
                className="img-fluid rounded shadow" 
                alt="About ElectroShop"
              />
            </div>
            <div className="col-lg-6 mt-4 mt-lg-0">
              <h2 className="mb-4">About ElectroShop</h2>
              <p className="lead">
                Welcome to ElectroShop, your trusted destination for cutting-edge electronics! 
                We are dedicated to providing the latest and greatest in technology, from powerful 
                laptops and smartphones to immersive audio devices and smart home gadgets.
              </p>
              <p>
                Our mission is to make technology accessible and affordable for everyone, ensuring 
                a seamless shopping experience with exceptional customer service. We carefully 
                curate our selection to bring you only the highest quality products from reputable brands.
              </p>
              <p>
                Shop with confidence at ElectroShop and elevate your digital lifestyle!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">What Our Customers Say</h2>
          <div className="carousel-container">
            <div className="d-flex justify-content-center text-center">
              <figure className="text-center col-md-8">
                <blockquote className="blockquote">
                  <p>"{testimonials[currentTestimonial].text}"</p>
                </blockquote>
                <figcaption className="blockquote-footer">
                  {testimonials[currentTestimonial].author}{' '}
                  <cite title="Source Title">{testimonials[currentTestimonial].title}</cite>
                </figcaption>
              </figure>
            </div>
            <div className="carousel-controls d-flex justify-content-center mt-3">
              <button 
                className="btn btn-outline-secondary me-2"
                onClick={prevTestimonial}
              >
                ❮ Previous
              </button>
              <button 
                className="btn btn-outline-secondary"
                onClick={nextTestimonial}
              >
                Next ❯
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Get in Touch</h2>
          <div className="row">
            <div className="col-md-6 mx-auto">
              <form onSubmit={handleContactSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="name" 
                    name="name"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    name="email"
                    placeholder="name@example.com"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea 
                    className="form-control" 
                    id="message" 
                    name="message"
                    rows="5" 
                    placeholder="Your Message"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
          <div className="text-center mt-5">
            <p><strong>Email:</strong> info@electroshop.com</p>
            <p><strong>Phone:</strong> +1 (123) 456-7890</p>
            <p><strong>Address:</strong> 123 Tech Lane, Gadget City, TX 78901</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4">
        <div className="container">
          <p>&copy; 2025 ElectroShop. All rights reserved.</p>
          <div className="social-icons">
            <button className="text-white mx-2 btn btn-link">📘</button>
            <button className="text-white mx-2 btn btn-link">🐦</button>
            <button className="text-white mx-2 btn btn-link">📷</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ElectroShop;