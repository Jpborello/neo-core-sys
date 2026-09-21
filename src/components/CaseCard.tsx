import type { Project } from "@/lib/projects";
import styles from "./CaseCard.module.css";

interface CaseCardProps {
  project: Project;
  /** Tarjeta grande (vista previa más alta). */
  featured?: boolean;
}

/**
 * Tarjeta de caso: vista previa ilustrativa en marco de navegador (decorativa,
 * no es una captura), nombre con enlace extendido a todo el card, rubro,
 * resumen, resultados y tecnologías.
 */
export default function CaseCard({ project, featured = false }: CaseCardProps) {
  const blocks = featured ? 8 : 4;

  return (
    <article
      className={`${styles.card} ${featured ? styles.featured : ""}`}
      style={
        {
          "--bar": project.look.bar,
          "--block": project.look.block,
        } as React.CSSProperties
      }
    >
      <div className={styles.frame} aria-hidden="true">
        <div className={styles.chrome}>
          <i />
          <i />
          <i />
          <span>{project.host}</span>
        </div>
        <div className={styles.shot}>
          <b />
          {Array.from({ length: blocks }, (_, index) => (
            <s key={index} />
          ))}
        </div>
      </div>

      <p className={styles.kind}>{project.kind}</p>
      <h3 className={styles.title}>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          {project.name}
          <span className="sr-only"> (se abre en una pestaña nueva)</span>
        </a>
        <span className={styles.arrow} aria-hidden="true">
          ↗
        </span>
      </h3>
      <p className={styles.text}>{project.summary}</p>

      <div className={styles.readouts}>
        {project.readouts.map((readout) => (
          <p key={readout.label}>
            <strong>{readout.value}</strong>
            <span>{readout.label}</span>
          </p>
        ))}
      </div>

      <ul className={styles.tags}>
        {project.tags.map((tag) => (
          <li key={tag} className="tag">
            {tag}
          </li>
        ))}
      </ul>
    </article>
  );
}
