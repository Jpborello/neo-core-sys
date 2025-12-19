// Simulated AI Engine for NeoGym

export const aiEngine = {
    // 1. Predict Churn Risk (Probability of leaving)
    predictChurn: (user) => {
        // Logic: Low visits + long time since last visit = High Risk
        const daysSinceLastVisit = (new Date() - new Date(user.lastVisit)) / (1000 * 60 * 60 * 24);
        let riskScore = 0;

        if (daysSinceLastVisit > 30) riskScore += 0.8;
        else if (daysSinceLastVisit > 14) riskScore += 0.5;
        else if (daysSinceLastVisit > 7) riskScore += 0.2;

        if (user.visitsThisMonth < 4) riskScore += 0.3;
        if (user.visitsThisMonth > 12) riskScore -= 0.2;

        return Math.min(Math.max(riskScore, 0), 1); // Clamp between 0 and 1
    },

    // 2. Predict Peak Hours (Simulated Regression)
    predictPeakHours: () => {
        // Returns an array of [hour, probability]
        return [
            { hour: "07:00", traffic: 65 },
            { hour: "08:00", traffic: 80 },
            { hour: "09:00", traffic: 50 },
            { hour: "17:00", traffic: 70 },
            { hour: "18:00", traffic: 95 }, // Peak
            { hour: "19:00", traffic: 90 },
            { hour: "20:00", traffic: 60 },
        ];
    },

    // 3. Generate Smart Insights (NLP Simulation)
    generateInsights: (users, attendance) => {
        const insights = [];

        // Churn Analysis
        const highRiskUsers = users.filter(u => aiEngine.predictChurn(u) > 0.7).length;
        if (highRiskUsers > 0) {
            insights.push({
                type: "warning",
                text: `${highRiskUsers} usuarios tienen alto riesgo de abandono. Se recomienda contactarlos con una promo de retención.`
            });
        }

        // Attendance Analysis
        const busyDay = attendance.reduce((prev, current) => (prev.count > current.count) ? prev : current);
        insights.push({
            type: "info",
            text: `El día de mayor demanda es el ${busyDay.day}. Se sugiere reforzar el staff de limpieza y entrenadores.`
        });

        // Growth Prediction
        insights.push({
            type: "success",
            text: "La proyección de crecimiento para el próximo mes es del +12% basado en las tendencias actuales."
        });

        return insights;
    }
};
