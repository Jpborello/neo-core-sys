"use client";

import { useState } from "react";
import styles from "./ContactForm.module.css";

type Status = { type: "success" | "error" | null; message: string };

const INITIAL = {
  name: "",
  email: "",
  phone: "",
  projectType: "web-app",
  message: "",
};

export default function ContactForm() {
  const [formData, setFormData] = useState(INITIAL);
  const [status, setStatus] = useState<Status>({ type: null, message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        setStatus({ type: "success", message: data.message });
        setFormData(INITIAL);
      } else {
        setStatus({ type: "error", message: data.error || "Algo salió mal. Por favor reintentá." });
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", message: "Error de red. Verificá tu conexión e intentá de nuevo." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Tu nombre o empresa"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="hola@tuempresa.com"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="phone">
          WhatsApp <span>(opcional)</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+54 9 341 123-4567"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="projectType">Tipo de proyecto</label>
        <select id="projectType" name="projectType" value={formData.projectType} onChange={handleChange}>
          <option value="web-app">Plataforma web / SaaS</option>
          <option value="e-commerce">E-commerce / tienda mayorista</option>
          <option value="integracion-ia">Automatización o integración con IA</option>
          <option value="consultoria">Consultoría IT o capacitación</option>
        </select>
      </div>

      <div className={`${styles.field} ${styles.full}`}>
        <label htmlFor="message">Mensaje</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Contanos qué querés construir o qué proceso querés automatizar..."
          value={formData.message}
          onChange={handleChange}
        />
      </div>

      <div className={`${styles.full} ${styles.footer}`}>
        <button type="submit" disabled={isSubmitting} className="btn btn--solid">
          {isSubmitting ? "Enviando…" : "Enviar mensaje"}
        </button>
        <p className={styles.note}>Respondemos en el día. Sin compromiso.</p>
      </div>

      <div className={styles.full} role="status" aria-live="polite">
        {status.type && (
          <p className={status.type === "success" ? styles.success : styles.error}>
                        {status.message}
          </p>
        )}
      </div>
    </form>
  );
}
