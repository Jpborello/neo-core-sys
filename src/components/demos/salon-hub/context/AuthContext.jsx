import React, { createContext, useContext, useState, useEffect } from 'react';
import { demoUsers } from '../data/mockData';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        console.log("AuthProvider mounting");
        const storedUser = localStorage.getItem('salonhub_user');
        if (storedUser) {
            console.log("Found stored user:", storedUser);
            setCurrentUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        // Check demo users
        const demoUser = Object.values(demoUsers).find(
            u => u.email === email && u.password === password
        );

        if (demoUser) {
            const user = {
                id: Math.random().toString(36).substr(2, 9),
                email: demoUser.email,
                name: demoUser.name,
                role: demoUser.role,
                avatar: `https://i.pravatar.cc/150?u=${email}`,
                phone: '+54 11 1234-5678'
            };
            setCurrentUser(user);
            localStorage.setItem('salonhub_user', JSON.stringify(user));
            return { success: true, user };
        }

        // Check registered users in localStorage
        const users = JSON.parse(localStorage.getItem('salonhub_users') || '[]');
        const registeredUser = users.find(u => u.email === email && u.password === password);

        if (registeredUser) {
            const { password: _, ...userWithoutPassword } = registeredUser;
            setCurrentUser(userWithoutPassword);
            localStorage.setItem('salonhub_user', JSON.stringify(userWithoutPassword));
            return { success: true, user: userWithoutPassword };
        }

        return { success: false, error: 'Email o contraseña incorrectos' };
    };

    const register = async (userData) => {
        const { email, password, name, phone } = userData;

        // Check if user already exists
        const users = JSON.parse(localStorage.getItem('salonhub_users') || '[]');
        if (users.find(u => u.email === email)) {
            return { success: false, error: 'El email ya está registrado' };
        }

        // Create new user
        const newUser = {
            id: Math.random().toString(36).substr(2, 9),
            email,
            password, // In real app, this would be hashed
            name,
            phone,
            role: 'client',
            avatar: `https://i.pravatar.cc/150?u=${email}`,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem('salonhub_users', JSON.stringify(users));

        // Auto-login after registration
        const { password: _, ...userWithoutPassword } = newUser;
        setCurrentUser(userWithoutPassword);
        localStorage.setItem('salonhub_user', JSON.stringify(userWithoutPassword));

        return { success: true, user: userWithoutPassword };
    };

    const loginWithGoogle = async () => {
        // Simulate Google login
        const user = {
            id: Math.random().toString(36).substr(2, 9),
            email: 'google.user@gmail.com',
            name: 'Usuario Google',
            role: 'client',
            avatar: 'https://i.pravatar.cc/150?img=8',
            phone: '+54 11 9876-5432',
            provider: 'google'
        };
        setCurrentUser(user);
        localStorage.setItem('salonhub_user', JSON.stringify(user));
        return { success: true, user };
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('salonhub_user');
    };

    const updateProfile = (updates) => {
        const updatedUser = { ...currentUser, ...updates };
        setCurrentUser(updatedUser);
        localStorage.setItem('salonhub_user', JSON.stringify(updatedUser));
        return { success: true };
    };

    const value = {
        currentUser,
        loading,
        login,
        register,
        loginWithGoogle,
        logout,
        updateProfile,
        isAuthenticated: !!currentUser,
        isAdmin: currentUser?.role === 'admin'
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
