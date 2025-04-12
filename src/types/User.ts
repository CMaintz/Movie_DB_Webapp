export interface User {
    uid: string;
    email: string | null;
    displayName?: string | null;
    watchlist: number[];  // Array af film-ID'er, der er på brugerens watchlist
}
