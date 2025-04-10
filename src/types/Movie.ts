import {Genre} from "./Genre.ts";

export interface Movie {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    poster_url: string;
    backdrop_url: string;
    genre_ids: number[]; // Used in listings.
    genres?: Genre[];     // Genres to present in the detail-view
    vote_average: number;
    runtime?: number;
    trailerYoutubeId?: string;
    credits?: {
        cast: Person[];
        crew: Person[];
    };
}

export interface Person {
    id: number;
    name: string;
    profile_url: string | null;
    job?: string;
    character?: string;
}
