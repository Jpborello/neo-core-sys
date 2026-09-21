import Link from "next/link";
import { SITE } from "@/lib/site";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <p className={styles.logo}>
              neo core<i>.</i>sys
            </p>
            <p className={styles.about}>
              Software house de Rosario. Desarrollamos sistemas a medida, e-commerce mayorista y
              agentes de IA con código propio, arquitectura robusta y diseño cuidado.
            </p>
          </div>

          <nav className={styles.col} aria-label="Navegación del sitio">
            <h2 className={styles.colTitle}>Navegación</h2>
            <ul className={styles.list}>
              <li><Link href="/#servicios">Servicios</Link></li>
              <li><Link href="/#casos-de-exito">Casos de éxito</Link></li>
              <li><Link href="/#tecnologias">Tecnologías</Link></li>
              <li><Link href="/#nosotros">Nosotros</Link></li>
              <li><Link href="/#faq">Preguntas frecuentes</Link></li>
            </ul>
          </nav>

          <nav className={styles.col} aria-label="Soluciones">
            <h2 className={styles.colTitle}>Soluciones</h2>
            <ul className={styles.list}>
              <li><Link href="/ecommerce-mayorista">E-commerce mayorista B2B</Link></li>
              <li><Link href="/desarrollo-software-rosario">Software en Rosario y Santa Fe</Link></li>
              <li><Link href="/#servicios">CRM y bot con IA</Link></li>
              <li><a href="/llms.txt">Índice para IA (llms.txt)</a></li>
            </ul>
          </nav>

          <address className={styles.col}>
            <h2 className={styles.colTitle}>Contacto</h2>
            <ul className={styles.list}>
              <li>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
              <li>
                <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">
                  WhatsApp {SITE.phoneDisplay}
                </a>
              </li>
              <li className={styles.plain}>
                {SITE.locality}, {SITE.region}, Argentina
              </li>
            </ul>
          </address>
        </div>

        <div className={styles.bottom}>
          <p>
            &copy; {year} {SITE.name}. Todos los derechos reservados.
          </p>
          <p className={styles.status}>
            <span className={styles.dot} aria-hidden="true" /> Hecho a mano en Rosario, Argentina
          </p>
        </div>
      </div>
    </footer>
  );
}
