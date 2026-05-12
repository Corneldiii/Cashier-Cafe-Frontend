import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Modal from '../components/Modal';
import { Search, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import api from '../api/axios';
import Loading from '../components/Loading';

const Menu = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, SetIsOpen] = useState({
    id: null,
    isActive: false,
  });
  const [qty, setQty] = useState(1);
  const [cart, setCart] = useState([]);
  const [menus, setMenus] = useState([]);
  const [order, setOrder] = useState([]);
  const [name, setName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [orderCode, setOrderCode] = useState('1127');

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

  const addQTY = () => setQty(qty + 1);
  const minQTY = () => {
    if (qty > 1) setQty(qty - 1);
  };

  const addCart = (menu, qty) => {
    if (!menu) return;
    let itemExists = false;

    const updatedCart = cart.map((item) => {
      if (item.id === menu.id) {
        itemExists = true;
        const newQty = item.qty + qty;
        return {
          ...item,
          qty: newQty,
          sumPrice: calculateItemPrice(newQty, item.price),
        };
      }
      return item;
    });

    if (!itemExists) {
      updatedCart.push({
        id: menu.id,
        name: menu.name,
        price: menu.price,
        qty: qty,
        sumPrice: calculateItemPrice(qty, menu.price),
      });
    }
    setCart(updatedCart);
  };

  const calculateItemPrice = (qty, price) => qty * price;

  const removeCart = (id) => {
    const updateCart = cart.filter(item => item.id !== id);
    setCart(updateCart);
  };

  const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);
  const totalAmount = cart.reduce((amount, item) => amount + item.sumPrice, 0);

  const grandTotal = () => {
    return totalAmount + (totalAmount * 0.11);
  };

  // Payment - Midtrans
  const payNow = async () => {
    try {
      if (name === '' || cart.length === 0) {
        alert("Nama dan pesanan tidak boleh kosong!");
        return;
      }

      setIsLoading(true);
      const res = await api.post('/payment/create', { gross_amount: grandTotal(), name: name });
      const token = res.data.token;

      if (token) {
        await api.post("/payment/addOrders", {
          orderCode: orderCode,
          totalPrice: grandTotal(), // Perbaikan: Gunakan grandTotal dinamis
          paymentMethod: 'cash',
          cashierId: 1,
          orderList: cart
        });

        window.snap.pay(token, {
          onSuccess: (result) => {
            console.log("SUCCESS:", result);
            setCart([]);
            setName('');
            setIsLoading(false);
          },
          onPending: (result) => {
            console.log("PENDING:", result);
            setIsLoading(false);
          },
          onError: (result) => {
            console.log("ERROR:", result);
            setIsLoading(false);
          },
          onClose: () => {
            setIsLoading(false);
          }
        });
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const Categorys = async (category) => {
    try {
      setIsLoading(true)
      console.log(category)
      if (category === "Semua") {
        fetchMenus()
      } else {
        const res = await api.post('/category', { categoryName: category })
        setMenus(res.data)
        setInterval(()=>{
          setIsLoading(false)
        },1000)
        console.log(res.data)
      }

    } catch (error) {

    }
  }

  const filteredMenus = menus.filter(item =>
    item.is_available === 1 && item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-white via-sky-100 to-sky-600 flex flex-col relative overflow-hidden">
      {/* Dekorasi Background Ambient */}
      <div className="absolute top-[-20%] left-[-10%] w-125 h-125 bg-sky-200/40 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-150 h-150 bg-white/60 rounded-full filter blur-[100px] opacity-80 pointer-events-none"></div>

      <Loading isLoading={isLoading} />
      <Navbar pageID={1} />

      {/* Main Layout: Flex untuk responsivitas (Kolom di HP, Baris di PC) */}
      <div className="flex flex-col lg:flex-row w-full h-screen lg:pl-25 gap-6 p-4 lg:p-6 z-10 overflow-hidden">

        {/* === KIRI: AREA PESANAN (CART) === */}
        <div className="w-full lg:w-100 h-full bg-white/60 backdrop-blur-xl rounded-4xl shadow-[0_8px_32px_0_rgba(186,230,253,0.3)] border border-white/60 flex flex-col p-6">
          <div className="flex items-center gap-3 mb-6">
            <ShoppingBag className="text-sky-500" size={28} />
            <h1 className="text-2xl font-bold text-slate-700">Pesanan Baru</h1>
          </div>

          {/* Input Nama Customer */}
          <div className="w-full bg-white/50 rounded-2xl p-2 border border-sky-100 shadow-sm mb-4">
            <input
              type="text"
              value={name}
              className="w-full h-10 bg-transparent outline-none rounded-xl text-slate-700 px-3 font-medium placeholder:text-slate-400"
              placeholder="Masukkan nama pelanggan..."
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Daftar Cart (Scrollable) */}
          <div className="flex-1 overflow-y-auto scrollbar-hide flex flex-col gap-3 pr-2 border-t border-b border-sky-100/50 py-4">
            {cart.length === 0 ? (
              <div className="m-auto text-slate-400 text-sm text-center">Belum ada menu yang dipilih</div>
            ) : (
              cart.map((item) => (
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
                    <button onClick={() => removeCart(item.id)} className="text-red-400 hover:text-red-600 p-1">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Perhitungan Total */}
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
            <div className="w-full h-px bg-sky-200 my-2"></div>
            <div className="flex justify-between text-lg font-bold text-slate-700">
              <span>Grand Total</span>
              <span className="text-sky-500">Rp {grandTotal().toLocaleString('id-ID')}</span>
            </div>
          </div>

          {/* Tombol Bayar */}
          <button
            disabled={cart.length === 0 || name === ''}
            className="w-full h-14 mt-6 bg-linear-to-r from-sky-400 to-sky-300 hover:from-sky-500 hover:to-sky-400 disabled:from-slate-200 disabled:to-slate-300 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold text-lg rounded-full shadow-[0_8px_20px_0_rgba(56,189,248,0.4)] disabled:shadow-none transition-all cursor-pointer"
            onClick={payNow}
          >
            Proses Pembayaran
          </button>
        </div>

        {/* === KANAN: AREA PILIH MENU === */}
        <div className="flex-1 h-full bg-white/40 backdrop-blur-xl rounded-4xl shadow-[0_8px_32px_0_rgba(186,230,253,0.3)]  border border-white/60 flex flex-col p-6 overflow-hidden">

          {/* Header & Filter */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-6">

            {/* Kategori (Bisa diganti jadi map kalau datanya dinamis) */}
            <div className="flex gap-2 overflow-x-auto w-full lg:w-auto scrollbar-hide pb-2 lg:pb-5">
              {['Semua', 'Coffee', 'Tea', 'Milk Shake', 'Pastries', 'Snack', 'Heavy Meal'].map((cat, i) => (
                <button key={i} className="cursor-pointer px-5 py-2.5 whitespace-nowrap rounded-full bg-white/60 hover:bg-white text-sky-600 font-medium text-sm border border-sky-100 shadow-sm transition-all"
                  onClick={() => {
                    Categorys(cat)
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full lg:w-72">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-sky-400">
                <Search size={18} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 bg-white/60 border border-white shadow-sm rounded-full pl-12 pr-4 text-slate-700 focus:outline-none focus:ring-4 focus:ring-sky-100 focus:bg-white transition-all placeholder:text-slate-400"
                placeholder="Cari menu..."
              />
            </div>
          </div>

          {/* Grid Menu */}
          <div className="flex-1 overflow-y-auto scrollbar-hide pr-2">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 pb-10">
              {filteredMenus.map(item => (
                <div
                  key={item.id}
                  className="bg-white/50 backdrop-blur-sm border border-white p-4 rounded-[1.5rem] flex flex-col items-center justify-center hover:bg-white/80 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  onClick={() => SetIsOpen({ id: item.id, isActive: true })}
                >
                  {/* Placeholder Gambar Menu */}
                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-sky-100 rounded-full mb-4 shadow-inner group-hover:scale-105 transition-transform duration-300 flex items-center justify-center overflow-hidden">
                    {/* Jika ada image url: <img src={item.image} className="w-full h-full object-cover" /> */}
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

      {/* === MODAL ADD TO CART === */}
      <Modal isOpen={isOpen.isActive} onClose={() => SetIsOpen({ id: null, isActive: false })} title="Atur Pesanan">
        {isOpen.isActive && isOpen.id && (
          <div className="flex flex-col items-center p-2 w-full max-w-sm mx-auto">

            {/* Info Menu */}
            <div className="w-32 h-32 bg-sky-100 rounded-2xl mb-4 shadow-inner"></div>
            <h1 className="text-2xl font-bold text-slate-700 text-center mb-6">
              {menus.find(m => m.id === isOpen.id)?.name || '-'}
            </h1>

            {/* Opsi Tambahan (Gula & Es) - Menggunakan style button alih-alih checkbox murni untuk UX */}
            <div className="w-full space-y-4 mb-8">
              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <span className="font-semibold text-slate-600 text-sm">Level Gula</span>
                <div className="flex gap-2">
                  <label className="flex items-center gap-1 cursor-pointer text-sm">
                    <input type="radio" name="sugar" className="accent-sky-500" defaultChecked /> Normal
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer text-sm">
                    <input type="radio" name="sugar" className="accent-sky-500" /> Less
                  </label>
                </div>
              </div>
              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <span className="font-semibold text-slate-600 text-sm">Level Es</span>
                <div className="flex gap-2">
                  <label className="flex items-center gap-1 cursor-pointer text-sm">
                    <input type="radio" name="ice" className="accent-sky-500" defaultChecked /> Normal
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer text-sm">
                    <input type="radio" name="ice" className="accent-sky-500" /> Less
                  </label>
                </div>
              </div>
            </div>

            {/* QTY Controller */}
            <div className="flex items-center justify-between w-full mb-6 bg-white border border-sky-100 rounded-full p-2 shadow-sm">
              <button
                onClick={minQTY}
                className="w-10 h-10 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors"
              >
                <Minus size={20} />
              </button>
              <span className="text-xl font-bold text-slate-700 w-12 text-center">{qty}</span>
              <button
                onClick={addQTY}
                className="w-10 h-10 flex items-center justify-center bg-sky-100 hover:bg-sky-200 text-sky-600 rounded-full transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>

            {/* Tombol Add */}
            <button
              className="w-full h-14 bg-linear-to-r from-sky-400 to-sky-300 hover:from-sky-500 hover:to-sky-400 text-white font-bold text-lg rounded-full shadow-[0_4px_15px_0_rgba(56,189,248,0.4)] transition-all cursor-pointer"
              onClick={() => {
                const selectedMenu = menus.find(m => m.id === isOpen.id);
                addCart(selectedMenu, qty);
                setQty(1);
                SetIsOpen({ id: null, isActive: false });
              }}
            >
              Tambahkan ke Pesanan
            </button>
          </div>
        )}
      </Modal>

    </div>
  );
}

export default Menu;