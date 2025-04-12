import { useState, useEffect } from 'react';
import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { onAuthStateChangedListener } from './services/firebaseAuthService';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar.tsx';
import { User } from 'firebase/auth';

const App = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        onAuthStateChangedListener((user) => {
            setUser(user);
        });
    }, []);

    return (
        <>
            <CssBaseline />
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={user ? <HomePage /> : <LoginPage />} />
                </Routes>
            </Router>
        </>
    );
};

export default App;