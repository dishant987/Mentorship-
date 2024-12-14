// UserProvider.jsx
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';
import { UserContext } from './UserContext';

export const UserProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);

    const checkTokenExpiration = (token) => {
        try {
            const { exp } = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return exp > currentTime;
        } catch (error) {
            console.error("Invalid token:", error);
            return false;
        }
    };
    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUserData = localStorage.getItem('userData');

        if (token && storedUserData) {
            const isValid = checkTokenExpiration(token);

            if (isValid) {
                setIsLoggedIn(true);
                setUserData(JSON.parse(storedUserData));
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
        }, 60000);

        return () => clearInterval(interval);
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
