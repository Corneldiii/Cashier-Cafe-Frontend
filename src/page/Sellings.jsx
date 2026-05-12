import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import {
  Banknote,
  ShoppingCart,
  TrendingUp,
  Clock,
  Calendar,
  Award,
  TrendingDown,
  Search
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import api from '../api/axios';
import Loading from '../components/Loading'

// Data Dummy untuk Grafik
const data = [
  { time: "09:00", value: 20 },
  { time: "10:00", value: 35 },
  { time: "11:00", value: 60 },
  { time: "12:00", value: 120 },
  { time: "13:00", value: 90 },
  { time: "14:00", value: 110 },
  { time: "15:00", value: 130 },
  { time: "16:00", value: 115 },
  { time: "17:00", value: 125 },
  { time: "18:00", value: 135 },
  { time: "19:00", value: 95 },
  { time: "20:00", value: 85 },
  { time: "21:00", value: 65 },
  { time: "22:00", value: 75 },
  { time: "23:00", value: 15 },
  { time: "24:00", value: 5 },
];

// Data Dummy untuk Tabel
const recentTransactions = [
  { id: 1, orderCode: "ORD11270526", cashierName: "Aldi", totalPrice: 125000, paymentMethod: "QRIS", status: "Completed", createdAt: "10:30 AM" },
  { id: 2, orderCode: "ORD11280526", cashierName: "Aldi", totalPrice: 45000, paymentMethod: "Cash", status: "Completed", createdAt: "10:45 AM" },
  { id: 3, orderCode: "ORD11290526", cashierName: "Sarah", totalPrice: 210000, paymentMethod: "Debit", status: "Pending", createdAt: "11:05 AM" },
  { id: 4, orderCode: "ORD11300526", cashierName: "Aldi", totalPrice: 85000, paymentMethod: "QRIS", status: "Completed", createdAt: "11:20 AM" },
  { id: 5, orderCode: "ORD11310526", cashierName: "Sarah", totalPrice: 32000, paymentMethod: "Cash", status: "Cancelled", createdAt: "11:35 AM" },
];

const Sellings = () => {
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"];
  const [time, setTime] = useState(new Date());
  const [traffic, setTraffic] = useState([]);
  const [fav, setFav] = useState([]);
  const [income, setIncome] = useState(0)
  const [orders, setOrders] = useState(0)
  const [avgTrans, setAvgTrans] = useState(0)

  useEffect(() => {

    const fetchData = async () => {
      try {
        try {
          const res = await api.get('/sellings/incomeDay');
          setIncome(res.data)
        } catch (error) {
          console.log(error)
        }

        try {
          const res = await api.get('/sellings/totalOrder')
          setOrders(res.data)
        } catch (error) {
          console.log(error)
        }

        try {
          const res = await api.get('/sellings/avgTrans');
          setAvgTrans(res.data)
        } catch (error) {
          console.log(res.data)
        }

        try {
          const res = await api.get('/sellings/trafficOrder');
          setTraffic(res.data)
          console.log(res.data)
        } catch (error) {
          console.log(error)
        }

        try {
          const res = await api.get('/sellings/favMenu')
          setFav(res.data)
        } catch (error) {
          console.log(error)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(number);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (num) => num.toString().padStart(2, '0');

  // Fungsi pembantu untuk render warna badge status
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-xs font-bold">Selesai</span>;
      case 'Pending':
        return <span className="px-3 py-1 bg-amber-100 text-amber-600 rounded-full text-xs font-bold">Tertunda</span>;
      case 'Cancelled':
        return <span className="px-3 py-1 bg-red-100 text-red-500 rounded-full text-xs font-bold">Dibatalkan</span>;
      default:
        return <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-xs font-bold">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-sky-50 to-sky-100 flex flex-col relative overflow-hidden">

      {/* Dekorasi Background Ambient */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-sky-200/40 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-white/60 rounded-full filter blur-[100px] opacity-80 pointer-events-none z-0"></div>

      <Navbar pageID={3}></Navbar>

      {/* Main Container */}
      <div className="flex flex-col w-full lg:pl-[6.5rem] lg:pr-6 py-6 px-4 z-10 gap-6 pb-20">

        {/* === HEADER GLASSMORPHISM === */}
        <div className="w-full bg-white/40 backdrop-blur-xl border border-white/60 shadow-sm rounded-4xl p-6 lg:px-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h2 className="text-sky-500 font-bold tracking-widest uppercase text-sm mb-1">Rekapitulasi Penjualan</h2>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-700 tracking-tight">Daily Sales Report</h1>
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
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          <div className="bg-white/60 backdrop-blur-xl rounded-4xl shadow-[0_4px_20px_0_rgba(186,230,253,0.3)] border border-white/60 p-6 flex flex-col gap-4 transition-transform hover:-translate-y-1 duration-300">
            <div className="flex justify-between items-center">
              <div className="w-14 h-14 bg-sky-100 rounded-2xl flex justify-center items-center shadow-inner">
                <Banknote className="text-sky-500" size={28} />
              </div>
              <div className="flex items-center gap-1 bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-sm font-bold">
                <TrendingUp size={16} /> +12%
              </div>
            </div>
            <div>
              <h1 className="text-slate-500 font-medium text-sm">Total Income Today</h1>
              <h1 className="text-3xl xl:text-4xl font-bold text-slate-700 mt-1">{formatRupiah(income)}</h1>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-xl rounded-4xl shadow-[0_4px_20px_0_rgba(186,230,253,0.3)] border border-white/60 p-6 flex flex-col gap-4 transition-transform hover:-translate-y-1 duration-300">
            <div className="flex justify-between items-center">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex justify-center items-center shadow-inner">
                <ShoppingCart className="text-indigo-400" size={28} />
              </div>
              <div className="flex items-center gap-1 bg-red-100 text-red-500 px-3 py-1 rounded-full text-sm font-bold">
                <TrendingDown size={16} /> -2%
              </div>
            </div>
            <div>
              <h1 className="text-slate-500 font-medium text-sm">Total Orders Today</h1>
              <h1 className="text-3xl xl:text-4xl font-bold text-slate-700 mt-1">{orders}</h1>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-xl rounded-4xl shadow-[0_4px_20px_0_rgba(186,230,253,0.3)] border border-white/60 p-6 flex flex-col gap-4 transition-transform hover:-translate-y-1 duration-300">
            <div className="flex justify-between items-center">
              <div className="w-14 h-14 bg-amber-50 rounded-2xl flex justify-center items-center shadow-inner">
                <TrendingUp className="text-amber-500" size={28} />
              </div>
              <div className="flex items-center gap-1 bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-sm font-bold">
                <TrendingUp size={16} /> +6%
              </div>
            </div>
            <div>
              <h1 className="text-slate-500 font-medium text-sm">Average Transaction</h1>
              <h1 className="text-3xl xl:text-4xl font-bold text-slate-700 mt-1">{formatRupiah(avgTrans)}</h1>
            </div>
          </div>
        </div>

        {/* === MAIN CONTENT === */}
        <div className="flex flex-col xl:flex-row w-full gap-6">

          {/* KIRI: GRAFIK & TABEL */}
          <div className="flex-1 flex flex-col gap-6 w-full max-w-full overflow-hidden">

            {/* Area Chart */}
            <div className="w-full bg-white/40 backdrop-blur-xl rounded-4xl shadow-[0_8px_32px_0_rgba(186,230,253,0.3)] border border-white/60 p-6">
              <h2 className="text-xl font-bold text-slate-700 mb-6">Hourly Sales Trend Today</h2>
              <div className="w-full h-75 sm:h-75">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={traffic} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.5} />
                        <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="hour" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} dy={10} />
                    <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                      labelStyle={{ color: '#475569', fontWeight: 'bold', marginBottom: '4px' }}
                    />
                    <Area type="monotone" dataKey="total" stroke="#38bdf8" strokeWidth={3} fill="url(#colorBlue)" activeDot={{ r: 6, strokeWidth: 0, fill: '#0284c7' }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* === TABLE AREA === */}
            <div className="w-full  bg-white/40 backdrop-blur-xl rounded-4xl shadow-[0_8px_32px_0_rgba(186,230,253,0.3)] border border-white/60 p-6 flex flex-col">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-xl font-bold text-slate-700">Detail Transaksi Terbaru</h2>

                {/* Search Bar Kecil (Opsional) */}
                <div className="relative w-full sm:w-60 shrink-0">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-sky-400">
                    <Search size={16} />
                  </div>
                  <input
                    type="text"
                    className="w-full h-10 bg-white/60 border border-white shadow-sm rounded-full pl-10 pr-4 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200 transition-all placeholder:text-slate-400"
                    placeholder="Cari Order Code..."
                  />
                </div>
              </div>

              {/* Wrapper Tabel Responsif */}
              <div className="w-full overflow-x-auto rounded-2xl border border-white/80 bg-white/30 backdrop-blur-sm shadow-inner scrollbar-hide">
                <table className="w-full text-left border-collapse min-w-200">
                  <thead>
                    <tr className="bg-white/50 text-slate-500 text-sm border-b border-white/80">
                      <th className="px-5 py-4 font-semibold whitespace-nowrap rounded-tl-2xl">Order Code</th>
                      <th className="px-5 py-4 font-semibold whitespace-nowrap">Cashier Name</th>
                      <th className="px-5 py-4 font-semibold whitespace-nowrap">Total Price</th>
                      <th className="px-5 py-4 font-semibold whitespace-nowrap">Payment Method</th>
                      <th className="px-5 py-4 font-semibold whitespace-nowrap text-center">Status</th>
                      <th className="px-5 py-4 font-semibold whitespace-nowrap rounded-tr-2xl">Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTransactions.map((trx, index) => (
                      <tr
                        key={trx.id}
                        className={`text-slate-700 text-sm transition-colors hover:bg-white/60 ${index !== recentTransactions.length - 1 ? 'border-b border-white/50' : ''}`}
                      >
                        <td className="px-5 py-4 font-mono font-medium text-sky-600">{trx.orderCode}</td>
                        <td className="px-5 py-4 font-medium">{trx.cashierName}</td>
                        <td className="px-5 py-4 font-semibold">Rp {trx.totalPrice.toLocaleString('id-ID')}</td>
                        <td className="px-5 py-4">
                          <span className="bg-sky-50 text-sky-600 border border-sky-100 px-2 py-1 rounded-md text-xs font-semibold">
                            {trx.paymentMethod}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-center">
                          {getStatusBadge(trx.status)}
                        </td>
                        <td className="px-5 py-4 text-slate-500 font-medium">{trx.createdAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* KANAN: FAVORITES (Top Selling) */}
          <div className="w-full xl:w-75 2xl:w-100 flex flex-col shrink-0">
            <div className="w-full h-full bg-white/40 backdrop-blur-xl rounded-4xl shadow-[0_8px_32px_0_rgba(186,230,253,0.3)] border border-white/60 p-6 flex flex-col">

              <div className="flex items-center gap-3 mb-6">
                <Award className="text-amber-500" size={28} />
                <h2 className="text-xl font-bold text-slate-700">Top Favorites</h2>
              </div>

              <div className="flex flex-col gap-4 flex-1 overflow-y-hidden pr-2 scrollbar-hide">
                <div className="w-full bg-white/60 backdrop-blur-sm rounded-2xl border border-white p-4 flex items-center gap-4 transition-all hover:shadow-md hover:bg-white/80 cursor-pointer">
                  <div className="w-16 h-16 bg-sky-100 rounded-xl shrink-0 flex items-center justify-center overflow-hidden">
                    <span className="text-xs font-medium text-sky-400 text-center leading-tight">No<br />Image</span>
                  </div>
                  <div className="flex flex-col flex-1">
                    <h1 className="font-bold text-slate-700 text-lg">Americano</h1>
                    <h1 className="font-medium text-sky-500 text-sm mt-0.5">125 Cups Sold</h1>
                  </div>
                </div>

                <div className="w-full bg-white/60 backdrop-blur-sm rounded-2xl border border-white p-4 flex items-center gap-4 transition-all hover:shadow-md hover:bg-white/80 cursor-pointer">
                  <div className="w-16 h-16 bg-sky-100 rounded-xl shrink-0 flex items-center justify-center overflow-hidden">
                    <span className="text-xs font-medium text-sky-400 text-center leading-tight">No<br />Image</span>
                  </div>
                  <div className="flex flex-col flex-1">
                    <h1 className="font-bold text-slate-700 text-lg">Nasi Goreng Spesial</h1>
                    <h1 className="font-medium text-sky-500 text-sm mt-0.5">98 Plates Sold</h1>
                  </div>
                </div>

                <div className="w-full bg-white/60 backdrop-blur-sm rounded-2xl border border-white p-4 flex items-center gap-4 transition-all hover:shadow-md hover:bg-white/80 cursor-pointer">
                  <div className="w-16 h-16 bg-sky-100 rounded-xl shrink-0 flex items-center justify-center overflow-hidden">
                    <span className="text-xs font-medium text-sky-400 text-center leading-tight">No<br />Image</span>
                  </div>
                  <div className="flex flex-col flex-1">
                    <h1 className="font-bold text-slate-700 text-lg">Caramel Macchiato</h1>
                    <h1 className="font-medium text-sky-500 text-sm mt-0.5">85 Cups Sold</h1>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Sellings;