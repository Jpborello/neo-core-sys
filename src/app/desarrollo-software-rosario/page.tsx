import LocalLanding from "@/components/LocalLanding";
import { ROSARIO_FAQS } from "@/lib/faqs";
import { REGION_CASES } from "@/lib/solutions";

export default function DesarrolloSoftwareRosarioPage() {
  return (
    <LocalLanding
      path="/desarrollo-software-rosario"
      name="Desarrollo de Software a Medida en Rosario"
      breadcrumb="Desarrollo de software en Rosario"
      service={{
        name: "Desarrollo de software a medida en Rosario",
        serviceType: "Desarrollo de software a medida",
        description:
          "Software house en Rosario especializada en software a medida, sistemas de gestión cloud, modernización de sistemas obsoletos, CRM con agentes de IA y plataformas de alta velocidad para empresas de Rosario y Santa Fe.",
        areaServed: [
          { "@type": "City", name: "Rosario" },
          { "@type": "City", name: "Funes" },
          { "@type": "City", name: "Villa Gobernador Gálvez" },
          { "@type": "AdministrativeArea", name: "Santa Fe" },
        ],
      }}
      eyebrow="Software house · Rosario, Santa Fe"
      title={
        <>
          Desarrollo de <em>software a medida</em> en Rosario.
        </>
      }
      lead="Somos una empresa de desarrollo de software de Rosario. Modernizamos la infraestructura digital de tu empresa con sistemas en la nube, plataformas comerciales y CRM con atención inmediata por IA para que nunca más pierdas una venta por demoras en contestar."
      whatsappHero="Hola! Estoy en Rosario y quiero cotizar un software a medida."
      whatsappCta="Hola! Quiero coordinar una reunion sobre desarrollo de software en Rosario."
      pains={{
        eyebrow: "La realidad empresarial",
        title: (
          <>
            ¿Por qué las empresas siguen atrapadas en sistemas <em>viejos</em>?
          </>
        ),
        description:
          "El software obsoleto frena el crecimiento, genera cuellos de botella y ahuyenta a los clientes que esperan respuestas instantáneas.",
        items: [
          {
            title: "Sistemas de escritorio de hace 20 años",
            text: "Programas instalados en una sola máquina que no se pueden ver desde el celular ni desde afuera de la oficina, obligando a los directores a estar atados físicamente.",
          },
          {
            title: "Fuga de clientes por demoras en responder",
            text: "En un mercado competitivo, el que responde primero se lleva la venta. Si tu empresa tarda 6 u 8 horas en cotizar por WhatsApp, el cliente ya le compró a otro.",
          },
          {
            title: "Planillas de Excel que nadie entiende",
            text: "Archivos compartidos desincronizados, fórmulas que se rompen, datos borrados accidentalmente y falta total de métricas de rendimiento en tiempo real.",
          },
        ],
      }}
      advantages={{
        eyebrow: "Nuestra propuesta",
        title: (
          <>
            Ingeniería de software <em>moderna</em> para empresas
          </>
        ),
        description:
          "Construimos herramientas que resuelven los problemas específicos de tu operación con tecnología de primer nivel mundial.",
        items: [
          {
            title: "100% en la nube",
            text: "Accedé a tus paneles administrativos, métricas y pedidos desde cualquier computadora, tablet o celular, en cualquier lugar del mundo.",
          },
          {
            title: "Respuesta inmediata con IA",
            text: "Agentes que atienden y retienen clientes las 24 horas, consultan stock en la base de datos y derivan de inmediato a tus vendedores.",
          },
          {
            title: "Next.js y PostgreSQL",
            text: "Código limpio, sin plantillas lentas ni dependencias frágiles. Carga instantánea, alta concurrencia y máxima seguridad en tus datos.",
          },
          {
            title: "Soporte directo y local",
            text: "Tratás directamente con los desarrolladores del sistema. Sin intermediarios, sin tickets infinitos y con capacitación presencial o virtual en Rosario.",
          },
        ],
      }}
      cases={{
        title: (
          <>
            Empresas que <em>confían</em> en nosotros en la región
          </>
        ),
        description: "Soluciones reales en producción, con métricas validadas por clientes de Santa Fe.",
        items: [REGION_CASES.paquetero, REGION_CASES.dulceValentin, REGION_CASES.atfar, REGION_CASES.manitos],
      }}
      faq={{
        title: (
          <>
            Dudas sobre desarrollo de software en <em>Rosario</em>
          </>
        ),
        description: "Información clara sobre nuestra metodología de trabajo y contratación en la zona.",
        items: ROSARIO_FAQS,
      }}
      cta={{
        title: (
          <>
            Hablemos de tu próximo <em>sistema</em>
          </>
        ),
        text: "Contanos sobre los procesos que querés automatizar y coordinamos una reunión para evaluar la solución ideal para tu empresa.",
      }}
    />
  );
}
