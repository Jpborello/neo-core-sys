interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Inyecta datos estructurados schema.org. Se escapa "<" para que ningún texto
 * pueda cerrar la etiqueta <script> (recomendación de la guía de JSON-LD de Next.js).
 */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
