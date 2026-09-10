"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./ChatWidget.module.css";

interface Message {
  role: "user" | "assistant";
  content: string;
  time?: string;
}

const renderFormattedContent = (rawContent: string) => {
  // 1. Limpiar asteriscos y marcadores de markdown para que el texto sea natural y limpio
  const text = rawContent
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/^#+\s+/gm, "");

  // 2. Reconocer enlaces Markdown [Texto](URL), URLs sueltas y teléfonos WhatsApp
  const tokenRegex = /\[([^\]]+)\]\((https?:\/\/[^\s\)]+)\)|(https?:\/\/[^\s\)]+)|(\+?54\s*9?\s*341[\s\d-]{5,12}\d|341[\s\d-]{5,10}\d)/gi;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(text)) !== null) {
    const matchStart = match.index;
    const matchEnd = tokenRegex.lastIndex;

    // Agregar texto plano previo al match
    if (matchStart > lastIndex) {
      parts.push(text.substring(lastIndex, matchStart));
    }

    if (match[1] && match[2]) {
      // Enlace tipo [WhatsApp](https://wa.me/...)
      const label = match[1];
      const url = match[2];
      parts.push(
        <a
          key={`link-${matchStart}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {label}
        </a>
      );
    } else if (match[3]) {
      // URL directa
      const url = match[3];
      const isWhatsApp = url.includes("wa.me");
      parts.push(
        <a
          key={`url-${matchStart}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {isWhatsApp ? "Escribir por WhatsApp" : url}
        </a>
      );
    } else if (match[4]) {
      // Número de teléfono directo
      const phone = match[4].trim();
      const cleanDigits = phone.replace(/\D/g, "");
      const waUrl = `https://wa.me/${cleanDigits.startsWith("54") ? cleanDigits : "54" + cleanDigits}`;
      parts.push(
        <a
          key={`phone-${matchStart}`}
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {phone}
        </a>
      );
    }

    lastIndex = matchEnd;
  }

  // Texto restante
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts;
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "¡Hola! 👋 Soy el asistente IA de Neo Core Sys.\n\n¿Tenés una idea de negocio o querés saber cómo automatizar tus ventas con un bot inteligente como hicimos en El Paquetero? Preguntame lo que necesites.",
      time: "Ahora",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen, messages]);

  const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: messageContent,
      time: getCurrentTime(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();

      if (response.ok && data.content) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.content,
            time: getCurrentTime(),
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Hubo un inconveniente momentáneo. Por favor reintentá o comunicate directamente con nosotros por WhatsApp al +54 9 341 798-1212.",
            time: getCurrentTime(),
          },
        ]);
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "No pudimos conectar con el servidor. Podés escribirnos directo por WhatsApp para una atención inmediata.",
          time: getCurrentTime(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    "¿Cómo funciona el bot de El Paquetero?",
    "¿Qué lograron con Las Manitos de Mili?",
    "¿Cómo aparezco en ChatGPT?",
    "Quiero cotizar mi proyecto",
  ];

  return (
    <div className={styles.widgetWrapper}>
      {isOpen && (
        <div className={styles.chatWindow}>
          {/* Header */}
          <div className={styles.chatHeader}>
            <div className={styles.headerInfo}>
              <div className={styles.avatarWrapper}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
                  <circle cx="12" cy="12" r="4"></circle>
                </svg>
              </div>
              <div className={styles.headerTexts}>
                <span className={styles.botName}>
                  Neo Core AI
                  <span className={styles.onlineDot}></span>
                </span>
                <span className={styles.botStatus}>En línea • IA 24/7</span>
              </div>
            </div>

            <button
              className={styles.closeBtn}
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar chat"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Messages list */}
          <div className={styles.messagesList}>
            {messages.map((msg, idx) => {
              const isAssistant = msg.role === "assistant";
              return (
                <div
                  key={idx}
                  className={`${styles.messageRow} ${
                    isAssistant
                      ? styles.messageRowAssistant
                      : styles.messageRowUser
                  }`}
                >
                  <div
                    className={`${styles.messageBubble} ${
                      isAssistant
                        ? styles.bubbleAssistant
                        : styles.bubbleUser
                    }`}
                  >
                    {renderFormattedContent(msg.content)}
                  </div>
                  {msg.time && (
                    <span
                      className={`${styles.messageTime} ${
                        !isAssistant ? styles.timeUser : ""
                      }`}
                    >
                      {msg.time}
                    </span>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div
                className={`${styles.messageRow} ${styles.messageRowAssistant}`}
              >
                <div className={styles.typingIndicator}>
                  <div className={styles.typingDot}></div>
                  <div className={styles.typingDot}></div>
                  <div className={styles.typingDot}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick chips */}
          <div className={styles.quickChips}>
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                type="button"
                className={styles.chipBtn}
                onClick={() => handleSendMessage(prompt)}
                disabled={isLoading}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* WhatsApp Direct Banner */}
          <div className={styles.whatsappRow}>
            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
              ¿Querés respuesta inmediata?
            </span>
            <a
              href="https://wa.me/5493417981212?text=Hola!%20Estuve%20viendo%20la%20web%20de%20Neo%20Core%20Sys%20y%20quiero%20hacerles%20una%20consulta."
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappLink}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              WhatsApp
            </a>
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className={styles.chatInputForm}
          >
            <input
              ref={inputRef}
              type="text"
              className={styles.chatInput}
              placeholder="Escribí tu consulta..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="submit"
              className={styles.sendBtn}
              disabled={isLoading || !input.trim()}
              aria-label="Enviar mensaje"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* Floating launcher trigger */}
      <button
        className={styles.launcherBtn}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Abrir asistente inteligente"
      >
        <div className={styles.launcherIcon}>
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          )}
        </div>
        <div className={styles.launcherBadge}>
          <span className={styles.onlineDot}></span>
          <span>{isOpen ? "Cerrar" : "Consultar con IA"}</span>
        </div>
      </button>
    </div>
  );
}
