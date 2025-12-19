import { useMemo } from "react";
import { aiEngine } from "../ai/aiEngine";

export function useAIEngine(users, attendance, quotas) {
    const analysis = useMemo(() => {
        // 1. Calculate Churn Risk for all users
        const usersWithRisk = users.map(u => ({
            ...u,
            churnRisk: aiEngine.predictChurn(u)
        }));

        // 2. Predict Peak Hours
        const peakHours = aiEngine.predictPeakHours();

        // 3. Generate Insights
        const insights = aiEngine.generateInsights(users, attendance);

        // 4. Predict Revenue
        const projectedRevenue = quotas
            .filter(q => q.status === "Paid" || q.status === "Pending")
            .reduce((acc, curr) => acc + curr.amount, 0) * 1.12; // +12% growth factor

        return {
            usersWithRisk,
            peakHours,
            insights,
            projectedRevenue
        };
    }, [users, attendance, quotas]);

    return analysis;
}
