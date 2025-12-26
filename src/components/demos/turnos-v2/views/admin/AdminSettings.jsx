import React, { useState } from 'react';
import { useTurnos, ACTIONS } from '../../context/TurnosContext';
import { Plus, Settings, DollarSign, Clock, Tag } from 'lucide-react';

const AdminSettings = ({ onBack }) => {
    const { state, dispatch } = useTurnos();
    const [activeTab, setActiveTab] = useState('services'); // 'services' | 'pros' | 'general'
    const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);

    // New Service Form State
    const [newService, setNewService] = useState({
        name: '',
        specializationId: state.specializations[0]?.id || '',
        duration: 60,
        price: 0,
        requiresDeposit: true,
        depositPercent: 50
    });

    const handleAddService = (e) => {
        e.preventDefault();
        const payload = {
            ...newService,
            id: `srv_new_${Date.now()}`,
            buffer_after: 15 // Default buffer
        };
        dispatch({ type: ACTIONS.ADD_SERVICE, payload });
        setIsAddServiceModalOpen(false);
        // Reset form
        setNewService({
            name: '',
            specializationId: state.specializations[0]?.id || '',
            duration: 60,
            price: 0,
            requiresDeposit: true,
            depositPercent: 50
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <button onClick={onBack} className="text-sm text-neutral-400 hover:text-neutral-800">← Volver</button>
                    <h2 className="text-2xl font-bold text-neutral-900">Configuración del Negocio</h2>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-neutral-200 pb-1">
                <button
                    onClick={() => setActiveTab('services')}
                    className={`pb-3 px-2 font-medium transition-colors ${activeTab === 'services' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-neutral-400 hover:text-neutral-600'}`}
                >
                    Servicios y Precios
                </button>
                <button
                    onClick={() => setActiveTab('pros')}
                    className={`pb-3 px-2 font-medium transition-colors ${activeTab === 'pros' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-neutral-400 hover:text-neutral-600'}`}
                >
                    Profesionales (Demo)
                </button>
            </div>

            {/* CONTENT: SERVICES */}
            {activeTab === 'services' && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                        <div>
                            <h3 className="font-bold text-indigo-900">Catálogo de Servicios</h3>
                            <p className="text-sm text-indigo-700">Administrá qué ofreces, precios y políticas de seña.</p>
                        </div>
                        <button
                            onClick={() => setIsAddServiceModalOpen(true)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-sm"
                        >
                            <Plus size={18} /> Nuevo Servicio
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {state.services.map(srv => {
                            const spec = state.specializations.find(s => s.id === srv.specializationId);
                            return (
                                <div key={srv.id} className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm flex flex-col justify-between group hover:border-indigo-300 transition-colors">
                                    <div className="mb-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 px-2 py-1 bg-neutral-100 rounded">{spec?.name || 'General'}</span>
                                            {srv.requiresDeposit ? (
                                                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded border border-green-100">Seña {srv.depositPercent}%</span>
                                            ) : (
                                                <span className="text-xs font-bold text-neutral-400 bg-neutral-50 px-2 py-1 rounded border border-neutral-100">Sin Seña</span>
                                            )}
                                        </div>
                                        <h4 className="text-lg font-bold text-neutral-800 mb-1">{srv.name}</h4>
                                        <div className="flex gap-4 text-sm text-neutral-500">
                                            <span className="flex items-center gap-1"><Clock size={14} /> {srv.duration} min</span>
                                            <span className="flex items-center gap-1"><DollarSign size={14} /> ${srv.price.toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <div className="pt-3 border-t border-neutral-100 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="text-xs font-medium text-neutral-400 hover:text-indigo-600 px-2 py-1">Editar</button>
                                        <button className="text-xs font-medium text-red-400 hover:text-red-600 px-2 py-1">Borrar</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* CONTENT: PROS (Schedule Editor) */}
            {activeTab === 'pros' && (
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
                        <h3 className="text-lg font-bold text-neutral-900 mb-4">Gestionar Disponibilidad</h3>
                        <p className="text-sm text-neutral-500 mb-6">Configurá los días y horarios laborales de cada profesional.</p>

                        <div className="space-y-4">
                            {state.professionals.map(pro => (
                                <div key={pro.id} className="border border-neutral-200 rounded-lg p-4">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                                            {pro.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-neutral-900">{pro.name}</h4>
                                            <p className="text-xs text-neutral-500">{pro.role}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {[1, 2, 3, 4, 5].map(day => {
                                            const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
                                            const schedule = pro.schedule?.[day];
                                            const isOpen = !!schedule;

                                            return (
                                                <div key={day} className={`p-3 rounded-lg border text-sm ${isOpen ? 'bg-green-50 border-green-200' : 'bg-neutral-50 border-neutral-100 opacity-60'}`}>
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className="font-bold text-neutral-700">{days[day]}</span>
                                                        <div className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-500' : 'bg-neutral-300'}`} />
                                                    </div>
                                                    {isOpen ? (
                                                        <span className="text-neutral-600 block text-center bg-white rounded py-1 border border-green-100 shadow-sm">
                                                            {schedule[0]} - {schedule[1]}
                                                        </span>
                                                    ) : (
                                                        <span className="text-neutral-400 block text-center italic">Cerrado</span>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="mt-4 text-right">
                                        <button className="text-indigo-600 font-bold text-sm hover:underline">Editar Grilla</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL: ADD SERVICE */}
            {isAddServiceModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
                        <h3 className="text-xl font-bold mb-4">Nuevo Servicio</h3>
                        <form onSubmit={handleAddService} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Nombre del Servicio</label>
                                <input
                                    required
                                    className="w-full p-2 border border-neutral-300 rounded-lg"
                                    placeholder="Ej: Esmaltado Semipermanente"
                                    value={newService.name}
                                    onChange={e => setNewService({ ...newService, name: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1">Especialización</label>
                                    <select
                                        className="w-full p-2 border border-neutral-300 rounded-lg"
                                        value={newService.specializationId}
                                        onChange={e => setNewService({ ...newService, specializationId: e.target.value })}
                                    >
                                        {state.specializations.map(s => (
                                            <option key={s.id} value={s.id}>{s.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1">Duración (min)</label>
                                    <input
                                        type="number" required
                                        className="w-full p-2 border border-neutral-300 rounded-lg"
                                        value={newService.duration}
                                        onChange={e => setNewService({ ...newService, duration: parseInt(e.target.value) })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1">Precio Total</label>
                                    <input
                                        type="number" required
                                        className="w-full p-2 border border-neutral-300 rounded-lg"
                                        value={newService.price}
                                        onChange={e => setNewService({ ...newService, price: parseInt(e.target.value) })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1">Seña (%)</label>
                                    <input
                                        type="number"
                                        className="w-full p-2 border border-neutral-300 rounded-lg"
                                        value={newService.requiresDeposit ? newService.depositPercent : 0}
                                        onChange={e => setNewService({ ...newService, depositPercent: parseInt(e.target.value) })}
                                        disabled={!newService.requiresDeposit}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="reqDeposit"
                                    checked={newService.requiresDeposit}
                                    onChange={e => setNewService({ ...newService, requiresDeposit: e.target.checked })}
                                    className="w-4 h-4 text-indigo-600 rounded"
                                />
                                <label htmlFor="reqDeposit" className="text-sm font-medium text-neutral-700">Requiere Seña Anticipada</label>
                            </div>

                            <div className="flex gap-3 mt-6 pt-4 border-t border-neutral-100">
                                <button type="button" onClick={() => setIsAddServiceModalOpen(false)} className="flex-1 py-2 text-neutral-500 hover:bg-neutral-50 rounded-lg">Cancelar</button>
                                <button type="submit" className="flex-1 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700">Guardar Servicio</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminSettings;
