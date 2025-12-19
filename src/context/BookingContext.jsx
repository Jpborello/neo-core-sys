import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { mockServices } from '@/components/demos/salon-hub/data/mockData';

const BookingContext = createContext();

export const useBooking = () => {
    const context = useContext(BookingContext);
    if (!context) {
        throw new Error('useBooking must be used within BookingProvider');
    }
    return context;
};

export const BookingProvider = ({ children }) => {
    const { currentUser } = useAuth();
    const [appointments, setAppointments] = useState([]);
    const [services, setServices] = useState([]);

    // Load data from localStorage
    useEffect(() => {
        console.log("BookingProvider mounting");
        const storedAppointments = localStorage.getItem('salonhub_appointments');
        const storedServices = localStorage.getItem('salonhub_services');

        if (storedAppointments) {
            setAppointments(JSON.parse(storedAppointments));
        }
        if (storedServices) {
            setServices(JSON.parse(storedServices));
        } else {
            console.log("Initializing mock services");
            setServices(mockServices);
            localStorage.setItem('salonhub_services', JSON.stringify(mockServices));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('salonhub_appointments', JSON.stringify(appointments));
    }, [appointments]);

    useEffect(() => {
        localStorage.setItem('salonhub_services', JSON.stringify(services));
    }, [services]);

    const createAppointment = (appointmentData) => {
        const newAppointment = {
            id: Date.now().toString(),
            ...appointmentData,
            clientId: currentUser?.id,
            clientName: currentUser?.name,
            clientEmail: currentUser?.email,
            clientPhone: currentUser?.phone,
            status: 'confirmed',
            createdAt: new Date().toISOString()
        };
        setAppointments(prev => [...prev, newAppointment]);
        return { success: true, appointment: newAppointment };
    };

    const getClientAppointments = (clientId) => {
        return appointments.filter(apt => apt.clientId === clientId);
    };

    const getTodayAppointments = () => {
        const today = new Date().toISOString().split('T')[0];
        return appointments.filter(apt => apt.date === today && apt.status !== 'cancelled');
    };

    const getUpcomingAppointments = () => {
        const today = new Date().toISOString().split('T')[0];
        return appointments.filter(apt => apt.date >= today && apt.status !== 'cancelled')
            .sort((a, b) => new Date(a.date) - new Date(b.date));
    };

    const getMetrics = () => {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        const monthAppointments = appointments.filter(apt => {
            const aptDate = new Date(apt.date);
            return aptDate.getMonth() === currentMonth &&
                aptDate.getFullYear() === currentYear &&
                apt.status !== 'cancelled';
        });

        const totalRevenue = monthAppointments.reduce((sum, apt) => sum + (apt.servicePrice || 0), 0);

        const serviceCount = {};
        monthAppointments.forEach(apt => {
            serviceCount[apt.serviceName] = (serviceCount[apt.serviceName] || 0) + 1;
        });

        return {
            totalAppointments: monthAppointments.length,
            todayAppointments: getTodayAppointments().length,
            totalRevenue,
            mostBookedService: Object.keys(serviceCount).reduce((a, b) =>
                serviceCount[a] > serviceCount[b] ? a : b, 'N/A')
        };
    };

    const value = {
        appointments,
        services,
        createAppointment,
        getClientAppointments,
        getTodayAppointments,
        getUpcomingAppointments,
        getMetrics
    };

    return (
        <BookingContext.Provider value={value}>
            {children}
        </BookingContext.Provider>
    );
};
