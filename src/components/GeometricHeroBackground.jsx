"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, Stars } from "@react-three/drei";
import { useRef } from "react";

function GeometricShape({ position, color, size, speed }) {
    const meshRef = useRef();

    useFrame((state, delta) => {
        // Gentle rotation
        meshRef.current.rotation.x += delta * 0.2 * speed;
        meshRef.current.rotation.y += delta * 0.3 * speed;
    });

    return (
        <Float floatIntensity={3} rotationIntensity={2} speed={speed}>
            <group ref={meshRef} position={position}>
                {/* Wireframe Core */}
                <mesh>
                    <icosahedronGeometry args={[size, 0]} />
                    <meshStandardMaterial
                        color={color}
                        wireframe
                        emissive={color}
                        emissiveIntensity={0.5}
                        transparent
                        opacity={0.5}
                        roughness={0.1}
                        metalness={0.8}
                        wireframeLinewidth={2}
                    />
                </mesh>

                {/* Inner Glow */}
                <mesh scale={[0.9, 0.9, 0.9]}>
                    <icosahedronGeometry args={[size, 0]} />
                    <meshBasicMaterial color={color} transparent opacity={0.05} depthWrite={false} />
                </mesh>

                {/* Nodes (Simulated with simple Points) */}
                <points>
                    <icosahedronGeometry args={[size, 0]} />
                    <pointsMaterial size={0.1} color={color} sizeAttenuation transparent opacity={0.8} />
                </points>
            </group>
        </Float>
    );
}

export default function GeometricHeroBackground() {
    return (
        <div className="absolute inset-0 z-0 bg-black">
            <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                <color attach="background" args={["black"]} />
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#a855f7" />
                <pointLight position={[-10, -10, -10]} intensity={1.5} color="#3b82f6" />

                {/* Diamond Configuration matching reference */}

                {/* Top */}
                <GeometricShape position={[0, 2.8, 0]} size={1.4} color="#d8b4fe" speed={0.8} />

                {/* Left */}
                <GeometricShape position={[-3.2, -0.5, 0]} size={1.3} color="#ffffff" speed={1} />

                {/* Right */}
                <GeometricShape position={[3.2, -0.5, 0]} size={1.3} color="#ffffff" speed={1.2} />

                {/* Bottom */}
                <GeometricShape position={[0, -3.5, 1]} size={1.5} color="#a855f7" speed={0.9} />

                <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />

                <fog attach="fog" args={['#000000', 5, 22]} />
            </Canvas>
        </div>
    );
}
