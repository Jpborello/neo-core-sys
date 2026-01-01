'use client';

import React, { useState } from 'react';
import { Calendar, Clock, User, Mail, Phone, MessageSquare } from 'lucide-react';

const BookingSection = ({ services }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        servicio_id: '',
        fecha_preferida: '',
        hora_preferida: '',
        notas: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage('');

        try {
            const response = await fetch('/api/mili/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitMessage('¡Perfecto! Te voy a contactar pronto para confirmar tu momento 💅');
                setFormData({
                    nombre: '',
                    email: '',
                    telefono: '',
                    servicio_id: '',
                    fecha_preferida: '',
                    hora_preferida: '',
                    notas: ''
                });
            } else {
                setSubmitMessage('Hubo un problema. Probá de nuevo o escribime por Instagram 🌸');
            }
        } catch (error) {
            setSubmitMessage('Hubo un problema. Probá de nuevo o escribime por Instagram 🌸');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="mili-booking-artistic" id="booking-section">
            <div className="mili-booking-container-artistic">
                <div className="mili-booking-header-artistic">
                    <h2 className="mili-booking-title-artistic">Reservá tu momento</h2>
                    <p className="mili-booking-subtitle-artistic">
                        Elegí el ritual que más te resuene y contame un poco sobre vos.<br />
                        Cuanto más sepa, más personal va a ser tu diseño.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="mili-booking-form-artistic">
                    <div className="mili-form-row">
                        <div className="mili-form-group-artistic">
                            <label htmlFor="nombre">
                                <User size={18} />
                                ¿Cómo te llamás?
                            </label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                                placeholder="Tu nombre"
                            />
                        </div>

                        <div className="mili-form-group-artistic">
                            <label htmlFor="telefono">
                                <Phone size={18} />
                                Tu teléfono
                            </label>
                            <input
                                type="tel"
                                id="telefono"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                                required
                                placeholder="+54 9 ..."
                            />
                        </div>
                    </div>

                    <div className="mili-form-group-artistic">
                        <label htmlFor="email">
                            <Mail size={18} />
                            Tu email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="tu@email.com"
                        />
                    </div>

                    <div className="mili-form-group-artistic">
                        <label htmlFor="servicio_id">
                            <Calendar size={18} />
                            ¿Qué ritual elegís?
                        </label>
                        <select
                            id="servicio_id"
                            name="servicio_id"
                            value={formData.servicio_id}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Elegí tu ritual...</option>
                            {services && services.map(service => (
                                <option key={service.id} value={service.id}>
                                    {service.nombre} - ${service.precio.toLocaleString('es-AR')}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mili-form-row">
                        <div className="mili-form-group-artistic">
                            <label htmlFor="fecha_preferida">
                                <Calendar size={18} />
                                ¿Cuándo te viene bien?
                            </label>
                            <input
                                type="date"
                                id="fecha_preferida"
                                name="fecha_preferida"
                                value={formData.fecha_preferida}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mili-form-group-artistic">
                            <label htmlFor="hora_preferida">
                                <Clock size={18} />
                                Horario preferido
                            </label>
                            <input
                                type="time"
                                id="hora_preferida"
                                name="hora_preferida"
                                value={formData.hora_preferida}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="mili-form-group-artistic">
                        <label htmlFor="notas">
                            <MessageSquare size={18} />
                            Contame sobre vos
                        </label>
                        <textarea
                            id="notas"
                            name="notas"
                            value={formData.notas}
                            onChange={handleChange}
                            rows="4"
                            placeholder="¿Qué estilo te gusta? ¿Tenés alguna idea en mente? ¿Es para una ocasión especial?"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="mili-booking-submit-artistic"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Enviando...' : 'Reservar mi momento'}
                    </button>

                    {submitMessage && (
                        <div className={`mili-booking-message-artistic ${submitMessage.includes('Perfecto') ? 'success' : 'error'}`}>
                            {submitMessage}
                        </div>
                    )}
                </form>
            </div>
        </section>
    );
};

export default BookingSection;
