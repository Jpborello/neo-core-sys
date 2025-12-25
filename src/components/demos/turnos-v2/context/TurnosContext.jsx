import React, { createContext, useContext, useReducer, useEffect } from 'react';

// --- MOCK DATABASE ---

const SERVICES = [
    { id: 'srv_1', name: 'Consulta Nutricional', duration: 45, price: 50, buffer_after: 15, category: 'Salud' },
    { id: 'srv_2', name: 'Entrenamiento Personal', duration: 60, price: 35, buffer_after: 10, category: 'Fitness' },
    { id: 'srv_3', name: 'Limpieza Facial Profunda', duration: 90, price: 80, buffer_after: 20, category: 'Estética' },
    { id: 'srv_4', name: 'Asesoría de Imagen', duration: 120, price: 150, buffer_after: 30, category: 'Estilo' },
];

// Professionals with specific skills and schedules
// schedule: { dayIndex: [startHour, endHour] } (0=Sunday)
const PROFESSIONALS = [
    {
        id: 'pro_1',
        name: 'Dra. Sofía Lopez',
        role: 'Nutricionista',
        services: ['srv_1'],
        schedule: { 1: ['09:00', '13:00'], 3: ['14:00', '18:00'], 5: ['09:00', '12:00'] }
    },
    {
        id: 'pro_2',
        name: 'Marcos Fit',
        role: 'Entrenador',
        services: ['srv_2'],
        schedule: { 1: ['07:00', '11:00'], 2: ['07:00', '11:00'], 3: ['07:00', '11:00'], 4: ['07:00', '11:00'], 5: ['07:00', '11:00'] }
    },
    {
        id: 'pro_3',
        name: 'Clara Estética',
        role: 'Esteticista',
        services: ['srv_3', 'srv_4'],
        schedule: { 2: ['10:00', '19:00'], 4: ['10:00', '19:00'], 6: ['09:00', '14:00'] }
    },
];

const CLIENTS = [
    { id: 'cli_1', name: 'Juan Perez', email: 'juan@demo.com', phone: '555-0101', stats: { total_appointments: 5, cancellations: 0 } },
    { id: 'cli_2', name: 'Ana Garcia', email: 'ana@demo.com', phone: '555-0202', stats: { total_appointments: 3, cancellations: 2 } }, // High cancellation risk?
];

const BUSINESS_RULES = {
    min_cancellation_time_hours: 24,
    max_booking_advance_days: 30,
    auto_block_cancellations: 3,
    time_zone: 'America/Argentina/Buenos_Aires', // For display purposes
};

// Initial State
const initialState = {
    services: SERVICES,
    professionals: PROFESSIONALS,
    clients: CLIENTS,
    businessRules: BUSINESS_RULES,
    appointments: [], // { id, serviceId, proId, clientId, start(ISO), end(ISO), status: 'confirmed'|'cancelled'|'completed' }
    currentUserMode: 'client', // 'client' | 'admin' | 'pro'
    selectedProId: null, // For PRO view
};

// Actions
export const ACTIONS = {
    ADD_APPOINTMENT: 'ADD_APPOINTMENT',
    CANCEL_APPOINTMENT: 'CANCEL_APPOINTMENT',
    SET_USER_MODE: 'SET_USER_MODE',
    SET_SELECTED_PRO: 'SET_SELECTED_PRO',
};

const turnosReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.ADD_APPOINTMENT:
            return {
                ...state,
                appointments: [...state.appointments, { ...action.payload, id: `appt_${Date.now()}`, status: 'confirmed' }],
            };
        case ACTIONS.CANCEL_APPOINTMENT:
            return {
                ...state,
                appointments: state.appointments.map(appt =>
                    appt.id === action.payload.id ? { ...appt, status: 'cancelled' } : appt
                ),
            };
        case ACTIONS.SET_USER_MODE:
            return { ...state, currentUserMode: action.payload };
        case ACTIONS.SET_SELECTED_PRO:
            return { ...state, selectedProId: action.payload };
        default:
            return state;
    }
};

const TurnosContext = createContext();

export const TurnosProvider = ({ children }) => {
    const [state, dispatch] = useReducer(turnosReducer, initialState);

    // Helper to check availability (could be moved to a hook, but good to have access here)
    const isSlotAvailable = (proId, startIso, endIso) => {
        // 1. Check Pro Schedule (Base hours) - Simplified for MVP
        // 2. Check collisions
        const collision = state.appointments.find(appt =>
            appt.proId === proId &&
            appt.status === 'confirmed' &&
            ((startIso >= appt.start && startIso < appt.end) ||
                (endIso > appt.start && endIso <= appt.end) ||
                (startIso <= appt.start && endIso >= appt.end))
        );
        return !collision;
    };

    const value = {
        state,
        dispatch,
        isSlotAvailable
    };

    return <TurnosContext.Provider value={value}>{children}</TurnosContext.Provider>;
};

export const useTurnos = () => {
    const context = useContext(TurnosContext);
    if (!context) {
        throw new Error('useTurnos must be used within a TurnosProvider');
    }
    return context;
};
