import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      {/* Background decoration glows */}
      <div className="ambient-glow glow-violet" style={{ width: "300px", height: "300px", bottom: "-100px", right: "-100px" }}></div>
      <div className="ambient-glow glow-cyan" style={{ width: "250px", height: "250px", bottom: "-50px", left: "-50px", opacity: 0.2 }}></div>

      <div className="container">
        <div className={styles.footerGrid}>
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <div className={styles.logo}>
              NEO CORE SYS<span className={styles.logoDot}></span>
            </div>
            <p className={styles.description}>
              Desarrollamos soluciones digitales a medida de alta performance, priorizando la arquitectura robusta, velocidad y un diseño premium.
            </p>
          </div>

          {/* Navigation Links Column */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Navegación</h4>
            <nav className={styles.linksList}>
              <a href="#servicios" className={styles.link}>Servicios</a>
              <a href="#casos-de-exito" className={styles.link}>Casos de éxito</a>
              <a href="#tecnologias" className={styles.link}>Tecnologías</a>
              <a href="#nosotros" className={styles.link}>Nosotros</a>
            </nav>
          </div>

          {/* Contact Details Column */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Contacto</h4>
            <div className={styles.contactInfo}>
              <a href="mailto:neocoresystem@gmail.com" className={styles.contactItem} style={{ textDecoration: "none", color: "inherit", transition: "var(--transition-smooth)" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.contactIcon}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>neocoresystem@gmail.com</span>
              </a>
              <div className={styles.contactItem}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.contactIcon}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>Rosario, Santa Fe, Argentina</span>
              </div>
              <a href="https://wa.me/5493417981212" target="_blank" rel="noopener noreferrer" className={styles.contactItem} style={{ textDecoration: "none", color: "inherit", transition: "var(--transition-smooth)" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.contactIcon} style={{ color: "#25d366" }}>
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
                <span style={{ fontWeight: 600 }}>+54 9 341 798-1212</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            &copy; {currentYear} Neo Core Sys. Todos los derechos reservados.
          </p>
          <div className={styles.signature}>
            Desarrollado con pasión por <span className={styles.signatureHighlight}>Neo Core Sys</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
