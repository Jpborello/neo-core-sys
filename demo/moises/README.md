# MOISES Traslados y Logística - Documentación Técnica

> Landing page profesional para empresa de logística y traslados

---

## 📋 Índice

1. [Descripción General](#descripción-general)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Secciones de la Landing](#secciones-de-la-landing)
4. [Funcionalidades Interactivas](#funcionalidades-interactivas)
5. [Sistema de Diseño](#sistema-de-diseño)
6. [Configuración](#configuración)
7. [Deployment](#deployment)

---

## Descripción General

Landing page completa para **MOISES Traslados y Logística**, empresa de transporte de mercadería con más de 15 años de experiencia.

### Características Principales

- ✅ **11 secciones** completas y funcionales
- ✅ **Formulario de cotización** con calculadora de precios en tiempo real
- ✅ **Integración WhatsApp** directa (3415320590)
- ✅ **Testimonios de clientes** con ratings
- ✅ **Galería de flota** con 3 vehículos
- ✅ **FAQ accordion** con 6 preguntas
- ✅ **Mapa de cobertura** regional
- ✅ **Animaciones de scroll** profesionales
- ✅ **Contador animado** de estadísticas
- ✅ **Responsive design** (mobile, tablet, desktop)
- ✅ **Meta tags** para redes sociales

### Tecnologías

- HTML5 semántico
- CSS3 con variables CSS
- JavaScript vanilla (ES6+)
- Google Fonts (Inter + Poppins)
- Intersection Observer API

---

## Estructura del Proyecto

```
demo/moises/
├── index.html          # Página principal
├── styles.css          # Estilos completos (1,120 líneas)
├── script.js           # Funcionalidad JS (409 líneas)
├── README.md           # Esta documentación
└── assets/
    ├── logo.jpg                # Logo MOISES
    ├── hero-truck.png          # Hero background
    ├── warehouse.png           # Sección "Quiénes Somos"
    ├── delivery.png            # Imagen de servicio
    ├── corporate.png           # Sección empresas
    ├── fleet-truck-1.png       # Camión de carga
    ├── fleet-van.png           # Furgón de reparto
    ├── fleet-truck-2.png       # Camión mediano
    └── coverage-map.png        # Mapa de cobertura
```

---

## Secciones de la Landing

### 1. Header (Fijo)

**ID:** `#header`

**Elementos:**
- Logo MOISES
- Navegación: Inicio, Servicios, Cotizá tu traslado, Empresas, Contacto
- Botón CTA: "Cotizar traslado"
- Menú hamburguesa (mobile)

**Comportamiento:**
- Fixed position con backdrop-filter
- Sombra al hacer scroll
- Smooth scroll a secciones

---

### 2. Hero

**ID:** `#inicio`

**Contenido:**
- Título principal
- Subtítulo y descripción
- 3 estadísticas animadas:
  - +15 años de experiencia
  - +1200 traslados realizados
  - 100% atención personalizada
- CTA principal

**Características:**
- Background: Imagen de camión con overlay azul
- Contador animado que inicia al ser visible
- Responsive con ajuste de tamaños

---

### 3. Quiénes Somos / Servicios

**ID:** `#servicios`

**Contenido:**
- Historia de la empresa (desde 2009)
- Valores: puntualidad, cuidado, comunicación
- Lista de 6 servicios principales

**Layout:**
- Grid 2 columnas (imagen + texto)
- Animaciones: slide-in-left (imagen) + slide-in-right (texto)

---

### 4. Testimonios

**ID:** `#testimonios`

**Contenido:**
- 3 testimonios de clientes
- Rating 5 estrellas
- Avatar con iniciales
- Nombre y empresa

**Clientes:**
1. María Rodríguez - Distribuidora del Sur
2. Juan Carlos Méndez - Comerciante Independiente
3. Laura Pereyra - Ferretería Central

---

### 5. Galería de Flota

**ID:** `#flota`

**Vehículos:**

| Nombre | Capacidad | Uso |
|--------|-----------|-----|
| Camión de Carga | 8 toneladas | Larga distancia |
| Furgón de Reparto | 1.5 toneladas | Urbano |
| Camión Mediano | 4 toneladas | Versátil |

**Características:**
- Cards con hover effect (elevación + zoom en imagen)
- Badges de especificaciones
- Grid responsive

---

### 6. Cotizá tu Traslado

**ID:** `#cotizar`

**Campos del Formulario:**

| Campo | Tipo | Requerido |
|-------|------|-----------|
| Nombre y apellido | text | Sí |
| Teléfono | tel | Sí |
| Email | email | Sí |
| Ciudad de origen | text | Sí |
| Ciudad de destino | text | Sí |
| Distancia (km) | number | Sí |
| Peso aproximado | text | Sí |
| Tipo de carga | select | Sí |
| Descripción | text | No |
| Observaciones | textarea | No |

**Calculadora de Precio:**
- Fórmula: `Distancia × $2,500 ARS/km`
- Actualización en tiempo real
- Display destacado con gradiente azul

**Envío:**
- Validación de campos requeridos
- Generación de mensaje para WhatsApp
- Modal de éxito con animación
- Redirección automática a WhatsApp
- Reset del formulario

---

### 7. FAQ (Preguntas Frecuentes)

**ID:** `#faq`

**Preguntas:**

1. ¿Cómo se calcula el precio del traslado?
2. ¿Hacen traslados los fines de semana y feriados?
3. ¿Qué tipo de mercadería transportan?
4. ¿Los traslados tienen seguro?
5. ¿Cuánto tiempo tarda un traslado de Rosario a Buenos Aires?
6. ¿Ofrecen servicio de carga y descarga?

**Funcionalidad:**
- Accordion interactivo
- Solo una pregunta abierta a la vez
- Icono "+" que rota 45° al abrir
- Animación suave de expansión

---

### 8. Zona de Cobertura

**ID:** `#cobertura`

**Contenido:**
- Mapa visual de Argentina
- Lista de ciudades principales:
  - Rosario y Gran Rosario
  - Buenos Aires y AMBA
  - Córdoba Capital
  - Santa Fe Capital
  - Paraná y zona
  - Todo el país bajo consulta

**Layout:**
- Grid 2 columnas (texto + mapa)
- Fondo azul corporativo

---

### 9. Empresas

**ID:** `#empresas`

**Beneficios B2B:**
- 📄 Facturación (A y B)
- 🔄 Traslados recurrentes
- ⚡ Prioridad operativa
- 💬 Soporte directo

**Características:**
- Fondo azul corporativo
- Cards con glassmorphism
- CTA para contacto empresarial

---

### 10. Contacto

**ID:** `#contacto`

**Canales:**

| Canal | Información | Horario |
|-------|-------------|---------|
| Teléfono | (0341) 532-0590 | Lun-Sáb 8-20hs |
| WhatsApp | 3415320590 | Inmediato |
| Email | info@moiseslogistica.com.ar | 24hs respuesta |
| Zona | Rosario y región | - |

**Características:**
- 4 cards con íconos
- Botones de acción directa
- Hover effects

---

### 11. Footer

**Contenido:**
- Nombre y tagline de la empresa
- Links de navegación
- Información de contacto
- Copyright 2026

---

## Funcionalidades Interactivas

### 1. Scroll Animations

**Implementación:** Intersection Observer API

**Clases disponibles:**
- `.fade-in` - Aparece con fade desde abajo
- `.slide-in-left` - Entra desde la izquierda
- `.slide-in-right` - Entra desde la derecha

**Configuración:**
```javascript
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};
```

**Uso:**
```html
<section class="about section fade-in">
  <div class="about-image slide-in-left">...</div>
  <div class="about-content slide-in-right">...</div>
</section>
```

---

### 2. Contador Animado

**Ubicación:** Hero stats

**Estadísticas:**
- +15 años (1.5s animation)
- +1200 traslados (2s animation)
- 100% atención (1.5s animation)

**Comportamiento:**
- Se activa cuando hero es 50% visible
- Animación suave con incrementos cada 16ms
- Solo se ejecuta una vez

**Código:**
```javascript
function animateCounter(element, target, duration = 2000) {
    const increment = target / (duration / 16);
    // ... animación
}
```

---

### 3. FAQ Accordion

**Comportamiento:**
- Click en pregunta → Se abre
- Click en otra pregunta → Se cierra la anterior y se abre la nueva
- Icono "+" rota 45° al abrir

**Animación:**
```css
.faq-answer {
  max-height: 0;
  transition: max-height 0.3s ease;
}

.faq-item.active .faq-answer {
  max-height: 500px;
}
```

---

### 4. Calculadora de Precio

**Fórmula:**
```javascript
const PRICE_PER_KM = 2500;
const totalPrice = distance * PRICE_PER_KM;
```

**Actualización:**
- Event listener en input de distancia
- Formato: `$750.000 ARS` (con separador de miles)

---

### 5. Formulario de Cotización

**Validación:**
```javascript
const requiredFields = [
  'nombre', 'telefono', 'email', 
  'origen', 'destino', 'distancia', 
  'peso', 'tipoCarga'
];
```

**Mensaje WhatsApp:**
```
🚚 *SOLICITUD DE COTIZACIÓN*

*Datos del Cliente:*
Nombre: [nombre]
Teléfono: [telefono]
Email: [email]

*Detalles del Traslado:*
Origen: [origen]
Destino: [destino]
Distancia: [distancia] km

*Carga:*
Tipo: [tipoCarga]
Peso aproximado: [peso]
Descripción: [descripcion]

*Precio Estimado:* $[precio] ARS
```

---

### 6. Back to Top Button

**Comportamiento:**
- Aparece cuando `window.scrollY > 300`
- Smooth scroll al hacer click
- Posición: fixed, bottom-right

**CSS:**
```css
.back-to-top {
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.back-to-top.visible {
  opacity: 1;
  visibility: visible;
}
```

---

## Sistema de Diseño

### Paleta de Colores

```css
:root {
  /* Primary */
  --primary-blue: #1E3A8A;
  --primary-blue-dark: #1E40AF;
  --secondary-blue: #3B82F6;
  --accent-orange: #F97316;
  --accent-orange-hover: #EA580C;
  
  /* Neutrals */
  --gray-50: #F9FAFB;
  --gray-100: #F3F4F6;
  --gray-200: #E5E7EB;
  --gray-300: #D1D5DB;
  --gray-400: #9CA3AF;
  --gray-500: #6B7280;
  --gray-600: #4B5563;
  --gray-700: #374151;
  --gray-800: #1F2937;
  --gray-900: #111827;
}
```

### Tipografía

**Fuentes:**
- Display: Poppins (600, 700, 800)
- Body: Inter (400, 500, 600, 700)

**Tamaños:**
```css
h1: clamp(2.5rem, 5vw, 3.5rem)
h2: clamp(2rem, 4vw, 2.75rem)
h3: clamp(1.5rem, 3vw, 2rem)
p: 1.125rem
```

### Sombras

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
```

### Botones

**Variantes:**
- `.btn-primary` - Naranja (CTAs principales)
- `.btn-secondary` - Azul (CTAs secundarios)
- `.btn-outline` - Borde azul (CTAs terciarios)

**Tamaños:**
- `.btn` - Normal (0.875rem padding)
- `.btn-large` - Grande (1.125rem padding)

---

## Configuración

### Datos de Contacto

**Archivo:** `script.js`

```javascript
// WhatsApp
const whatsappNumber = '5493415320590';

// Precio por kilómetro
const PRICE_PER_KM = 2500;
```

### Meta Tags Sociales

**Archivo:** `index.html`

```html
<!-- Open Graph -->
<meta property="og:title" content="MOISES Traslados y Logística">
<meta property="og:description" content="...">
<meta property="og:image" content="assets/logo.jpg">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
```

### Responsive Breakpoints

```css
@media (max-width: 968px) { /* Tablet */ }
@media (max-width: 640px) { /* Mobile */ }
```

---

## Deployment

### Opción 1: Hosting Estático

**Netlify:**
```bash
# Drag & drop la carpeta demo/moises
# o conectar con Git
```

**Vercel:**
```bash
vercel deploy demo/moises
```

### Opción 2: Servidor Web

**Nginx:**
```nginx
server {
    listen 80;
    server_name moiseslogistica.com.ar;
    root /var/www/moises;
    index index.html;
}
```

**Apache:**
```apache
<VirtualHost *:80>
    ServerName moiseslogistica.com.ar
    DocumentRoot /var/www/moises
</VirtualHost>
```

### Optimizaciones Pre-Deploy

1. **Minificar CSS/JS:**
```bash
# Usar herramientas como:
cssnano styles.css
terser script.js
```

2. **Optimizar imágenes:**
```bash
# Convertir a WebP
cwebp -q 80 hero-truck.png -o hero-truck.webp
```

3. **Configurar caché:**
```nginx
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 1y;
}
```

---

## Mantenimiento

### Actualizar Precio por Kilómetro

**Archivo:** `script.js` (línea 60)

```javascript
const PRICE_PER_KM = 2500; // Cambiar aquí
```

### Actualizar Número de WhatsApp

**Archivos a modificar:**
1. `script.js` (línea 151, 226)
2. `index.html` (líneas con href="https://wa.me/...")

### Agregar Nuevo Testimonio

**Archivo:** `index.html`

```html
<div class="testimonial-card">
  <div class="testimonial-rating">★★★★★</div>
  <p class="testimonial-text">"..."</p>
  <div class="testimonial-author">
    <div class="author-avatar">XX</div>
    <div class="author-info">
      <h4>Nombre Apellido</h4>
      <p>Empresa</p>
    </div>
  </div>
</div>
```

### Agregar Nueva Pregunta FAQ

**Archivo:** `index.html`

```html
<div class="faq-item">
  <button class="faq-question">
    <span>¿Nueva pregunta?</span>
    <span class="faq-icon">+</span>
  </button>
  <div class="faq-answer">
    <p>Respuesta...</p>
  </div>
</div>
```

---

## Soporte

**Desarrollado por:** Neo Core Sys  
**Fecha:** Enero 2026  
**Versión:** 2.0 (Enhanced)

---

## Changelog

### v2.0 - Enhanced (04/01/2026)
- ✅ Agregada sección de Testimonios
- ✅ Agregada Galería de Flota
- ✅ Agregada sección FAQ con accordion
- ✅ Agregado Mapa de Cobertura
- ✅ Implementadas animaciones de scroll
- ✅ Agregado contador animado en hero
- ✅ Agregado botón back-to-top
- ✅ Agregados meta tags para redes sociales

### v1.0 - Initial (04/01/2026)
- ✅ Header con navegación
- ✅ Hero con estadísticas
- ✅ Sección Quiénes Somos
- ✅ Formulario de cotización
- ✅ Sección Empresas
- ✅ Sección Contacto
- ✅ Footer
- ✅ Integración WhatsApp
