import { createContext, useState, useContext, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; // Install this using `npm install jwt-decode`
import toast from 'react-hot-toast';

// Create the UserContext
const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    console.log(userData);
    // Check token validity
    const checkTokenExpiration = (token) => {
        try {
            const { exp } = jwtDecode(token); // Decode the token to extract the expiration time
            const currentTime = Date.now() / 1000; // Get current time in seconds
            return exp > currentTime; 
        } catch (error) {
            return false; 
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUserData = JSON.parse(localStorage.getItem('userData'));

        if (token && storedUserData) {
            const isValid = checkTokenExpiration(token);

            if (isValid) {
                setIsLoggedIn(true);
                setUserData(storedUserData);
            } else {
                logout();
            }
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const token = localStorage.getItem('token');
            if (token && !checkTokenExpiration(token)) {
                logout();
            }
        }, 60000); // Check every 60 seconds

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    const login = (token, user) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userData', JSON.stringify(user));
        setIsLoggedIn(true);
        setUserData(user);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        setIsLoggedIn(false);
        setUserData(null);
        toast.success('Logout successful');
    };

    return (
        <UserContext.Provider value={{ isLoggedIn, userData, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
