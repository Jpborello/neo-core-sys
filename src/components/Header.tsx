"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";

const NAV = [
  { href: "/#servicios", label: "Servicios" },
  { href: "/#casos-de-exito", label: "Casos" },
  { href: "/#tecnologias", label: "Stack" },
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/#faq", label: "FAQ" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cerrar el menú con Escape y bloquear el scroll del fondo mientras está abierto
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
        <div className={`container ${styles.bar}`}>
          <Link href="/" className={styles.logo} onClick={closeMenu} aria-label="Neo Core Sys, inicio">
            <span aria-hidden="true">
              neo core<i className={styles.dot}>.</i>sys
            </span>
          </Link>

          <nav className={styles.nav} aria-label="Principal">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className={styles.link}>
                {item.label}
              </Link>
            ))}
          </nav>

          <Link href="/#contacto" className={`btn btn--solid ${styles.cta}`}>
            Hablemos
          </Link>

          <button
            type="button"
            className={styles.burger}
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
            aria-controls="menu-movil"
          >
            <span className={`${styles.burgerLine} ${isMenuOpen ? styles.burgerOpen : ""}`} />
          </button>
        </div>
      </header>

      <div
        id="menu-movil"
        className={`${styles.drawer} ${isMenuOpen ? styles.drawerOpen : ""}`}
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
      >
        <nav className={styles.drawerNav} aria-label="Menú móvil">
          {NAV.map((item, index) => (
            <Link key={item.href} href={item.href} className={styles.drawerLink} onClick={closeMenu}>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              {item.label}
            </Link>
          ))}
          <Link href="/#contacto" className="btn btn--solid" onClick={closeMenu}>
            Solicitar consulta
          </Link>
        </nav>
      </div>
    </>
  );
}
