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
  Search,
  X,
  Receipt,
  Package,
  CreditCard,
  Hash
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
import Loading from '../components/Loading';

const OrderDetailModal = ({ isOpen, onClose, order, formatRupiah }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen || !order) return null;

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Completed': return { bg: 'bg-emerald-100', text: 'text-emerald-600', label: 'Selesai' };
      case 'Pending': return { bg: 'bg-amber-100', text: 'text-amber-600', label: 'Tertunda' };
      case 'Cancelled': return { bg: 'bg-red-100', text: 'text-red-500', label: 'Dibatalkan' };
      default: return { bg: 'bg-slate-100', text: 'text-slate-500', label: status };
    }
  };

  const statusStyle = getStatusStyle(order.status);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-md bg-white/70 backdrop-blur-2xl border border-white/80 rounded-4xl shadow-[0_24px_64px_0_rgba(14,165,233,0.18)] overflow-hidden animate-modal-in"
        onClick={e => e.stopPropagation()}
        style={{ animation: 'modalIn 0.25s cubic-bezier(0.34,1.56,0.64,1) both' }}
      >
        <div className="relative bg-linear-to-br from-sky-400/90 to-sky-500/90 px-6 pt-6 pb-8">
          {/* Decorative circles */}
          <div className="absolute top-5 right-5 w-32 h-32 bg-white/10 rounded-full pointer-events-none" />
          <div className="absolute -bottom-2.5 left-[30%] w-20 h-20 bg-white/10 rounded-full pointer-events-none" />

          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-sky-100 text-xs font-semibold tracking-widest uppercase mb-1">Detail Pesanan</p>
              <h2 className="text-white text-xl font-extrabold font-mono tracking-tight">{order.orderCode}</h2>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 bg-white/20 hover:bg-white/30 text-white rounded-2xl flex items-center justify-center transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Status & Payment row */}
          <div className="flex items-center gap-2 mt-4 relative z-10">
            <span className={`px-3 py-1 ${statusStyle.bg} ${statusStyle.text} rounded-full text-xs font-bold`}>
              {statusStyle.label}
            </span>
            <span className="px-3 py-1 bg-white/20 text-white rounded-full text-xs font-semibold">
              {order.payment}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5 flex flex-col gap-4">

          <div className="flex gap-3">
            <div className="flex-1 bg-sky-50/60 rounded-2xl p-3 flex items-center gap-2">
              <Hash size={14} className="text-sky-400 shrink-0" />
              <div>
                <p className="text-slate-400 text-xs">Kode Order</p>
                <p className="text-slate-700 text-sm font-semibold font-mono">{order.orderCode}</p>
              </div>
            </div>
            <div className="flex-1 bg-sky-50/60 rounded-2xl p-3 flex items-center gap-2">
              <Clock size={14} className="text-sky-400 shrink-0" />
              <div>
                <p className="text-slate-400 text-xs">Waktu</p>
                <p className="text-slate-700 text-sm font-semibold">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
                    : '-'}
                </p>
              </div>
            </div>
          </div>

          {/* Items list */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Package size={15} className="text-sky-400" />
              <h3 className="text-slate-600 font-bold text-sm">Daftar Pesanan</h3>
            </div>

            <div className="flex flex-col gap-2 max-h-52 overflow-y-auto pr-1 scrollbar-hide">
              {order.items && order.items.length > 0 ? (
                order.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-white/60 border border-white/80 rounded-2xl px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-sky-100 rounded-xl flex items-center justify-center shrink-0">
                        <span className="text-sky-500 text-xs font-bold">{item.qty}x</span>
                      </div>
                      <span className="text-slate-700 text-sm font-medium">{item.namaMenu}</span>
                    </div>
                    <span className="text-sky-600 text-sm font-bold shrink-0">
                      {formatRupiah(item.price * item.qty)}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-slate-400 text-sm text-center py-4">Tidak ada item</p>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-100" />

          {/* Total */}
          <div className="flex items-center justify-between bg-linear-to-r from-sky-50 to-white border border-sky-100 rounded-2xl px-4 py-4">
            <div className="flex items-center gap-2">
              <Receipt size={16} className="text-sky-400" />
              <span className="text-slate-600 font-bold text-sm">Total Pembayaran</span>
            </div>
            <span className="text-sky-600 text-xl font-extrabold">{formatRupiah(order.total)}</span>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className="w-full py-3 bg-linear-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-bold rounded-2xl transition-all duration-200 shadow-[0_4px_16px_0_rgba(14,165,233,0.3)] hover:shadow-[0_6px_20px_0_rgba(14,165,233,0.4)] cursor-pointer"
          >
            Tutup
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

const Sellings = () => {
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"];

  const [time, setTime] = useState(new Date());
  const [traffic, setTraffic] = useState([]);
  const [fav, setFav] = useState([]);
  const [income, setIncome] = useState(0);
  const [orders, setOrders] = useState(0);
  const [avgTrans, setAvgTrans] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [dataOrders, setDataOrders] = useState([]);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Modal state — simpan object order yang dipilih langsung
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Filter dataOrders berdasarkan searchQuery
  const filteredOrders = dataOrders.filter(trx =>
    trx.orderCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        try { const res = await api.get('/sellings/incomeDay'); setIncome(res.data); } catch (e) { console.log(e); }
        try { const res = await api.get('/sellings/totalOrder'); setOrders(res.data); } catch (e) { console.log(e); }
        try { const res = await api.get('/sellings/avgTrans'); setAvgTrans(res.data); } catch (e) { console.log(e); }
        try { const res = await api.get('/sellings/trafficOrder'); setTraffic(res.data); } catch (e) { console.log(e); }
        try { const res = await api.get('/sellings/favMenu'); setFav(res.data); } catch (e) { console.log(e); }
      } catch (e) { console.log(e); }

      try {
        const res = await api.get('/kitchen/getAllOrder');
        const formattedOrders = res.data.map(order => ({
          orderCode: order.order_code,
          payment: order.payment_method,
          total: order.total_price,
          status: order.status,
          createdAt: order.created_at,
          items: order.order_items?.map(item => ({
            namaMenu: item.menu.name,
            qty: item.qty,
            price: item.price
          })) || []
        }));
        setDataOrders(formattedOrders);
      } catch (e) { console.log(e); }

      setTimeout(() => setLoading(false), 1500);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatRupiah = (number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);

  const formatTime = (num) => num.toString().padStart(2, '0');

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed': return <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-xs font-bold">Selesai</span>;
      case 'Pending': return <span className="px-3 py-1 bg-amber-100 text-amber-600 rounded-full text-xs font-bold">Tertunda</span>;
      case 'Cancelled': return <span className="px-3 py-1 bg-red-100 text-red-500 rounded-full text-xs font-bold">Dibatalkan</span>;
      default: return <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-xs font-bold">{status}</span>;
    }
  };

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedOrder(null), 300);
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-white via-sky-50 to-sky-100 flex flex-col relative overflow-hidden">

      <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-sky-200/40 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-150 h-150 bg-white/60 rounded-full filter blur-[100px] opacity-80 pointer-events-none z-0"></div>

      <Navbar pageID={3} />
      <Loading isLoading={isLoading} />

      <div className="flex flex-col w-full lg:pl-26 lg:pr-6 py-6 px-4 z-10 gap-6 pb-20">

        {/* HEADER */}
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

        {/* SUMMARY CARDS */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {[
            { icon: <Banknote className="text-sky-500" size={28} />, iconBg: 'bg-sky-100', label: 'Total Income Today', value: formatRupiah(income), badge: '+12%', badgeStyle: 'bg-emerald-100 text-emerald-600', trend: <TrendingUp size={16} /> },
            { icon: <ShoppingCart className="text-indigo-400" size={28} />, iconBg: 'bg-indigo-50', label: 'Total Orders Today', value: orders, badge: '-2%', badgeStyle: 'bg-red-100 text-red-500', trend: <TrendingDown size={16} /> },
            { icon: <TrendingUp className="text-amber-500" size={28} />, iconBg: 'bg-amber-50', label: 'Average Transaction', value: formatRupiah(avgTrans), badge: '+6%', badgeStyle: 'bg-emerald-100 text-emerald-600', trend: <TrendingUp size={16} /> },
          ].map((card, i) => (
            <div key={i} className="bg-white/60 backdrop-blur-xl rounded-4xl shadow-[0_4px_20px_0_rgba(186,230,253,0.3)] border border-white/60 p-6 flex flex-col gap-4 transition-transform hover:-translate-y-1 duration-300">
              <div className="flex justify-between items-center">
                <div className={`w-14 h-14 ${card.iconBg} rounded-2xl flex justify-center items-center shadow-inner`}>{card.icon}</div>
                <div className={`flex items-center gap-1 ${card.badgeStyle} px-3 py-1 rounded-full text-sm font-bold`}>{card.trend} {card.badge}</div>
              </div>
              <div>
                <h1 className="text-slate-500 font-medium text-sm">{card.label}</h1>
                <h1 className="text-3xl xl:text-4xl font-bold text-slate-700 mt-1">{card.value}</h1>
              </div>
            </div>
          ))}
        </div>

        {/* MAIN CONTENT */}
        <div className="flex flex-col xl:flex-row w-full gap-6">

          <div className="flex-1 flex flex-col gap-6 w-full max-w-full overflow-hidden">

            {/* Area Chart */}
            <div className="w-full bg-white/40 backdrop-blur-xl rounded-4xl shadow-[0_8px_32px_0_rgba(186,230,253,0.3)] border border-white/60 p-6">
              <h2 className="text-xl font-bold text-slate-700 mb-6">Hourly Sales Trend Today</h2>
              <div className="w-full h-75">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={traffic} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearlinear id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.5} />
                        <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.05} />
                      </linearlinear>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="hour" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} dy={10} />
                    <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} labelStyle={{ color: '#475569', fontWeight: 'bold', marginBottom: '4px' }} />
                    <Area type="monotone" dataKey="total" stroke="#38bdf8" strokeWidth={3} fill="url(#colorBlue)" activeDot={{ r: 6, strokeWidth: 0, fill: '#0284c7' }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* TABLE */}
            <div className="w-full bg-white/40 backdrop-blur-xl rounded-4xl shadow-[0_8px_32px_0_rgba(186,230,253,0.3)] border border-white/60 p-6 flex flex-col">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-xl font-bold text-slate-700">Detail Transaksi Terbaru</h2>

                {/* Search */}
                <div className="relative w-full sm:w-64 shrink-0">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-sky-400">
                    <Search size={16} />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full h-10 bg-white/60 border border-white shadow-sm rounded-full pl-10 pr-10 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200 transition-all placeholder:text-slate-400"
                    placeholder="Cari Order Code..."
                  />
                  {/* Tombol clear */}
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>

              {/* Jumlah hasil */}
              {searchQuery && (
                <p className="text-slate-400 text-xs mb-3">
                  Menampilkan <span className="text-sky-500 font-semibold">{filteredOrders.length}</span> hasil untuk "<span className="text-slate-500">{searchQuery}</span>"
                </p>
              )}

              <div className="w-full overflow-y-auto max-h-100 rounded-2xl border border-white/80 bg-white/30 backdrop-blur-sm shadow-inner scrollbar-hide">
                <table className="w-full text-left border-collapse min-w-200">
                  <thead className="sticky top-0 z-10">
                    <tr className="bg-white/70 backdrop-blur-sm text-slate-500 text-sm border-b border-white/80">
                      <th className="px-5 py-4 font-semibold whitespace-nowrap">Order Code</th>
                      <th className="px-5 py-4 font-semibold whitespace-nowrap">Total Price</th>
                      <th className="px-5 py-4 font-semibold whitespace-nowrap">Payment Method</th>
                      <th className="px-5 py-4 font-semibold whitespace-nowrap text-center">Status</th>
                      <th className="px-5 py-4 font-semibold whitespace-nowrap">Created At</th>
                      <th className="px-5 py-4 font-semibold whitespace-nowrap text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((trx, index) => (
                        <tr
                          key={trx.orderCode}
                          className={`text-slate-700 text-sm transition-colors hover:bg-white/60 ${index !== filteredOrders.length - 1 ? 'border-b border-white/50' : ''}`}
                        >
                          <td className="px-5 py-4 font-mono font-medium text-sky-600">{trx.orderCode}</td>
                          <td className="px-5 py-4 font-semibold">{formatRupiah(trx.total)}</td>
                          <td className="px-5 py-4">
                            <span className="bg-sky-50 text-sky-600 border border-sky-100 px-2 py-1 rounded-md text-xs font-semibold">
                              {trx.payment}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-center">{getStatusBadge(trx.status)}</td>
                          <td className="px-5 py-4 text-slate-500 font-medium">
                            {trx.createdAt
                              ? new Date(trx.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
                              : '-'}
                          </td>
                          <td className="px-5 py-4 text-center">
                            <button
                              onClick={() => handleOpenModal(trx)}
                              className="cursor-pointer hover:bg-sky-100 transition-colors bg-sky-50 text-sky-600 border border-sky-100 px-3 py-1.5 rounded-xl text-xs font-semibold"
                            >
                              Detail
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-5 py-12 text-center text-slate-400 text-sm">
                          {searchQuery ? `Tidak ada order dengan kode "${searchQuery}"` : 'Belum ada data transaksi'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* KANAN: TOP FAVORITES */}
          <div className="w-full xl:w-75 2xl:w-100 flex flex-col shrink-0">
            <div className="w-full h-full bg-white/40 backdrop-blur-xl rounded-4xl shadow-[0_8px_32px_0_rgba(186,230,253,0.3)] border border-white/60 p-6 flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <Award className="text-amber-500" size={28} />
                <h2 className="text-xl font-bold text-slate-700">Top Favorites</h2>
              </div>
              <div className="flex flex-col gap-4 flex-1 xl:max-h-200 overflow-y-auto pr-1 scrollbar-hide">
                {fav.map((item, i) => (
                  <div key={i} className="w-full bg-white/60 backdrop-blur-sm rounded-2xl border border-white p-4 flex items-center gap-4 transition-all hover:shadow-md hover:bg-white/80 cursor-pointer">
                    <div className="w-16 h-16 bg-sky-100 rounded-xl shrink-0 flex items-center justify-center overflow-hidden">
                      <span className="text-xs font-medium text-sky-400 text-center leading-tight">No<br />Image</span>
                    </div>
                    <div className="flex flex-col flex-1">
                      <h1 className="font-bold text-slate-700 text-lg">{item.menu.name}</h1>
                      <h1 className="font-medium text-sky-500 text-sm mt-0.5">{item.total} Sold</h1>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      <OrderDetailModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        order={selectedOrder}
        formatRupiah={formatRupiah}
      />

    </div>
  );
};

export default Sellings;