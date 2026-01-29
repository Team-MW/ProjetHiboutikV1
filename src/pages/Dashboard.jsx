import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createApiClient } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, ShoppingCart, Users, Power, Search, Package, Bell, BarChart3, TrendingUp, CreditCard, ShoppingBag } from 'lucide-react';

const data = [
    { name: 'Lun', sales: 4000, height: '60%' },
    { name: 'Mar', sales: 3000, height: '45%' },
    { name: 'Mer', sales: 2000, height: '30%' },
    { name: 'Jeu', sales: 2780, height: '40%' },
    { name: 'Ven', sales: 1890, height: '25%' },
    { name: 'Sam', sales: 2390, height: '35%' },
    { name: 'Dim', sales: 3490, height: '55%' },
];

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center p-3 rounded-xl transition-all duration-300 group ${active ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20' : 'text-stone-400 hover:bg-white/5 hover:text-white'}`}
    >
        <Icon className={`w-5 h-5 ${active ? 'text-black' : 'group-hover:text-yellow-500 transition-colors'}`} />
        <span className={`ml-3 font-medium hidden lg:block ${active ? 'font-bold' : ''}`}>{label}</span>
        {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-black hidden lg:block" />}
    </button>
);

const StatCard = ({ title, value, change, icon: Icon, trend }) => (
    <div className="bg-stone-900/30 border border-white/5 rounded-2xl p-5 hover:border-yellow-500/20 transition-all group">
        <div className="flex justify-between items-start mb-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${trend === 'up' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'}`}>
                <Icon size={20} />
            </div>
            <span className={`px-2 py-1 rounded-lg text-xs font-bold ${trend === 'up' ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'}`}>
                {change}
            </span>
        </div>
        <p className="text-stone-500 text-xs font-medium uppercase tracking-wider mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-white group-hover:scale-105 origin-left transition-transform">{value}</h3>
    </div>
);

const ProductCard = ({ product }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="group bg-stone-900/30 border border-white/5 rounded-2xl p-4 hover:border-yellow-500/30 transition-all hover:bg-stone-900/50 hover:-translate-y-1 cursor-pointer"
    >
        <div className="aspect-square rounded-xl bg-stone-800/50 mb-4 flex items-center justify-center text-stone-600 overflow-hidden relative">
            <Package className="w-12 h-12 opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <button className="w-full py-2 bg-white text-black font-bold rounded-lg text-sm shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">Voir Détails</button>
            </div>
        </div>
        <h4 className="font-medium text-stone-200 mb-1 truncate">{product.product_model || "Produit Inconnu"}</h4>
        <div className="flex items-center justify-between mt-2">
            <span className="text-stone-500 text-xs bg-stone-800 px-2 py-1 rounded">{product.categories_id || "Général"}</span>
            <span className="font-bold text-yellow-500">{product.product_price ? product.product_price + " €" : "N/A"}</span>
        </div>
    </motion.div>
);

const ProductCardMock = ({ index }) => (
    <div className="group bg-stone-900/30 border border-white/5 rounded-2xl p-4 hover:border-yellow-500/30 transition-all hover:bg-stone-900/50 hover:-translate-y-1">
        <div className="aspect-square rounded-xl bg-stone-800/50 mb-4 flex items-center justify-center text-stone-600 relative overflow-hidden">
            <Package className="w-12 h-12 opacity-20" />
            <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-yellow-500 hover:text-black transition-colors">
                <TrendingUp size={14} />
            </div>
        </div>
        <div className="w-3/4 h-4 bg-stone-800 rounded mb-2" />
        <div className="flex items-center justify-between mt-2">
            <div className="w-16 h-4 bg-stone-800 rounded" />
            <span className="font-bold text-yellow-500">19.99 €</span>
        </div>
    </div>
);

const Dashboard = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [accountInfo, setAccountInfo] = useState({ account: '' });
    const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'stats'

    useEffect(() => {
        const authData = localStorage.getItem('hiboutik_auth');

        // DEMO MODE: If no auth, just use dummy data instead of redirecting
        if (!authData) {
            setAccountInfo({ account: 'Demo Mode' });
            setLoading(false);
            return;
        }

        const { account, email, apiKey } = JSON.parse(authData);
        setAccountInfo({ account });

        const fetchData = async () => {
            try {
                const api = createApiClient(account, email, apiKey);
                const res = await api.get('/products/', { params: { limit: 12 } });

                if (Array.isArray(res.data)) {
                    setProducts(res.data);
                } else if (res.data && Array.isArray(res.data.data)) {
                    setProducts(res.data.data);
                } else {
                    setProducts([]);
                }
            } catch (err) {
                console.error("Failed to fetch products", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('hiboutik_auth');
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-[#0f0f0f] text-white">
            {/* Sidebar */}
            <aside className="w-20 lg:w-72 border-r border-white/5 bg-stone-900/50 backdrop-blur-md flex flex-col justify-between hidden md:flex">
                <div>
                    <div className="h-20 flex items-center justify-center lg:justify-start lg:px-8 border-b border-white/5">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-yellow-500 to-yellow-300 flex items-center justify-center text-black font-bold text-xl shadow-lg shadow-yellow-500/20">H</div>
                        <span className="ml-3 font-bold text-xl tracking-tight hidden lg:block text-stone-200">Hiboutik<span className="text-yellow-500">.</span></span>
                    </div>

                    <div className="p-4 px-6 space-y-8 mt-6">
                        <div>
                            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-4 hidden lg:block">Principal</p>
                            <nav className="space-y-2">
                                <SidebarItem icon={LayoutGrid} label="Tableau de bord" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
                                <SidebarItem icon={BarChart3} label="Statistiques" active={activeTab === 'stats'} onClick={() => setActiveTab('stats')} />
                            </nav>
                        </div>

                        <div>
                            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-4 hidden lg:block">Gestion</p>
                            <nav className="space-y-2">
                                <SidebarItem icon={Package} label="Produits" />
                                <SidebarItem icon={ShoppingCart} label="Ventes" />
                                <SidebarItem icon={Users} label="Clients" />
                            </nav>
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t border-white/5 bg-stone-900/30">
                    <button onClick={handleLogout} className="w-full flex items-center p-3 rounded-xl text-stone-400 hover:bg-red-500/10 hover:text-red-400 transition-colors group">
                        <Power className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                        <span className="ml-3 font-medium hidden lg:block">Déconnexion</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-[#0a0a0a]">
                {/* Header */}
                <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-stone-900/30 backdrop-blur-xl sticky top-0 z-20">
                    <h2 className="text-xl font-bold text-white/90">
                        {activeTab === 'dashboard' ? 'Tableau de bord' : 'Analyses & Statistiques'}
                    </h2>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:block relative group">
                            <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-500 group-focus-within:text-yellow-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Rechercher..."
                                className="bg-stone-950 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-yellow-500/50 w-64 transition-all focus:w-80"
                            />
                        </div>
                        <div className="w-px h-6 bg-white/10" />
                        <button className="relative text-stone-400 hover:text-white transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0f0f0f]"></span>
                        </button>
                        <div className="flex items-center gap-3 pl-2">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium text-white line-clamp-1 max-w-[100px]">{accountInfo.account}</p>
                                <p className="text-xs text-stone-500">Admin</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-stone-700 to-stone-800 border border-white/10 flex items-center justify-center font-bold text-sm text-yellow-500 shadow-inner">
                                {accountInfo.account.slice(0, 2).toUpperCase()}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-8 max-w-7xl mx-auto">
                    <AnimatePresence mode="wait">
                        {activeTab === 'dashboard' ? (
                            <motion.div
                                key="dashboard"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-8"
                            >
                                {/* Quick Stats */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <StatCard title="Chiffre d'affaires" value="2,450.00 €" change="+12%" icon={CreditCard} trend="up" />
                                    <StatCard title="Commandes" value="48" change="+5%" icon={ShoppingCart} trend="up" />
                                    <StatCard title="Visiteurs" value="1,203" change="-2%" icon={Users} trend="down" />
                                    <StatCard title="Panier Moyen" value="56.00 €" change="+8%" icon={TrendingUp} trend="up" />
                                </div>

                                {/* Main Chart Area - Custom Implementation */}
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    <div className="lg:col-span-2 bg-stone-900/30 border border-white/5 rounded-3xl p-6 backdrop-blur-sm">
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="font-bold text-lg">Aperçu des Ventes</h3>
                                            <select className="bg-stone-950 border border-white/10 rounded-lg px-3 py-1 text-sm text-stone-300 outline-none">
                                                <option>Cette semaine</option>
                                                <option>Ce mois</option>
                                            </select>
                                        </div>

                                        {/* Custom Chart */}
                                        <div className="h-[300px] w-full flex items-end justify-between px-4 pb-4 gap-2">
                                            {data.map((item, index) => (
                                                <div key={index} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                                                    <div className="w-full relative h-full flex items-end">
                                                        <motion.div
                                                            initial={{ height: 0 }}
                                                            animate={{ height: item.height }}
                                                            transition={{ duration: 1, delay: 0.1 * index }}
                                                            className="w-full bg-gradient-to-t from-yellow-500/20 to-yellow-500 rounded-t-lg relative group-hover:from-yellow-400/40 group-hover:to-yellow-400 transition-colors"
                                                        >
                                                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-stone-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                                {item.sales}€
                                                            </div>
                                                        </motion.div>
                                                    </div>
                                                    <span className="text-xs text-stone-500">{item.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Recent Activity / Mini List */}
                                    <div className="bg-stone-900/30 border border-white/5 rounded-3xl p-6 backdrop-blur-sm flex flex-col">
                                        <h3 className="font-bold text-lg mb-6">Activité Récente</h3>
                                        <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar">
                                            {[1, 2, 3, 4, 5].map((_, i) => (
                                                <div key={i} className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-xl transition-colors cursor-pointer group">
                                                    <div className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 group-hover:bg-yellow-500/20 group-hover:text-yellow-500 transition-colors">
                                                        <ShoppingBag size={18} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium text-white">Nouvelle commande</p>
                                                        <p className="text-xs text-stone-500">Il y a {i * 15 + 5} min</p>
                                                    </div>
                                                    <span className="font-bold text-sm text-green-400">+120€</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Products Grid Section */}
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-bold text-white">Produits en Vedette</h3>
                                        <button className="text-stone-400 hover:text-white text-sm font-medium transition-colors flex items-center gap-2">
                                            Voir le catalogue <Package size={16} />
                                        </button>
                                    </div>

                                    {loading ? (
                                        <div className="flex items-center justify-center h-40 bg-stone-900/20 rounded-2xl border border-white/5">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                            {products.length > 0 ? products.map((product) => (
                                                <ProductCard key={product.product_id || Math.random()} product={product} />
                                            )) : (
                                                [1, 2, 3, 4].map((_, i) => <ProductCardMock key={i} index={i} />)
                                            )}
                                        </div>
                                    )}
                                </div>
                            </motion.div>

                        ) : (
                            <motion.div
                                key="stats"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-8"
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <div className="bg-stone-900/30 border border-white/5 rounded-3xl p-8 h-[400px]">
                                        <h3 className="font-bold text-xl mb-6">Comparaison Hebdomadaire</h3>
                                        {/* Custom Bar Comparison Chart */}
                                        <div className="w-full h-[300px] flex items-end justify-between gap-4">
                                            {data.map((item, i) => (
                                                <div key={i} className="flex-1 h-full flex flex-col justify-end gap-2 group">
                                                    <div className="flex gap-1 h-full items-end justify-center">
                                                        <motion.div
                                                            initial={{ height: 0 }}
                                                            animate={{ height: item.height }}
                                                            className="w-full bg-yellow-500 rounded-t-sm"
                                                        />
                                                        <motion.div
                                                            initial={{ height: 0 }}
                                                            animate={{ height: `calc(${item.height} * 0.6)` }}
                                                            className="w-full bg-stone-700 rounded-t-sm"
                                                        />
                                                    </div>
                                                    <span className="text-center text-xs text-stone-500 uppercase">{item.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-stone-900/30 border border-white/5 rounded-3xl p-8 h-[400px]">
                                        <h3 className="font-bold text-xl mb-2">Performance par Catégorie</h3>
                                        <p className="text-stone-500 text-sm mb-8">Répartition du volume des ventes</p>
                                        <div className="flex items-center justify-center h-[250px]">
                                            <div className="relative w-48 h-48 rounded-full border-[12px] border-stone-800 flex items-center justify-center">
                                                <div className="absolute top-0 left-0 w-full h-full rounded-full border-[12px] border-yellow-500 border-t-transparent border-l-transparent rotate-45" />
                                                <div className="text-center">
                                                    <span className="block text-3xl font-bold text-white">75%</span>
                                                    <span className="text-xs text-stone-500 uppercase tracking-wide">Vêtements</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-center gap-6 mt-4">
                                            <div className="flex items-center gap-2 text-sm text-stone-400">
                                                <div className="w-3 h-3 rounded-full bg-yellow-500" /> Vêtements
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-stone-400">
                                                <div className="w-3 h-3 rounded-full bg-stone-800" /> Autres
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
