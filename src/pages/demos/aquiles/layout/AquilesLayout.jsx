import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MapPin, Instagram, Zap, ChevronRight } from 'lucide-react';

export default function AquilesLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Inicio', href: '/demo-aquiles' },
    { name: 'Productos', href: '#productos' },
    { name: 'Proyectos', href: '#proyectos' },
    { name: 'Contacto', href: '#contacto' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-800">
      {/* Top Bar */}
      <div className="bg-blue-900 text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1"><Phone size={14} /> +54 341 635-2705</span>
            <span className="hidden sm:flex items-center gap-1"><MapPin size={14} /> Rosario, Santa Fe</span>
          </div>
          <div className="flex items-center space-x-3">
            <a href="https://www.instagram.com/electricidadaquiles/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">
              <Instagram size={14} />
            </a>
            <span className="text-blue-300">|</span>
            <span className="font-medium">Envíos a todo el país</span>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/demo-aquiles" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white group-hover:bg-orange-500 transition-colors duration-300">
                <Zap size={24} fill="currentColor" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-slate-900 leading-none tracking-tight">ELECTRICIDAD <span className="text-blue-600">AQUILES</span></span>
                <span className="text-xs text-slate-500 font-medium tracking-widest uppercase">Soluciones Integrales</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActive(item.href) ? 'text-blue-600' : 'text-slate-600 hover:text-orange-500'
                  }`}
                >
                  {item.name}
                </a>
              ))}
              <a 
                href="https://wa.me/543416352705" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-orange-500/20 flex items-center gap-2"
              >
                <Phone size={16} />
                WhatsApp
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-600 hover:text-blue-600 p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-lg">
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-3 text-base font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <a 
                href="https://wa.me/543416352705"
                target="_blank"
                rel="noopener noreferrer" 
                className="block mt-4 text-center bg-orange-500 text-white px-4 py-3 rounded-lg font-bold"
              >
                Contactar por WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white">
                  <Zap size={18} fill="currentColor" />
                </div>
                <span className="text-lg font-bold text-white">ELECTRICIDAD AQUILES</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-400 mb-6">
                Especialistas en materiales eléctricos e iluminación para el hogar y la industria. Calidad, asesoramiento y los mejores precios del mercado.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/electricidadaquiles/" className="bg-slate-800 p-2 rounded-full hover:bg-blue-600 transition-colors text-white">
                  <Instagram size={18} />
                </a>
                <a href="https://wa.me/543416352705" className="bg-slate-800 p-2 rounded-full hover:bg-green-600 transition-colors text-white">
                  <Phone size={18} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6">Categorías</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-orange-400 transition-colors flex items-center gap-2"><ChevronRight size={14} /> Iluminación LED</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors flex items-center gap-2"><ChevronRight size={14} /> Materiales Eléctricos</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors flex items-center gap-2"><ChevronRight size={14} /> Cables y Conductores</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors flex items-center gap-2"><ChevronRight size={14} /> Herramientas</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6">Empresa</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-orange-400 transition-colors flex items-center gap-2"><ChevronRight size={14} /> Sobre Nosotros</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors flex items-center gap-2"><ChevronRight size={14} /> Proyectos Realizados</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors flex items-center gap-2"><ChevronRight size={14} /> Contacto</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors flex items-center gap-2"><ChevronRight size={14} /> Trabaja con nosotros</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6">Contacto</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-orange-500 mt-0.5 shrink-0" />
                  <span>Rosario, Santa Fe<br />Argentina</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-orange-500 shrink-0" />
                  <span>+54 341 635-2705</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-green-400">Abierto ahora</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>&copy; {new Date().getFullYear()} Electricidad Aquiles. Todos los derechos reservados.</p>
            <p>Designed by NeoCore Systems</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/543416352705"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-xl hover:bg-green-600 hover:scale-110 transition-all z-40 flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <Phone size={24} fill="currentColor" />
      </a>
    </div>
  );
}
