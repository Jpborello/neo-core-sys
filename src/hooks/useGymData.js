import { useState, useEffect } from "react";
import { initialUsers, initialAttendance, initialQuotas } from "@/components/demos/gym-ai/data/initialData";

export function useGymData() {
    // Users State
    const [users, setUsers] = useState(() => {
        const saved = localStorage.getItem("neogym_users");
        return saved ? JSON.parse(saved) : initialUsers;
    });

    // Attendance State
    const [attendance, setAttendance] = useState(() => {
        const saved = localStorage.getItem("neogym_attendance");
        return saved ? JSON.parse(saved) : initialAttendance;
    });

    // Quotas State
    const [quotas, setQuotas] = useState(() => {
        const saved = localStorage.getItem("neogym_quotas");
        return saved ? JSON.parse(saved) : initialQuotas;
    });

    // Persistence
    useEffect(() => {
        localStorage.setItem("neogym_users", JSON.stringify(users));
    }, [users]);

    useEffect(() => {
        localStorage.setItem("neogym_attendance", JSON.stringify(attendance));
    }, [attendance]);

    useEffect(() => {
        localStorage.setItem("neogym_quotas", JSON.stringify(quotas));
    }, [quotas]);

    // Actions
    const addUser = (user) => {
        setUsers([...users, { ...user, id: Date.now(), status: "Active", visitsThisMonth: 0 }]);
    };

    return { users, attendance, quotas, addUser };
}
