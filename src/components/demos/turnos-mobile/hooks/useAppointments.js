import { useLocalStorage } from "./useLocalStorage";

export function useAppointments() {
    const [appointments, setAppointments] = useLocalStorage("neo_turnos_mobile", []);

    const addAppointment = (appointment) => {
        const newAppointment = {
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            status: "confirmed",
            ...appointment,
        };
        setAppointments((prev) => [...prev, newAppointment]);
        return newAppointment;
    };

    const cancelAppointment = (id) => {
        setAppointments((prev) =>
            prev.map((app) =>
                app.id === id ? { ...app, status: "cancelled" } : app
            )
        );
    };

    const getAppointmentsByDate = (date) => {
        return appointments.filter((app) => app.date === date && app.status !== "cancelled");
    };

    return {
        appointments,
        addAppointment,
        cancelAppointment,
        getAppointmentsByDate,
    };
}
