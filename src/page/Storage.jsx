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

const data = [
  { name: "Coffee Beans", stock: 20, category: "Raw Material" },
  { name: "Milk", stock: 10, category: "Dairy" },
  { name: "Sugar", stock: 5, category: "Ingredients" },
];

const Storage = () => {
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"];
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format waktu agar selalu 2 digit (contoh: 09:05)
  const formatTime = (num) => num.toString().padStart(2, '0');

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-white via-sky-50 to-sky-100 flex flex-col relative overflow-hidden">

      {/* Dekorasi Background Ambient */}
      <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-sky-200/40 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-150 h-150 bg-white/60 rounded-full filter blur-[100px] opacity-80 pointer-events-none z-0"></div>

      <Navbar pageID={2}></Navbar>

      {/* Main Container - Ditambahkan lg:pl-26 agar tidak tertutup Navbar */}
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

        {/* === SUMMARY CARDS (Grid Responsif) === */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* Card 1 */}
          <div className="bg-white/60 backdrop-blur-xl rounded-4xl shadow-sm border border-white/60 p-6 flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-sky-100 rounded-2xl flex justify-center items-center shrink-0">
              <Package className="text-sky-500" size={32} />
            </div>
            <div className="flex flex-col">
              <h1 className="text-slate-500 text-sm font-medium">Total Items</h1>
              <h1 className="font-bold text-3xl text-slate-700">123</h1>
              <h1 className="text-xs text-slate-400 mt-1">All Materials</h1>
            </div>
          </div>

          {/* Card 2 (Contoh variasi data) */}
          <div className="bg-white/60 backdrop-blur-xl rounded-4xl shadow-sm border border-white/60 p-6 flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex justify-center items-center shrink-0">
              <Archive className="text-indigo-400" size={32} />
            </div>
            <div className="flex flex-col">
              <h1 className="text-slate-500 text-sm font-medium">Kategori Aktif</h1>
              <h1 className="font-bold text-3xl text-slate-700">12</h1>
              <h1 className="text-xs text-slate-400 mt-1">Gudang Utama</h1>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white/60 backdrop-blur-xl rounded-4xl shadow-sm border border-white/60 p-6 flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-amber-50 rounded-2xl flex justify-center items-center shrink-0">
              <Layers className="text-amber-500" size={32} />
            </div>
            <div className="flex flex-col">
              <h1 className="text-slate-500 text-sm font-medium">Restock Needed</h1>
              <h1 className="font-bold text-3xl text-slate-700">8</h1>
              <h1 className="text-xs text-slate-400 mt-1">Batas Minimum</h1>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white/60 backdrop-blur-xl rounded-4xl shadow-sm border border-white/60 p-6 flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex justify-center items-center shrink-0">
              <AlertCircle className="text-red-400" size={32} />
            </div>
            <div className="flex flex-col">
              <h1 className="text-slate-500 text-sm font-medium">Out of Stock</h1>
              <h1 className="font-bold text-3xl text-slate-700">2</h1>
              <h1 className="text-xs text-slate-400 mt-1">Kosong</h1>
            </div>
          </div>

        </div>

        {/* === MAIN CONTENT (Tabel & Detail Sidebar) === */}
        <div className="flex flex-col lg:flex-row w-full gap-6 mt-2">

          {/* KIRI: AREA TABEL */}
          <div className="flex-1 min-h-125 bg-white/40 backdrop-blur-xl rounded-4xl shadow-[0_8px_32px_0_rgba(186,230,253,0.3)] border border-white/60 p-6 flex flex-col">
            <h2 className="text-xl font-bold text-slate-700 mb-6">Daftar Inventaris</h2>
            {/* 
              Render komponen Tabel kamu di sini:
              <Table columns={columns} data={data} /> 
            */}
            <div className="w-full flex-1 border-2 border-dashed border-sky-200 rounded-2xl flex text-sky-400 font-medium">
              <div className="w-full overflow-x-auto rounded-2xl border border-white/80 bg-white/30 backdrop-blur-sm shadow-inner scrollbar-hide">
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
                   
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* KANAN: SIDEBAR DETAIL ITEM */}
          <div className="w-full lg:w-87.5 xl:w-100 flex flex-col gap-6 shrink-0">

            <div className="w-full bg-white/60 backdrop-blur-xl rounded-4xl shadow-[0_8px_32px_0_rgba(186,230,253,0.3)] border border-white/60 p-6">

              {/* Header Detail */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-sky-100 rounded-2xl flex justify-center items-center shrink-0">
                  <Droplet className="text-sky-500" size={28} />
                </div>
                <div className="flex flex-col flex-1">
                  <h1 className="text-lg font-bold text-slate-700 leading-tight">Susu UHT Full Cream</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">Dairy</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs font-semibold text-slate-500">Liter</span>
                  </div>
                </div>
                {/* Status Pill */}
                <div className="bg-emerald-100 text-emerald-600 px-3 py-1.5 rounded-full flex items-center gap-1 shrink-0 shadow-sm">
                  <CheckCircle2 size={16} />
                  <span className="text-sm font-bold">Aman</span>
                </div>
              </div>

              <div className="w-full h-px bg-sky-100 mb-6"></div>

              {/* Stock Information */}
              <div className="flex flex-col gap-4">
                <h2 className="font-bold text-slate-700 mb-2">Informasi Stok</h2>

                <div className="flex justify-between items-center bg-white/50 p-3 rounded-xl border border-sky-50">
                  <span className="font-medium text-slate-500 text-sm">Stok Saat Ini</span>
                  <div className="flex items-center gap-1 font-bold text-slate-700">
                    <span className="text-lg text-sky-500">10</span>
                    <span className="text-sm">Liter</span>
                  </div>
                </div>

                <div className="flex justify-between items-center bg-white/50 p-3 rounded-xl border border-sky-50">
                  <span className="font-medium text-slate-500 text-sm">Stok Minimum</span>
                  <div className="flex items-center gap-1 font-bold text-slate-700">
                    <span className="text-lg">3</span>
                    <span className="text-sm text-slate-400">Liter</span>
                  </div>
                </div>

                <div className="flex justify-between items-center bg-white/50 p-3 rounded-xl border border-sky-50">
                  <span className="font-medium text-slate-500 text-sm">Stok Maksimum</span>
                  <div className="flex items-center gap-1 font-bold text-slate-700">
                    <span className="text-lg">10</span>
                    <span className="text-sm text-slate-400">Liter</span>
                  </div>
                </div>

                <div className="w-full h-px bg-sky-50 my-2"></div>

                <div className="flex justify-between items-center px-2">
                  <span className="font-medium text-slate-500 text-sm">Tipe Item</span>
                  <span className="font-semibold text-slate-700 text-sm">Raw Materials</span>
                </div>

                <div className="flex justify-between items-center px-2">
                  <span className="font-medium text-slate-500 text-sm">Lokasi Penyimpanan</span>
                  <div className="flex items-center gap-1 font-semibold text-slate-700 text-sm">
                    <MapPin size={14} className="text-sky-400" />
                    Refrigerator 1
                  </div>
                </div>
              </div>

            </div>

            {/* Kotak Kosong Ekstra (Seperti kode aslimu h-130) */}
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