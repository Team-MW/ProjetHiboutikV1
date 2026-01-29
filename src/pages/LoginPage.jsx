import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Store, ArrowRight, Loader2 } from 'lucide-react';
import { testConnection } from '../services/api';

const LoginPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        account: '',
        email: '',
        apiKey: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Basic validation
        if (!formData.account || !formData.email || !formData.apiKey) {
            setError("Tous les champs sont requis.");
            setLoading(false);
            return;
        }

        try {
            const result = await testConnection(formData.account, formData.email, formData.apiKey);

            if (result.success) {
                // Store credentials securely (Note: In a real app, use HTTPOnly cookies or better auth flow)
                localStorage.setItem('hiboutik_auth', JSON.stringify(formData));
                navigate('/dashboard');
            } else {
                setError("Connexion échouée : " + (result.error || "Vérifiez vos identifiants."));
            }
        } catch (err) {
            setError("Une erreur inattendue est survenue.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden px-4">
            {/* Ambient Background */}
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-yellow-900/10 rounded-full blur-[150px]" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[150px]" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-stone-900/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl z-10"
            >
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Connexion</h2>
                    <p className="text-stone-400 text-sm">Entrez vos identifiants API Hiboutik</p>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center"
                    >
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider ml-1">Compte Hiboutik</label>
                        <div className="relative group">
                            <Store className="absolute left-4 top-3.5 w-5 h-5 text-stone-500 group-focus-within:text-yellow-500 transition-colors" />
                            <input
                                type="text"
                                name="account"
                                placeholder="Ex: monmagasin (sans .hiboutik.com)"
                                value={formData.account}
                                onChange={handleChange}
                                className="w-full bg-stone-950/50 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-stone-600 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider ml-1">Email</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-3.5 w-5 h-5 text-stone-500 group-focus-within:text-yellow-500 transition-colors" />
                            <input
                                type="email"
                                name="email"
                                placeholder="votre@email.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-stone-950/50 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-stone-600 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider ml-1">Clé API</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-3.5 w-5 h-5 text-stone-500 group-focus-within:text-yellow-500 transition-colors" />
                            <input
                                type="password"
                                name="apiKey"
                                placeholder="••••••••••••••••"
                                value={formData.apiKey}
                                onChange={handleChange}
                                className="w-full bg-stone-950/50 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-stone-600 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all"
                            />
                        </div>
                        <p className="text-[10px] text-stone-600 text-right mt-1">
                            Trouvez votre clé dans Paramètres &gt; API
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 mt-4 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-bold rounded-xl shadow-lg shadow-yellow-900/20 transform transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                Acceder à la caisse
                                <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default LoginPage;
