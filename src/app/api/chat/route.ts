import { NextResponse } from "next/server";
import { sendTelegramNotification } from "@/lib/telegram";

const SYSTEM_PROMPT = `Sos el asistente virtual inteligente de Neo Core Sys, Software House boutique basada en Rosario, Santa Fe, Argentina.

Tu objetivo principal:
1. Responder con precisión y entusiasmo sobre los servicios de software a medida, e-commerce, automatización con bots de IA y casos de éxito reales de la empresa.
2. CAPTURAR DATOS DEL CLIENTE (LEADS): Cada vez que un usuario pregunte por precios, cotizaciones, presupuestos, desarrollo de un sistema, demo o muestre interés comercial, respondé a su consulta y siempre pedile sus datos de contacto:
   - Su Nombre
   - Su Teléfono / WhatsApp
   - Horario de preferencia para recibir el contacto o llamada
   Si el usuario te brinda sus datos, confirmáselos cordialmente diciéndole que el equipo de Neo Core Sys se comunicará en ese horario para coordinar la demo o enviarle la propuesta personalizada.

REGLAS DE FORMATO ESTRICTAS:
- NUNCA uses asteriscos ('**' ni '*') para poner negritas o cursivas. Escribí en texto completamente limpio y natural.
- NUNCA uses numerales ('#') ni guiones raros.
- Respuestas concisas: máximo 2 párrafos breves, fáciles y ágiles de leer en un celular.
- Cuando menciones WhatsApp, pasá el link limpio: https://wa.me/5493417981212 o invitá a tocar el botón de WhatsApp.

Casos de Éxito y Logros Comprobables de Neo Core Sys:
1. El Paquetero (https://www.elpaquetero.com.ar/): E-commerce mayorista con mini ERP y CRM a medida. Cuenta con un agente de IA conectado directo a la base de datos PostgreSQL que consulta stock en tiempo real y ya cerró ventas completas sin intervención humana. Además, en solo 30 días en producción fue indexado y recomendado por ChatGPT (GEO).
2. Las Manitos de Mili: Sistema de turnos online y posicionamiento local que alcanzó 68.6% de CTR en Google Search Console y posición media 2.1 en búsquedas locales de Rosario.
3. ATFAR (https://www.atfar.com.ar/): Plataforma institucional que administra a todas las farmacias del norte de Santa Fe, con declaraciones juradas digitales (DDJJ) y padrón masivo.
4. Cuánto Te Quiero (https://cuanto-te-quiero.vercel.app/): Tienda e-commerce infantil de alta concurrencia y velocidad instantánea.

Servicios:
- Software a medida, SaaS y paneles de gestión con Next.js, React, TypeScript y PostgreSQL.
- Agentes de IA autónomos que atienden y concretan ventas conectados a bases de datos.
- Posicionamiento SEO y GEO (Generative Engine Optimization) para aparecer en Google, ChatGPT y Perplexity.

Contacto:
- WhatsApp: +54 9 341 798-1212
- Enlace directo: https://wa.me/5493417981212
- Correo: neocoresystem@gmail.com
`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Se requiere un array de mensajes válido." },
        { status: 400 }
      );
    }

    // Detección y notificación en tiempo real a Telegram (Speed-to-Lead)
    const lastUserMessage = messages[messages.length - 1]?.content || "";
    const phoneMatch = lastUserMessage.match(/(?:\+?\d{1,4}[ -]?)?(?:\(?\d{2,4}\)?[ -]?)?\d{3,4}[ -]?\d{3,4}/);
    const emailMatch = lastUserMessage.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);

    const cleanDigits = phoneMatch ? phoneMatch[0].replace(/\D/g, "") : "";
    const hasContact = cleanDigits.length >= 7 || Boolean(emailMatch);
    const extractedPhone = cleanDigits.length >= 7 ? phoneMatch![0].trim() : null;
    const cleanPhone = extractedPhone ? extractedPhone.replace(/[^0-9+]/g, "") : null;
    const waLink = cleanPhone && cleanPhone.length >= 8 ? `https://wa.me/${cleanPhone.replace("+", "")}` : null;

    if (lastUserMessage.trim().length > 0) {
      const headerTitle = hasContact
        ? "🔥 <b>¡LEAD CON CONTACTO EN CHATBOT IA!</b>"
        : "💬 <b>NUEVO MENSAJE EN EL CHATBOT IA</b>";

      const tgChatMsg = `
${headerTitle}

👤 <b>El visitante dice:</b>
<i>"${lastUserMessage.replace(/</g, "&lt;").replace(/>/g, "&gt;")}"</i>
${extractedPhone ? `\n📱 <b>Teléfono detectado:</b> ${extractedPhone}` : ""}
${emailMatch ? `\n📧 <b>Email detectado:</b> ${emailMatch[0]}` : ""}
${waLink ? `\n📲 <a href="${waLink}">Contactar por WhatsApp directamente</a>` : ""}
      `.trim();

      sendTelegramNotification(tgChatMsg).catch((err) =>
        console.error("Error enviando alerta de chat a Telegram:", err)
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;

    // Fallback si no está configurada la API Key en el entorno
    if (!apiKey) {
      console.error("CRITICAL: OPENROUTER_API_KEY is not defined in environment variables!");
      const lastUserMsg = lastUserMessage.toLowerCase();
      let fallbackText = "¡Hola! Soy el asistente virtual de Neo Core Sys. Nos especializamos en desarrollo de plataformas a medida (Next.js), automatización con IA y e-commerce de alto rendimiento.";

      if (lastUserMsg.includes("paquetero") || lastUserMsg.includes("bot") || lastUserMsg.includes("venta")) {
        fallbackText = "En El Paquetero desarrollamos un e-commerce mayorista con mini ERP y un bot de IA conectado directo a la base de datos PostgreSQL. El agente atiende consultas de stock y cierra ventas de forma 100% autónoma. Además, en solo un mes ya fue recomendado en respuestas de ChatGPT.";
      } else if (lastUserMsg.includes("mili") || lastUserMsg.includes("seo") || lastUserMsg.includes("google")) {
        fallbackText = "Con Las Manitos de Mili logramos una estrategia SEO local que alcanzó 68.6% de CTR en Google Search Console y posición media 2.1. Aplicamos datos estructurados y optimización GEO para que los clientes te encuentren primero.";
      } else if (lastUserMsg.includes("precio") || lastUserMsg.includes("presupuesto") || lastUserMsg.includes("cuanto") || lastUserMsg.includes("costo")) {
        fallbackText = "Cada proyecto se presupuesta a medida según sus requerimientos (desde catálogos ágiles hasta sistemas ERP complejos). Si querés una estimación rápida sin cargo, podés escribirnos directo por WhatsApp al +54 9 341 798-1212.";
      } else if (lastUserMsg.includes("atfar") || lastUserMsg.includes("sindicato") || lastUserMsg.includes("farmacia")) {
        fallbackText = "Para ATFAR desarrollamos el sistema integral que nuclea a todas las farmacias del norte de Santa Fe, gestionando declaraciones juradas mensuales (DDJJ), padrón masivo y bolsa de empleo digital.";
      }

      return NextResponse.json({
        content: `${fallbackText}\n\n¿Te gustaría que coordinemos una demo o te conectemos directo con nuestro equipo por WhatsApp?`,
      });
    }

    const model = process.env.OPENROUTER_MODEL || "google/gemini-3.7-flash";

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "https://neo-core-sys.com.ar",
        "X-Title": "Neo Core Sys",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.slice(-8), // Tomamos los últimos 8 mensajes para contexto óptimo
        ],
        temperature: 0.65,
        max_tokens: 450,
      }),
    });

    if (!response.ok) {
      const errData = await response.text();
      console.error("OpenRouter API Error:", response.status, errData);
      return NextResponse.json(
        { error: "Error de comunicación con el motor de IA." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "No pude procesar la respuesta. Por favor reintenta.";

    return NextResponse.json({ content: reply });
  } catch (error) {
    console.error("Error en /api/chat:", error);
    return NextResponse.json(
      { error: "Ocurrió un fallo en el servidor de chat." },
      { status: 500 }
    );
  }
}
