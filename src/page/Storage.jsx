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
  CheckCircle2
} from 'lucide-react';
import api from '../api/axios'
import Loading from '../components/Loading';

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

  const fetchData = async () => {
    setLoading(true)
    try {
      try {
        const res = await api.get('/storage/totalItems')
        setTotalItems(res.data)
      } catch (error) {
        console.log(error)
      }
      try {
        const res = await api.get('/storage/category')
        setCategory(res.data)
      } catch (error) {
        console.log(error)
      }
      try {
        const res = await api.get('/storage/restock')
        setResctock(res.data)
      } catch (error) {
        console.log(error)
      }
      try {
        const res = await api.get('/storage/outStock')
        setOutStock(res.data)
      } catch (error) {
        console.log(error)
      }
      try {
        const res = await api.get('/storage/getAllData')
        setAllItems(res.data)
      } catch (error) {
        console.log(error)
      }
    } catch (error) {
      console.log(error)
    } finally {
      // Lebih aman matikan loading di sini
      setLoading(false);
    }
  }

  // Effect untuk Fetch Data
  useEffect(() => {
    fetchData();
  }, []);

  // Effect untuk Jam
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Effect untuk Auto-Select item pertama setelah data berhasil di-fetch
  useEffect(() => {
    if (allItems.length > 0 && targetID === 0) {
      setTargetID(allItems[0].id);
    }
  }, [allItems, targetID]);

  const formatTime = (num) => num.toString().padStart(2, '0');

  // Cari data item yang sesuai dengan targetID
  const selectedItem = allItems.find((item) => item.id === targetID);

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-white via-sky-50 to-sky-100 flex flex-col relative overflow-hidden">

      {/* Dekorasi Background Ambient */}
      <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-sky-200/40 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-150 h-150 bg-white/60 rounded-full filter blur-[100px] opacity-80 pointer-events-none z-0"></div>

      <Navbar pageID={2}></Navbar>
      <Loading isLoading={isLoading}></Loading>

      <div className="flex flex-col w-full lg:pl-26 lg:pr-6 py-6 px-4 z-10 gap-6">

        {/* === HEADER GLASSMORPHISM === */}
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

        {/* === SUMMARY CARDS === */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/60 backdrop-blur-xl rounded-4xl shadow-sm border border-white/60 p-6 flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-sky-100 rounded-2xl flex justify-center items-center shrink-0">
              <Package className="text-sky-500" size={32} />
            </div>
            <div className="flex flex-col">
              <h1 className="text-slate-500 text-sm font-medium">Total Items</h1>
              <h1 className="font-bold text-3xl text-slate-700">{totalItems}</h1>
              <h1 className="text-xs text-slate-400 mt-1">All Materials</h1>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-xl rounded-4xl shadow-sm border border-white/60 p-6 flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex justify-center items-center shrink-0">
              <Archive className="text-indigo-400" size={32} />
            </div>
            <div className="flex flex-col">
              <h1 className="text-slate-500 text-sm font-medium">Active Categorys</h1>
              <h1 className="font-bold text-3xl text-slate-700">{category}</h1>
              <h1 className="text-xs text-slate-400 mt-1">Gudang Utama</h1>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-xl rounded-4xl shadow-sm border border-white/60 p-6 flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-amber-50 rounded-2xl flex justify-center items-center shrink-0">
              <Layers className="text-amber-500" size={32} />
            </div>
            <div className="flex flex-col">
              <h1 className="text-slate-500 text-sm font-medium">Restock Needed</h1>
              <h1 className="font-bold text-3xl text-slate-700">{restock}</h1>
              <h1 className="text-xs text-slate-400 mt-1">Bare Minimum</h1>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-xl rounded-4xl shadow-sm border border-white/60 p-6 flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex justify-center items-center shrink-0">
              <AlertCircle className="text-red-400" size={32} />
            </div>
            <div className="flex flex-col">
              <h1 className="text-slate-500 text-sm font-medium">Out of Stock</h1>
              <h1 className="font-bold text-3xl text-slate-700">{outStock}</h1>
              <h1 className="text-xs text-slate-400 mt-1">Empty</h1>
            </div>
          </div>
        </div>

        {/* === MAIN CONTENT === */}
        <div className="flex flex-col lg:flex-row w-full gap-6 mt-2">

          {/* KIRI: AREA TABEL */}
          <div className="flex-1 min-h-125 bg-white/40 backdrop-blur-xl rounded-4xl shadow-[0_8px_32px_0_rgba(186,230,253,0.3)] border border-white/60 p-6 flex flex-col">
            <h2 className="text-xl font-bold text-slate-700 mb-6">Daftar Inventaris</h2>
            <div className="w-full flex-1 border-2 border-dashed border-sky-200 rounded-2xl flex text-sky-400 font-medium">
              <div className="w-full overflow-y-auto rounded-2xl max-h-175 border border-white/80 bg-white/30 backdrop-blur-sm shadow-inner scrollbar-hide">
                <table className="w-full text-left border-collapse min-w-200">
                  <thead>
                    <tr className="bg-white/50 text-slate-500 text-sm border-b border-white/80">
                      <th className="px-5 py-4 font-semibold whitespace-nowrap rounded-tl-2xl">Item Name</th>
                      <th className="px-5 py-4 font-semibold whitespace-nowrap">QTY</th>
                      <th className="px-5 py-4 font-semibold whitespace-nowrap">Unit</th>
                      <th className="px-5 py-4 font-semibold whitespace-nowrap text-center">Status</th>
                      <th className="px-5 py-4 font-semibold whitespace-nowrap rounded-tr-2xl">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allItems.length > 0 ? (
                      allItems.map((item, index) => (
                        <tr 
                          key={item.id || index} 
                          // Opsional: Beri highlight background jika baris ini sedang dipilih
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
                            <button className="text-sky-500 hover:text-sky-600 text-sm font-bold transition-colors bg-sky-50 hover:bg-sky-100 px-3 py-1.5 rounded-lg"
                              onClick={() => {
                                setTargetID(item.id)
                              }}
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

          {/* KANAN: SIDEBAR DETAIL ITEM */}
          <div className="w-full lg:w-87.5 xl:w-100 flex flex-col gap-6 shrink-0">
            {selectedItem ? (
              <div className="w-full bg-white/60 backdrop-blur-xl rounded-4xl shadow-[0_8px_32px_0_rgba(186,230,253,0.3)] border border-white/60 p-6 transition-all duration-300">
                {/* Header Detail */}
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
                  
                  {/* Status Pill Dinamis */}
                  {selectedItem.qty <= 0 ? (
                    <div className="bg-red-100 text-red-600 px-3 py-1.5 rounded-full flex items-center gap-1 shrink-0 shadow-sm">
                      <AlertCircle size={16} />
                      <span className="text-sm font-bold">Kosong</span>
                    </div>
                  ) : selectedItem.qty <= selectedItem.threshold ? (
                    <div className="bg-amber-100 text-amber-600 px-3 py-1.5 rounded-full flex items-center gap-1 shrink-0 shadow-sm">
                      <AlertCircle size={16} />
                      <span className="text-sm font-bold">Restock</span>
                    </div>
                  ) : (
                    <div className="bg-emerald-100 text-emerald-600 px-3 py-1.5 rounded-full flex items-center gap-1 shrink-0 shadow-sm">
                      <CheckCircle2 size={16} />
                      <span className="text-sm font-bold">Aman</span>
                    </div>
                  )}
                </div>

                <div className="w-full h-px bg-sky-100 mb-6"></div>

                {/* Stock Information */}
                <div className="flex flex-col gap-4">
                  <h2 className="font-bold text-slate-700 mb-2">Stock Information</h2>

                  <div className="flex justify-between items-center bg-white/50 p-3 rounded-xl border border-sky-50">
                    <span className="font-medium text-slate-500 text-sm">Stok Saat Ini</span>
                    <div className="flex items-center gap-1 font-bold text-slate-700">
                      <span className={`text-lg ${selectedItem.qty <= selectedItem.threshold ? 'text-amber-500' : 'text-sky-500'}`}>
                        {selectedItem.qty}
                      </span>
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

                  <div className="w-full h-px bg-sky-50 my-2"></div>

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
              /* State Kosong jika tidak ada item terpilih (Misal API masih proses) */
              <div className="w-full bg-white/60 backdrop-blur-xl rounded-4xl shadow-sm border border-white/60 p-6 min-h-[400px] flex items-center justify-center">
                <span className="text-slate-400 font-medium text-sm">Pilih item untuk melihat detail</span>
              </div>
            )}

            {/* Kotak Kosong Ekstra */}
            <div className="w-full min-h-62.5 flex-1 bg-white/40 backdrop-blur-xl rounded-4xl shadow-[0_8px_32px_0_rgba(186,230,253,0.3)] border border-white/60 p-6 flex flex-col items-center justify-center">
              <span className="text-sky-300 font-medium text-sm text-center">Area Detail Tambahan<br />(Histori, Riwayat Masuk/Keluar)</span>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Storage;