import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, Power, Package, LayoutGrid, Users, Plus, Minus, Trash2, CreditCard, RotateCcw, Menu, X } from 'lucide-react';
import { createApiClient } from '../services/api';

const POSPage = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [accountInfo, setAccountInfo] = useState({ account: '' });

    // Load Auth & Products
    useEffect(() => {
        const authData = localStorage.getItem('hiboutik_auth');
        if (!authData) {
            setAccountInfo({ account: 'Demo Mode' });
            // Load mock products for demo
            setProducts(generateMockProducts());
            setLoading(false);
            return;
        }

        const { account, email, apiKey } = JSON.parse(authData);
        setAccountInfo({ account });

        const fetchProducts = async () => {
            try {
                const api = createApiClient(account, email, apiKey);
                const res = await api.get('/products/', { params: { limit: 50 } }); // Get more products for POS
                if (Array.isArray(res.data) || (res.data && Array.isArray(res.data.data))) {
                    const list = Array.isArray(res.data) ? res.data : res.data.data;
                    setProducts(list.length > 0 ? list : generateMockProducts());
                } else {
                    setProducts(generateMockProducts());
                }
            } catch (err) {
                console.error("Error fetching products", err);
                setProducts(generateMockProducts());
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === (product.product_id || product.id));
            if (existing) {
                return prev.map(item =>
                    item.id === existing.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, {
                id: product.product_id || product.id,
                name: product.product_model || product.name,
                price: parseFloat(product.product_price || product.price),
                image: product.image,
                quantity: 1
            }];
        });
    };

    const updateQuantity = (id, delta) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = Math.max(0, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }).filter(item => item.quantity > 0));
    };

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const handlePayment = () => {
        setShowPaymentModal(true);
        // Here you would integrate with API to create a sale
        setTimeout(() => {
            setShowPaymentModal(false);
            setCart([]);
            alert("Paiement validé ! (Simulation)");
        }, 2000);
    };

    const filteredProducts = products.filter(p => {
        const name = (p.product_model || p.name || '').toLowerCase();
        const search = searchTerm.toLowerCase();
        const matchesSearch = name.includes(search);
        const matchesCategory = selectedCategory === 'All' || (p.category === selectedCategory); // simple category mock
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="flex h-screen bg-[#0f0f0f] text-white overflow-hidden font-sans">
            {/* Collapsible Sidebar (Mini version) */}
            <aside className="w-20 border-r border-white/5 bg-stone-900/50 backdrop-blur-md flex flex-col justify-between hidden md:flex z-50">
                <div className="flex flex-col items-center py-6 space-y-8">
                    <div onClick={() => navigate('/dashboard')} className="w-10 h-10 rounded-xl bg-gradient-to-tr from-yellow-500 to-yellow-300 flex items-center justify-center text-black font-bold text-xl cursor-pointer hover:scale-105 transition-transform">H</div>

                    <nav className="flex flex-col space-y-4 w-full px-2">
                        <NavIcon icon={LayoutGrid} onClick={() => navigate('/dashboard')} label="Dashboard" />
                        <NavIcon icon={ShoppingCart} active label="Caisse" />
                        <NavIcon icon={Package} onClick={() => navigate('/products')} label="Produits" />
                    </nav>
                </div>
                <div className="p-4 flex justify-center">
                    <button onClick={() => navigate('/login')} className="text-stone-500 hover:text-red-400 transition-colors"><Power /></button>
                </div>
            </aside>

            <div className="flex-1 flex flex-col md:flex-row h-full relative">

                {/* LEFT SIDE: PRODUCTS GRID */}
                <div className="flex-1 flex flex-col min-w-0 bg-[#0a0a0a]">
                    {/* Header */}
                    <header className="h-20 border-b border-white/5 flex items-center justify-between px-6 bg-stone-900/30 sticky top-0 z-10 backdrop-blur-sm">
                        <div className="flex items-center gap-4 flex-1">
                            <h2 className="text-xl font-bold hidden md:block">Caisse</h2>
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-2.5 w-4 h-4 text-stone-500" />
                                <input
                                    type="text"
                                    placeholder="Scanner ou rechercher un produit..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-stone-950 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-yellow-500/50 transition-all"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                            {['All', 'Vêtements', 'Accessoires'].map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${selectedCategory === cat ? 'bg-yellow-500 text-black' : 'bg-stone-800 text-stone-400 hover:bg-stone-700'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </header>

                    {/* Grid */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {loading ? (
                            <div className="flex justify-center items-center h-full"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div></div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                {filteredProducts.map((product) => (
                                    <div
                                        key={product.product_id || product.id}
                                        onClick={() => addToCart(product)}
                                        className="bg-stone-900/40 border border-white/5 rounded-xl p-3 cursor-pointer hover:border-yellow-500/50 hover:bg-stone-800 transition-all group relative overflow-hidden"
                                    >
                                        <div className="aspect-square bg-stone-800/50 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
                                            {product.image ? (
                                                <img src={product.image} alt="" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                            ) : (
                                                <Package className="w-8 h-8 text-stone-600 group-hover:text-yellow-500 transition-colors" />
                                            )}
                                            <div className="absolute inset-0 bg-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                        <h3 className="font-medium text-sm text-stone-200 truncate">{product.product_model || product.name}</h3>
                                        <p className="text-yellow-500 font-bold text-sm mt-1">{product.product_price || product.price} €</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT SIDE: CART */}
                <div className="w-full md:w-96 bg-stone-900 border-l border-white/5 flex flex-col h-full shadow-2xl z-20">
                    <div className="p-4 border-b border-white/5 flex justify-between items-center bg-stone-900">
                        <h3 className="font-bold text-lg">Ticket en cours</h3>
                        <button
                            onClick={() => setCart([])}
                            className="p-2 text-stone-500 hover:text-red-400 transition-colors rounded-lg hover:bg-white/5"
                            title="Vider le panier"
                        >
                            <RotateCcw size={18} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {cart.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-stone-600 space-y-4">
                                <ShoppingCart size={48} className="opacity-20" />
                                <p className="text-sm">Le panier est vide</p>
                            </div>
                        ) : (
                            cart.map(item => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={item.id}
                                    className="bg-white/5 rounded-xl p-3 flex gap-3 items-center group"
                                >
                                    <div className="w-12 h-12 bg-stone-800 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Package size={16} className="text-stone-500" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-medium text-sm truncate">{item.name}</h4>
                                        <p className="text-yellow-500 text-xs font-bold">{item.price} €</p>
                                    </div>
                                    <div className="flex items-center gap-2 bg-black/20 rounded-lg p-1">
                                        <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-white text-stone-400"><Minus size={12} /></button>
                                        <span className="text-xs w-4 text-center font-bold">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-white text-stone-400"><Plus size={12} /></button>
                                    </div>
                                    <button onClick={() => removeFromCart(item.id)} className="text-stone-600 hover:text-red-400 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Trash2 size={14} />
                                    </button>
                                </motion.div>
                            ))
                        )}
                    </div>

                    <div className="p-6 bg-stone-900 border-t border-white/10 space-y-4">
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between text-stone-400">
                                <span>Sous-total</span>
                                <span>{cartTotal.toFixed(2)} €</span>
                            </div>
                            <div className="flex justify-between text-stone-400">
                                <span>TVA (20%)</span>
                                <span>{(cartTotal * 0.2).toFixed(2)} €</span>
                            </div>
                            <div className="flex justify-between text-white font-bold text-xl pt-2 border-t border-white/5">
                                <span>Total</span>
                                <span>{(cartTotal * 1.2).toFixed(2)} €</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <button className="py-3 rounded-xl border border-white/10 hover:bg-white/5 font-medium text-stone-300 transition-colors">
                                Mise en attente
                            </button>
                            <button
                                onClick={handlePayment}
                                disabled={cart.length === 0}
                                className="py-3 rounded-xl bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-bold shadow-lg shadow-yellow-900/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 flex items-center justify-center gap-2"
                            >
                                <CreditCard size={18} />
                                Encaisser
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Simple Payment Modal Simulation */}
            {showPaymentModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm">
                    <div className="bg-stone-900 border border-white/10 rounded-3xl p-8 max-w-sm w-full text-center">
                        <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-yellow-500">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Traitement...</h3>
                        <p className="text-stone-400">Connexion au terminal de paiement</p>
                    </div>
                </div>
            )}
        </div>
    );
};

// Utils & Mock Data
const NavIcon = ({ icon: Icon, active, onClick, label }) => (
    <button onClick={onClick} className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${active ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20' : 'text-stone-400 hover:bg-white/10 hover:text-white'}`} title={label}>
        <Icon size={20} />
    </button>
);

const generateMockProducts = () => [
    { id: 101, name: 'T-Shirt Classic', price: 29.90, category: 'Vêtements' },
    { id: 102, name: 'Jean Slim Fit', price: 59.90, category: 'Vêtements' },
    { id: 103, name: 'Casquette', price: 19.90, category: 'Accessoires' },
    { id: 104, name: 'Sneakers Urban', price: 89.90, category: 'Vêtements' },
    { id: 105, name: 'Sac à dos', price: 45.00, category: 'Accessoires' },
    { id: 106, name: 'Montre Style', price: 120.00, category: 'Accessoires' },
    { id: 107, name: 'Chemise Lin', price: 49.90, category: 'Vêtements' },
    { id: 108, name: 'Ceinture Cuir', price: 35.00, category: 'Accessoires' },
];

export default POSPage;
