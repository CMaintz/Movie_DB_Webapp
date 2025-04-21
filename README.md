# MovieDB - Movie Database Web Application

![MovieDB](https://img.shields.io/badge/MovieDB-React%20%7C%20TypeScript%20%7C%20Material%20UI-2196f3)

A modern, responsive web application for browsing movies and TV shows, powered by The Movie Database (TMDB) API. Built with React, TypeScript, and Material UI.

![Dark Theme](https://img.shields.io/badge/Theme-Dark-121212)

## ✨ Features

- **Movie & TV Show Browsing**: Explore trending movies and TV shows
- **Detailed Media Information**: View comprehensive details for each movie/show, including:
    - Cast and crew information
    - Trailers and videos
    - Ratings and release information
- **Genre-based Discovery**: Browse content by genres
- **User Authentication**: Create an account, log in, and manage your profile
- **Wishlist Functionality**: Save your favorite movies and shows to your personal wishlist
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices
- **Dark Theme**: Eye-friendly dark mode for comfortable viewing

## 🛠️ Technology Stack

- **Frontend Framework**: React 19 with TypeScript
- **State Management**: React Query (TanStack Query) for server state
- **UI Component Library**: Material UI v7
- **Routing**: React Router v7
- **Authentication**: Firebase Authentication
- **Storage**: Firebase Firestore
- **API Integration**: TMDB API
- **Build Tool**: Vite
- **CSS-in-JS**: Emotion

## 📋 Prerequisites

- Node.js (v18 or newer)
- npm or yarn
- TMDB API key (get one from [themoviedb.org](https://www.themoviedb.org/))
- Firebase project (for authentication & Wishlist storage in firestore)

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/CMaintz/Movie_DB_Webapp.git
   cd MovieDB
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following (or rename the .env.example file)
   ```
   VITE_TMDB_API_KEY=your_tmdb_api_key
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Build for production**
   ```bash
   npm run build
   # or
   yarn build
   ```


## 🔍 Project Structure

```
src/
├── assets/         # Static assets
├── components/     # Reusable UI components
├── config/         # Configuration files
├── context/        # React context providers
├── hooks/          # Custom React hooks
├── pages/          # Application pages
├── services/       # API and external services
├── utils/          # Utility functions
├── types.ts        # TypeScript type definitions
└── theme.ts        # Material UI theme customization
```

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for their excellent API
- [Material UI](https://mui.com/) for the component library
- [Firebase](https://firebase.google.com/) for authentication services

## Attribution
 ![tmdbLogo](https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg)
This product uses the TMDB API but is not endorsed or certified by TMDB.
