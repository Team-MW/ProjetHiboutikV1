import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Store, ShoppingBag, TrendingUp, ShieldCheck, Zap, Globe, Smartphone, ArrowRight, CheckCircle2, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <div className="bg-stone-950 min-h-screen font-sans text-stone-200 selection:bg-yellow-500/30">

            {/* --- HERO SECTION --- */}
            <div className="relative overflow-hidden bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 min-h-screen flex flex-col items-center justify-center pt-20">

                {/* Background ambient lights */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[120px]" />
                    <div className="absolute top-[40%] -right-[10%] w-[40%] h-[60%] bg-yellow-600/5 rounded-full blur-[100px]" />
                </div>

                <div className="z-10 container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-8"
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs md:text-sm font-medium tracking-wider mb-6 uppercase">
                            Nouvelle Génération de Caisse
                        </span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 leading-tight">
                            L'excellence pour votre <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-600">
                                boutique physique
                            </span>
                        </h1>
                        <p className="text-stone-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
                            Une interface moderne, fluide et exclusive connectée à la puissance d'Hiboutik.
                            Gérez vos ventes avec élégance et performance.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="flex flex-col md:flex-row gap-4 justify-center items-center mb-20"
                    >
                        <button
                            onClick={() => navigate('/login')}
                            className="group relative px-8 py-4 bg-white text-black rounded-full font-semibold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] w-full md:w-auto"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Se connecter
                                <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white z-0" />
                        </button>

                        <button className="px-8 py-4 rounded-full font-semibold text-stone-400 hover:text-white transition-colors border border-white/10 hover:border-white/30 hover:bg-white/5 backdrop-blur-sm w-full md:w-auto">
                            En savoir plus
                        </button>
                    </motion.div>

                    {/* Feature Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto pb-20">
                        {[
                            { icon: Store, title: "Interface Vitrine", desc: "Un design épuré pour mettre en valeur vos produits." },
                            { icon: ShieldCheck, title: "Sécurité Maximale", desc: "Connexion directe et chiffrée via l'API Hiboutik." },
                            { icon: ShoppingBag, title: "Gestion Intuitive", desc: "Une expérience utilisateur repensée pour la rapidité." },
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    visible: { opacity: 1, y: 0, transition: { delay: idx * 0.1 + 0.4 } }
                                }}
                                className="p-8 rounded-3xl bg-stone-900/30 border border-white/5 hover:border-white/10 transition-colors backdrop-blur-sm text-left group hover:bg-stone-900/50"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-stone-800 flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300 group-hover:bg-yellow-500/10 group-hover:text-yellow-400">
                                    <feature.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-stone-400 leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-stone-600"
                >
                    <div className="w-6 h-10 border-2 border-stone-600 rounded-full flex justify-center p-1">
                        <div className="w-1 h-3 bg-stone-600 rounded-full" />
                    </div>
                </motion.div>
            </div>

            {/* --- SHOWCASE SECTION --- */}
            <section className="py-24 bg-stone-950 relative">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2 relative">
                            <div className="absolute inset-0 bg-yellow-500/20 blur-[100px] rounded-full opacity-20" />
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeInUp}
                                className="relative z-10 bg-stone-900 border border-white/10 rounded-2xl p-4 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500"
                            >
                                <div className="aspect-[4/3] bg-stone-800 rounded-lg overflow-hidden flex items-center justify-center relative group">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-stone-900 via-transparent to-stone-800/50" />
                                    <ShoppingBag size={64} className="text-stone-700 group-hover:text-yellow-500/50 transition-colors duration-500" />

                                    {/* Floating elements simulating UI */}
                                    <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white border border-white/10">En ligne</div>
                                    <div className="absolute bottom-6 left-6 right-6 h-2 bg-stone-700/50 rounded-full overflow-hidden">
                                        <div className="h-full w-2/3 bg-yellow-500 rounded-full" />
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        <div className="lg:w-1/2">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeInUp}
                            >
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                                    Tout ce dont vous avez besoin, <br />
                                    <span className="text-yellow-500">sans le superflu.</span>
                                </h2>
                                <p className="text-stone-400 text-lg mb-8 leading-relaxed">
                                    Nous avons repensé l'expérience de caisse pour qu'elle soit aussi agréable à utiliser qu'elle est belle à regarder. Chaque détail a été travaillé pour optimiser votre flux de travail.
                                </p>

                                <div className="space-y-4">
                                    {[
                                        "Synchronisation temps réel avec Hiboutik",
                                        "Design responsive (Tablette & Mobile)",
                                        "Gestion multi-comptes simplifiée",
                                        "Mode sombre natif pour réduire la fatigue visuelle"
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                                                <CheckCircle2 size={14} />
                                            </div>
                                            <span className="text-stone-300">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- BENEFITS SECTION --- */}
            <section className="py-24 bg-stone-900/30 border-y border-white/5">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Pourquoi choisir notre solution ?</h2>
                        <p className="text-stone-400">Une couche d'intelligence et de beauté par-dessus votre infrastructure existante.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: Zap, title: "Ultra Rapide", text: "Optimisé pour charger instantanément, même avec une connexion lente." },
                            { icon: Globe, title: "Accessible Partout", text: "Gérez votre boutique depuis n'importe où dans le monde." },
                            { icon: Smartphone, title: "Mobile First", text: "Une expérience native sur iPad et smartphones." },
                            { icon: ShieldCheck, title: "Données Sécurisées", text: "Vos données restent chez Hiboutik, nous ne faisons que les sublimer." },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-6 rounded-2xl bg-stone-950/50 hover:bg-stone-950 transition-colors border border-white/5 text-center group"
                            >
                                <div className="w-12 h-12 mx-auto bg-stone-900 rounded-xl flex items-center justify-center text-white mb-4 group-hover:text-yellow-500 transition-colors">
                                    <item.icon size={24} />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-stone-500 text-sm leading-relaxed">{item.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CALL TO ACTION --- */}
            <section className="py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-yellow-600/5" />
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Prêt à transformer votre commerce ?</h2>
                    <p className="text-stone-400 text-xl mb-12 max-w-2xl mx-auto">
                        Rejoignez les commerçants qui ont choisi l'élégance et l'efficacité.
                        Connectez-vous avec votre compte Hiboutik existant.
                    </p>
                    <button
                        onClick={() => navigate('/login')}
                        className="px-10 py-5 bg-white text-black rounded-full font-bold text-lg hover:bg-stone-200 transition-colors shadow-xl shadow-white/10"
                    >
                        Démarrer maintenant
                    </button>
                </div>
            </section>

            {/* --- FOOTER --- */}
            <footer className="bg-stone-950 border-t border-white/10 pt-16 pb-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        <div className="md:col-span-1">
                            <div className="flex items-center gap-2 text-white font-bold text-2xl mb-6">
                                <div className="w-8 h-8 rounded bg-gradient-to-tr from-yellow-500 to-yellow-300 flex items-center justify-center text-black text-sm">H</div>
                                Front Hiboutik<span className="text-yellow-500">.</span>
                            </div>
                            <p className="text-stone-500 text-sm leading-relaxed mb-6">
                                La meilleure interface pour votre logiciel de caisse préféré. Conçue pour les commerçants exigeants.
                            </p>
                            <div className="flex gap-4">
                                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                    <a key={i} href="#" className="w-8 h-8 rounded-full bg-stone-900 flex items-center justify-center text-stone-500 hover:bg-yellow-500 hover:text-black transition-all">
                                        <Icon size={14} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-white font-semibold mb-6">Produit</h4>
                            <ul className="space-y-4 text-stone-400 text-sm">
                                <li><a href="#" className="hover:text-yellow-500 transition-colors">Fonctionnalités</a></li>
                                <li><a href="#" className="hover:text-yellow-500 transition-colors">Tarifs</a></li>
                                <li><a href="#" className="hover:text-yellow-500 transition-colors">Mises à jour</a></li>
                                <li><a href="#" className="hover:text-yellow-500 transition-colors">Beta Test</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-semibold mb-6">Support</h4>
                            <ul className="space-y-4 text-stone-400 text-sm">
                                <li><a href="#" className="hover:text-yellow-500 transition-colors">Centre d'aide</a></li>
                                <li><a href="#" className="hover:text-yellow-500 transition-colors">API Documentation</a></li>
                                <li><a href="#" className="hover:text-yellow-500 transition-colors">État du service</a></li>
                                <li><a href="#" className="hover:text-yellow-500 transition-colors">Contact</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-semibold mb-6">Légal</h4>
                            <ul className="space-y-4 text-stone-400 text-sm">
                                <li><a href="#" className="hover:text-yellow-500 transition-colors">Confidentialité</a></li>
                                <li><a href="#" className="hover:text-yellow-500 transition-colors">CGU</a></li>
                                <li><a href="#" className="hover:text-yellow-500 transition-colors">Mentions légales</a></li>
                                <li><a href="#" className="hover:text-yellow-500 transition-colors">Cookies</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-600">
                        <p>&copy; {new Date().getFullYear()} Front Hiboutik. Tous droits réservés. Non affilié officiellement à Hiboutik.</p>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-stone-400">Privacy Policy</a>
                            <a href="#" className="hover:text-stone-400">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;

