// ========================================
// MOISES Tracking System
// Shared Data & LocalStorage Functions
// ========================================

// === CONSTANTS ===
const STORAGE_KEY = 'moises_shipments';
const DRIVERS_KEY = 'moises_drivers';

// === DATA STRUCTURE ===

/**
 * Shipment Status:
 * - pending: Created but not assigned
 * - assigned: Driver assigned, not started
 * - in_transit: Active delivery
 * - delivered: Successfully delivered
 * - cancelled: Cancelled shipment
 */

/**
 * Checkpoint Stages:
 * 1. Salida - Departure from origin
 * 2. En tránsito - On the road
 * 3. Llegada a destino - Arrived at destination
 * 4. Descarga - Unloading
 * 5. Entrega - Delivered (with signature)
 */

// === UTILITY FUNCTIONS ===

function generateShipmentId() {
    const year = new Date().getFullYear();
    const shipments = getAllShipments();
    const count = shipments.length + 1;
    return `MOIS-${year}-${String(count).padStart(4, '0')}`;
}

function formatDate(date) {
    return new Date(date).toLocaleString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function formatDateShort(date) {
    return new Date(date).toLocaleString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function getStatusColor(status) {
    const colors = {
        pending: '#F59E0B',      // Amber
        assigned: '#3B82F6',     // Blue
        in_transit: '#8B5CF6',   // Purple
        delivered: '#10B981',    // Green
        cancelled: '#EF4444'     // Red
    };
    return colors[status] || '#6B7280';
}

function getStatusText(status) {
    const texts = {
        pending: 'Pendiente',
        assigned: 'Asignado',
        in_transit: 'En tránsito',
        delivered: 'Entregado',
        cancelled: 'Cancelado'
    };
    return texts[status] || status;
}

function calculateETA(origin, destination, distance, startTime, incidents = []) {
    // Base: 75 km/h average speed
    const baseHours = distance / 75;

    // Add delays from incidents
    let totalDelayMinutes = 0;
    incidents.forEach(incident => {
        if (incident.estimatedDelay) {
            totalDelayMinutes += incident.estimatedDelay;
        }
    });

    const totalHours = baseHours + (totalDelayMinutes / 60);
    const eta = new Date(startTime);
    eta.setHours(eta.getHours() + totalHours);

    return eta.toISOString();
}

// === LOCALSTORAGE FUNCTIONS ===

function getAllShipments() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function getShipment(id) {
    const shipments = getAllShipments();
    return shipments.find(s => s.id === id);
}

function saveShipments(shipments) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(shipments));
}

function createShipment(data) {
    const shipments = getAllShipments();

    const newShipment = {
        id: generateShipmentId(),
        createdAt: new Date().toISOString(),

        // Client Info
        client: {
            name: data.clientName,
            phone: data.clientPhone,
            email: data.clientEmail
        },

        // Shipment Details
        origin: data.origin,
        destination: data.destination,
        distance: parseFloat(data.distance),
        weight: data.weight,
        cargoType: data.cargoType,
        description: data.description || '',
        observations: data.observations || '',

        // Insurance & Payment
        hasInsurance: data.hasInsurance || false,
        insuranceValue: data.hasInsurance ? parseFloat(data.insuranceValue) : 0,
        price: parseFloat(data.price),
        paymentStatus: 'pending',

        // Assignment
        driver: data.driver || null,

        // Status & Tracking
        status: 'pending',
        checkpoints: [
            { id: 1, name: 'Salida', completed: false, timestamp: null, location: data.origin, photos: [], notes: '' },
            { id: 2, name: 'En tránsito', completed: false, timestamp: null, location: 'En ruta', photos: [], notes: '' },
            { id: 3, name: 'Llegada a destino', completed: false, timestamp: null, location: data.destination, photos: [], notes: '' },
            { id: 4, name: 'Descarga', completed: false, timestamp: null, location: data.destination, photos: [], notes: '' },
            { id: 5, name: 'Entrega', completed: false, timestamp: null, location: data.destination, photos: [], signature: null, recipientName: '', notes: '' }
        ],

        // Incidents
        incidents: [],

        // Communication
        communications: [],

        // ETA
        estimatedArrival: null,
        actualArrival: null
    };

    shipments.push(newShipment);
    saveShipments(shipments);

    return newShipment;
}

function updateShipment(id, updates) {
    const shipments = getAllShipments();
    const index = shipments.findIndex(s => s.id === id);

    if (index === -1) return null;

    shipments[index] = { ...shipments[index], ...updates };
    saveShipments(shipments);

    return shipments[index];
}

function deleteShipment(id) {
    const shipments = getAllShipments();
    const filtered = shipments.filter(s => s.id !== id);
    saveShipments(filtered);
    return true;
}

function updateCheckpoint(shipmentId, checkpointId, data) {
    const shipment = getShipment(shipmentId);
    if (!shipment) return null;

    const checkpoint = shipment.checkpoints.find(c => c.id === checkpointId);
    if (!checkpoint) return null;

    // Update checkpoint
    checkpoint.completed = true;
    checkpoint.timestamp = data.timestamp || new Date().toISOString();
    if (data.photos) checkpoint.photos = [...checkpoint.photos, ...data.photos];
    if (data.notes) checkpoint.notes = data.notes;
    if (data.signature) checkpoint.signature = data.signature;
    if (data.recipientName) checkpoint.recipientName = data.recipientName;

    // Update shipment status based on checkpoints
    if (checkpointId === 1 && shipment.status === 'assigned') {
        shipment.status = 'in_transit';
        // Calculate ETA when starting
        shipment.estimatedArrival = calculateETA(
            shipment.origin,
            shipment.destination,
            shipment.distance,
            checkpoint.timestamp,
            shipment.incidents
        );
    }

    if (checkpointId === 5) {
        shipment.status = 'delivered';
        shipment.actualArrival = checkpoint.timestamp;
    }

    return updateShipment(shipmentId, shipment);
}

function addIncident(shipmentId, incident) {
    const shipment = getShipment(shipmentId);
    if (!shipment) return null;

    const newIncident = {
        id: Date.now(),
        type: incident.type, // delay | weather | traffic | mechanical | panic | other
        description: incident.description,
        timestamp: new Date().toISOString(),
        estimatedDelay: incident.estimatedDelay || 0,
        resolved: false
    };

    shipment.incidents.push(newIncident);

    // Recalculate ETA if there's a delay
    if (newIncident.estimatedDelay > 0 && shipment.estimatedArrival) {
        const startCheckpoint = shipment.checkpoints.find(c => c.id === 1);
        if (startCheckpoint && startCheckpoint.completed) {
            shipment.estimatedArrival = calculateETA(
                shipment.origin,
                shipment.destination,
                shipment.distance,
                startCheckpoint.timestamp,
                shipment.incidents
            );
        }
    }

    return updateShipment(shipmentId, shipment);
}

function addCommunication(shipmentId, communication) {
    const shipment = getShipment(shipmentId);
    if (!shipment) return null;

    const newComm = {
        id: Date.now(),
        type: communication.type, // whatsapp | phone | email
        message: communication.message,
        timestamp: new Date().toISOString()
    };

    shipment.communications.push(newComm);

    return updateShipment(shipmentId, shipment);
}

function assignDriver(shipmentId, driver) {
    const shipment = getShipment(shipmentId);
    if (!shipment) return null;

    shipment.driver = driver;
    shipment.status = 'assigned';

    return updateShipment(shipmentId, shipment);
}

// === DRIVERS MANAGEMENT ===

function getAllDrivers() {
    const data = localStorage.getItem(DRIVERS_KEY);
    return data ? JSON.parse(data) : getDefaultDrivers();
}

function getDefaultDrivers() {
    return [
        {
            id: 'DRV-001',
            name: 'Carlos Rodríguez',
            phone: '3416666666',
            vehicle: 'Camión de Carga',
            vehicleCapacity: '8 toneladas',
            available: true
        },
        {
            id: 'DRV-002',
            name: 'María González',
            phone: '3417777777',
            vehicle: 'Furgón de Reparto',
            vehicleCapacity: '1.5 toneladas',
            available: true
        },
        {
            id: 'DRV-003',
            name: 'Jorge Martínez',
            phone: '3418888888',
            vehicle: 'Camión Mediano',
            vehicleCapacity: '4 toneladas',
            available: true
        }
    ];
}

function getDriverShipments(driverId) {
    const shipments = getAllShipments();
    return shipments.filter(s => s.driver && s.driver.id === driverId);
}

function getActiveShipmentForDriver(driverId) {
    const shipments = getDriverShipments(driverId);
    return shipments.find(s => s.status === 'assigned' || s.status === 'in_transit');
}

// === STATISTICS ===

function getStatistics() {
    const shipments = getAllShipments();

    return {
        total: shipments.length,
        pending: shipments.filter(s => s.status === 'pending').length,
        assigned: shipments.filter(s => s.status === 'assigned').length,
        inTransit: shipments.filter(s => s.status === 'in_transit').length,
        delivered: shipments.filter(s => s.status === 'delivered').length,
        cancelled: shipments.filter(s => s.status === 'cancelled').length,
        totalRevenue: shipments
            .filter(s => s.paymentStatus === 'paid')
            .reduce((sum, s) => sum + s.price, 0)
    };
}

// === MOCK DATA GENERATOR ===

function generateMockData() {
    const mockShipments = [
        {
            clientName: 'Juan Pérez',
            clientPhone: '3415555555',
            clientEmail: 'juan@example.com',
            origin: 'Rosario',
            destination: 'Buenos Aires',
            distance: 300,
            weight: '500 kg',
            cargoType: 'Mercadería general',
            description: 'Cajas con productos varios',
            hasInsurance: true,
            insuranceValue: 50000,
            price: 750000,
            driver: {
                id: 'DRV-001',
                name: 'Carlos Rodríguez',
                phone: '3416666666',
                vehicle: 'Camión de Carga'
            }
        },
        {
            clientName: 'María López',
            clientPhone: '3415556666',
            clientEmail: 'maria@example.com',
            origin: 'Rosario',
            destination: 'Córdoba',
            distance: 400,
            weight: '800 kg',
            cargoType: 'Equipamiento',
            description: 'Maquinaria industrial',
            hasInsurance: true,
            insuranceValue: 100000,
            price: 1000000,
            driver: null
        }
    ];

    mockShipments.forEach(data => createShipment(data));

    // Update first shipment to be in transit
    const shipments = getAllShipments();
    if (shipments.length > 0) {
        const firstShipment = shipments[0];
        firstShipment.status = 'in_transit';
        firstShipment.checkpoints[0].completed = true;
        firstShipment.checkpoints[0].timestamp = new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString();
        firstShipment.checkpoints[0].notes = 'Carga verificada y asegurada';
        firstShipment.checkpoints[1].completed = true;
        firstShipment.checkpoints[1].timestamp = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();
        firstShipment.estimatedArrival = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString();
        updateShipment(firstShipment.id, firstShipment);
    }

    console.log('Mock data generated successfully!');
}

// === RESET FUNCTION ===

function resetAllData() {
    if (confirm('¿Estás seguro de que querés borrar todos los datos? Esta acción no se puede deshacer.')) {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(DRIVERS_KEY);
        console.log('All data cleared!');
        return true;
    }
    return false;
}

// === EXPORT ===

// Make functions available globally
window.MoisesTracking = {
    // Shipments
    getAllShipments,
    getShipment,
    createShipment,
    updateShipment,
    deleteShipment,

    // Checkpoints & Incidents
    updateCheckpoint,
    addIncident,
    addCommunication,
    assignDriver,

    // Drivers
    getAllDrivers,
    getDriverShipments,
    getActiveShipmentForDriver,

    // Statistics
    getStatistics,

    // Utilities
    formatDate,
    formatDateShort,
    getStatusColor,
    getStatusText,
    calculateETA,

    // Data Management
    generateMockData,
    resetAllData
};

console.log('MOISES Tracking System loaded successfully!');
