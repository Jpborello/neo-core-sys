"use client";

import { useState, useEffect } from "react";
import styles from "./Header.module.css";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState("cyan-violet");
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  const themes = [
    { id: "cyan-violet", name: "Cian Violeta", cyan: "#06b6d4", violet: "#8b5cf6" },
    { id: "emerald-gold", name: "Esmeralda Oro", cyan: "#10b981", violet: "#f59e0b" },
    { id: "amber-rose", name: "Ámbar Rosa", cyan: "#fb923c", violet: "#db2777" },
    { id: "indigo-blue", name: "Índigo Azul", cyan: "#6366f1", violet: "#3b82f6" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initialize theme from localStorage on client side
  useEffect(() => {
    const savedTheme = localStorage.getItem("neo-theme") || "cyan-violet";
    setActiveTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // Close theme dropdown when clicking outside
  useEffect(() => {
    if (!isThemeMenuOpen) return;
    const handleOutsideClick = () => {
      setIsThemeMenuOpen(false);
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [isThemeMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleThemeMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsThemeMenuOpen(!isThemeMenuOpen);
  };

  const handleThemeChange = (themeId: string) => {
    setActiveTheme(themeId);
    document.documentElement.setAttribute("data-theme", themeId);
    localStorage.setItem("neo-theme", themeId);
    setIsThemeMenuOpen(false);
  };

  const currentActiveThemeObj = themes.find(t => t.id === activeTheme) || themes[0];

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ""}`}>
        <div className={`container ${styles.navContainer}`}>
          <a href="#" className={styles.logo} onClick={closeMenu}>
            NEO CORE SYS<span className={styles.logoDot}></span>
          </a>

          {/* Desktop Nav Links */}
          <nav className={styles.navLinks}>
            <a href="#servicios" className={styles.navLink}>Servicios</a>
            <a href="#casos-de-exito" className={styles.navLink}>Casos de éxito</a>
            <a href="#tecnologias" className={styles.navLink}>Tecnologías</a>
            <a href="#nosotros" className={styles.navLink}>Nosotros</a>
            
            {/* Theme Selector Widget */}
            <div className={styles.themeSelectorContainer}>
              <button 
                className={styles.themeSelectorBtn} 
                onClick={toggleThemeMenu}
                aria-label="Cambiar tema de color"
                title="Personalizar color de acento"
              >
                <span 
                  className={styles.themeIndicatorDot}
                  style={{ 
                    background: `linear-gradient(135deg, ${currentActiveThemeObj.cyan}, ${currentActiveThemeObj.violet})`,
                    boxShadow: `0 0 8px ${currentActiveThemeObj.cyan}`
                  }}
                ></span>
              </button>
              
              {isThemeMenuOpen && (
                <div className={styles.themeDropdown} onClick={(e) => e.stopPropagation()}>
                  {themes.map((t) => (
                    <button 
                      key={t.id} 
                      className={`${styles.themeOption} ${activeTheme === t.id ? styles.themeOptionActive : ""}`}
                      onClick={() => handleThemeChange(t.id)}
                    >
                      <span 
                        className={styles.themeOptionColorCircle} 
                        style={{ background: `linear-gradient(135deg, ${t.cyan}, ${t.violet})` }}
                      ></span>
                      <span className={styles.themeOptionName}>{t.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a href="#contacto" className={styles.contactBtn}>Contacto</a>
          </nav>

          {/* Hamburger Icon */}
          <button 
            className={styles.mobileMenuBtn} 
            onClick={toggleMenu} 
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="12" x2="20" y2="12"></line>
                <line x1="4" y1="6" x2="20" y2="6"></line>
                <line x1="4" y1="18" x2="20" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`${styles.mobileNav} ${isMenuOpen ? styles.mobileNavActive : ""}`}>
        <a href="#servicios" className={styles.mobileNavLink} onClick={closeMenu}>Servicios</a>
        <a href="#casos-de-exito" className={styles.mobileNavLink} onClick={closeMenu}>Casos de éxito</a>
        <a href="#tecnologias" className={styles.mobileNavLink} onClick={closeMenu}>Tecnologías</a>
        <a href="#nosotros" className={styles.mobileNavLink} onClick={closeMenu}>Nosotros</a>
        
        {/* Mobile Theme Selector (Simple list) */}
        <div className={styles.mobileThemeSelector}>
          <span className={styles.mobileThemeLabel}>Acento de Color:</span>
          <div className={styles.mobileThemeRow}>
            {themes.map((t) => (
              <button 
                key={t.id}
                className={`${styles.mobileThemeCircle} ${activeTheme === t.id ? styles.mobileThemeCircleActive : ""}`}
                style={{ background: `linear-gradient(135deg, ${t.cyan}, ${t.violet})` }}
                onClick={() => handleThemeChange(t.id)}
                title={t.name}
              />
            ))}
          </div>
        </div>

        <a href="#contacto" className={styles.contactBtn} onClick={closeMenu} style={{ textAlign: "center", display: "block", marginTop: "10px" }}>
          Contacto
        </a>
      </div>

      {/* Background Overlay */}
      <div 
        className={`${styles.overlay} ${isMenuOpen ? styles.overlayActive : ""}`} 
        onClick={closeMenu}
      ></div>
    </>
  );
}
