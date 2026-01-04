// ========================================
// MOISES Driver Panel
// JavaScript Functionality
// ========================================

// Current driver (hardcoded for demo)
const CURRENT_DRIVER_ID = 'DRV-001';
let currentShipment = null;
let signatureCanvas = null;
let signatureContext = null;
let isDrawing = false;

// === INITIALIZATION ===

document.addEventListener('DOMContentLoaded', function () {
    initializeDriver();
    loadActiveShipment();
    setupSignatureCanvas();
});

function initializeDriver() {
    const drivers = MoisesTracking.getAllDrivers();
    const driver = drivers.find(d => d.id === CURRENT_DRIVER_ID);

    if (driver) {
        document.getElementById('driverName').textContent = driver.name;
        document.getElementById('driverVehicle').textContent = `${driver.vehicle} - ${driver.vehicleCapacity}`;
    }
}

function loadActiveShipment() {
    currentShipment = MoisesTracking.getActiveShipmentForDriver(CURRENT_DRIVER_ID);

    if (currentShipment) {
        showActiveShipment();
    } else {
        showNoShipment();
    }
}

function showActiveShipment() {
    document.getElementById('activeShipmentSection').style.display = 'block';
    document.getElementById('noShipmentSection').style.display = 'none';

    renderShipmentInfo();
    renderCheckpoints();
    updateProgress();
    updateETA();
}

function showNoShipment() {
    document.getElementById('activeShipmentSection').style.display = 'none';
    document.getElementById('noShipmentSection').style.display = 'block';
}

// === SHIPMENT INFO ===

function renderShipmentInfo() {
    const info = `
        <div class="shipment-route">
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
        
        <div class="detail-grid" style="margin-top: 1rem;">
            <div class="detail-item">
                <span class="detail-label">Código:</span>
                <span class="detail-value">${currentShipment.id}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Distancia:</span>
                <span class="detail-value">${currentShipment.distance} km</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Cliente:</span>
                <span class="detail-value">${currentShipment.client.name}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Peso:</span>
                <span class="detail-value">${currentShipment.weight}</span>
            </div>
        </div>
    `;

    document.getElementById('shipmentInfo').innerHTML = info;
}

// === CHECKPOINTS ===

function renderCheckpoints() {
    const container = document.getElementById('checkpointsList');

    container.innerHTML = currentShipment.checkpoints.map((checkpoint, index) => {
        const isCompleted = checkpoint.completed;
        const isNext = !isCompleted && (index === 0 || currentShipment.checkpoints[index - 1].completed);
        const statusClass = isCompleted ? 'completed' : (isNext ? 'active' : '');
        const statusIcon = isCompleted ? '✅' : (isNext ? '⏳' : '○');

        return `
            <div class="checkpoint-item ${statusClass}">
                <div class="checkpoint-header">
                    <div class="checkpoint-name">${checkpoint.name}</div>
                    <div class="checkpoint-status">${statusIcon}</div>
                </div>
                
                ${isCompleted ? `
                    <div style="font-size: 0.875rem; color: var(--gray-600); margin-bottom: 0.5rem;">
                        Completado: ${MoisesTracking.formatDateShort(checkpoint.timestamp)}
                    </div>
                    ${checkpoint.notes ? `
                        <div style="background: white; padding: 0.75rem; border-radius: 8px; font-size: 0.875rem; margin-bottom: 0.5rem;">
                            ${checkpoint.notes}
                        </div>
                    ` : ''}
                    ${checkpoint.photos && checkpoint.photos.length > 0 ? `
                        <div class="photo-upload">
                            ${checkpoint.photos.map(photo => `
                                <img src="${photo}" class="photo-preview" alt="Foto checkpoint">
                            `).join('')}
                        </div>
                    ` : ''}
                ` : ''}
                
                ${isNext ? `
                    <div class="checkpoint-actions">
                        <button class="btn btn-success" onclick="openCheckpointModal(${checkpoint.id})">
                            ✓ Completar Checkpoint
                        </button>
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');
}

function updateProgress() {
    const completed = currentShipment.checkpoints.filter(c => c.completed).length;
    const total = currentShipment.checkpoints.length;
    const percentage = (completed / total) * 100;

    document.getElementById('progressBar').style.width = `${percentage}%`;
    document.getElementById('progressText').textContent = `${completed}/${total} checkpoints completados`;
}

function updateETA() {
    if (currentShipment.estimatedArrival) {
        document.getElementById('etaCard').style.display = 'block';
        document.getElementById('etaTime').textContent = MoisesTracking.formatDateShort(currentShipment.estimatedArrival);
    } else {
        document.getElementById('etaCard').style.display = 'none';
    }
}

// === CHECKPOINT MODAL ===

function openCheckpointModal(checkpointId) {
    const checkpoint = currentShipment.checkpoints.find(c => c.id === checkpointId);
    if (!checkpoint) return;

    document.getElementById('checkpointModalTitle').textContent = `Completar: ${checkpoint.name}`;
    document.getElementById('checkpointId').value = checkpointId;
    document.getElementById('checkpointNotes').value = '';
    document.getElementById('checkpointPhotos').value = '';
    document.getElementById('photoPreview').innerHTML = '';

    // Show signature section only for final checkpoint
    if (checkpointId === 5) {
        document.getElementById('signatureSection').style.display = 'block';
        document.getElementById('recipientName').value = '';
        clearSignature();
    } else {
        document.getElementById('signatureSection').style.display = 'none';
    }

    document.getElementById('checkpointModal').classList.add('active');
}

function closeCheckpointModal() {
    document.getElementById('checkpointModal').classList.remove('active');
}

// === CHECKPOINT FORM ===

document.getElementById('checkpointForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const checkpointId = parseInt(document.getElementById('checkpointId').value);
    const notes = document.getElementById('checkpointNotes').value;
    const photosInput = document.getElementById('checkpointPhotos');

    // Process photos
    const photos = [];
    if (photosInput.files.length > 0) {
        for (let i = 0; i < Math.min(photosInput.files.length, 3); i++) {
            const file = photosInput.files[i];
            const base64 = await fileToBase64(file);
            photos.push(base64);
        }
    }

    const data = {
        timestamp: new Date().toISOString(),
        notes: notes,
        photos: photos
    };

    // Add signature for final checkpoint
    if (checkpointId === 5) {
        const recipientName = document.getElementById('recipientName').value;
        if (!recipientName) {
            showToast('Por favor ingresá el nombre de quien recibe', 'error');
            return;
        }

        const signature = signatureCanvas.toDataURL();
        data.signature = signature;
        data.recipientName = recipientName;
    }

    // Update checkpoint
    MoisesTracking.updateCheckpoint(currentShipment.id, checkpointId, data);

    showToast('Checkpoint completado correctamente', 'success');
    closeCheckpointModal();
    loadActiveShipment();
});

// Photo preview
document.getElementById('checkpointPhotos').addEventListener('change', function (e) {
    const preview = document.getElementById('photoPreview');
    preview.innerHTML = '';

    for (let i = 0; i < Math.min(e.target.files.length, 3); i++) {
        const file = e.target.files[i];
        const reader = new FileReader();

        reader.onload = function (event) {
            const img = document.createElement('img');
            img.src = event.target.result;
            img.className = 'photo-preview';
            preview.appendChild(img);
        };

        reader.readAsDataURL(file);
    }
});

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// === SIGNATURE CANVAS ===

function setupSignatureCanvas() {
    signatureCanvas = document.getElementById('signatureCanvas');
    signatureContext = signatureCanvas.getContext('2d');

    signatureContext.strokeStyle = '#000';
    signatureContext.lineWidth = 2;
    signatureContext.lineCap = 'round';

    signatureCanvas.addEventListener('mousedown', startDrawing);
    signatureCanvas.addEventListener('mousemove', draw);
    signatureCanvas.addEventListener('mouseup', stopDrawing);
    signatureCanvas.addEventListener('mouseout', stopDrawing);

    // Touch events for mobile
    signatureCanvas.addEventListener('touchstart', handleTouch);
    signatureCanvas.addEventListener('touchmove', handleTouch);
    signatureCanvas.addEventListener('touchend', stopDrawing);
}

function startDrawing(e) {
    isDrawing = true;
    const rect = signatureCanvas.getBoundingClientRect();
    signatureContext.beginPath();
    signatureContext.moveTo(e.clientX - rect.left, e.clientY - rect.top);
}

function draw(e) {
    if (!isDrawing) return;
    const rect = signatureCanvas.getBoundingClientRect();
    signatureContext.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    signatureContext.stroke();
}

function stopDrawing() {
    isDrawing = false;
}

function handleTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent(e.type === 'touchstart' ? 'mousedown' : 'mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    signatureCanvas.dispatchEvent(mouseEvent);
}

function clearSignature() {
    signatureContext.clearRect(0, 0, signatureCanvas.width, signatureCanvas.height);
}

// === INCIDENT REPORTING ===

document.getElementById('incidentForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const type = document.getElementById('incidentType').value;
    const delay = parseInt(document.getElementById('incidentDelay').value) || 0;
    const description = document.getElementById('incidentDescription').value;

    const incident = {
        type: type,
        description: description,
        estimatedDelay: delay
    };

    MoisesTracking.addIncident(currentShipment.id, incident);

    showToast('Incidencia reportada correctamente', 'success');
    this.reset();
    loadActiveShipment();
});

// === PANIC BUTTON ===

function triggerPanic() {
    if (!confirm('¿Estás seguro de activar el BOTÓN DE PÁNICO? Esto enviará una alerta de emergencia al administrador.')) {
        return;
    }

    const incident = {
        type: 'panic',
        description: `EMERGENCIA: ${document.getElementById('driverName').textContent} activó el botón de pánico`,
        estimatedDelay: 0
    };

    MoisesTracking.addIncident(currentShipment.id, incident);

    showToast('🚨 ALERTA DE EMERGENCIA ENVIADA 🚨', 'error');

    // In a real app, this would trigger notifications, calls, etc.
    setTimeout(() => {
        alert('Emergencia reportada. El administrador ha sido notificado.\n\nEn un sistema real, esto activaría:\n- Llamada automática al admin\n- Notificación push\n- SMS de emergencia\n- Registro de ubicación GPS');
    }, 1000);
}

// === TOAST ===

function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast toast-${type} active`;

    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}

// === MODAL CLOSE ===

window.onclick = function (event) {
    const modal = document.getElementById('checkpointModal');
    if (event.target === modal) {
        closeCheckpointModal();
    }
}

// === AUTO REFRESH ===

// Refresh every 30 seconds to check for updates
setInterval(() => {
    loadActiveShipment();
}, 30000);
