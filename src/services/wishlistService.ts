// services/wishlistService.ts

import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { User } from '../types/User'; // Brugerdefineret type
import { Movie } from '../types/Movie'; // Brugerdefineret type

// Hent en brugers ønskeliste fra Firestore
export const getWishlist = async (userId: string): Promise<Movie[]> => {
    const userDocRef = doc(db, 'users', userId);  // Referencen til brugerens dokument i Firestore
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
        console.error('User not found!');
        return [];
    }

    const userData = userDoc.data() as User;  // Hent brugerens data
    const wishlist: Movie[] = [];

    for (let movieId of userData.watchlist) {
        // For hver film-ID, hent filmdata fra TMDB API
        const movieData = await fetchMovieFromTMDB(movieId);  // En helper funktion til at hente filmdata
        if (movieData) wishlist.push(movieData);
    }

    return wishlist;
};

// Tilføj en film til brugerens ønskeliste
export const addToWishlist = async (userId: string, movieId: number): Promise<void> => {
    const userDocRef = doc(db, 'users', userId);  // Referencen til brugerens dokument i Firestore
    await updateDoc(userDocRef, {
        watchlist: arrayUnion(movieId)  // Tilføj film-ID til ønskelisten
    });
};

// Fjern en film fra brugerens ønskeliste
export const removeFromWishlist = async (userId: string, movieId: number): Promise<void> => {
    const userDocRef = doc(db, 'users', userId);  // Referencen til brugerens dokument i Firestore
    await updateDoc(userDocRef, {
        watchlist: arrayRemove(movieId)  // Fjern film-ID fra ønskelisten
    });
};

// Hent filmdata fra TMDB API
const fetchMovieFromTMDB = async (movieId: number): Promise<Movie | null> => {
    const tmdbApiKey = process.env.REACT_APP_TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${tmdbApiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data && data.id) {
        return {
            id: data.id,
            title: data.title,
            overview: data.overview,
            release_date: data.release_date,
            poster_path: data.poster_path,
            backdrop_path: data.backdrop_path,
            genre_ids: data.genre_ids
        };
    }

    return null;
};
