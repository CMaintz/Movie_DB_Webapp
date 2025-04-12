import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
//> - `image.tmdb.org/t/p/<size>` is the correct TMDB image base URL.
// > - Use `w500` or similar (available sizes: `w92`, `w154`, `w185`, `w342`, `w500`, `w780`, `original`).
// >
// >
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const fetchMoviesByGenre = async (genreId: number, page = 1) => {
    try {
        const response = await axios.get(`${BASE_URL}/discover/movie`, {
            params: {
                api_key: API_KEY,
                with_genres: genreId,
                page,
            },
        });

        return {
            movies: response.data.results.map((movie: any) => ({
                id: movie.id,
                title: movie.title,
                poster_url: movie.poster_path
                    ? `${IMAGE_BASE_URL}${movie.poster_path}`
                    : 'placeholder_or_default_image_url_here',//TODO: Add Louie pics to assets or something? Maybe fake posters? Idk.
                overview: movie.overview,
                genre_ids: movie.genre_ids,
                release_date: movie.release_date,
                vote_average: movie.vote_average,
            })),
            page: response.data.page,
            totalPages: response.data.total_pages,
            totalResults: response.data.total_results,
        };
    } catch (error) {
        console.error('Error fetching movies by genre:', error);
        throw error;
    }
};


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


