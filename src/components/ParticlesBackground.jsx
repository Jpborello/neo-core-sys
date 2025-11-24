// ParticlesBackground.jsx
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function ParticlesBackground() {
    const particlesInit = async (main) => {
        await loadFull(main);
    };

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999]">
            <Particles
                id="tsparticles"
                init={particlesInit}
                options={{
                    background: {
                        color: "transparent",
                    },
                    fpsLimit: 60,
                    particles: {
                        number: {
                            value: 60,
                            density: { enable: true, area: 800 },
                        },
                        color: { value: "#ffffff" },
                        shape: { type: "circle" },
                        opacity: { value: 0.3 },
                        size: { value: 2 },
                        move: {
                            enable: true,
                            speed: 0.6,
                            direction: "none",
                        },
                    },
                    interactivity: {
                        events: {
                            onHover: { enable: true, mode: "repulse" },
                        },
                    },
                }}
            />
        </div>
    );
}
