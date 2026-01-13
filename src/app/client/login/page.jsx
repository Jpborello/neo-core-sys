"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { clientAuth } from '@/lib/supabase';
import { Lock, Mail, LogIn, Sparkles } from 'lucide-react';

export default function ClientLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const { data, error: signInError } = await clientAuth.signIn(email, password);

        if (signInError) {
            setError('Email o contraseña incorrectos');
            setLoading(false);
            return;
        }

        if (data.user) {
            // Redirect to dashboard
            router.push('/client/dashboard');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo/Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-2xl border border-purple-500/50 mb-4">
                        <Sparkles className="w-8 h-8 text-purple-400" />
                    </div>
                    <h1 className="text-4xl font-black text-white mb-2">
                        Intelligence
                    </h1>
                    <p className="text-slate-400">
                        Portal de Clientes
                    </p>
                </div>

                {/* Login Card */}
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8 shadow-2xl">
                    <h2 className="text-2xl font-bold text-white mb-6">Iniciar Sesión</h2>

                    <form onSubmit={handleLogin} className="space-y-4">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-11 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                                    placeholder="tu@email.com"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Contraseña
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-11 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-300 text-sm">
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-900/20"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Ingresando...
                                </>
                            ) : (
                                <>
                                    <LogIn className="w-5 h-5" />
                                    Ingresar
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-6 text-center text-sm text-slate-400">
                        ¿Problemas para ingresar?{' '}
                        <a href="mailto:soporte@intelligence.com" className="text-purple-400 hover:text-purple-300 transition-colors">
                            Contactar soporte
                        </a>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-6 text-center text-xs text-slate-500">
                    <p>Sistema de Inteligencia de Precios</p>
                    <p className="mt-1">© 2026 Intelligence. Todos los derechos reservados.</p>
                </div>
            </div>
        </div>
    );
}
