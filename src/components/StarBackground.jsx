import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function StarBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "bubble", // Changed to bubble for interaction
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            bubble: {
              distance: 200,
              size: 6,
              duration: 2,
              opacity: 0.8,
            },
          },
        },
        particles: {
          color: {
            value: ["#a855f7", "#3b82f6", "#f472b6", "#2dd4bf", "#fbbf24"], // Purple, Blue, Pink, Teal, Amber
            animation: {
              enable: true,
              speed: 20,
              sync: false
            }
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.1, // Reduced opacity for links to let particles shine
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: 1.5, // Slightly faster
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 100, // More particles
          },
          opacity: {
            value: { min: 0.3, max: 0.8 },
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.3,
              sync: false
            }
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 2, max: 5 }, // Larger particles
            animation: {
              enable: true,
              speed: 2,
              minimumValue: 2,
              sync: false
            }
          },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 -z-10"
    />
  );
}
