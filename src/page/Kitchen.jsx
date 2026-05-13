import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import {
    Bell,
    User,
    Clock,
    Eye,
    Play,
    ThumbsUp,
    Search,
    ChefHat,
} from 'lucide-react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import api from '../api/axios';
import Loading from '../components/Loading'

window.Pusher = Pusher;
const echo = new Echo({
    broadcaster: 'reverb',
    key: '1nw8pvfttvgig0fzoyyd',
    wsHost: '127.0.0.1',
    wsPort: 8080,
    forceTLS: false,
    enabledTransports: ['ws', 'wss'],
});

const STATUS_CONFIG = {
    'pending': {
        badge: 'bg-sky-100 text-sky-600 border-sky-200',
        accent: 'text-sky-400',
        itemBg: 'bg-sky-100 text-sky-600',
        clockColor: 'text-slate-500',
        btn: 'bg-linear-to-r from-sky-400 to-sky-300 hover:from-sky-500...',
        btnIcon: <Play size={16} className="fill-white" />,
        btnLabel: 'Mulai Masak',
        uiText: 'NEW'
    },
    'processing': {
        badge: 'bg-amber-100 text-amber-600 border-amber-200',
        accent: 'text-amber-400',
        itemBg: 'bg-amber-100 text-amber-600',
        clockColor: 'text-amber-500',
        btn: 'bg-linear-to-r from-emerald-400 to-emerald-300...',
        btnIcon: <ThumbsUp size={16} className="fill-white" />,
        btnLabel: 'Selesaikan',
        uiText: 'IN PROGRESS'
    },
    'finished': {
        badge: 'bg-emerald-100 text-emerald-600 border-emerald-200',
        accent: 'text-emerald-400',
        itemBg: 'bg-emerald-100 text-emerald-600',
        clockColor: 'text-emerald-500',
        btn: 'bg-linear-to-r from-slate-400 to-slate-300...',
        btnIcon: <ThumbsUp size={16} className="fill-white" />,
        btnLabel: 'Selesai',
        uiText: 'READY'
    },
};
const OrderCard = ({ orderCode, items, onStatusChange }) => {
    const status = items[0]?.status || 'pending';
    const config = STATUS_CONFIG[status] || STATUS_CONFIG['pending'];
    const now = new Date();
    const pad = (n) => n.toString().padStart(2, '0');
    const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
    
    const nextStatus = {
        'pending': 'processing',
        'processing': 'finished',
        'finished': null,
    };

    return (
        <div className="bg-white/60 backdrop-blur-xl rounded-4xl shadow-[0_8px_32px_0_rgba(186,230,253,0.3)] border border-white/60 flex flex-col overflow-hidden hover:-translate-y-1 transition-transform duration-300">

            {/* Card Header */}
            <div className="p-5 flex justify-between items-center bg-white/40">
                <h1 className={`text-2xl font-bold font-mono ${config.accent}`}>#{orderCode}</h1>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${config.badge}`}>
                    {status.toUpperCase()}
                </span>
            </div>

            {/* Time & Item Count */}
            <div className="px-5 py-3 flex justify-between items-center bg-white/20">
                <div className={`flex items-center gap-2 ${config.clockColor}`}>
                    <Clock size={16} className={status === 'In Progress' ? 'animate-pulse' : ''} />
                    <span className="font-semibold text-sm">{timeStr}</span>
                </div>
                <span className="text-xs text-slate-400 font-medium">{items.length} item</span>
            </div>

            <div className="w-full h-px bg-sky-100"></div>

            {/* Item List */}
            <div className="flex-1 p-5 flex flex-col gap-4 max-h-62.5 overflow-y-auto scrollbar-hide">
                {items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                        <div className={`font-bold rounded-lg w-8 h-8 flex items-center justify-center shrink-0 text-sm ${config.itemBg}`}>
                            {item.qty}x
                        </div>
                        <div className="flex flex-col">
                            <h1 className="font-bold text-slate-700 text-sm">{item.namaMenu}</h1>
                            {item.note && (
                                <h2 className="text-xs text-slate-500 mt-0.5">{item.note}</h2>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Action Buttons */}
            <div className="p-4 flex gap-3 bg-white/40 mt-auto border-t border-sky-50">
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full bg-white border border-sky-200 text-sky-600 font-bold text-sm hover:bg-sky-50 transition-colors shadow-sm">
                    <Eye size={16} /> Details
                </button>
                {nextStatus[status] && (
                    <button
                        onClick={() => onStatusChange(orderCode, nextStatus[status])}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-white font-bold text-sm transition-all ${config.btn}`}
                    >
                        {config.btnIcon} {config.btnLabel}
                    </button>
                )}
            </div>
        </div>
    );
};

const Kitchen = () => {
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"];

    const [orders, setOrders] = useState({});
    const [isLoading, setLoading] = useState(false)
    const [time, setTime] = useState(new Date());
    const [activeFilter, setActiveFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        setLoading(true)
        const fetchKitchen = async () => {
            try {
                const res = await api.get('/kitchen/getAllOrder');
                console.log('Data dari API:', res.data);

                const formattedOrders = {};
                res.data.forEach(order => {
                    const code = order.order_code;
                    if (order.order_items && order.order_items.length > 0) {
                        formattedOrders[code] = order.order_items.map(item => ({
                            namaMenu: item.menu.name,
                            qty: item.qty,
                            note: item.note || '',
                            status: order.status,
                        }));
                    }
                });

                setOrders(prev => ({ ...prev, ...formattedOrders }));
                setInterval(()=>{
                    setLoading(false)
                },1000)

            } catch (error) {
                console.error("Gagal fetch data kitchen:", error);
            }
        }

        fetchKitchen();
    }, []);


    const formatTime = (num) => num.toString().padStart(2, '0');

    const searchOrder = async (orderCode) => {
        try {
            const res = await api.post('/kitchen/getorder', { ordercode: orderCode });
            const grouped = res.data.order_items.reduce((acc, item) => {
                const code = res.data.order_code;
                if (!acc[code]) acc[code] = [];
                acc[code].push({
                    namaMenu: item.menu.name,
                    qty: item.qty,
                    note: item.note || '',
                    status: 'pending',
                });
                return acc;
            }, {});

            setOrders(prev => ({ ...prev, ...grouped }));
        } catch (error) {
            console.error('Gagal fetch order:', error);
        }
    };

    const patchStatus = async (status, orderCode) => {
        try {
            const res = await api.patch(`/kitchen/update-status/${orderCode}`, { status: status })
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        echo.connector.pusher.connection.bind('connected', () => {
            console.log('✅ Terhubung ke Reverb!');
        });
        echo.connector.pusher.connection.bind('error', (err) => {
            console.error('❌ Error koneksi:', err);
        });
        echo.connector.pusher.connection.bind('state_change', (states) => {
            console.log('🔄 State:', states.previous, '->', states.current);
        });

        const channel = echo.channel('kitchen-channel');
        channel.listen('OrderCreated', (data) => {
            console.log('pesanan masuk coy', data.order);
            searchOrder(data.order.order_code);
        });

        return () => {
            echo.leaveChannel('kitchen-channel');
        };
    }, []);

    const handleStatusChange = (orderCode, newStatus) => {
        patchStatus(newStatus, orderCode);
        setOrders(prev => ({
            ...prev,
            [orderCode]: prev[orderCode].map(item => ({
                ...item,
                status: newStatus,
            })),
        }));
    };

    const filteredOrders = Object.entries(orders).filter(([code, items]) => {
        const status = items[0]?.status || 'pending';
        const matchFilter = activeFilter === 'All' || activeFilter === status;
        const matchSearch = code.toLowerCase().includes(searchQuery.toLowerCase());
        return matchFilter && matchSearch;
    });

    const countByStatus = (status) =>
        Object.values(orders).filter(items => (items[0]?.status || 'pending') === status).length;

    const filters = [
        { name: 'All', count: Object.keys(orders).length },
        { name: 'pending', count: countByStatus('pending') },
        { name: 'processing', count: countByStatus('processing') },
        { name: 'finished', count: countByStatus('finished') },
    ];

    return (
        <div className="min-h-screen w-full bg-linear-to-br from-white via-sky-50 to-sky-100 flex flex-col relative overflow-hidden">
            <Loading isLoading={isLoading} />

            <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-sky-200/40 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 pointer-events-none z-0"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-150 h-150 bg-white/60 rounded-full filter blur-[100px] opacity-80 pointer-events-none z-0"></div>

            <Navbar pageID={4} />

            <div className="flex flex-col w-full h-screen lg:pl-26 lg:pr-6 py-6 px-4 z-10 gap-6">

                {/* Header */}
                <div className="w-full bg-white/40 backdrop-blur-xl border border-white/60 shadow-sm rounded-4xl p-6 lg:px-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 shrink-0">
                    <div>
                        <h2 className="text-sky-500 font-bold tracking-widest uppercase text-sm mb-1">Kitchen Display System</h2>
                        <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-700 tracking-tight">Incoming Orders</h1>
                    </div>
                    <div className="flex flex-col items-start lg:items-end gap-1">
                        <div className="flex items-center gap-2 text-3xl font-bold text-slate-700 font-mono">
                            <Clock className="text-sky-400 mr-1" size={28} />
                            <span>{formatTime(time.getHours())}:{formatTime(time.getMinutes())}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 font-medium">
                            <span>{days[time.getDay()]}, {time.getDate()} {months[time.getMonth()]} {time.getFullYear()}</span>
                        </div>
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="w-full bg-white/40 backdrop-blur-xl rounded-4xl shadow-[0_4px_20px_0_rgba(186,230,253,0.3)] border border-white/60 p-4 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 shrink-0">
                    <div className="flex gap-3 overflow-x-auto w-full xl:w-auto scrollbar-hide pb-2 xl:pb-0">
                        {filters.map((filter) => (
                            <button
                                key={filter.name}
                                onClick={() => setActiveFilter(filter.name)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 shadow-sm border ${activeFilter === filter.name
                                    ? 'bg-sky-500 text-white border-sky-500'
                                    : 'bg-white/60 text-slate-500 border-white hover:bg-white'
                                    }`}
                            >
                                <span className="font-semibold text-sm">{filter.name}</span>
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${activeFilter === filter.name ? 'bg-white text-sky-500' : 'bg-slate-100 text-slate-500'}`}>
                                    {filter.count}
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 w-full xl:w-auto">
                        <div className="relative w-full sm:w-64">
                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-sky-400">
                                <Search size={16} />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-10 bg-white/60 border border-white shadow-sm rounded-full pl-10 pr-4 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200 transition-all placeholder:text-slate-400"
                                placeholder="Cari Order ID..."
                            />
                        </div>
                    </div>
                </div>

                {/* Order Cards Grid */}
                <div className="flex-1 overflow-y-auto scrollbar-hide pb-20">
                    {filteredOrders.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-32 text-slate-400 gap-4">
                            <ChefHat size={48} className="text-sky-200" />
                            <p className="text-lg font-semibold">Belum ada pesanan masuk</p>
                            <p className="text-sm">Menunggu order baru dari kasir...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredOrders.map(([orderCode, items]) => (
                                <OrderCard
                                    key={orderCode}
                                    orderCode={orderCode}
                                    items={items}
                                    onStatusChange={handleStatusChange}
                                />
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Kitchen;