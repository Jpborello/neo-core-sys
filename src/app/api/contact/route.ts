import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, projectType, message } = body;

    // Simple validations
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Por favor, completa los campos requeridos (Nombre, Email y Mensaje)." },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Por favor, ingresa un correo electrónico válido." },
        { status: 400 }
      );
    }

    const readableProjectType = 
      projectType === "web-app" ? "Plataforma Web / SaaS" :
      projectType === "e-commerce" ? "E-Commerce / Tienda B2B B2C" :
      projectType === "integracion-ia" ? "Automatización o Integración IA" :
      projectType === "consultoria" ? "Consultoría IT o Soporte" : projectType;

    // Email HTML template with corporate aesthetics
    const emailHtml = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background-color: #09090b; color: #f4f4f5; border: 1px solid #27272a; border-radius: 12px;">
        <div style="border-bottom: 2px solid #27272a; padding-bottom: 20px; margin-bottom: 25px;">
          <h2 style="color: #06b6d4; margin: 0; font-size: 1.5rem; letter-spacing: -0.5px;">NEO CORE SYS • Contacto</h2>
          <p style="color: #71717a; margin: 5px 0 0 0; font-size: 0.85rem;">Nuevo mensaje desde el sitio web institucional</p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <p style="margin: 8px 0; font-size: 0.95rem;"><strong style="color: #a1a1aa; min-width: 130px; display: inline-block;">Nombre / Empresa:</strong> ${name}</p>
          <p style="margin: 8px 0; font-size: 0.95rem;"><strong style="color: #a1a1aa; min-width: 130px; display: inline-block;">Email:</strong> <a href="mailto:${email}" style="color: #06b6d4; text-decoration: none;">${email}</a></p>
          <p style="margin: 8px 0; font-size: 0.95rem;"><strong style="color: #a1a1aa; min-width: 130px; display: inline-block;">Teléfono:</strong> ${phone || 'No especificado'}</p>
          <p style="margin: 8px 0; font-size: 0.95rem;"><strong style="color: #a1a1aa; min-width: 130px; display: inline-block;">Tipo de Proyecto:</strong> <span style="background-color: rgba(6, 182, 212, 0.1); color: #06b6d4; padding: 3px 8px; border-radius: 4px; font-size: 0.85rem; font-weight: 600;">${readableProjectType}</span></p>
        </div>
        
        <div style="border-top: 1px solid #27272a; padding-top: 20px; margin-top: 25px;">
          <h3 style="color: #a1a1aa; font-size: 1rem; margin-top: 0; margin-bottom: 12px;">Mensaje del Cliente:</h3>
          <div style="background-color: #18181b; padding: 20px; border-radius: 8px; border: 1px solid #27272a; color: #e4e4e7; line-height: 1.6; white-space: pre-wrap; font-size: 0.95rem;">${message}</div>
        </div>
        
        <div style="border-top: 1px solid #27272a; margin-top: 30px; padding-top: 15px; text-align: center;">
          <p style="color: #52525b; font-size: 0.75rem; margin: 0;">&copy; ${new Date().getFullYear()} Neo Core Sys. Sistema de Notificación de Leads.</p>
        </div>
      </div>
    `;

    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_PASS;

    // Fallback if credentials are not configured or still placeholder
    if (!user || !pass || pass.includes("xxxx")) {
      console.warn("=== [WARNING] GMAIL SMTP CREDENTIALS NOT SET IN .env.local ===");
      console.log("=== NUEVO LEAD SIMULADO (CONSOLA) ===");
      console.log("Nombre:", name);
      console.log("Email:", email);
      console.log("Teléfono:", phone || "No especificado");
      console.log("Tipo de Proyecto:", readableProjectType);
      console.log("Mensaje:", message);
      console.log("==========================================================");
      
      // Simulate network latency
      await new Promise((resolve) => setTimeout(resolve, 800));
    } else {
      // Create Nodemailer Transporter using Gmail service
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: user,
          pass: pass,
        },
      });

      // Send email to Gmail
      await transporter.sendMail({
        from: `"Contacto Neo Core Sys" <${user}>`,
        to: "neocoresystem@gmail.com",
        replyTo: email,
        subject: `Nuevo Lead: ${name} (${readableProjectType})`,
        html: emailHtml,
      });
    }

    return NextResponse.json(
      { message: "¡Mensaje recibido con éxito! Nos pondremos en contacto a la brevedad." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in contact API route:", error);
    return NextResponse.json(
      { error: "Hubo un error al procesar tu solicitud. Por favor intenta de nuevo más tarde." },
      { status: 500 }
    );
  }
}
