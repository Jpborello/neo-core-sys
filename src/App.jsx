import { RiSmartphoneLine, RiLayoutGridLine, RiGlobalLine } from "react-icons/ri";
import { RiLightbulbLine, RiShieldCheckLine, RiRocketLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import "./index.css";
import Portfolio from "./components/Portfolio";

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Luces de fondo */}
      <div className="absolute inset-0">
        <div className="absolute w-96 h-96 bg-purple-600/30 blur-[150px] -top-20 -left-10"></div>
        <div className="absolute w-96 h-96 bg-blue-600/20 blur-[150px] bottom-0 right-0"></div>
      </div>

      {/* Contenido principal */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-6">

        {/* Título con animación */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight"
        >
          Neo-Core-Sys
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mt-4 text-lg md:text-2xl text-gray-300 max-w-2xl"
        >
          Desarrollo profesional de Apps Mobile, Sistemas Web y Soluciones
          a medida para empresas y emprendedores.
        </motion.p>

        {/* Botón animado */}
        <motion.a
          href="#services"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          whileHover={{
            scale: 1.08,
            boxShadow: "0 0 18px rgba(255,255,255,0.4)"
          }}
          className="mt-10 px-8 py-4 bg-white text-black rounded-full font-semibold flex items-center gap-2 transition-all"
        >
          Ver servicios <FaArrowRight />
        </motion.a>

      </main>
      {/* Servicios */}
      <section
        id="services"
        className="relative z-10 py-24 bg-black flex flex-col items-center px-6"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-12 text-white"
        >
          Nuestros Servicios
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-x-24 gap-y-32 max-w-7xl w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {/* Tarjeta 1 */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.05, rotateY: 10, translateZ: 10 }}
            className="p-8 bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl border border-white/10 hover:border-purple-500/40 transition-all relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-purple-300/10 to-transparent opacity-0 hover:opacity-20 transition-opacity rounded-2xl pointer-events-none"></div>
            <div className="flex items-center justify-center mb-4 text-purple-400 text-4xl">
              <RiSmartphoneLine className="text-4xl text-purple-400" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-white">Apps Mobile</h3>
            <p className="text-gray-300">
              Desarrollo de aplicaciones móviles Android/iOS con Flutter o React Native, rápidas, modernas y optimizadas.
            </p>
          </motion.div>

          {/* Tarjeta 2 */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.05, rotateY: 10, translateZ: 10 }}
            className="p-8 bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl border border-white/10 hover:border-blue-500/40 transition-all relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-blue-300/10 to-transparent opacity-0 hover:opacity-20 transition-opacity rounded-2xl pointer-events-none"></div>
            <div className="flex items-center justify-center mb-4 text-blue-400 text-4xl">
              <RiLayoutGridLine className="text-4xl text-blue-400" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-white">Sistemas Web</h3>
            <p className="text-gray-300">
              Paneles administrativos, sistemas de turnos, plataformas personalizadas y dashboards de alto rendimiento.
            </p>
          </motion.div>

          {/* Tarjeta 3 */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.05, rotateY: 10, translateZ: 10 }}
            className="p-8 bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl border border-white/10 hover:border-teal-500/40 transition-all relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 via-teal-300/10 to-transparent opacity-0 hover:opacity-20 transition-opacity rounded-2xl pointer-events-none"></div>
            <div className="flex items-center justify-center mb-4 text-teal-400 text-4xl">
              <RiGlobalLine className="text-4xl text-teal-400" />
            </div>

            <h3 className="text-2xl font-semibold mb-4 text-white">Páginas Web</h3>
            <p className="text-gray-300">
              Sitios corporativos elegantes, optimizados para SEO, ultra rápidos y hechos a medida.
            </p>
          </motion.div>
        </motion.div>
      </section>
      {/* Por qué elegirnos */}
      <section
        id="why-us"
        className="relative z-10 py-24 bg-black flex flex-col items-center px-6"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-16 text-white text-center"
        >
          ¿Por qué elegirnos?
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-x-24 gap-y-32 max-w-7xl w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {/* Card Template */}
          {[
            {
              icon: <RiLightbulbLine className="text-purple-400 text-4xl" />,
              title: "Innovación",
              color: "purple",
              text: "Siempre aplicamos soluciones modernas y creativas para que tu proyecto destaque y sea único.",
            },
            {
              icon: <RiShieldCheckLine className="text-blue-400 text-4xl" />,
              title: "Seguridad",
              color: "blue",
              text: "Tus datos y sistemas estarán protegidos con las mejores prácticas, estándares y tecnologías.",
            },
            {
              icon: <RiRocketLine className="text-teal-400 text-4xl" />,
              title: "Rapidez",
              color: "teal",
              text: "Entregamos proyectos de alta calidad en tiempos optimizados, sin sacrificar diseño ni funcionalidad.",
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{
                scale: 1.05,
                rotateY: 10,

              }}
              className="
          p-8
          bg-white/10
          backdrop-blur-xl
          rounded-2xl
          shadow-xl
          border border-white/10
          transition-all
          relative overflow-hidden
          max-w-xs mx-auto
        "
            >
              <div
                className={`
            absolute inset-0 bg-gradient-to-br
            from-${card.color}-500/20 via-${card.color}-300/10 to-transparent
            opacity-0 hover:opacity-20 transition-opacity
            rounded-2xl pointer-events-none
          `}
              ></div>

              <div className="flex items-center justify-center mb-4">
                {card.icon}
              </div>

              <h3 className="text-2xl font-semibold mb-3 text-white text-center md:text-left">
                {card.title}
              </h3>

              <p className="text-gray-300 text-center md:text-left">
                {card.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* PORTFOLIO */}
      <Portfolio />

      {/* CONTACTO */}
      <section
        id="contacto"
        className="relative z-10 py-24 bg-black flex flex-col items-center px-6"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-10 text-white text-center"
        >
          Contacto
        </motion.h2>

        <p className="text-gray-300 max-w-xl text-center mb-8">
          Si tenés una idea o querés que trabajemos juntos, escribime y lo hacemos realidad.
        </p>

        <form
          action="https://formsubmit.co/jpborello25@gmail.com"
          method="POST"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl w-full"
        >
          <input className="p-4 rounded-xl bg-white/10 text-white outline-none" type="text" name="nombre" placeholder="Tu nombre" required />
          <input className="p-4 rounded-xl bg-white/10 text-white outline-none" type="email" name="email" placeholder="Tu email" required />

          <textarea
            className="p-4 rounded-xl bg-white/10 text-white outline-none md:col-span-2"
            name="mensaje"
            placeholder="Escribí tu mensaje..."
            rows="4"
            required
          />
          <button
            type="submit"
            className="md:col-span-2 bg-purple-600 hover:bg-purple-700 transition p-4 rounded-xl text-white font-semibold"
          >
            Enviar mensaje
          </button>
        </form>
        <div className="mt-10 flex gap-6">
          <a href="https://wa.me/+5493417981212" className="text-purple-400 hover:text-purple-200 text-xl">WhatsApp</a>
          <a href="https://instagram.com/juamp11" className="text-purple-400 hover:text-purple-200 text-xl">Instagram</a>
          <a href="mailto:jpborello25@gmail.com" className="text-purple-400 hover:text-purple-200 text-xl">Email</a>
        </div>
      </section>
    </div>
  );
}
