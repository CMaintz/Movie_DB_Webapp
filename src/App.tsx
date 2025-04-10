import { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { onAuthStateChangedListener } from './services/firebaseAuthService'; // Just import the listener
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage'; // Assuming this page exists
import HomePage from './pages/HomePage'; // This would be your authenticated landing page
import { User } from 'firebase/auth';
import Navbar from "./components/Navbar.tsx"; // Importing the User type directly from firebase/auth

const theme = createTheme({
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },
    palette: {
        primary: {
            main: '#1976d2',
        },
    },
});

const App = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        onAuthStateChangedListener((user) => {
            setUser(user); // Set user state when auth changes
        });
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={user ? <HomePage /> : <LoginPage />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;
