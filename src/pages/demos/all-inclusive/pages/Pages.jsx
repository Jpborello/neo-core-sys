import React from 'react';

export function About() {
    return (
        <div className="bg-black min-h-screen pt-24 pb-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8">Nuestra Esencia</h1>
                <div className="aspect-video w-full bg-neutral-900 mb-12 overflow-hidden relative">
                    <img
                        src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=2000"
                        alt="About Us"
                        className="w-full h-full object-cover opacity-70"
                    />
                </div>
                <div className="space-y-8 text-gray-300 text-lg font-light leading-relaxed text-justify">
                    <p>
                        <strong className="text-white font-bold uppercase tracking-widest">All Inclusive Men</strong> nació en Rosario con una misión clara: vestir al hombre moderno que valora la calidad por sobre la cantidad. No somos solo una marca de ropa; somos una declaración de principios.
                    </p>
                    <p>
                        Creemos en el diseño atemporal, en las prendas que duran más de una temporada y en la elegancia sin esfuerzo. Cada pieza de nuestra colección es seleccionada pensando en la versatilidad y el confort, sin sacrificar el estilo.
                    </p>
                    <p>
                        Nuestro compromiso es ofrecer una experiencia de compra premium, accesible y transparente. Desde la selección de telas hasta el momento en que recibís tu paquete, cuidamos cada detalle.
                    </p>
                </div>
            </div>
        </div>
    );
}

export function Contact() {
    return (
        <div className="bg-black min-h-screen pt-24 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8">Contacto</h1>
                        <p className="text-gray-400 mb-12 font-light text-lg">
                            ¿Tenés alguna duda sobre talles, envíos o stock? Escribinos. Estamos para asesorarte.
                        </p>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-yellow-500 font-bold uppercase tracking-widest mb-2">Showroom</h3>
                                <p className="text-white">Mendoza 6440<br />Rosario, Santa Fe</p>
                            </div>
                            <div>
                                <h3 className="text-yellow-500 font-bold uppercase tracking-widest mb-2">WhatsApp</h3>
                                <p className="text-white">+54 341 284-4169</p>
                            </div>
                            <div>
                                <h3 className="text-yellow-500 font-bold uppercase tracking-widest mb-2">Redes</h3>
                                <p className="text-white">@allinclusiveindumentaria</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-neutral-900 p-8 md:p-12 border border-white/10">
                        <form className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Nombre</label>
                                <input type="text" className="w-full bg-black border border-gray-800 text-white p-4 focus:border-yellow-500 focus:outline-none transition-colors" placeholder="TU NOMBRE" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email</label>
                                <input type="email" className="w-full bg-black border border-gray-800 text-white p-4 focus:border-yellow-500 focus:outline-none transition-colors" placeholder="TU EMAIL" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Mensaje</label>
                                <textarea rows="4" className="w-full bg-black border border-gray-800 text-white p-4 focus:border-yellow-500 focus:outline-none transition-colors" placeholder="¿EN QUÉ PODEMOS AYUDARTE?"></textarea>
                            </div>
                            <button type="button" className="w-full bg-white text-black py-4 font-bold uppercase tracking-widest hover:bg-yellow-500 transition-colors">
                                Enviar Mensaje
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
