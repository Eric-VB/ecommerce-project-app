# Virtual Store Project

## Description
This is a virtual store project designed for training purposes. It simulates an online shopping platform where users can browse products, add items to a cart, and complete purchases. Built with HTML, CSS, JavaScript, Node.js, Angular. This project demonstrates basic e-commerce functionalities.

## Technologies Used
- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Styling:** Tailwind CSS (via CDN)
- **Icons:** Font Awesome
- **Storage:** LocalStorage (for cart persistence)

## Project Structure
```
ecommerce-project-app/
├── index.html              # Main homepage
├── css/
│   └── styles.css          # Custom styles
├── js/
│   └── app.js              # Main application logic
├── pages/                  # Additional pages (future use)
├── assets/                 # Images and static files (future use)
├── package.json            # Node.js project configuration
└── README.md              # This file
```

## Features
- ✅ Product catalog with search and filtering
- ✅ Shopping cart management (add/remove items)
- ✅ Responsive design for mobile and desktop
- ✅ Local storage for cart persistence
- ✅ Modern UI with Tailwind CSS
- ✅ Product cards with images and details
- ✅ Cart modal with quantity controls
- ✅ Price formatting in Brazilian Real (BRL)

## Features Implemented
- Product display grid
- Add to cart functionality
- Cart counter badge
- Cart modal with item management
- Local storage persistence
- Responsive design
- Mobile menu toggle

## How to Run

### Option 1: Open directly in browser
1. Clone or download this repository
2. Open `index.html` in your web browser
3. The application will run locally

### Option 2: Using a local server (recommended)
1. Install Node.js if not already installed
2. Run a local server:
   ```bash
   # Using Python (if installed)
   python -m http.server 8000

   # Or using Node.js
   npx serve .

   # Or using PHP
   php -S localhost:8000
   ```
3. Open `http://localhost:8000` in your browser

## Browser Support
- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## Future Enhancements
- [ ] User authentication system
- [ ] Product search functionality
- [ ] Product filtering by category
- [ ] Checkout process
- [ ] Payment integration
- [ ] User profile management
- [ ] Order history
- [ ] Admin panel
- [ ] Backend API integration
- [ ] Database integration (MySQL)

## Learning Objectives
This project demonstrates:
- HTML5 semantic structure
- CSS Grid and Flexbox layouts
- JavaScript ES6+ features (arrow functions, template literals, destructuring)
- DOM manipulation
- Event handling
- Local storage API
- Responsive web design
- Component-based architecture concepts
- State management basics

## Contributing
This is a learning project. Feel free to:
- Add new features
- Improve the UI/UX
- Fix bugs
- Add tests
- Optimize performance

## License
ISC License - feel free to use this project for learning purposes.