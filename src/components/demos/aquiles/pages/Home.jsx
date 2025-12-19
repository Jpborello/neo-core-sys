import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Lightbulb, Zap, Shield, Truck, Star } from 'lucide-react';

export default function AquilesHome() {
    return (
        <div className="flex flex-col gap-0">
            {/* Hero Section */}
            <section className="relative bg-slate-900 text-white py-24 lg:py-32 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-500 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/50 via-slate-900 to-slate-900"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm font-medium mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            Innovación en Iluminación
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Soluciones eléctricas para tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-orange-400">hogar y empresa</span>
                        </h1>
                        <p className="text-lg text-slate-300 mb-8 max-w-2xl leading-relaxed">
                            Encontrá todo lo que necesitás en materiales eléctricos, iluminación LED y decoración. Asesoramiento técnico especializado y las mejores marcas del mercado.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/demo-aquiles/catalogo" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25">
                                Ver Catálogo
                                <ArrowRight size={20} />
                            </Link>
                            <a href="#contacto" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold transition-all flex items-center justify-center border border-white/10">
                                Solicitar Presupuesto
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Grid */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Todo lo que buscás en un solo lugar</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto">Explorá nuestras categorías principales y encontrá la solución perfecta para tu proyecto.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {[
                            { name: 'Iluminación LED', icon: Lightbulb, color: 'text-yellow-500', bg: 'bg-yellow-50' },
                            { name: 'Cables', icon: Zap, color: 'text-orange-500', bg: 'bg-orange-50' },
                            { name: 'Térmicas', icon: Shield, color: 'text-blue-500', bg: 'bg-blue-50' },
                            { name: 'Tomacorrientes', icon: Zap, color: 'text-purple-500', bg: 'bg-purple-50' },
                            { name: 'Cielorrasos', icon: Lightbulb, color: 'text-cyan-500', bg: 'bg-cyan-50' },
                            { name: 'Accesorios', icon: Zap, color: 'text-slate-500', bg: 'bg-slate-50' },
                        ].map((cat, idx) => (
                            <Link key={idx} to="/demo-aquiles/catalogo" className="group cursor-pointer">
                                <div className={`aspect-square rounded-2xl ${cat.bg} flex flex-col items-center justify-center gap-4 mb-3 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg border border-slate-100`}>
                                    <cat.icon size={32} className={cat.color} />
                                </div>
                                <h3 className="text-center font-medium text-slate-700 group-hover:text-blue-600 transition-colors">{cat.name}</h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-20 bg-slate-50" id="productos">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-2">Productos Destacados</h2>
                            <p className="text-slate-500">Las mejores ofertas de la semana</p>
                        </div>
                        <Link to="/demo-aquiles/catalogo" className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-1">Ver todo <ArrowRight size={16} /></Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { id: 1, name: 'Panel LED 18W Redondo', price: 4500, img: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=800&auto=format&fit=crop' },
                            { id: 2, name: 'Lámpara Colgante Industrial', price: 12500, img: 'https://images.unsplash.com/photo-1540932296774-3ed6d2dee425?q=80&w=800&auto=format&fit=crop' },
                            { id: 3, name: 'Kit Tomacorriente USB', price: 8900, img: 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?q=80&w=800&auto=format&fit=crop' },
                            { id: 4, name: 'Reflector LED Exterior', price: 15600, img: 'https://images.unsplash.com/photo-1563302111-eab4b145e6c9?q=80&w=800&auto=format&fit=crop' },
                        ].map((item) => (
                            <div key={item.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
                                <div className="aspect-[4/3] relative overflow-hidden">
                                    <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">OFERTA</div>
                                </div>
                                <div className="p-4">
                                    <div className="text-xs text-blue-600 font-semibold mb-1">ILUMINACIÓN</div>
                                    <h3 className="font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{item.name}</h3>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xl font-bold text-slate-900">${item.price.toLocaleString()}</span>
                                        <button className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                                            <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* LED Special Section */}
            <section className="py-24 bg-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Especialistas en Tecnología LED</h2>
                            <p className="text-slate-300 mb-8 text-lg leading-relaxed">
                                Modernizá tus espacios con nuestra línea premium de iluminación LED. Ahorrá hasta un 80% de energía sin sacrificar potencia lumínica.
                            </p>
                            <ul className="space-y-4 mb-8">
                                {['Paneles y Plafones', 'Tiras LED RGB y Smart', 'Reflectores de Alta Potencia', 'Lámparas Vintage y Decorativas'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-200">
                                        <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                            <CheckCircle2 size={14} />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Link to="/demo-aquiles/catalogo" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-bold transition-colors inline-block">
                                Ver Catálogo LED
                            </Link>
                        </div>
                        <div className="relative">
                            <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-600 to-blue-900 p-1 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                                <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center relative overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1617103996702-96ff29b1c467?q=80&w=800&auto=format&fit=crop" alt="LED Bulb" className="w-full h-full object-cover opacity-80" />
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section className="py-20 bg-white" id="proyectos">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Proyectos Realizados</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto">
                            Descubrí cómo transformamos espacios con nuestras soluciones de iluminación y materiales eléctricos.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: 'Iluminación Comercial', desc: 'Instalación completa de paneles LED en oficinas.', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop' },
                            { title: 'Hogar Inteligente', desc: 'Automatización y luces RGB en residencia privada.', img: 'https://images.unsplash.com/photo-1558002038-109177381792?q=80&w=800&auto=format&fit=crop' },
                            { title: 'Industria', desc: 'Renovación de tableros y luminarias industriales.', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop' },
                        ].map((project, idx) => (
                            <div key={idx} className="group cursor-pointer">
                                <div className="aspect-video rounded-xl mb-4 overflow-hidden relative">
                                    <img src={project.img} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{project.title}</h3>
                                <p className="text-slate-500 text-sm">{project.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Shield, title: 'Garantía Asegurada', desc: 'Todos nuestros productos cuentan con garantía oficial de fábrica.' },
                            { icon: Star, title: 'Primeras Marcas', desc: 'Trabajamos solo con marcas líderes en el mercado eléctrico.' },
                            { icon: Truck, title: 'Envíos Rápidos', desc: 'Despachamos tu pedido en el día a todo el país.' },
                        ].map((benefit, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-slate-100">
                                <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
                                    <benefit.icon size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                                <p className="text-slate-500">{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 bg-slate-900 text-white" id="contacto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-blue-600 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Tenés un proyecto en mente?</h2>
                            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                                Nuestro equipo de expertos está listo para asesorarte y brindarte la mejor solución eléctrica.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <a
                                    href="https://wa.me/543416352705"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Zap size={20} />
                                    Consultar por WhatsApp
                                </a>
                                <button className="bg-blue-700 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-800 transition-colors border border-blue-500">
                                    Ver Ubicación
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
