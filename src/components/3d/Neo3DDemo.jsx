// Neo3DDemo.jsx
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sparkles, PerspectiveCamera, ContactShadows, Html } from '@react-three/drei';
import * as THREE from 'three';

//
// ---------------- NeoLogo 3D (Corregido) ----------------
//
function NeoLogo(props) {
    const outer = useRef();
    const inner = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (outer.current) {
            outer.current.rotation.x = t * 0.2;
            outer.current.rotation.y = t * 0.3;
        }
        if (inner.current) {
            inner.current.rotation.x = t * 0.15;
            inner.current.rotation.y = t * 0.2;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0} floatIntensity={0.5}>
            {/* Wireframe exterior */}
            <mesh ref={outer} {...props}>
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

            {/* Glow interior */}
            <mesh ref={inner} {...props} scale={0.9}>
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

//
// ---------------- ServiceCube (Simplificado) ----------------
//
function ServiceCube({ position, onServiceClick }) {
    const mesh = useRef();

    useFrame((state, delta) => {
        if (mesh.current) {
            mesh.current.rotation.x += delta * 0.1;
            mesh.current.rotation.y += delta * 0.15;
        }
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
                    onClick={() => onServiceClick?.()}
                    onPointerOver={() => (document.body.style.cursor = 'pointer')}
                    onPointerOut={() => (document.body.style.cursor = 'auto')}
                >
                    <boxGeometry args={[2, 2, 2]} />
                    <meshStandardMaterial
                        color="#991b1b"
                        roughness={0.15}
                        metalness={0.95}
                        emissive="#7f1d1d"
                        emissiveIntensity={0.2}
                    />
                    {services.map((service, i) => (
                        <group key={i} position={service.pos} rotation={service.rot}>
                            <Html transform distanceFactor={3} style={{ pointerEvents: 'none' }}>
                                <div
                                    className="px-6 py-3 rounded-xl bg-black/80 backdrop-blur-md border border-yellow-500 font-serif font-bold text-4xl whitespace-nowrap select-none shadow-[0_0_30px_rgba(234,179,8,0.5)] flex items-center gap-2"
                                    style={{
                                        color: '#fbbf24', // Gold text
                                        textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                                    }}
                                >
                                    <span>{service.name === 'AI' ? '🎄 AI' : service.name}</span>
                                </div>
                            </Html>
                        </group>
                    ))}
                </mesh>
            </group>
        </Float>
    );
}

//
// ---------------- Neo3DDemo MAIN COMPONENT ----------------
//
export default function Neo3DDemo({ onServiceClick }) {
    return (
        <div className="w-full h-[500px] md:h-[600px] relative">
            <Canvas dpr={[1, 2]} gl={{ alpha: true }} style={{ background: 'transparent' }}>
                <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />

                {/* Lights - FESTIVE EDITION */}
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#ef4444" /> {/* Red Light */}
                <pointLight position={[-10, -10, -10]} intensity={1} color="#22c55e" /> {/* Green Light */}
                <spotLight position={[0, 10, 0]} intensity={0.8} angle={0.5} penumbra={1} color="#fbbf24" /> {/* Gold Spot */}

                {/* 3D Objects */}
                <NeoLogo position={[-2.5, 0, 0]} scale={1.5} />
                <ServiceCube position={[2.5, 0, 0]} onServiceClick={onServiceClick} />

                {/* Effects - CYBER SNOW */}
                <Sparkles count={200} scale={15} size={6} speed={0.3} opacity={0.8} color="#ffffff" /> {/* White Snow */}
                <Sparkles count={50} scale={10} size={8} speed={0.5} opacity={0.6} color="#ef4444" /> {/* Red Dust */}
                <Sparkles count={30} scale={10} size={5} speed={0.2} opacity={0.6} color="#22c55e" /> {/* Green Dust */}

                {/* Shadow */}
                <ContactShadows resolution={1024} scale={40} blur={2} opacity={0.45} far={10} />

                {/* Controls */}
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>

            {/* HUD */}
            <div className="absolute bottom-4 right-4 flex gap-2">
                <div className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-xs text-gray-400">
                    Drag to Rotate
                </div>
            </div>
        </div>
    );
}
