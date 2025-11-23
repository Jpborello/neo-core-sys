import { createContext, useContext, useState } from "react";
import { revenueData, serviceDistribution, occupancyData, heatmapData, kpiData } from "../data/analyticsData";

const DashboardContext = createContext();

export const useDashboard = () => {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error("useDashboard must be used within a DashboardProvider");
    }
    return context;
};

export const DashboardProvider = ({ children }) => {
    const [dateRange, setDateRange] = useState("month");
    const [selectedService, setSelectedService] = useState("all");

    const value = {
        revenueData,
        serviceDistribution,
        occupancyData,
        heatmapData,
        kpiData,
        dateRange,
        setDateRange,
        selectedService,
        setSelectedService
    };

    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    );
};
