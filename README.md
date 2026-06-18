# PropSpace - Full Stack Property Listing Application

A modern, full-stack property listing and management application built with React and Node.js. PropSpace allows users to browse, list, and manage property rentals with user authentication and a responsive interface.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Frontend Pages](#frontend-pages)
- [Database Models](#database-models)
- [Project Structure Details](#project-structure-details)

## Overview

PropSpace is a full-stack web application that enables property owners and renters to connect through an intuitive platform. Users can create accounts, list properties with details and images, browse available listings, and manage their profiles.

## Features

### User Management

- User registration and login with JWT authentication
- Password encryption with bcryptjs
- User profile management
- Session-based authentication

### Property Listings

- Browse all available properties
- Create and list new properties
- Edit and delete own property listings
- Property search and filtering
- Detailed property information including:
  - Title and description
  - Price
  - Location (city, country)
  - Property type (Apartment, House, Studio)
  - Images
  - Timestamps (created/updated dates)

### Frontend

- Responsive user interface
- Navigation between pages via React Router
- Property card components for browsing
- Form components for creating/editing properties
- Dashboard for property management
- User profile page

## Project Structure

```
Full-Stack-Project/
├── README.md                 # This file
├── backend/                  # Express.js backend server
│   ├── package.json
│   ├── server.js            # Main server file
│   ├── config/
│   │   └── db.js            # Database configuration
│   ├── controllers/         # Business logic
│   │   ├── authController.js
│   │   ├── propertyController.js
│   │   └── userController.js
│   ├── middleware/          # Express middleware
│   │   └── auth.js          # JWT authentication middleware
│   ├── models/              # Mongoose database models
│   │   ├── Property.js
│   │   └── User.js
│   └── routes/              # API route handlers
│       ├── auth.js
│       ├── properties.js
│       └── users.js
└── frontend/                # React + Vite frontend
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── main.jsx         # React entry point
        ├── App.jsx          # Root component
        ├── styles.css       # Global styles
        |── components/      # Reusable components
        │   ├── Header.jsx
        │   ├── PropertyCard.jsx
        │   └── PropertyForm.jsx
        └── pages/           # Page components
            ├── HomePage.jsx
            ├── LoginPage.jsx
            ├── RegisterPage.jsx
            ├── DashboardPage.jsx
            ├── ProfilePage.jsx
            ├── PropertyDetailPage.jsx
            ├── PropertyEditPage.jsx
            └── PropertyFormPage.jsx
```

## Technology Stack

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT (jsonwebtoken)** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Environment variables

### Frontend

- **React** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **CSS** - Styling

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB instance (local or cloud)

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the backend directory (see `.env.example` for required variables)

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

## Environment Setup

Create a `.env` file in the backend directory by copying `.env.example`:

```bash
cp .env.example .env
```

Then fill in the values with your actual configuration:

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT signing (use a strong random value)

**⚠️ IMPORTANT:** Never commit `.env` files to version control. Use `.env.example` to document required variables.

## Running the Application

### Running Backend

```bash
cd backend

# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The backend server will be available at `http://localhost:5000`

Health check endpoint: `GET /api/health`

### Running Frontend

```bash
cd frontend

# Development mode
npm start

# Build for production
npm run build

# Preview production build
npm preview
```

The frontend will be available at `http://localhost:5173` (default Vite port)

## API Endpoints

### Authentication Endpoints (`/api/auth`)

- `POST /register` - Register a new user
- `POST /login` - Login and receive JWT token

### Property Endpoints (`/api/properties`)

- `GET /` - Fetch all properties
- `POST /` - Create a new property (requires auth)
- `GET /:id` - Fetch a specific property
- `PUT /:id` - Update a property (requires auth)
- `DELETE /:id` - Delete a property (requires auth)

### User Endpoints (`/api/users`)

- User profile management endpoints
- User-related operations and information retrieval

### System Endpoints

- `GET /api/health` - Health check endpoint

## Frontend Pages

| Page               | Route                | Description                         |
| ------------------ | -------------------- | ----------------------------------- |
| HomePage           | `/`                  | Landing page with property listings |
| LoginPage          | `/login`             | User login form                     |
| RegisterPage       | `/register`          | User registration form              |
| DashboardPage      | `/dashboard`         | User's property listings dashboard  |
| ProfilePage        | `/profile`           | User profile management             |
| PropertyDetailPage | `/property/:id`      | Detailed view of a single property  |
| PropertyEditPage   | `/property/:id/edit` | Edit an existing property           |
| PropertyFormPage   | `/property/new`      | Create a new property listing       |

## Database Models

### User Model

- Email (unique)
- Password (hashed)
- Name
- Profile information
- Timestamps

### Property Model

- Author (reference to User)
- Title
- Description
- Price
- Location (city, country)
- Property Type (Apartment, House, Studio)
- Image URLs
- Timestamps (created/updated)

## Project Structure Details

### Backend Architecture

**Controllers**: Handle business logic and API request processing

- `authController.js` - Manages user registration and login
- `propertyController.js` - Manages property CRUD operations
- `userController.js` - Manages user profile operations

**Models**: Define data schema with Mongoose

- Enforce data validation
- Manage relationships between collections

**Routes**: Define API endpoints and middleware

- Connect HTTP requests to controllers
- Apply authentication middleware where needed

**Middleware**: Handle cross-cutting concerns

- `auth.js` - Validates JWT tokens and protects routes

### Frontend Architecture

**Components**: Reusable UI elements

- `Header.jsx` - Navigation and branding
- `PropertyCard.jsx` - Individual property display
- `PropertyForm.jsx` - Form for creating/editing properties

**Pages**: Full page views

- User authentication pages (Login, Register)
- Property browsing pages (Home, Detail)
- User management pages (Profile, Dashboard)
- Property management pages (Edit, Form)

### Assets and Images

The frontend includes an organized assets folder structure for managing static files and images with built-in placeholder support:

**Placeholder Images by Property Type:**

import apartmentImage from 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=400&fit=crop';
import houseImage from 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=400&fit=crop';
import studioImage from 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=500&h=400&fit=crop';


<!-- **Real Property Images:**

The seeding script includes high-quality photographs from Unsplash:

- Modern apartments with glass windows and city views
- Spacious family homes with gardens and driveways
- Studio apartments with contemporary design
- Luxury penthouses with panoramic views
- Beachfront villas with ocean access -->

**Asset Organization**:

- `assets/images/` - All image files
  - `properties/` - Placeholder images and property listing images
  - `ui/` - UI-related images such as backgrounds or decorative elements
- `assets/icons/` - Application icons and icon assets

**Using Property Images in Components:**

The `propertyImageUtils.js` file provides utilities for handling property images with automatic fallback to placeholders:

```jsx
import { getPropertyImage } from "../utils/propertyImageUtils";

// In your component
const imageUrl = getPropertyImage(property.propertyType, property.imageUrls);
// Returns first custom image if available, otherwise returns placeholder for property type
```

**Available Functions:**

- `getPropertyImage(propertyType, imageUrls)` - Get primary image with type-specific fallback
- `getPropertyImages(imageUrls, propertyType)` - Get all images as array

**PropertyCard Component:**

The PropertyCard component automatically displays:

- Property images (custom or placeholder)
- Property type badge
- Title, description, location, and price
- Link to detailed property view

**Image Management:**

- Store static placeholder images in the assets folder
- Property images uploaded by users are stored via backend/cloud service
- Custom images in the `imageUrls` array take priority over placeholders
- Placeholders ensure good UX even when images are missing

**Backend Image Linking:**

Properties store images in MongoDB as an array of URLs:

```javascript
{
  title: "Modern Apartment",
  propertyType: "Apartment",
  imageUrls: [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ]
}
```

**Populating Sample Properties:**

Run the seeding script to populate the database with sample properties containing linked images:

```bash
cd backend
node seeds/seedProperties.js
```

This creates sample properties with:

- All three property types (Apartment, House, Studio)
- High-quality real photographs from Unsplash
- Realistic property descriptions
- Multiple images per property
- Development and testing data ready to use

## Development Workflow

1. Clone the repository
2. Set up environment variables
3. Install dependencies for both backend and frontend
4. Start MongoDB
5. (Optional) Run `node seeds/seedProperties.js` to populate sample data with real images
6. Run backend: `npm run dev` in backend directory
7. Run frontend: `npm start` in frontend directory
8. Navigate to `http://localhost:5173` to access the application


**Real Property Images (from Unsplash):**

- Free, royalty-free stock photography
- Professional property and interior photos
- Optimized for web (50-150KB per image)
- Diverse property styles and locations

## Notes

- The backend uses port 5000 by default (configurable via .env)
- The frontend uses port 5173 by default (Vite default)
- CORS is enabled for communication between frontend and backend
- JWT tokens are used for protecting authenticated routes
- All passwords are hashed using bcryptjs for security
