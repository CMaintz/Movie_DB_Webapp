import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import GenreMovieList from '../pages/GenreMovieList.tsx';
import MovieDetailPage from '../pages/MovieDetailPage';
import WishlistPage from '../pages/WishlistPage';
import { useAuthContext } from '../context/AuthContext';

const AppRoutes = () => {
    const { user } = useAuthContext();

    return (
        <Routes>
            <Route path="/" element={user ? <HomePage /> : <Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/genre/:id" element={<GenreMovieList />} />
            <Route path="/movie/:id" element={<MovieDetailPage />} />
            <Route path="/wishlist" element={user ? <WishlistPage /> : <Navigate to="/login" />} />
            {/* Optional: fallback */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRoutes;
