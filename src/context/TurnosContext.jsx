import { createContext, useContext, useState, useEffect } from "react";
import { mockAppointments, mockClients, servicesList, statsData } from "@/components/demos/turnos/data/mockData";

const TurnosContext = createContext();

export const useTurnos = () => {
    const context = useContext(TurnosContext);
    if (!context) {
        throw new Error("useTurnos must be used within a TurnosProvider");
    }
    return context;
};

export const TurnosProvider = ({ children }) => {
    const [user, setUser] = useState(null); // { name: "Admin", email: "admin@demo.com" }
    const [appointments, setAppointments] = useState(mockAppointments);
    const [clients, setClients] = useState(mockClients);
    const [services, setServices] = useState(servicesList);
    const [stats, setStats] = useState(statsData);
    const [darkMode, setDarkMode] = useState(true);

    // Simulate login
    const login = (email, password) => {
        // In a real app, validate credentials
        setUser({ name: "Mili Nails", email: email, avatar: "https://i.pravatar.cc/150?u=admin" });
        return true;
    };

    const logout = () => {
        setUser(null);
    };

    const addAppointment = (newAppointment) => {
        const id = Math.random().toString(36).substr(2, 9);
        setAppointments([...appointments, { ...newAppointment, id, status: "pending" }]);
    };

    const updateAppointmentStatus = (id, status) => {
        setAppointments(appointments.map(app => app.id === id ? { ...app, status } : app));
    };

    const deleteAppointment = (id) => {
        setAppointments(appointments.filter(app => app.id !== id));
    };

    const addClient = (newClient) => {
        const id = Math.random().toString(36).substr(2, 9);
        setClients([...clients, { ...newClient, id, totalSpent: 0, lastVisit: "-" }]);
    };

    const value = {
        user,
        login,
        logout,
        appointments,
        addAppointment,
        updateAppointmentStatus,
        deleteAppointment,
        clients,
        addClient,
        services,
        stats,
        darkMode,
        setDarkMode
    };

    return (
        <TurnosContext.Provider value={value}>
            {children}
        </TurnosContext.Provider>
    );
};
