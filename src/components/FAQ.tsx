import type { FaqItem } from "@/lib/faqs";
import RichText from "./RichText";
import styles from "./FAQ.module.css";

interface FAQProps {
  items: FaqItem[];
  /** Identificador de grupo: hace que abrir una pregunta cierre la anterior. */
  group: string;
  eyebrow: string;
  /** Número de sección (se muestra en terracota antes del eyebrow). */
  n?: string;
  title: React.ReactNode;
  description: string;
  id?: string;
}

/**
 * Acordeón con <details>/<summary> nativos: cero JavaScript, accesible por
 * teclado y con todas las respuestas presentes en el HTML (lo que necesitan
 * los crawlers de Google y de los buscadores de IA).
 */
export default function FAQ({ items, group, eyebrow, n, title, description, id }: FAQProps) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${group}-title`}>
      <div className="container">
        <header className="section-head">
          <p className="eyebrow" data-n={n}>
            {eyebrow}
          </p>
          <h2 id={`${group}-title`} className="section-title">
            {title}
          </h2>
          <p className="section-desc">{description}</p>
        </header>

        <div className={styles.list}>
          {items.map((item, index) => (
            <details key={item.q} name={group} className={styles.item} open={index === 0}>
              <summary className={styles.summary}>
                <span className={styles.index} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={styles.question}>{item.q}</span>
                <span className={styles.icon} aria-hidden="true" />
              </summary>
              <div className={styles.answer}>
                <p>
                  <RichText text={item.a} />
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
