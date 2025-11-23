import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Float, Sparkles, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function NeoLogo(props) {
    const mesh = useRef();

    useFrame((state) => {
        mesh.current.rotation.x = state.clock.getElapsedTime() * 0.2;
        mesh.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={mesh} {...props}>
                <icosahedronGeometry args={[1, 0]} />
                <meshStandardMaterial
                    color="#7c3aed"
                    emissive="#7c3aed"
                    emissiveIntensity={2}
                    roughness={0.1}
                    metalness={0.8}
                    wireframe
                />
            </mesh>
            <mesh ref={mesh} {...props} scale={0.9}>
                <icosahedronGeometry args={[1, 0]} />
                <meshStandardMaterial
                    color="#00e5ff"
                    emissive="#00e5ff"
                    emissiveIntensity={0.5}
                    roughness={0.1}
                    metalness={0.8}
                    transparent
                    opacity={0.3}
                />
            </mesh>
        </Float>
    );
}

function ServiceCube({ position, onServiceClick }) {
    const mesh = useRef();
    const [hovered, setHover] = useState(null);

    useFrame((state, delta) => {
        mesh.current.rotation.x += delta * 0.1;
        mesh.current.rotation.y += delta * 0.15;
    });

    const services = [
        { name: 'Webs', color: '#00e5ff', pos: [0, 0, 1.01], rot: [0, 0, 0] },
        { name: 'Apps', color: '#7c3aed', pos: [0, 0, -1.01], rot: [0, Math.PI, 0] },
        { name: 'SEO', color: '#ec4899', pos: [0, 1.01, 0], rot: [-Math.PI / 2, 0, 0] },
        { name: 'AI', color: '#10b981', pos: [0, -1.01, 0], rot: [Math.PI / 2, 0, 0] },
        { name: 'Cloud', color: '#f59e0b', pos: [1.01, 0, 0], rot: [0, Math.PI / 2, 0] },
        { name: 'Design', color: '#6366f1', pos: [-1.01, 0, 0], rot: [0, -Math.PI / 2, 0] },
    ];

    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
            <group position={position}>
                <mesh
                    ref={mesh}
                    onPointerOver={(e) => document.body.style.cursor = 'pointer'}
                    onPointerOut={(e) => document.body.style.cursor = 'auto'}
                >
                    <boxGeometry args={[2, 2, 2]} />
                    <meshStandardMaterial
                        color="#1a1a1a"
                        roughness={0.2}
                        metalness={0.9}
                    />
                    {services.map((service, i) => (
                        <group key={i} position={service.pos} rotation={service.rot}>
                            <Text
                                fontSize={0.5}
                                color={service.color}
                                anchorX="center"
                                anchorY="middle"
                                onClick={() => onServiceClick && onServiceClick(service.name)}
                                onPointerOver={() => setHover(i)}
                                onPointerOut={() => setHover(null)}
                            >
                                {service.name}
                                <meshBasicMaterial color={service.color} toneMapped={false} />
                            </Text>
                        </group>
                    ))}
                </mesh>
            </group>
        </Float>
    );
}

export default function Neo3DDemo({ onServiceClick }) {
    return (
        <div className="w-full h-[500px] md:h-[600px] relative">
            <Canvas dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#7c3aed" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#00e5ff" />
                <spotLight position={[0, 10, 0]} intensity={0.8} angle={0.5} penumbra={1} />

                <NeoLogo position={[-2.5, 0, 0]} scale={1.5} />
                <ServiceCube position={[2.5, 0, 0]} onServiceClick={onServiceClick} />

                <Sparkles count={100} scale={12} size={4} speed={0.4} opacity={0.5} color="#00e5ff" />
                <Sparkles count={50} scale={10} size={6} speed={0.2} opacity={0.5} color="#7c3aed" />

                <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.5} far={10} color="#000000" />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                <Environment preset="city" />
            </Canvas>

            <div className="absolute bottom-4 right-4 flex gap-2">
                <div className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-xs text-gray-400">
                    Drag to Rotate
                </div>
            </div>
        </div>
    );
}
