import { Fragment } from "react";

/** Renderiza texto plano con **negrita** como <strong>. */
export default function RichText({ text }: { text: string }) {
  const parts = text.split("**");
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? <strong key={i}>{part}</strong> : <Fragment key={i}>{part}</Fragment>
      )}
    </>
  );
}
