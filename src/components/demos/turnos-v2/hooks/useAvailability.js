import { useMemo } from 'react';
import { useTurnos } from '../context/TurnosContext';

export const useAvailability = () => {
    const { state, isSlotAvailable } = useTurnos();

    const getSlotsForDate = (date, proId, serviceId) => {
        if (!date || !proId || !serviceId) return [];

        const pro = state.professionals.find(p => p.id === proId);
        const service = state.services.find(s => s.id === serviceId);

        if (!pro || !service) return [];

        const dayIndex = date.getDay(); // 0 = Sunday
        const schedule = pro.schedule[dayIndex];

        if (!schedule) return []; // Pro doesn't work this day

        const [startStr, endStr] = schedule;

        // Parse times to minutes for easier calculation
        const parseTimeToMinutes = (timeStr) => {
            const [hours, minutes] = timeStr.split(':').map(Number);
            return hours * 60 + minutes;
        };

        const startMinutes = parseTimeToMinutes(startStr);
        const endMinutes = parseTimeToMinutes(endStr);

        const serviceDuration = service.duration;
        const interval = 30; // Granularity of slots (could be dynamic)

        let currentMinutes = startMinutes;
        const slots = [];

        while (currentMinutes + serviceDuration <= endMinutes) {
            // Format back to HH:MM for display/logic
            const formatTime = (totalMins) => {
                const h = Math.floor(totalMins / 60).toString().padStart(2, '0');
                const m = (totalMins % 60).toString().padStart(2, '0');
                return `${h}:${m}`;
            };

            const slotStartStr = formatTime(currentMinutes);
            // We need ISO strings for the isSlotAvailable check if it compares exact datetimes
            // But for this MVP let's construct "mock" ISOs or change isSlotAvailable to work with times if date is constant
            // Let's assume the date is passed as a generic "2023-01-01" part 
            // For the MVP, let's keep it simple: date object + time string construction

            const slotStartIso = new Date(date);
            slotStartIso.setHours(Math.floor(currentMinutes / 60), currentMinutes % 60, 0, 0);

            const slotEndIso = new Date(slotStartIso);
            slotEndIso.setMinutes(slotEndIso.getMinutes() + serviceDuration);

            // Buffer Logic: We need to ensure that *after* this slot, there is room for the buffer before the next confirmed appointment starts?
            // Or rather, the simple check is: Does this specific [Start, End] overlap with anything?
            // And: Does any *previous* appointment's buffer overlap with this Start?

            // Let's rely on isSlotAvailable which checks direct overlap.
            // To support buffers, we should ideally check:
            // isSlotAvailable(proId, Start, End + ServiceBuffer) -> This ensures we don't squeeze in if there's no room for OUR buffer.
            // But usually buffers are "after".

            // Real isSlotAvailable check:
            const available = isSlotAvailable(proId, slotStartIso.toISOString(), slotEndIso.toISOString());

            if (available) {
                slots.push({
                    time: slotStartStr,
                    startIso: slotStartIso.toISOString(),
                    endIso: slotEndIso.toISOString()
                });
            }

            currentMinutes += interval;
        }

        return slots;
    };

    return { getSlotsForDate };
};
