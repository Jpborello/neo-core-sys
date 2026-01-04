// ========================================
// MOISES Admin Panel
// JavaScript Functionality
// ========================================

// === INITIALIZATION ===

document.addEventListener('DOMContentLoaded', function () {
    loadDrivers();
    loadStatistics();
    loadShipments();
});

// === STATISTICS ===

function loadStatistics() {
    const stats = MoisesTracking.getStatistics();

    document.getElementById('statTotal').textContent = stats.total;
    document.getElementById('statPending').textContent = stats.pending;
    document.getElementById('statInTransit').textContent = stats.inTransit;
    document.getElementById('statDelivered').textContent = stats.delivered;
    document.getElementById('statRevenue').textContent = `$${stats.totalRevenue.toLocaleString('es-AR')}`;
}

// === SHIPMENTS LIST ===

function loadShipments() {
    const shipments = MoisesTracking.getAllShipments();
    const container = document.getElementById('shipmentsList');
    const emptyState = document.getElementById('emptyState');

    if (shipments.length === 0) {
        container.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }

    container.style.display = 'grid';
    emptyState.style.display = 'none';

    container.innerHTML = shipments.map(shipment => createShipmentCard(shipment)).join('');
    loadStatistics();
}

function createShipmentCard(shipment) {
    const statusColor = MoisesTracking.getStatusColor(shipment.status);
    const statusText = MoisesTracking.getStatusText(shipment.status);
    const completedCheckpoints = shipment.checkpoints.filter(c => c.completed).length;
    const totalCheckpoints = shipment.checkpoints.length;

    return `
        <div class="shipment-card">
            <div class="shipment-header">
                <div class="shipment-id">${shipment.id}</div>
                <div class="status-badge" style="background-color: ${statusColor}">
                    ${statusText}
                </div>
            </div>
            
            <div class="shipment-route">
                <div class="route-point">
                    <span class="route-icon">📍</span>
                    <span>${shipment.origin}</span>
                </div>
                <div class="route-arrow">→</div>
                <div class="route-point">
                    <span class="route-icon">🎯</span>
                    <span>${shipment.destination}</span>
                </div>
            </div>
            
            <div class="shipment-info">
                <div class="info-item">
                    <span class="info-label">Cliente:</span>
                    <span class="info-value">${shipment.client.name}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Distancia:</span>
                    <span class="info-value">${shipment.distance} km</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Precio:</span>
                    <span class="info-value">$${shipment.price.toLocaleString('es-AR')}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Progreso:</span>
                    <span class="info-value">${completedCheckpoints}/${totalCheckpoints}</span>
                </div>
            </div>
            
            ${shipment.driver ? `
                <div class="shipment-driver">
                    <span class="driver-icon">🚚</span>
                    <span>${shipment.driver.name}</span>
                </div>
            ` : '<div class="shipment-driver unassigned">Sin transportista asignado</div>'}
            
            <div class="shipment-actions">
                <button class="btn btn-sm btn-primary" onclick="viewShipmentDetail('${shipment.id}')">
                    Ver Detalle
                </button>
                <button class="btn btn-sm btn-secondary" onclick="editShipment('${shipment.id}')">
                    Editar
                </button>
                <button class="btn btn-sm btn-success" onclick="contactClient('${shipment.id}')">
                    WhatsApp
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteShipmentConfirm('${shipment.id}')">
                    Eliminar
                </button>
            </div>
        </div>
    `;
}

// === FILTER & SEARCH ===

function filterShipments() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const statusFilter = document.getElementById('filterStatus').value;

    let shipments = MoisesTracking.getAllShipments();

    // Filter by status
    if (statusFilter) {
        shipments = shipments.filter(s => s.status === statusFilter);
    }

    // Filter by search term
    if (searchTerm) {
        shipments = shipments.filter(s =>
            s.id.toLowerCase().includes(searchTerm) ||
            s.client.name.toLowerCase().includes(searchTerm) ||
            s.origin.toLowerCase().includes(searchTerm) ||
            s.destination.toLowerCase().includes(searchTerm)
        );
    }

    const container = document.getElementById('shipmentsList');
    container.innerHTML = shipments.map(shipment => createShipmentCard(shipment)).join('');
}

// === NEW/EDIT SHIPMENT ===

function showNewShipmentModal() {
    document.getElementById('modalTitle').textContent = 'Nuevo Envío';
    document.getElementById('shipmentForm').reset();
    document.getElementById('shipmentId').value = '';
    document.getElementById('price').value = '';
    toggleInsurance();
    document.getElementById('shipmentModal').classList.add('active');
}

function editShipment(id) {
    const shipment = MoisesTracking.getShipment(id);
    if (!shipment) return;

    document.getElementById('modalTitle').textContent = 'Editar Envío';
    document.getElementById('shipmentId').value = shipment.id;

    // Client info
    document.getElementById('clientName').value = shipment.client.name;
    document.getElementById('clientPhone').value = shipment.client.phone;
    document.getElementById('clientEmail').value = shipment.client.email;

    // Shipment details
    document.getElementById('origin').value = shipment.origin;
    document.getElementById('destination').value = shipment.destination;
    document.getElementById('distance').value = shipment.distance;
    document.getElementById('weight').value = shipment.weight;
    document.getElementById('cargoType').value = shipment.cargoType;
    document.getElementById('description').value = shipment.description;
    document.getElementById('observations').value = shipment.observations;

    // Insurance & payment
    document.getElementById('hasInsurance').checked = shipment.hasInsurance;
    document.getElementById('insuranceValue').value = shipment.insuranceValue;
    document.getElementById('price').value = shipment.price;
    document.getElementById('paymentStatus').value = shipment.paymentStatus;
    toggleInsurance();

    // Driver
    if (shipment.driver) {
        document.getElementById('driverId').value = shipment.driver.id;
    }

    document.getElementById('shipmentModal').classList.add('active');
}

function closeShipmentModal() {
    document.getElementById('shipmentModal').classList.remove('active');
}

// === FORM HANDLERS ===

document.getElementById('shipmentForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const shipmentId = document.getElementById('shipmentId').value;
    const driverId = document.getElementById('driverId').value;

    const data = {
        clientName: document.getElementById('clientName').value,
        clientPhone: document.getElementById('clientPhone').value,
        clientEmail: document.getElementById('clientEmail').value,
        origin: document.getElementById('origin').value,
        destination: document.getElementById('destination').value,
        distance: document.getElementById('distance').value,
        weight: document.getElementById('weight').value,
        cargoType: document.getElementById('cargoType').value,
        description: document.getElementById('description').value,
        observations: document.getElementById('observations').value,
        hasInsurance: document.getElementById('hasInsurance').checked,
        insuranceValue: document.getElementById('insuranceValue').value,
        price: document.getElementById('price').value,
        paymentStatus: document.getElementById('paymentStatus').value
    };

    // Add driver if selected
    if (driverId) {
        const drivers = MoisesTracking.getAllDrivers();
        const driver = drivers.find(d => d.id === driverId);
        if (driver) {
            data.driver = driver;
        }
    }

    if (shipmentId) {
        // Update existing
        MoisesTracking.updateShipment(shipmentId, {
            client: {
                name: data.clientName,
                phone: data.clientPhone,
                email: data.clientEmail
            },
            origin: data.origin,
            destination: data.destination,
            distance: parseFloat(data.distance),
            weight: data.weight,
            cargoType: data.cargoType,
            description: data.description,
            observations: data.observations,
            hasInsurance: data.hasInsurance,
            insuranceValue: data.hasInsurance ? parseFloat(data.insuranceValue) : 0,
            price: parseFloat(data.price),
            paymentStatus: data.paymentStatus,
            driver: data.driver || null
        });

        showToast('Envío actualizado correctamente', 'success');
    } else {
        // Create new
        MoisesTracking.createShipment(data);
        showToast('Envío creado correctamente', 'success');
    }

    closeShipmentModal();
    loadShipments();
});

function toggleInsurance() {
    const hasInsurance = document.getElementById('hasInsurance').checked;
    const insuranceGroup = document.getElementById('insuranceValueGroup');

    if (hasInsurance) {
        insuranceGroup.style.display = 'block';
        document.getElementById('insuranceValue').required = true;
    } else {
        insuranceGroup.style.display = 'none';
        document.getElementById('insuranceValue').required = false;
        document.getElementById('insuranceValue').value = '';
    }
}

function calculatePrice() {
    const distance = parseFloat(document.getElementById('distance').value) || 0;
    const pricePerKm = 2500;
    const totalPrice = distance * pricePerKm;

    document.getElementById('price').value = totalPrice;
}

// === DRIVERS ===

function loadDrivers() {
    const drivers = MoisesTracking.getAllDrivers();
    const select = document.getElementById('driverId');

    drivers.forEach(driver => {
        const option = document.createElement('option');
        option.value = driver.id;
        option.textContent = `${driver.name} - ${driver.vehicle}`;
        select.appendChild(option);
    });
}

// === SHIPMENT DETAIL ===

function viewShipmentDetail(id) {
    const shipment = MoisesTracking.getShipment(id);
    if (!shipment) return;

    const statusColor = MoisesTracking.getStatusColor(shipment.status);
    const statusText = MoisesTracking.getStatusText(shipment.status);

    const content = `
        <div class="detail-section">
            <div class="detail-header">
                <h3>${shipment.id}</h3>
                <div class="status-badge" style="background-color: ${statusColor}">${statusText}</div>
            </div>
        </div>
        
        <div class="detail-section">
            <h4>Cliente</h4>
            <div class="detail-grid">
                <div class="detail-item">
                    <span class="detail-label">Nombre:</span>
                    <span class="detail-value">${shipment.client.name}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Teléfono:</span>
                    <span class="detail-value">${shipment.client.phone}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Email:</span>
                    <span class="detail-value">${shipment.client.email}</span>
                </div>
            </div>
            <button class="btn btn-success" onclick="contactClient('${shipment.id}')">
                💬 Contactar por WhatsApp
            </button>
        </div>
        
        <div class="detail-section">
            <h4>Detalles del Envío</h4>
            <div class="detail-grid">
                <div class="detail-item">
                    <span class="detail-label">Origen:</span>
                    <span class="detail-value">${shipment.origin}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Destino:</span>
                    <span class="detail-value">${shipment.destination}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Distancia:</span>
                    <span class="detail-value">${shipment.distance} km</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Peso:</span>
                    <span class="detail-value">${shipment.weight}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Tipo de Carga:</span>
                    <span class="detail-value">${shipment.cargoType}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Precio:</span>
                    <span class="detail-value">$${shipment.price.toLocaleString('es-AR')}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Seguro:</span>
                    <span class="detail-value">${shipment.hasInsurance ? `Sí ($${shipment.insuranceValue.toLocaleString('es-AR')})` : 'No'}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Estado de Pago:</span>
                    <span class="detail-value">${shipment.paymentStatus === 'paid' ? 'Pagado' : 'Pendiente'}</span>
                </div>
            </div>
            ${shipment.description ? `<p><strong>Descripción:</strong> ${shipment.description}</p>` : ''}
            ${shipment.observations ? `<p><strong>Observaciones:</strong> ${shipment.observations}</p>` : ''}
        </div>
        
        ${shipment.driver ? `
            <div class="detail-section">
                <h4>Transportista Asignado</h4>
                <div class="detail-grid">
                    <div class="detail-item">
                        <span class="detail-label">Nombre:</span>
                        <span class="detail-value">${shipment.driver.name}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Teléfono:</span>
                        <span class="detail-value">${shipment.driver.phone}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Vehículo:</span>
                        <span class="detail-value">${shipment.driver.vehicle}</span>
                    </div>
                </div>
            </div>
        ` : '<div class="detail-section"><p class="text-muted">Sin transportista asignado</p></div>'}
        
        <div class="detail-section">
            <h4>Progreso del Envío</h4>
            <div class="timeline">
                ${shipment.checkpoints.map(checkpoint => `
                    <div class="timeline-item ${checkpoint.completed ? 'completed' : ''}">
                        <div class="timeline-marker">${checkpoint.completed ? '✓' : '○'}</div>
                        <div class="timeline-content">
                            <div class="timeline-title">${checkpoint.name}</div>
                            ${checkpoint.completed ? `
                                <div class="timeline-time">${MoisesTracking.formatDateShort(checkpoint.timestamp)}</div>
                                ${checkpoint.notes ? `<div class="timeline-notes">${checkpoint.notes}</div>` : ''}
                            ` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        ${shipment.incidents.length > 0 ? `
            <div class="detail-section">
                <h4>Incidencias Reportadas</h4>
                ${shipment.incidents.map(incident => `
                    <div class="incident-card">
                        <div class="incident-type">${getIncidentIcon(incident.type)} ${getIncidentText(incident.type)}</div>
                        <div class="incident-description">${incident.description}</div>
                        <div class="incident-time">${MoisesTracking.formatDateShort(incident.timestamp)}</div>
                        ${incident.estimatedDelay ? `<div class="incident-delay">Demora estimada: ${incident.estimatedDelay} min</div>` : ''}
                    </div>
                `).join('')}
            </div>
        ` : ''}
        
        ${shipment.estimatedArrival ? `
            <div class="detail-section">
                <h4>Tiempo Estimado de Llegada</h4>
                <div class="eta-display">
                    ${MoisesTracking.formatDate(shipment.estimatedArrival)}
                </div>
            </div>
        ` : ''}
    `;

    document.getElementById('detailContent').innerHTML = content;
    document.getElementById('detailModal').classList.add('active');
}

function closeDetailModal() {
    document.getElementById('detailModal').classList.remove('active');
}

function getIncidentIcon(type) {
    const icons = {
        delay: '⏱️',
        weather: '🌧️',
        traffic: '🚦',
        mechanical: '🔧',
        panic: '🚨',
        other: '⚠️'
    };
    return icons[type] || '⚠️';
}

function getIncidentText(type) {
    const texts = {
        delay: 'Demora',
        weather: 'Clima',
        traffic: 'Tráfico',
        mechanical: 'Mecánico',
        panic: 'EMERGENCIA',
        other: 'Otro'
    };
    return texts[type] || type;
}

// === ACTIONS ===

function contactClient(id) {
    const shipment = MoisesTracking.getShipment(id);
    if (!shipment) return;

    const message = `Hola ${shipment.client.name}! Soy de MOISES Traslados. Te contacto sobre tu envío ${shipment.id} (${shipment.origin} → ${shipment.destination}).`;
    const encodedMessage = encodeURIComponent(message);
    const phone = shipment.client.phone.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/549${phone}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');

    // Log communication
    MoisesTracking.addCommunication(id, {
        type: 'whatsapp',
        message: 'Contacto iniciado desde panel admin'
    });
}

function deleteShipmentConfirm(id) {
    if (confirm('¿Estás seguro de que querés eliminar este envío? Esta acción no se puede deshacer.')) {
        MoisesTracking.deleteShipment(id);
        showToast('Envío eliminado correctamente', 'success');
        loadShipments();
    }
}

function handleReset() {
    if (MoisesTracking.resetAllData()) {
        showToast('Todos los datos fueron eliminados', 'success');
        loadShipments();
    }
}

// === TOAST NOTIFICATIONS ===

function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast toast-${type} active`;

    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}

// === MODAL CLOSE ON OUTSIDE CLICK ===

window.onclick = function (event) {
    const shipmentModal = document.getElementById('shipmentModal');
    const detailModal = document.getElementById('detailModal');

    if (event.target === shipmentModal) {
        closeShipmentModal();
    }
    if (event.target === detailModal) {
        closeDetailModal();
    }
}
