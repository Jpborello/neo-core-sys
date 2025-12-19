export const initialUsers = [
    { id: 1, name: "Carlos Ruiz", email: "carlos@mail.com", plan: "Premium", lastVisit: "2023-11-20", visitsThisMonth: 12, status: "Active" },
    { id: 2, name: "Ana Gomez", email: "ana@mail.com", plan: "Basic", lastVisit: "2023-11-10", visitsThisMonth: 2, status: "Active" },
    { id: 3, name: "Luis Torres", email: "luis@mail.com", plan: "Premium", lastVisit: "2023-10-25", visitsThisMonth: 0, status: "Active" },
    { id: 4, name: "Maria Lopez", email: "maria@mail.com", plan: "Basic", lastVisit: "2023-11-21", visitsThisMonth: 15, status: "Active" },
    { id: 5, name: "Pedro Diaz", email: "pedro@mail.com", plan: "Premium", lastVisit: "2023-11-18", visitsThisMonth: 8, status: "Active" },
    { id: 6, name: "Sofia Silva", email: "sofia@mail.com", plan: "Basic", lastVisit: "2023-11-05", visitsThisMonth: 1, status: "Active" },
    { id: 7, name: "Jorge Martinez", email: "jorge@mail.com", plan: "Premium", lastVisit: "2023-11-22", visitsThisMonth: 20, status: "Active" },
    { id: 8, name: "Lucia Fernandez", email: "lucia@mail.com", plan: "Basic", lastVisit: "2023-11-15", visitsThisMonth: 4, status: "Active" },
];

export const initialAttendance = [
    { day: "Lun", count: 45 },
    { day: "Mar", count: 52 },
    { day: "Mié", count: 48 },
    { day: "Jue", count: 60 },
    { day: "Vie", count: 55 },
    { day: "Sáb", count: 30 },
    { day: "Dom", count: 15 },
];

export const initialQuotas = [
    { id: 1, userId: 1, amount: 5000, dueDate: "2023-11-30", status: "Paid" },
    { id: 2, userId: 2, amount: 3000, dueDate: "2023-11-25", status: "Pending" },
    { id: 3, userId: 3, amount: 5000, dueDate: "2023-11-10", status: "Overdue" },
];
