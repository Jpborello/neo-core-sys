import { useMemo } from "react";
import turnosData from "../data/turnos.json";

export function useAIAnalysis() {
    const analysis = useMemo(() => {
        // 1. Calculate Peak Hours
        const hourCounts = {};
        turnosData.forEach((t) => {
            hourCounts[t.hour] = (hourCounts[t.hour] || 0) + 1;
        });

        const peakHours = Object.entries(hourCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 3)
            .map(([hour]) => parseInt(hour));

        // 2. Calculate Most Popular Services
        const serviceCounts = {};
        turnosData.forEach((t) => {
            serviceCounts[t.service] = (serviceCounts[t.service] || 0) + 1;
        });

        const topServices = Object.entries(serviceCounts)
            .sort(([, a], [, b]) => b - a)
            .map(([name, count]) => ({ name, count }));

        // 3. Calculate Busiest Days
        const dayCounts = {};
        turnosData.forEach((t) => {
            dayCounts[t.day] = (dayCounts[t.day] || 0) + 1;
        });

        const busiestDays = Object.entries(dayCounts)
            .sort(([, a], [, b]) => b - a)
            .map(([day, count]) => ({ day, count }));

        // 4. Generate "Prediction" (Simulated)
        // Add some randomness to make it feel "alive"
        const nextBusyDay = busiestDays[0].day;
        const predictedTraffic = Math.floor(Math.random() * 20) + 80; // 80-100%

        return {
            peakHours,
            topServices,
            busiestDays,
            prediction: {
                nextBusyDay,
                traffic: predictedTraffic,
                recommendedSlot: peakHours[0] + 1 // Recommend hour after peak
            }
        };
    }, []);

    return analysis;
}
