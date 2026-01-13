// ========================================
// MOISES Client Tracking
// JavaScript Functionality
// ========================================

let currentShipment = null;

// === SEARCH ===

function searchShipment() {
    const code = document.getElementById('trackingCode').value.trim().toUpperCase();

    if (!code) {
        showToast('Por favor ingresá un código de seguimiento', 'error');
        return;
    }

    showLoading();

    // Simulate API delay
    setTimeout(() => {
        currentShipment = MoisesTracking.getShipment(code);

        if (currentShipment) {
            showShipment();
        } else {
            showNotFound();
        }
    }, 500);
}

function resetSearch() {
    document.getElementById('trackingCode').value = '';
    showInitialState();
}

// === STATES ===

function showLoading() {
    hideAllStates();
    document.getElementById('loadingState').style.display = 'block';
}

function showShipment() {
    hideAllStates();
    document.getElementById('shipmentFound').style.display = 'block';
    renderShipment();
}

function showNotFound() {
    hideAllStates();
    document.getElementById('notFound').style.display = 'block';
}

function showInitialState() {
    hideAllStates();
    document.getElementById('initialState').style.display = 'block';
}

function hideAllStates() {
    document.getElementById('loadingState').style.display = 'none';
    document.getElementById('shipmentFound').style.display = 'none';
    document.getElementById('notFound').style.display = 'none';
    document.getElementById('initialState').style.display = 'none';
}

// === RENDER SHIPMENT ===

function renderShipment() {
    renderStatus();
    renderDetails();
    renderETA();
    renderTimeline();
    renderIncidents();
}

function renderStatus() {
    const statusText = MoisesTracking.getStatusText(currentShipment.status);
    const statusColor = MoisesTracking.getStatusColor(currentShipment.status);

    let statusMessage = '';
    switch (currentShipment.status) {
        case 'pending':
            statusMessage = 'Tu envío está siendo procesado';
            break;
        case 'assigned':
            statusMessage = 'Transportista asignado, próximo a iniciar';
            break;
        case 'in_transit':
            statusMessage = 'Tu envío está en camino';
            break;
        case 'delivered':
            statusMessage = '¡Tu envío fue entregado!';
            break;
        case 'cancelled':
            statusMessage = 'Este envío fue cancelado';
            break;
    }

    document.getElementById('statusBanner').innerHTML = `
        <h2>${currentShipment.id}</h2>
        <div class="status-badge" style="background-color: ${statusColor}; display: inline-block; margin-top: 0.5rem;">
            ${statusText}
        </div>
        <p style="margin-top: 1rem;">${statusMessage}</p>
    `;
}

function renderDetails() {
    const html = `
        <div class="shipment-route" style="margin-bottom: 1.5rem;">
            <div class="route-point">
                <span class="route-icon">📍</span>
                <span>${currentShipment.origin}</span>
            </div>
            <div class="route-arrow">→</div>
            <div class="route-point">
                <span class="route-icon">🎯</span>
                <span>${currentShipment.destination}</span>
            </div>
        </div>
        
        <div class="detail-grid">
            <div class="detail-item">
                <span class="detail-label">Distancia:</span>
                <span class="detail-value">${currentShipment.distance} km</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Peso:</span>
                <span class="detail-value">${currentShipment.weight}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Tipo de Carga:</span>
                <span class="detail-value">${currentShipment.cargoType}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Creado:</span>
                <span class="detail-value">${MoisesTracking.formatDateShort(currentShipment.createdAt)}</span>
            </div>
        </div>
        
        ${currentShipment.driver ? `
            <div style="margin-top: 1.5rem; padding: 1rem; background-color: var(--gray-50); border-radius: 8px;">
                <div style="font-weight: 600; margin-bottom: 0.5rem;">Transportista:</div>
                <div>${currentShipment.driver.name} - ${currentShipment.driver.vehicle}</div>
            </div>
        ` : ''}
    `;

    document.getElementById('shipmentDetails').innerHTML = html;
}

function renderETA() {
    if (currentShipment.estimatedArrival && currentShipment.status === 'in_transit') {
        const etaDate = new Date(currentShipment.estimatedArrival);
        const now = new Date();
        const hoursRemaining = Math.round((etaDate - now) / (1000 * 60 * 60));

        document.getElementById('etaBanner').innerHTML = `
            <div class="eta-banner">
                <div class="eta-label">Tiempo Estimado de Llegada</div>
                <div class="eta-time">${MoisesTracking.formatDateShort(currentShipment.estimatedArrival)}</div>
                ${hoursRemaining > 0 ? `
                    <div style="margin-top: 0.5rem; opacity: 0.9;">
                        (aproximadamente ${hoursRemaining} ${hoursRemaining === 1 ? 'hora' : 'horas'})
                    </div>
                ` : ''}
            </div>
        `;
        document.getElementById('etaBanner').style.display = 'block';
    } else {
        document.getElementById('etaBanner').style.display = 'none';
    }
}

function renderTimeline() {
    const html = currentShipment.checkpoints.map((checkpoint, index) => {
        const isCompleted = checkpoint.completed;
        const isActive = !isCompleted && (index === 0 || currentShipment.checkpoints[index - 1].completed);
        const statusClass = isCompleted ? 'completed' : (isActive ? 'active' : '');
        const icon = isCompleted ? '✓' : (isActive ? '⏳' : '○');

        return `
            <div class="timeline-step ${statusClass}">
                <div class="timeline-marker">${icon}</div>
                <div class="timeline-content">
                    <div class="timeline-title">${checkpoint.name}</div>
                    <div class="timeline-location">📍 ${checkpoint.location}</div>
                    
                    ${isCompleted ? `
                        <div class="timeline-time">
                            ✓ Completado: ${MoisesTracking.formatDateShort(checkpoint.timestamp)}
                        </div>
                        
                        ${checkpoint.notes ? `
                            <div class="timeline-notes">
                                ${checkpoint.notes}
                            </div>
                        ` : ''}
                        
                        ${checkpoint.photos && checkpoint.photos.length > 0 ? `
                            <div class="timeline-photos">
                                ${checkpoint.photos.map(photo => `
                                    <img src="${photo}" class="timeline-photo" alt="Foto del checkpoint" onclick="openPhotoModal('${photo}')">
                                `).join('')}
                            </div>
                        ` : ''}
                        
                        ${checkpoint.signature ? `
                            <div style="margin-top: 1rem;">
                                <div style="font-weight: 600; margin-bottom: 0.5rem;">Firma de recepción:</div>
                                <img src="${checkpoint.signature}" style="max-width: 300px; border: 2px solid var(--gray-200); border-radius: 8px;">
                                ${checkpoint.recipientName ? `
                                    <div style="margin-top: 0.5rem; color: var(--gray-600);">
                                        Recibido por: ${checkpoint.recipientName}
                                    </div>
                                ` : ''}
                            </div>
                        ` : ''}
                    ` : ''}
                    
                    ${isActive ? `
                        <div style="color: var(--secondary-blue); font-weight: 600; margin-top: 0.5rem;">
                            En proceso...
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');

    document.getElementById('trackingTimeline').innerHTML = html;
}

function renderIncidents() {
    if (currentShipment.incidents.length === 0) {
        document.getElementById('incidentsSection').style.display = 'none';
        return;
    }

    const html = currentShipment.incidents.map(incident => {
        const isPanic = incident.type === 'panic';
        const icon = getIncidentIcon(incident.type);
        const title = getIncidentTitle(incident.type);

        return `
            <div class="incident-alert ${isPanic ? 'panic' : ''}">
                <div class="incident-title">${icon} ${title}</div>
                <div class="incident-description">${incident.description}</div>
                <div style="font-size: 0.875rem; color: var(--gray-600); margin-top: 0.5rem;">
                    ${MoisesTracking.formatDateShort(incident.timestamp)}
                </div>
                ${incident.estimatedDelay > 0 ? `
                    <div style="font-weight: 600; color: var(--warning); margin-top: 0.5rem;">
                        Demora estimada: ${incident.estimatedDelay} minutos
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');

    document.getElementById('incidentsList').innerHTML = html;
    document.getElementById('incidentsSection').style.display = 'block';
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

function getIncidentTitle(type) {
    const titles = {
        delay: 'Demora',
        weather: 'Clima Adverso',
        traffic: 'Tráfico',
        mechanical: 'Problema Mecánico',
        panic: 'EMERGENCIA',
        other: 'Incidencia'
    };
    return titles[type] || 'Incidencia';
}

// === PHOTO MODAL ===

function openPhotoModal(photoSrc) {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 800px;">
            <div class="modal-header">
                <h2>Foto del Checkpoint</h2>
                <button class="modal-close" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <img src="${photoSrc}" style="width: 100%; border-radius: 8px;">
            </div>
        </div>
    `;

    modal.onclick = function (e) {
        if (e.target === modal) {
            modal.remove();
        }
    };

    document.body.appendChild(modal);
}

// === TOAST ===

function showToast(message, type = 'info') {
    // Create toast if it doesn't exist
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.className = `toast toast-${type} active`;

    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}

// === URL PARAMS ===

// Check if tracking code is in URL
window.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
        document.getElementById('trackingCode').value = code;
        searchShipment();
    }
});
