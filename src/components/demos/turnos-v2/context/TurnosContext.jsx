import React, { createContext, useContext, useReducer, useEffect } from 'react';

// --- MOCK DATABASE (V2.1) ---

const SPECIALIZATIONS = [
    { id: 'spec_1', name: 'Manicura', icon: '💅' },
    { id: 'spec_2', name: 'Nutrición', icon: '🥗' },
    { id: 'spec_3', name: 'Fitness', icon: '💪' },
    { id: 'spec_4', name: 'Estética', icon: '✨' },
];

const SERVICES = [
    // Manicura
    { id: 'srv_1', specializationId: 'spec_1', name: 'Capping', duration: 60, price: 25000, buffer_after: 15, requiresDeposit: true, depositPercent: 50 },
    { id: 'srv_2', specializationId: 'spec_1', name: 'Sofgel', duration: 40, price: 15000, buffer_after: 10, requiresDeposit: true, depositPercent: 50 },

    // Nutricion
    { id: 'srv_3', specializationId: 'spec_2', name: 'Consulta Nutricional', duration: 45, price: 20000, buffer_after: 15, requiresDeposit: false, depositPercent: 0 },

    // Fitness
    { id: 'srv_4', specializationId: 'spec_3', name: 'Entrenamiento Personal', duration: 60, price: 15000, buffer_after: 10, requiresDeposit: false, depositPercent: 0 },

    // Estetica
    { id: 'srv_5', specializationId: 'spec_4', name: 'Limpieza Facial Profunda', duration: 90, price: 35000, buffer_after: 20, requiresDeposit: true, depositPercent: 30 },
];

// Professionals with specific skills and schedules
// schedule: { dayIndex: [startHour, endHour] } (0=Sunday, 1=Monday, etc.)
const PROFESSIONALS = [
    {
        id: 'pro_1',
        name: 'Dra. Sofía Lopez',
        role: 'Nutricionista',
        specializations: ['spec_2'],
        services: ['srv_3'], // Legacy compatibility, ideally derived from specs
        schedule: { 1: ['09:00', '13:00'], 3: ['14:00', '18:00'], 5: ['09:00', '12:00'] }
    },
    {
        id: 'pro_2',
        name: 'Marcos Fit',
        role: 'Entrenador',
        specializations: ['spec_3'],
        services: ['srv_4'],
        schedule: { 1: ['07:00', '11:00'], 2: ['07:00', '11:00'], 3: ['07:00', '11:00'], 4: ['07:00', '11:00'], 5: ['07:00', '11:00'] }
    },
    {
        id: 'pro_3',
        name: 'Clara Estética',
        role: 'Esteticista',
        specializations: ['spec_1', 'spec_4'],
        services: ['srv_1', 'srv_2', 'srv_5'],
        schedule: { 2: ['10:00', '19:00'], 4: ['10:00', '19:00'], 6: ['09:00', '14:00'] }
    },
];

const CLIENTS = [
    { id: 'cli_1', name: 'Juan Perez', email: 'juan@demo.com', phone: '555-0101', stats: { total_appointments: 5, cancellations: 0 } },
    { id: 'cli_2', name: 'Ana Garcia', email: 'ana@demo.com', phone: '555-0202', stats: { total_appointments: 3, cancellations: 2 } },
];

const BUSINESS_RULES = {
    min_cancellation_time_hours: 24,
    max_booking_advance_days: 30,
    deposit_policy: 'non_refundable_if_late_cancel', // New rule
    time_zone: 'America/Argentina/Buenos_Aires',
};

// Initial State
const initialState = {
    specializations: SPECIALIZATIONS, // New
    services: SERVICES,
    professionals: PROFESSIONALS,
    clients: CLIENTS,
    businessRules: BUSINESS_RULES,
    appointments: [],
    currentUserMode: 'client',
    selectedProId: null,
};

// Actions
export const ACTIONS = {
    ADD_APPOINTMENT: 'ADD_APPOINTMENT',
    CANCEL_APPOINTMENT: 'CANCEL_APPOINTMENT',
    SET_USER_MODE: 'SET_USER_MODE',
    SET_SELECTED_PRO: 'SET_SELECTED_PRO',
    ADD_SPECIALIZATION: 'ADD_SPECIALIZATION',
    ADD_SERVICE: 'ADD_SERVICE',
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
        case ACTIONS.ADD_SPECIALIZATION:
            return { ...state, specializations: [...state.specializations, action.payload] };
        case ACTIONS.ADD_SERVICE:
            return { ...state, services: [...state.services, action.payload] };
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
