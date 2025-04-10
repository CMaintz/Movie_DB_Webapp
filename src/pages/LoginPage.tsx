// src/pages/LoginPage.tsx

import { useState } from 'react';
import { Button, TextField, Typography, Container, FormHelperText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebaseService'; // Assuming firebaseAuthService handles this

const LoginPage = () => {
    const navigate = useNavigate();

    // States for handling input values
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>(''); // Used for signup only
    const [isSignUp, setIsSignUp] = useState<boolean>(false); // Determines if we're in sign-up or sign-in mode
    const [passwordError, setPasswordError] = useState<boolean>(false); // To handle password mismatch error

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isSignUp) {
            // If signing up, check if passwords match
            if (password !== confirmPassword) {
                setPasswordError(true);
                return;
            }
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                navigate('/'); // Navigate to HomePage after successful sign-up
            } catch (error) {
                console.error(error);
            }
        } else {
            // If signing in, no password confirmation needed
            try {
                await signInWithEmailAndPassword(auth, email, password);
                navigate('/'); // Navigate to HomePage after successful sign-in
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h4" align="center" gutterBottom>
                {isSignUp ? 'Sign Up' : 'Sign In'}
            </Typography>

            <form onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {isSignUp && (
                    <>
                        <TextField
                            label="Confirm Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        {passwordError && (
                            <FormHelperText error>
                                Passwords do not match
                            </FormHelperText>
                        )}
                    </>
                )}

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ marginTop: 2 }}
                >
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </Button>

                <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    sx={{ marginTop: 2 }}
                    onClick={() => setIsSignUp(!isSignUp)} // Toggle between sign-up and sign-in
                >
                    {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                </Button>
            </form>
        </Container>
    );
};

export default LoginPage;
