export const mockAppointments = [
    {
        id: "1",
        clientName: "María González",
        service: "Kapping Gel",
        date: "2023-11-25",
        time: "10:00",
        status: "confirmed", // confirmed, pending, cancelled
        price: 4500,
        avatar: "https://i.pravatar.cc/150?u=1"
    },
    {
        id: "2",
        clientName: "Lucía Fernández",
        service: "Semipermanente",
        date: "2023-11-25",
        time: "11:30",
        status: "pending",
        price: 3500,
        avatar: "https://i.pravatar.cc/150?u=2"
    },
    {
        id: "3",
        clientName: "Sofía Martínez",
        service: "Esculpidas",
        date: "2023-11-25",
        time: "14:00",
        status: "confirmed",
        price: 6000,
        avatar: "https://i.pravatar.cc/150?u=3"
    },
    {
        id: "4",
        clientName: "Valentina López",
        service: "Nail Art",
        date: "2023-11-26",
        time: "09:00",
        status: "confirmed",
        price: 2500,
        avatar: "https://i.pravatar.cc/150?u=4"
    },
    {
        id: "5",
        clientName: "Camila Torres",
        service: "Service",
        date: "2023-11-26",
        time: "16:00",
        status: "cancelled",
        price: 3000,
        avatar: "https://i.pravatar.cc/150?u=5"
    }
];

export const mockClients = [
    { id: "1", name: "María González", phone: "3415550001", email: "maria@email.com", lastVisit: "2023-10-20", totalSpent: 15000 },
    { id: "2", name: "Lucía Fernández", phone: "3415550002", email: "lucia@email.com", lastVisit: "2023-11-05", totalSpent: 8500 },
    { id: "3", name: "Sofía Martínez", phone: "3415550003", email: "sofia@email.com", lastVisit: "2023-11-15", totalSpent: 22000 },
    { id: "4", name: "Valentina López", phone: "3415550004", email: "valentina@email.com", lastVisit: "2023-09-30", totalSpent: 5000 },
    { id: "5", name: "Camila Torres", phone: "3415550005", email: "camila@email.com", lastVisit: "2023-11-10", totalSpent: 12000 },
];

export const servicesList = [
    { id: "s1", name: "Kapping Gel", price: 4500, duration: 60, color: "bg-purple-500" },
    { id: "s2", name: "Semipermanente", price: 3500, duration: 45, color: "bg-pink-500" },
    { id: "s3", name: "Esculpidas", price: 6000, duration: 90, color: "bg-blue-500" },
    { id: "s4", name: "Nail Art", price: 2500, duration: 30, color: "bg-yellow-500" },
    { id: "s5", name: "Service", price: 3000, duration: 60, color: "bg-teal-500" },
    { id: "s6", name: "Retiro", price: 1500, duration: 20, color: "bg-red-500" },
];

export const statsData = {
    totalTurnos: 145,
    ingresos: 450000,
    nuevosClientes: 12,
    ocupacion: 85
};
