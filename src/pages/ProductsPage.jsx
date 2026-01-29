import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, ShoppingCart, Users, Power, Search, Package, Plus, Edit2, Trash, Save, X, Check, Filter } from 'lucide-react';
import { createApiClient } from '../services/api';

const ProductsPage = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [accountInfo, setAccountInfo] = useState({ account: '' });
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // New Product Form State
    const [newProduct, setNewProduct] = useState({ model: '', price: '', category: '' });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const authData = localStorage.getItem('hiboutik_auth');
        if (!authData) {
            setAccountInfo({ account: 'Demo Mode' });
            setProducts([
                { products_id: 1, product_model: "Exemple Prod", product_price: "20.00", categories_id: "1" }
            ]);
            setLoading(false);
            return;
        }

        const { account, email, apiKey } = JSON.parse(authData);
        setAccountInfo({ account });

        const fetchProducts = async () => {
            try {
                const api = createApiClient(account, email, apiKey);
                const res = await api.get('/products/', { params: { limit: 50 } });
                if (Array.isArray(res.data)) {
                    setProducts(res.data);
                } else if (res.data && Array.isArray(res.data.data)) {
                    setProducts(res.data.data);
                } else {
                    setProducts([]);
                }
            } catch (err) {
                console.error("Error fetching products", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleSaveProduct = async (e) => {
        e.preventDefault();
        setSaving(true);

        // Simulation of API call
        // In real Hiboutik API, POST /products requires specific fields
        // For this demo, we mock the addition to the local list
        await new Promise(r => setTimeout(r, 1000));

        const mockNewProd = {
            product_id: Math.random().toString(36).substr(2, 9),
            product_model: newProduct.model,
            product_price: newProduct.price,
            categories_id: newProduct.category || "1"
        };

        setProducts([mockNewProd, ...products]);
        setSaving(false);
        setIsDrawerOpen(false);
        setNewProduct({ model: '', price: '', category: '' });
    };

    const handleLogout = () => {
        localStorage.removeItem('hiboutik_auth');
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-[#0f0f0f] text-white font-sans overflow-hidden">
            {/* Sidebar (Consistent with Dashboard) */}
            <aside className="w-20 lg:w-64 border-r border-white/5 bg-stone-900/50 backdrop-blur-md flex flex-col justify-between hidden md:flex">
                <div>
                    <div className="h-20 flex items-center justify-center lg:justify-start lg:px-8 border-b border-white/5">
                        <div className="w-8 h-8 rounded bg-gradient-to-tr from-yellow-500 to-yellow-300 flex items-center justify-center text-black font-bold text-xl cursor-pointer" onClick={() => navigate('/dashboard')}>H</div>
                        <span className="ml-3 font-bold text-xl tracking-tight hidden lg:block cursor-pointer" onClick={() => navigate('/dashboard')}>Hiboutik<span className="text-yellow-500">.</span></span>
                    </div>

                    <nav className="p-4 space-y-2">
                        <SidebarItem icon={LayoutGrid} label="Tableau de bord" onClick={() => navigate('/dashboard')} />
                        <SidebarItem icon={Package} label="Produits" active />
                        <SidebarItem icon={ShoppingCart} label="Caisse" onClick={() => navigate('/pos')} />
                        <SidebarItem icon={Users} label="Clients" />
                    </nav>
                </div>

                <div className="p-4 border-t border-white/5">
                    <button onClick={handleLogout} className="w-full flex items-center p-3 rounded-xl text-stone-500 hover:bg-red-500/10 hover:text-red-400 transition-colors">
                        <Power className="w-5 h-5" />
                        <span className="ml-3 font-medium hidden lg:block">Déconnexion</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 bg-[#0a0a0a] relative">
                <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-stone-900/30 backdrop-blur-sm sticky top-0 z-20">
                    <h2 className="text-xl font-semibold text-white/90">Gestion des Produits</h2>
                    <div className="flex gap-4">
                        <button className="p-2 text-stone-400 hover:text-white"><Filter size={20} /></button>
                        <button
                            onClick={() => setIsDrawerOpen(true)}
                            className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-lg shadow-yellow-500/20"
                        >
                            <Plus size={18} />
                            <span className="hidden sm:inline">Nouveau Produit</span>
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-4 lg:p-8">
                    {loading ? (
                        <div className="flex justify-center mt-20"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-yellow-500" /></div>
                    ) : (
                        <div className="bg-stone-900/30 border border-white/5 rounded-2xl overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-white/5 text-stone-400 text-xs uppercase tracking-wider">
                                    <tr>
                                        <th className="p-4 font-medium">Modèle / Nom</th>
                                        <th className="p-4 font-medium">Catégorie</th>
                                        <th className="p-4 font-medium text-right">Prix</th>
                                        <th className="p-4 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {products.map((product) => (
                                        <tr key={product.product_id || Math.random()} className="hover:bg-white/5 transition-colors group">
                                            <td className="p-4 flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-stone-800 flex items-center justify-center text-stone-500">
                                                    <Package size={18} />
                                                </div>
                                                <span className="font-medium text-stone-200">{product.product_model || "Sans nom"}</span>
                                            </td>
                                            <td className="p-4 text-stone-400">{product.categories_id || "N/A"}</td>
                                            <td className="p-4 text-right font-bold text-yellow-500">{product.product_price} €</td>
                                            <td className="p-4 text-right">
                                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-2 hover:bg-white/10 rounded-lg text-stone-400 hover:text-white"><Edit2 size={16} /></button>
                                                    <button className="p-2 hover:bg-red-500/20 rounded-lg text-stone-400 hover:text-red-400"><Trash size={16} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Add Product Drawer / Overlay */}
                <AnimatePresence>
                    {isDrawerOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsDrawerOpen(false)}
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
                            />
                            <motion.div
                                initial={{ x: "100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "100%" }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className="fixed right-0 top-0 h-full w-full max-w-md bg-stone-900 border-l border-white/10 z-40 p-8 shadow-2xl flex flex-col"
                            >
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className="text-2xl font-bold text-white">Ajouter un produit</h2>
                                    <button onClick={() => setIsDrawerOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X /></button>
                                </div>

                                <form onSubmit={handleSaveProduct} className="flex-1 space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-stone-400">Nom du produit</label>
                                        <input
                                            type="text"
                                            required
                                            value={newProduct.model}
                                            onChange={e => setNewProduct({ ...newProduct, model: e.target.value })}
                                            className="w-full bg-stone-950 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-yellow-500/50 transition-colors"
                                            placeholder="Ex: T-Shirt Vintage"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-stone-400">Prix (€)</label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                required
                                                value={newProduct.price}
                                                onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                                                className="w-full bg-stone-950 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-yellow-500/50 transition-colors"
                                                placeholder="0.00"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-stone-400">ID Catégorie</label>
                                            <input
                                                type="text"
                                                value={newProduct.category}
                                                onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                                                className="w-full bg-stone-950 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-yellow-500/50 transition-colors"
                                                placeholder="Ex: 1"
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-8">
                                        <button
                                            type="submit"
                                            disabled={saving}
                                            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 rounded-xl shadow-lg shadow-yellow-500/20 active:scale-95 transition-all flex justify-center items-center gap-2"
                                        >
                                            {saving ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black" /> : <><Check size={20} /> Enregistrer le produit</>}
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center p-3 rounded-xl transition-all duration-300 group ${active ? 'bg-yellow-500/10 text-yellow-500' : 'text-stone-400 hover:bg-white/5 hover:text-white'}`}
    >
        <Icon className="w-5 h-5" />
        <span className="ml-3 font-medium hidden lg:block">{label}</span>
    </button>
);

export default ProductsPage;
