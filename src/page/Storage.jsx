import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import {
  Package,
  Archive,
  Layers,
  AlertCircle,
  Clock,
  Calendar,
  Droplet,
  MapPin,
  CheckCircle2,
  Plus,
  Minus,
  X,
  PackagePlus,
  PackageMinus,
  Hash,
  ChevronDown,
  DollarSign,
  CalendarDays,
  TrendingUp,
  TrendingDown,
  History,
} from 'lucide-react';
import api from '../api/axios';
import Loading from '../components/Loading';

// =============================================
// STOCK MODAL
// =============================================
const StockModal = ({ isOpen, onClose, type, items, onSubmit }) => {
  const [selectedId, setSelectedId] = useState('');
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isAdd = type === 'add';
  const selectedItem = items.find(i => i.id === Number(selectedId));

  useEffect(() => {
    if (isOpen) {
      setSelectedId('');
      setQty(1);
      setPrice('');
      setExpirationDate('');
      setDropdownOpen(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const maxQty = !isAdd && selectedItem ? Number(selectedItem.qty) : 99999;

  const handleSubmit = () => {
    if (!selectedId || qty <= 0) return;
    if (!isAdd && selectedItem && qty > Number(selectedItem.qty)) return;

    onSubmit({
      itemId: selectedId,
      qty,
      price: isAdd ? price : undefined,
      expiration_date: isAdd ? expirationDate : undefined,
      type,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-md bg-white/70 backdrop-blur-2xl border border-white/80 rounded-4xl shadow-[0_24px_64px_0_rgba(14,165,233,0.18)] overflow-hidden"
        style={{ animation: 'modalIn 0.28s cubic-bezier(0.34,1.56,0.64,1) both' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`relative px-6 pt-6 pb-10 ${isAdd
          ? 'bg-gradient-to-br from-sky-400/90 to-sky-500/90'
          : 'bg-gradient-to-br from-amber-400/90 to-orange-400/90'
        }`}>
          <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-white/10 rounded-full pointer-events-none" />
          <div className="absolute bottom-[-14px] left-[25%] w-24 h-24 bg-white/10 rounded-full pointer-events-none" />

          <div className="flex justify-between items-start relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
                {isAdd
                  ? <PackagePlus size={22} className="text-white" />
                  : <PackageMinus size={22} className="text-white" />
                }
              </div>
              <div>
                <p className={`text-xs font-semibold tracking-widest uppercase mb-0.5 ${isAdd ? 'text-sky-100' : 'text-amber-100'}`}>
                  {isAdd ? 'Tambah Stok' : 'Kurangi Stok'}
                </p>
                <h2 className="text-white text-xl font-extrabold">
                  {isAdd ? 'Restock Item' : 'Pemakaian Item'}
                </h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 bg-white/20 hover:bg-white/30 text-white rounded-2xl flex items-center justify-center transition-colors cursor-pointer shrink-0"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5 flex flex-col gap-4 max-h-[70vh] overflow-y-auto scrollbar-hide">

          {/* Dropdown Pilih Item */}
          <div className="flex flex-col gap-2">
            <label className="text-slate-600 font-bold text-sm flex items-center gap-2">
              <Hash size={14} className="text-sky-400" />
              Pilih Item
            </label>
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(o => !o)}
                className="w-full bg-white/60 border border-white/80 rounded-2xl px-4 py-3 flex items-center justify-between text-sm cursor-pointer hover:bg-white/80 transition-colors"
              >
                <span className={selectedItem ? 'text-slate-700 font-semibold' : 'text-slate-400'}>
                  {selectedItem ? selectedItem.item_name : 'Pilih item...'}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-slate-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-xl border border-white/80 rounded-2xl shadow-[0_8px_32px_0_rgba(14,165,233,0.15)] z-20 max-h-52 overflow-y-auto scrollbar-hide">
                  {items.map(item => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedId(String(item.id));
                        setDropdownOpen(false);
                        setQty(1);
                      }}
                      className={`w-full px-4 py-3 flex items-center justify-between text-left hover:bg-sky-50 transition-colors first:rounded-t-2xl last:rounded-b-2xl cursor-pointer ${selectedId === String(item.id) ? 'bg-sky-50' : ''}`}
                    >
                      <div className="flex flex-col">
                        <span className="text-slate-700 font-semibold text-sm">{item.item_name}</span>
                        <span className="text-slate-400 text-xs">{item.category} • {item.unit}</span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <span className={`text-sm font-bold ${item.qty <= item.threshold ? 'text-amber-500' : 'text-sky-500'}`}>
                          {item.qty}
                        </span>
                        <span className="text-slate-400 text-xs">{item.unit}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Stok saat ini */}
          {selectedItem && (
            <div className={`flex items-center justify-between rounded-2xl px-4 py-3 border ${isAdd
              ? 'bg-sky-50/60 border-sky-100'
              : 'bg-amber-50/60 border-amber-100'
            }`}>
              <span className="text-slate-500 text-sm font-medium">Stok Saat Ini</span>
              <span className={`font-extrabold text-lg ${isAdd ? 'text-sky-500' : 'text-amber-500'}`}>
                {selectedItem.qty} <span className="text-sm font-semibold text-slate-400">{selectedItem.unit}</span>
              </span>
            </div>
          )}

          {/* QTY Input */}
          <div className="flex flex-col gap-2">
            <label className="text-slate-600 font-bold text-sm">
              {isAdd ? 'Jumlah Ditambahkan' : 'Jumlah Dikurangi'}
            </label>
            <div className="flex items-center justify-between bg-white/60 border border-white/80 rounded-2xl px-4 py-3">
              <button
                onClick={() => setQty(q => Math.max(1, q - 1))}
                className="w-9 h-9 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors cursor-pointer"
              >
                <Minus size={16} />
              </button>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  max={maxQty}
                  value={qty}
                  onChange={e => {
                    const val = Math.min(maxQty, Math.max(1, Number(e.target.value)));
                    setQty(val);
                  }}
                  className="w-16 text-center text-xl font-extrabold text-slate-700 bg-transparent outline-none border-0"
                />
                <span className="text-slate-400 text-sm">{selectedItem?.unit || 'unit'}</span>
              </div>
              <button
                onClick={() => setQty(q => Math.min(maxQty, q + 1))}
                className={`w-9 h-9 flex items-center justify-center rounded-xl transition-colors cursor-pointer ${isAdd
                  ? 'bg-sky-100 hover:bg-sky-200 text-sky-600'
                  : 'bg-amber-100 hover:bg-amber-200 text-amber-600'
                }`}
              >
                <Plus size={16} />
              </button>
            </div>
            {!isAdd && selectedItem && qty > Number(selectedItem.qty) && (
              <p className="text-red-500 text-xs font-medium px-1">
                ⚠ Melebihi stok tersedia ({selectedItem.qty} {selectedItem.unit})
              </p>
            )}
          </div>

          {/* Preview stok setelah */}
          {selectedItem && (
            <div className="flex items-center justify-between bg-white/60 border border-white/80 rounded-2xl px-4 py-3">
              <span className="text-slate-500 text-sm font-medium">Stok Setelah</span>
              <span className="font-extrabold text-lg text-slate-700">
                {isAdd
                  ? Number(selectedItem.qty) + qty
                  : Math.max(0, Number(selectedItem.qty) - qty)
                }
                <span className="text-sm font-semibold text-slate-400 ml-1">{selectedItem.unit}</span>
              </span>
            </div>
          )}

          {/* Field tambahan hanya untuk Add Stock */}
          {isAdd && (
            <>
              {/* Harga */}
              <div className="flex flex-col gap-2">
                <label className="text-slate-600 font-bold text-sm flex items-center gap-2">
                  <DollarSign size={14} className="text-sky-400" />
                  Harga per Unit <span className="text-slate-400 font-normal">(opsional)</span>
                </label>
                <input
                  type="number"
                  min={0}
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  placeholder="Misal: 15000"
                  className="w-full bg-white/60 border border-white/80 rounded-2xl px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-sky-200 transition-all"
                />
              </div>

              {/* Tanggal Kadaluarsa */}
              <div className="flex flex-col gap-2">
                <label className="text-slate-600 font-bold text-sm flex items-center gap-2">
                  <CalendarDays size={14} className="text-sky-400" />
                  Tanggal Kadaluarsa <span className="text-slate-400 font-normal">(opsional)</span>
                </label>
                <input
                  type="date"
                  value={expirationDate}
                  onChange={e => setExpirationDate(e.target.value)}
                  className="w-full bg-white/60 border border-white/80 rounded-2xl px-4 py-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-sky-200 transition-all"
                />
              </div>
            </>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!selectedId || qty <= 0 || (!isAdd && selectedItem && qty > Number(selectedItem.qty))}
            className={`w-full py-4 font-bold text-base rounded-2xl transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${isAdd
              ? 'bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white shadow-[0_4px_16px_0_rgba(14,165,233,0.35)]'
              : 'bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white shadow-[0_4px_16px_0_rgba(251,191,36,0.35)]'
            }`}
          >
            {isAdd ? '+ Tambahkan Stok' : '- Kurangi Stok'}
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
const Storage = () => {
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"];
  const [time, setTime] = useState(new Date());
  const [isLoading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [category, setCategory] = useState(0);
  const [restock, setResctock] = useState(0);
  const [outStock, setOutStock] = useState(0);
  const [allItems, setAllItems] = useState([]);
  const [targetID, setTargetID] = useState(0);
  const [modalType, setModalType] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  const fetchHistory = async (id) => {
    if (!id) return;
    setHistoryLoading(true);
    try {
      const res = await api.get(`/inventory/${id}/history`);
      setHistory(res.data);
    } catch (e) {
      console.log(e);
      setHistory([]);
    } finally {
      setHistoryLoading(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      try { const res = await api.get('/storage/totalItems'); setTotalItems(res.data); } catch (e) { console.log(e); }
      try { const res = await api.get('/storage/category'); setCategory(res.data); } catch (e) { console.log(e); }
      try { const res = await api.get('/storage/restock'); setResctock(res.data); } catch (e) { console.log(e); }
      try { const res = await api.get('/storage/outStock'); setOutStock(res.data); } catch (e) { console.log(e); }
      try { const res = await api.get('/storage/getAllData'); setAllItems(res.data); } catch (e) { console.log(e); }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    if (allItems.length > 0 && targetID === 0) setTargetID(allItems[0].id);
  }, [allItems, targetID]);

  useEffect(() => {
    if (targetID) fetchHistory(targetID);
  }, [targetID]);

  const formatTime = (num) => num.toString().padStart(2, '0');
  const selectedItem = allItems.find(item => item.id === targetID);

  // Disesuaikan dengan controller pertama:
  // POST /inventory/{id}/add-stock  → body: { qty, price, expiration_date }
  // POST /inventory/{id}/use-stock  → body: { qty }
  const handleStockSubmit = async ({ itemId, qty, price, expiration_date, type }) => {
    try {
      setLoading(true);
      if (type === 'add') {
        await api.post(`/inventory/${itemId}/add-stock`, {
          qty,
          price: price !== '' ? price : undefined,
          expiration_date: expiration_date !== '' ? expiration_date : undefined,
        });
      } else {
        await api.post(`/inventory/${itemId}/use-stock`, { qty });
      }
      await fetchData();
      if (targetID) await fetchHistory(targetID);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-white via-sky-50 to-sky-100 flex flex-col relative overflow-hidden">

      <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-sky-200/40 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-150 h-150 bg-white/60 rounded-full filter blur-[100px] opacity-80 pointer-events-none z-0" />

      <Navbar pageID={2} />
      <Loading isLoading={isLoading} />

      <div className="flex flex-col w-full lg:pl-26 lg:pr-6 py-6 px-4 z-10 gap-6">

        {/* HEADER */}
        <div className="w-full bg-white/40 backdrop-blur-xl border border-white/60 shadow-sm rounded-4xl p-6 lg:px-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h2 className="text-sky-500 font-bold tracking-widest uppercase text-sm mb-1">Gudang & Inventaris</h2>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-700 tracking-tight">Logistics Management</h1>
          </div>
          <div className="flex flex-col items-start lg:items-end gap-1">
            <div className="flex items-center gap-2 text-3xl font-bold text-slate-700 font-mono">
              <Clock className="text-sky-400 mr-1" size={28} />
              <span>{formatTime(time.getHours())}:{formatTime(time.getMinutes())}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 font-medium">
              <Calendar className="text-sky-400" size={16} />
              <span>{days[time.getDay()]}, {time.getDate()} {months[time.getMonth()]} {time.getFullYear()}</span>
            </div>
          </div>
        </div>

        {/* SUMMARY CARDS */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: <Package className="text-sky-500" size={32} />, bg: 'bg-sky-100', label: 'Total Items', value: totalItems, sub: 'All Materials' },
            { icon: <Archive className="text-indigo-400" size={32} />, bg: 'bg-indigo-50', label: 'Active Categorys', value: category, sub: 'Gudang Utama' },
            { icon: <Layers className="text-amber-500" size={32} />, bg: 'bg-amber-50', label: 'Restock Needed', value: restock, sub: 'Bare Minimum' },
            { icon: <AlertCircle className="text-red-400" size={32} />, bg: 'bg-red-50', label: 'Out of Stock', value: outStock, sub: 'Empty' },
          ].map((card, i) => (
            <div key={i} className="bg-white/60 backdrop-blur-xl rounded-4xl shadow-sm border border-white/60 p-6 flex items-center gap-5 hover:shadow-md transition-shadow">
              <div className={`w-16 h-16 ${card.bg} rounded-2xl flex justify-center items-center shrink-0`}>{card.icon}</div>
              <div className="flex flex-col">
                <h1 className="text-slate-500 text-sm font-medium">{card.label}</h1>
                <h1 className="font-bold text-3xl text-slate-700">{card.value}</h1>
                <h1 className="text-xs text-slate-400 mt-1">{card.sub}</h1>
              </div>
            </div>
          ))}
        </div>

        {/* MAIN CONTENT */}
        <div className="flex flex-col lg:flex-row w-full gap-6 mt-2">

          {/* KIRI: TABEL */}
          <div className="flex-1 min-h-125 bg-white/40 backdrop-blur-xl rounded-4xl shadow-[0_8px_32px_0_rgba(186,230,253,0.3)] border border-white/60 p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-700">Daftar Inventaris</h2>
              <div className="flex gap-3">
                <button
                  onClick={() => setModalType('add')}
                  className="w-10 h-10 bg-sky-400 hover:bg-sky-500 transition-colors rounded-xl cursor-pointer text-white flex justify-center items-center shadow-[0_4px_12px_0_rgba(14,165,233,0.3)]"
                  title="Tambah Stok"
                >
                  <Plus size={20} />
                </button>
                <button
                  onClick={() => setModalType('subtract')}
                  className="w-10 h-10 bg-amber-400 hover:bg-amber-500 transition-colors rounded-xl cursor-pointer text-white flex justify-center items-center shadow-[0_4px_12px_0_rgba(251,191,36,0.3)]"
                  title="Kurangi Stok"
                >
                  <Minus size={20} />
                </button>
              </div>
            </div>

            <div className="w-full flex-1 rounded-2xl overflow-hidden">
              <div className="w-full overflow-y-auto rounded-2xl max-h-175 border border-white/80 bg-white/30 backdrop-blur-sm shadow-inner scrollbar-hide">
                <table className="w-full text-left border-collapse min-w-200">
                  <thead>
                    <tr className="bg-white/50 text-slate-500 text-sm border-b border-white/80">
                      <th className="px-5 py-4 font-semibold whitespace-nowrap">Item Name</th>
                      <th className="px-5 py-4 font-semibold whitespace-nowrap">QTY</th>
                      <th className="px-5 py-4 font-semibold whitespace-nowrap">Unit</th>
                      <th className="px-5 py-4 font-semibold whitespace-nowrap text-center">Status</th>
                      <th className="px-5 py-4 font-semibold whitespace-nowrap">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allItems.length > 0 ? (
                      allItems.map((item, index) => (
                        <tr
                          key={item.id || index}
                          className={`border-b border-sky-100/50 hover:bg-white/60 transition-colors ${item.id === targetID ? 'bg-sky-50/50' : ''}`}
                        >
                          <td className="px-5 py-4 font-medium text-slate-700">{item.item_name}</td>
                          <td className="px-5 py-4 text-slate-700 font-bold">{item.qty}</td>
                          <td className="px-5 py-4 text-slate-500 text-sm">{item.unit}</td>
                          <td className="px-5 py-4 text-center">
                            {item.qty <= 0 ? (
                              <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-600 shadow-sm">Kosong</span>
                            ) : item.qty <= item.threshold ? (
                              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-600 shadow-sm">Restock</span>
                            ) : (
                              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-600 shadow-sm">Aman</span>
                            )}
                          </td>
                          <td className="px-5 py-4">
                            <button
                              onClick={() => setTargetID(item.id)}
                              className="text-sky-500 hover:text-sky-600 text-sm font-bold transition-colors bg-sky-50 hover:bg-sky-100 px-3 py-1.5 rounded-lg"
                            >
                              Detail
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-5 py-8 text-center text-slate-400 font-medium">
                          {isLoading ? 'Memuat data...' : 'Belum ada data inventaris.'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* KANAN: DETAIL */}
          <div className="w-full lg:w-87.5 xl:w-100 flex flex-col gap-6 shrink-0">
            {selectedItem ? (
              <div className="w-full bg-white/60 backdrop-blur-xl rounded-4xl shadow-[0_8px_32px_0_rgba(186,230,253,0.3)] border border-white/60 p-6 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-sky-100 rounded-2xl flex justify-center items-center shrink-0">
                    <Droplet className="text-sky-500" size={28} />
                  </div>
                  <div className="flex flex-col flex-1">
                    <h1 className="text-lg font-bold text-slate-700 leading-tight">{selectedItem.item_name}</h1>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">{selectedItem.category}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs font-semibold text-slate-500">{selectedItem.unit}</span>
                    </div>
                  </div>
                  {selectedItem.qty <= 0 ? (
                    <div className="bg-red-100 text-red-600 px-3 py-1.5 rounded-full flex items-center gap-1 shrink-0 shadow-sm">
                      <AlertCircle size={16} /><span className="text-sm font-bold">Kosong</span>
                    </div>
                  ) : selectedItem.qty <= selectedItem.threshold ? (
                    <div className="bg-amber-100 text-amber-600 px-3 py-1.5 rounded-full flex items-center gap-1 shrink-0 shadow-sm">
                      <AlertCircle size={16} /><span className="text-sm font-bold">Restock</span>
                    </div>
                  ) : (
                    <div className="bg-emerald-100 text-emerald-600 px-3 py-1.5 rounded-full flex items-center gap-1 shrink-0 shadow-sm">
                      <CheckCircle2 size={16} /><span className="text-sm font-bold">Aman</span>
                    </div>
                  )}
                </div>

                <div className="w-full h-px bg-sky-100 mb-6" />

                <div className="flex flex-col gap-4">
                  <h2 className="font-bold text-slate-700 mb-2">Informasi Stok</h2>
                  <div className="flex justify-between items-center bg-white/50 p-3 rounded-xl border border-sky-50">
                    <span className="font-medium text-slate-500 text-sm">Stok Saat Ini</span>
                    <div className="flex items-center gap-1 font-bold text-slate-700">
                      <span className={`text-lg ${selectedItem.qty <= selectedItem.threshold ? 'text-amber-500' : 'text-sky-500'}`}>{selectedItem.qty}</span>
                      <span className="text-sm">{selectedItem.unit}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center bg-white/50 p-3 rounded-xl border border-sky-50">
                    <span className="font-medium text-slate-500 text-sm">Stok Minimum</span>
                    <div className="flex items-center gap-1 font-bold text-slate-700">
                      <span className="text-lg">{selectedItem.threshold}</span>
                      <span className="text-sm text-slate-400">{selectedItem.unit}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center bg-white/50 p-3 rounded-xl border border-sky-50">
                    <span className="font-medium text-slate-500 text-sm">Stok Maksimum</span>
                    <div className="flex items-center gap-1 font-bold text-slate-700">
                      <span className="text-lg">{selectedItem.max_qty || '-'}</span>
                      <span className="text-sm text-slate-400">{selectedItem.unit}</span>
                    </div>
                  </div>
                  <div className="w-full h-px bg-sky-50 my-2" />
                  <div className="flex justify-between items-center px-2">
                    <span className="font-medium text-slate-500 text-sm">Tipe Item</span>
                    <span className="font-semibold text-slate-700 text-sm">{selectedItem.type || '-'}</span>
                  </div>
                  <div className="flex justify-between items-center px-2">
                    <span className="font-medium text-slate-500 text-sm">Lokasi Penyimpanan</span>
                    <div className="flex items-center gap-1 font-semibold text-slate-700 text-sm">
                      <MapPin size={14} className="text-sky-400" />
                      {selectedItem.storage_location || 'Belum Diatur'}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full bg-white/60 backdrop-blur-xl rounded-4xl shadow-sm border border-white/60 p-6 min-h-[400px] flex items-center justify-center">
                <span className="text-slate-400 font-medium text-sm">Pilih item untuk melihat detail</span>
              </div>
            )}

            <div className="w-full flex-1 bg-white/40 backdrop-blur-xl rounded-4xl shadow-[0_8px_32px_0_rgba(186,230,253,0.3)] border border-white/60 p-6 flex flex-col gap-4">
              {/* Header */}
              <div className="flex items-center gap-2">
                <History size={18} className="text-sky-400" />
                <h2 className="text-base font-bold text-slate-700">Riwayat Stok</h2>
                {selectedItem && (
                  <span className="ml-auto text-xs text-slate-400 font-medium">{selectedItem.item_name}</span>
                )}
              </div>

              {/* List */}
              <div className="flex flex-col gap-2 overflow-y-auto max-h-72 scrollbar-hide">
                {historyLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <span className="text-slate-400 text-sm">Memuat riwayat...</span>
                  </div>
                ) : !targetID ? (
                  <div className="flex items-center justify-center py-8">
                    <span className="text-slate-400 text-sm">Pilih item untuk melihat riwayat</span>
                  </div>
                ) : history.length === 0 ? (
                  <div className="flex items-center justify-center py-8">
                    <span className="text-slate-400 text-sm">Belum ada riwayat stok</span>
                  </div>
                ) : (
                  history.map((h, i) => {
                    const isIn = h.type === 'in';
                    const date = new Date(h.created_at);
                    const dateStr = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                    return (
                      <div key={i} className="flex items-center justify-between py-2.5 border-b border-sky-100/60 last:border-0">
                        {/* Nama item */}
                        <span className="text-sm font-semibold text-slate-700 truncate flex-1">{selectedItem?.item_name}</span>

                        {/* QTY */}
                        <span className={`text-sm font-bold mx-4 shrink-0 ${isIn ? 'text-sky-500' : 'text-amber-500'}`}>
                          {isIn ? '+' : '-'}{h.qty}
                        </span>

                        {/* Tanggal */}
                        <span className="text-xs text-slate-400 shrink-0">{dateStr}</span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* MODALS */}
      <StockModal
        isOpen={modalType === 'add'}
        onClose={() => setModalType(null)}
        type="add"
        items={allItems}
        onSubmit={handleStockSubmit}
      />
      <StockModal
        isOpen={modalType === 'subtract'}
        onClose={() => setModalType(null)}
        type="subtract"
        items={allItems}
        onSubmit={handleStockSubmit}
      />

    </div>
  );
};

export default Storage;