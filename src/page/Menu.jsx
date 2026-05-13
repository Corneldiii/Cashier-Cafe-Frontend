import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Search, Plus, Minus, Trash2, ShoppingBag, X, CupSoda, Snowflake } from 'lucide-react';
import api from '../api/axios';
import Loading from '../components/Loading';

// =============================================
// MODAL ADD TO CART — tema sama kayak OrderDetailModal
// =============================================
const AddToCartModal = ({ isOpen, onClose, menu, onAdd }) => {
  const [qty, setQty] = useState(1);
  const [sugar, setSugar] = useState('Normal');
  const [ice, setIce] = useState('Normal');

  // Reset state tiap kali modal dibuka dengan menu baru
  useEffect(() => {
    if (isOpen) {
      setQty(1);
      setSugar('Normal');
      setIce('Normal');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen || !menu) return null;

  const handleAdd = () => {
    onAdd(menu, qty, { sugar, ice });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm" />

      {/* Modal Card */}
      <div
        className="relative w-full max-w-sm bg-white/70 backdrop-blur-2xl border border-white/80 rounded-4xl shadow-[0_24px_64px_0_rgba(14,165,233,0.18)] overflow-hidden"
        style={{ animation: 'modalIn 0.28s cubic-bezier(0.34,1.56,0.64,1) both' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header Gradient */}
        <div className="relative bg-gradient-to-br from-sky-400/90 to-sky-500/90 px-6 pt-6 pb-10">
          {/* Dekorasi */}
          <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-white/10 rounded-full pointer-events-none" />
          <div className="absolute bottom-[-14px] left-[25%] w-24 h-24 bg-white/10 rounded-full pointer-events-none" />

          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-sky-100 text-xs font-semibold tracking-widest uppercase mb-1">Atur Pesanan</p>
              <h2 className="text-white text-xl font-extrabold leading-tight max-w-[220px]">{menu.name}</h2>
              <p className="text-sky-100 font-semibold mt-1 text-sm">Rp {menu.price.toLocaleString('id-ID')}</p>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 bg-white/20 hover:bg-white/30 text-white rounded-2xl flex items-center justify-center transition-colors cursor-pointer shrink-0 mt-1"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Gambar menu — menonjol di atas seam header/body */}
        <div className="flex justify-center -mt-10 relative z-10 mb-2">
          <div className="w-20 h-20 bg-sky-100 border-4 border-white rounded-2xl shadow-lg flex items-center justify-center overflow-hidden">
            <span className="text-sky-300 text-xs font-medium">No Image</span>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 pb-6 flex flex-col gap-4">

          {/* Opsi Level Gula */}
          <div className="bg-white/60 border border-white/80 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <CupSoda size={15} className="text-sky-400" />
              <span className="text-slate-600 font-bold text-sm">Level Gula</span>
            </div>
            <div className="flex gap-2">
              {['Normal', 'Less', 'No Sugar'].map(opt => (
                <button
                  key={opt}
                  onClick={() => setSugar(opt)}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                    sugar === opt
                      ? 'bg-sky-500 text-white border-sky-500 shadow-[0_4px_12px_0_rgba(14,165,233,0.3)]'
                      : 'bg-white/60 text-slate-500 border-slate-100 hover:bg-sky-50'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Opsi Level Es */}
          <div className="bg-white/60 border border-white/80 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Snowflake size={15} className="text-sky-400" />
              <span className="text-slate-600 font-bold text-sm">Level Es</span>
            </div>
            <div className="flex gap-2">
              {['Normal', 'Less', 'No Ice'].map(opt => (
                <button
                  key={opt}
                  onClick={() => setIce(opt)}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                    ice === opt
                      ? 'bg-sky-500 text-white border-sky-500 shadow-[0_4px_12px_0_rgba(14,165,233,0.3)]'
                      : 'bg-white/60 text-slate-500 border-slate-100 hover:bg-sky-50'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* QTY Controller */}
          <div className="flex items-center justify-between bg-white/60 border border-white/80 rounded-2xl px-4 py-3">
            <span className="text-slate-600 font-bold text-sm">Jumlah</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQty(q => Math.max(1, q - 1))}
                className="w-9 h-9 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors cursor-pointer"
              >
                <Minus size={16} />
              </button>
              <span className="text-xl font-extrabold text-slate-700 w-8 text-center">{qty}</span>
              <button
                onClick={() => setQty(q => q + 1)}
                className="w-9 h-9 flex items-center justify-center bg-sky-100 hover:bg-sky-200 text-sky-600 rounded-xl transition-colors cursor-pointer"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Subtotal kecil */}
          <div className="flex justify-between items-center px-1">
            <span className="text-slate-400 text-sm">Subtotal</span>
            <span className="text-sky-600 font-extrabold text-lg">
              Rp {(menu.price * qty).toLocaleString('id-ID')}
            </span>
          </div>

          {/* Tombol Tambah */}
          <button
            onClick={handleAdd}
            className="w-full py-4 bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-bold text-base rounded-2xl shadow-[0_4px_16px_0_rgba(14,165,233,0.35)] hover:shadow-[0_6px_20px_0_rgba(14,165,233,0.45)] transition-all duration-200 cursor-pointer"
          >
            Tambahkan ke Pesanan
          </button>
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.92) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};

// =============================================
// MAIN COMPONENT
// =============================================
const Menu = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [cart, setCart] = useState([]);
  const [menus, setMenus] = useState([]);
  const [name, setName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [orderCode, setOrderCode] = useState('');

  const fetchMenus = async () => {
    try {
      const result = await api.get('/allMenus');
      setMenus(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const result = await api.get('/countID');
        const now = new Date();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = String(now.getFullYear());
        setOrderCode("ORD" + String(result.data) + month + year);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCount();
  }, []);

  const addCart = (menu, qty) => {
    if (!menu) return;
    setCart(prev => {
      const exists = prev.find(item => item.id === menu.id);
      if (exists) {
        return prev.map(item =>
          item.id === menu.id
            ? { ...item, qty: item.qty + qty, sumPrice: (item.qty + qty) * item.price }
            : item
        );
      }
      return [...prev, { id: menu.id, name: menu.name, price: menu.price, qty, sumPrice: qty * menu.price }];
    });
  };

  const removeCart = (id) => setCart(prev => prev.filter(item => item.id !== id));

  const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);
  const totalAmount = cart.reduce((acc, item) => acc + item.sumPrice, 0);
  const grandTotal = totalAmount + totalAmount * 0.11;

  const payNow = async () => {
    if (!name || cart.length === 0) {
      alert("Nama dan pesanan tidak boleh kosong!");
      return;
    }
    try {
      setIsLoading(true);
      const res = await api.post('/payment/create', { gross_amount: grandTotal, name });
      const token = res.data.token;
      if (token) {
        await api.post("/payment/addOrders", {
          orderCode,
          totalPrice: grandTotal,
          paymentMethod: 'cash',
          cashierId: 1,
          orderList: cart
        });
        window.snap.pay(token, {
          onSuccess: () => { setCart([]); setName(''); setIsLoading(false); },
          onPending: () => setIsLoading(false),
          onError: () => setIsLoading(false),
          onClose: () => setIsLoading(false),
        });
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const filterByCategory = async (category) => {
    try {
      setIsLoading(true);
      if (category === "Semua") {
        await fetchMenus();
      } else {
        const res = await api.post('/category', { categoryName: category });
        setMenus(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => setIsLoading(false), 800);
    }
  };

  const filteredMenus = menus.filter(item =>
    item.is_available === 1 && item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-white via-sky-100 to-sky-600 flex flex-col relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-125 h-125 bg-sky-200/40 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-150 h-150 bg-white/60 rounded-full filter blur-[100px] opacity-80 pointer-events-none" />

      <Loading isLoading={isLoading} />
      <Navbar pageID={1} />

      <div className="flex flex-col lg:flex-row w-full h-screen lg:pl-25 gap-6 p-4 lg:p-6 z-10 overflow-hidden">

        {/* KIRI: CART */}
        <div className="w-full lg:w-100 h-full bg-white/60 backdrop-blur-xl rounded-4xl shadow-[0_8px_32px_0_rgba(186,230,253,0.3)] border border-white/60 flex flex-col p-6">
          <div className="flex items-center gap-3 mb-6">
            <ShoppingBag className="text-sky-500" size={28} />
            <h1 className="text-2xl font-bold text-slate-700">Pesanan Baru</h1>
          </div>

          <div className="w-full bg-white/50 rounded-2xl p-2 border border-sky-100 shadow-sm mb-4">
            <input
              type="text"
              value={name}
              className="w-full h-10 bg-transparent outline-none rounded-xl text-slate-700 px-3 font-medium placeholder:text-slate-400"
              placeholder="Masukkan nama pelanggan..."
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-hide flex flex-col gap-3 pr-2 border-t border-b border-sky-100/50 py-4">
            {cart.length === 0 ? (
              <div className="m-auto text-slate-400 text-sm text-center">Belum ada menu yang dipilih</div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="w-full bg-white/80 p-3 rounded-2xl shadow-sm border border-sky-50 flex items-center justify-between gap-3 transition-all hover:shadow-md">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center text-sky-600 font-bold text-sm">
                      {item.qty}x
                    </div>
                    <div className="flex flex-col">
                      <h1 className="font-semibold text-slate-700 text-sm line-clamp-1">{item.name}</h1>
                      <h1 className="text-sky-500 font-medium text-xs">Rp {item.price.toLocaleString('id-ID')}</h1>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <h1 className="font-bold text-slate-700 text-sm">Rp {item.sumPrice.toLocaleString('id-ID')}</h1>
                    <button onClick={() => removeCart(item.id)} className="text-red-400 hover:text-red-600 p-1 cursor-pointer">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-4 flex flex-col gap-2 text-sm font-medium text-slate-500">
            <div className="flex justify-between">
              <span>Total Item</span>
              <span className="text-slate-700">{totalQty}</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-slate-700">Rp {totalAmount.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between">
              <span>Pajak (11%)</span>
              <span className="text-slate-700">Rp {(totalAmount * 0.11).toLocaleString('id-ID')}</span>
            </div>
            <div className="w-full h-px bg-sky-200 my-2" />
            <div className="flex justify-between text-lg font-bold text-slate-700">
              <span>Grand Total</span>
              <span className="text-sky-500">Rp {grandTotal.toLocaleString('id-ID')}</span>
            </div>
          </div>

          <button
            disabled={cart.length === 0 || name === ''}
            onClick={payNow}
            className="w-full h-14 mt-6 bg-gradient-to-r from-sky-400 to-sky-300 hover:from-sky-500 hover:to-sky-400 disabled:from-slate-200 disabled:to-slate-300 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold text-lg rounded-full shadow-[0_8px_20px_0_rgba(56,189,248,0.4)] disabled:shadow-none transition-all cursor-pointer"
          >
            Proses Pembayaran
          </button>
        </div>

        {/* KANAN: MENU GRID */}
        <div className="flex-1 h-full bg-white/40 backdrop-blur-xl rounded-4xl shadow-[0_8px_32px_0_rgba(186,230,253,0.3)] border border-white/60 flex flex-col p-6 overflow-hidden">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-6">
            <div className="flex gap-2 overflow-x-auto w-full lg:w-auto scrollbar-hide pb-2 lg:pb-0">
              {['Semua', 'Coffee', 'Tea', 'Milk Shake', 'Pastries', 'Snack', 'Heavy Meal'].map((cat, i) => (
                <button
                  key={i}
                  onClick={() => filterByCategory(cat)}
                  className="cursor-pointer px-5 py-2.5 whitespace-nowrap rounded-full bg-white/60 hover:bg-white text-sky-600 font-medium text-sm border border-sky-100 shadow-sm transition-all"
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full lg:w-72 shrink-0">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-sky-400">
                <Search size={18} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full h-12 bg-white/60 border border-white shadow-sm rounded-full pl-12 pr-4 text-slate-700 focus:outline-none focus:ring-4 focus:ring-sky-100 focus:bg-white transition-all placeholder:text-slate-400"
                placeholder="Cari menu..."
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-hide pr-2">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 pb-10">
              {filteredMenus.map(item => (
                <div
                  key={item.id}
                  className="bg-white/50 backdrop-blur-sm border border-white p-4 rounded-[1.5rem] flex flex-col items-center justify-center hover:bg-white/80 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  onClick={() => setSelectedMenu(item)}
                >
                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-sky-100 rounded-full mb-4 shadow-inner group-hover:scale-105 transition-transform duration-300 flex items-center justify-center overflow-hidden">
                    <span className="text-sky-300 text-xs">No Image</span>
                  </div>
                  <h1 className="font-bold text-slate-700 text-center text-sm sm:text-base line-clamp-2 mb-1">{item.name}</h1>
                  <h2 className="text-sky-500 font-semibold text-sm">Rp {item.price.toLocaleString('id-ID')}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <AddToCartModal
        isOpen={!!selectedMenu}
        onClose={() => setSelectedMenu(null)}
        menu={selectedMenu}
        onAdd={(menu, qty) => {
          addCart(menu, qty);
          setSelectedMenu(null);
        }}
      />
    </div>
  );
};

export default Menu;