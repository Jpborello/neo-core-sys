import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMotorcycle, FaCheckCircle, FaStar, FaWhatsapp, FaMapMarkerAlt, FaPhone, FaInstagram } from 'react-icons/fa';
import { motorcycles, categories, services, testimonials, parts } from '../../../components/demos/ginex-motors/data/motorcycles';

export default function Home() {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const featuredBikes = motorcycles.filter(m => m.featured);
    const newBikes = motorcycles.filter(m => m.condition === '0KM').slice(0, 3);
    const usedBikes = motorcycles.filter(m => m.condition === 'Usada').slice(0, 3);

    const filteredBikes = selectedCategory === 'all'
        ? motorcycles
        : motorcycles.filter(m => m.category.toLowerCase() === selectedCategory);

    return (
        <div className="bg-black">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black z-0">
                    <img
                        src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1920&q=80"
                        alt="Hero Motorcycle"
                        className="w-full h-full object-cover opacity-40"
                    />
                </div>

                {/* Red Glow Effect */}
                <div className="absolute inset-0 bg-gradient-radial from-red-600/20 via-transparent to-transparent z-10"></div>

                {/* Content */}
                <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6">
                            <span className="text-white">TU PRÓXIMA</span>
                            <br />
                            <span className="text-red-600">MOTO TE ESPERA</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light tracking-wide">
                            Motos 0KM y Usadas | Financiación | Garantía Oficial
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/ginex-motors/catalogo"
                                className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-none font-bold uppercase tracking-widest text-sm transition-all shadow-lg shadow-red-600/50 hover:shadow-red-600/70 hover:scale-105"
                            >
                                Ver Catálogo
                            </Link>
                            <a
                                href="https://wa.me/543413317035"
                                className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white px-10 py-4 rounded-none font-bold uppercase tracking-widest text-sm transition-all"
                            >
                                Consultar
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2"
                    >
                        <div className="w-1 h-2 bg-white/50 rounded-full"></div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Motorcycles */}
            <section className="py-20 bg-zinc-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
                            <span className="text-white">MOTOS </span>
                            <span className="text-red-600">DESTACADAS</span>
                        </h2>
                        <div className="w-24 h-1 bg-red-600 mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featuredBikes.map((bike, index) => (
                            <motion.div
                                key={bike.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative bg-zinc-900 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-red-600/20 transition-all"
                            >
                                {/* Condition Badge */}
                                <div className={`absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-xs font-bold uppercase ${bike.condition === '0KM' ? 'bg-red-600 text-white' : 'bg-yellow-500 text-black'}`}>
                                    {bike.condition}
                                </div>

                                {/* Image */}
                                <div className="relative h-64 overflow-hidden bg-black">
                                    <img
                                        src={bike.image}
                                        alt={bike.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-60"></div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-600 transition-colors">{bike.name}</h3>
                                    <p className="text-gray-400 text-sm mb-4">{bike.year} | {bike.category}</p>

                                    <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-gray-400">
                                        <div><span className="text-red-600">●</span> {bike.specs.engine}</div>
                                        <div><span className="text-red-600">●</span> {bike.specs.power}</div>
                                        <div><span className="text-red-600">●</span> {bike.specs.transmission}</div>
                                        <div><span className="text-red-600">●</span> {bike.specs.fuel}</div>
                                    </div>

                                    <div className="flex justify-between items-center pt-4 border-t border-zinc-800">
                                        <div>
                                            <p className="text-3xl font-black text-red-600">${(bike.price / 1000000).toFixed(1)}M</p>
                                        </div>
                                        <a
                                            href={`https://wa.me/543413317035?text=Hola! Me interesa la ${bike.name}`}
                                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-bold uppercase transition-all"
                                        >
                                            Consultar
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-20 bg-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
                            <span className="text-white">CATEGORÍAS</span>
                        </h2>
                        <p className="text-gray-400">Encuentra la moto perfecta para tu estilo</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {categories.map((cat) => (
                            <motion.div
                                key={cat.id}
                                whileHover={{ scale: 1.05 }}
                                className="bg-zinc-900 p-6 rounded-lg text-center cursor-pointer border-2 border-transparent hover:border-red-600 transition-all group"
                            >
                                <div className="text-5xl mb-3">{cat.icon}</div>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-600 transition-colors">{cat.name}</h3>
                                <p className="text-sm text-gray-400">{cat.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* New Bikes Section */}
            <section className="py-20 bg-zinc-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
                            <span className="text-red-600">MOTOS 0KM</span>
                        </h2>
                        <p className="text-gray-400">Últimos modelos con garantía oficial</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {newBikes.map((bike) => (
                            <div key={bike.id} className="bg-zinc-900 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-red-600/20 transition-all group">
                                <div className="relative h-56 overflow-hidden bg-black">
                                    <img src={bike.image} alt={bike.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-2">{bike.name}</h3>
                                    <p className="text-gray-400 text-sm mb-4">{bike.year} | {bike.category}</p>
                                    <div className="flex justify-between items-center">
                                        <p className="text-2xl font-black text-red-600">${(bike.price / 1000000).toFixed(1)}M</p>
                                        <a href={`https://wa.me/543413317035?text=Consulta por ${bike.name}`} className="text-red-600 hover:text-red-700 font-bold text-sm">
                                            Consultar →
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Used Bikes Section */}
            <section className="py-20 bg-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
                            <span className="text-white">MOTOS </span>
                            <span className="text-red-600">USADAS</span>
                        </h2>
                        <p className="text-gray-400">Calidad garantizada a los mejores precios</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {usedBikes.map((bike) => (
                            <div key={bike.id} className="bg-zinc-900 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-red-600/20 transition-all group">
                                <div className="relative h-56 overflow-hidden bg-black">
                                    <img src={bike.image} alt={bike.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                                        {bike.mileage.toLocaleString()} km
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-2">{bike.name}</h3>
                                    <p className="text-gray-400 text-sm mb-4">{bike.year} | {bike.category}</p>
                                    <div className="flex justify-between items-center">
                                        <p className="text-2xl font-black text-red-600">${(bike.price / 1000000).toFixed(1)}M</p>
                                        <a href={`https://wa.me/543413317035?text=Consulta por ${bike.name}`} className="text-red-600 hover:text-red-700 font-bold text-sm">
                                            Consultar →
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link to="/ginex-motors/catalogo" className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded font-bold uppercase tracking-widest text-sm transition-all">
                            Ver Catálogo Completo
                        </Link>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="servicios" className="py-20 bg-zinc-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
                            <span className="text-white">NUESTROS </span>
                            <span className="text-red-600">SERVICIOS</span>
                        </h2>
                        <div className="w-24 h-1 bg-red-600 mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((service) => (
                            <motion.div
                                key={service.id}
                                whileHover={{ y: -10 }}
                                className="bg-zinc-900 p-8 rounded-lg border-2 border-transparent hover:border-red-600 transition-all"
                            >
                                <div className="text-5xl mb-4">{service.icon}</div>
                                <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                                <p className="text-gray-400 mb-6">{service.description}</p>
                                <ul className="space-y-2">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                                            <FaCheckCircle className="text-red-600 flex-shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Parts & Accessories */}
            <section className="py-20 bg-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
                            <span className="text-white">REPUESTOS Y </span>
                            <span className="text-red-600">ACCESORIOS</span>
                        </h2>
                        <p className="text-gray-400">Todo lo que necesitas para tu moto</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {parts.map((part) => (
                            <div key={part.id} className="bg-zinc-900 rounded-lg overflow-hidden hover:shadow-xl hover:shadow-red-600/20 transition-all group">
                                <div className="h-48 bg-zinc-800 flex items-center justify-center">
                                    <FaMotorcycle className="text-6xl text-red-600/30 group-hover:text-red-600/50 transition-colors" />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-white mb-1">{part.name}</h3>
                                    <p className="text-xs text-gray-400 mb-2">{part.category}</p>
                                    <p className="text-lg font-bold text-red-600">${part.price.toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-zinc-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
                            <span className="text-white">LO QUE DICEN </span>
                            <span className="text-red-600">NUESTROS CLIENTES</span>
                        </h2>
                        <div className="w-24 h-1 bg-red-600 mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {testimonials.map((testimonial) => (
                            <motion.div
                                key={testimonial.id}
                                whileHover={{ y: -5 }}
                                className="bg-zinc-900 p-6 rounded-lg border-l-4 border-red-600"
                            >
                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <FaStar key={i} className="text-red-600" />
                                    ))}
                                </div>
                                <p className="text-gray-300 text-sm mb-4 italic">"{testimonial.text}"</p>
                                <p className="text-white font-bold text-sm">{testimonial.name}</p>
                                <p className="text-gray-500 text-xs">{testimonial.date}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contacto" className="py-20 bg-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
                            <span className="text-white">VISITANOS O </span>
                            <span className="text-red-600">CONTACTANOS</span>
                        </h2>
                        <p className="text-gray-400">Estamos para asesorarte</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="bg-red-600 p-4 rounded-lg">
                                    <FaMapMarkerAlt className="text-2xl text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Ubicación</h3>
                                    <p className="text-gray-400">Rosario, Santa Fe, Argentina</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-red-600 p-4 rounded-lg">
                                    <FaPhone className="text-2xl text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Teléfono</h3>
                                    <a href="tel:+543413317035" className="text-gray-400 hover:text-red-600 transition-colors">
                                        +54 341 331-7035
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-red-600 p-4 rounded-lg">
                                    <FaWhatsapp className="text-2xl text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">WhatsApp</h3>
                                    <a href="https://wa.me/543413317035" className="text-gray-400 hover:text-red-600 transition-colors">
                                        Enviar mensaje
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-red-600 p-4 rounded-lg">
                                    <FaInstagram className="text-2xl text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Instagram</h3>
                                    <a href="https://www.instagram.com/ginexmotors/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-600 transition-colors">
                                        @ginexmotors
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Quick Contact Form */}
                        <div className="bg-zinc-900 p-8 rounded-lg">
                            <h3 className="text-2xl font-bold text-white mb-6">Consulta Rápida</h3>
                            <form className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Nombre"
                                    className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded focus:outline-none focus:border-red-600 transition-colors"
                                />
                                <input
                                    type="tel"
                                    placeholder="Teléfono"
                                    className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded focus:outline-none focus:border-red-600 transition-colors"
                                />
                                <textarea
                                    placeholder="Mensaje"
                                    rows="4"
                                    className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded focus:outline-none focus:border-red-600 transition-colors resize-none"
                                ></textarea>
                                <button
                                    type="button"
                                    onClick={() => window.open('https://wa.me/543413317035', '_blank')}
                                    className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded font-bold uppercase tracking-widest text-sm transition-all"
                                >
                                    Enviar Consulta
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-red-600 to-red-800">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 text-white">
                        ¿LISTO PARA TU PRÓXIMA MOTO?
                    </h2>
                    <p className="text-xl text-white/90 mb-8">
                        Visitanos o contactanos por WhatsApp. Te asesoramos sin compromiso.
                    </p>
                    <a
                        href="https://wa.me/543413317035?text=Hola! Quiero consultar por una moto"
                        className="inline-block bg-white text-red-600 hover:bg-gray-100 px-10 py-4 rounded font-bold uppercase tracking-widest text-sm transition-all shadow-xl"
                    >
                        Contactar Ahora
                    </a>
                </div>
            </section>
        </div>
    );
}
