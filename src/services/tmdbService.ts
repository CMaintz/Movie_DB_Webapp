import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL = "https://api.themoviedb.org/3";



export const fetchMovieDetails = async (movieId: number) => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
            params: {
                api_key: API_KEY,
                append_to_response: 'videos,credits',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw error;
    }
};

export const fetchGenres = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
            params: {
                api_key: API_KEY,
                language: 'en-US'
            }
        });
        return response.data.genres; // Assuming the data contains genres
    } catch (error) {
        console.error('Error fetching genres:', error);
        throw error; // Propagate the error so it can be handled in the calling component
    }
};

export const fetchMoviesByGenre = async (genreId: number, page = 1) => {
    try {
        const response = await axios.get(`${BASE_URL}/discover/movie`, {
            params: {
                api_key: API_KEY,
                with_genres: genreId,
                page,
            },
        });
        return response.data.results; // array of movie objects
    } catch (error) {
        console.error('Error fetching movies by genre:', error);
        throw error;
    }
};

