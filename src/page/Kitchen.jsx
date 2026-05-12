import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import {
    Bell,
    User,
    Clock,
    Eye,
    Play,
    ThumbsUp,
    Search
} from 'lucide-react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

// Setup Laravel Echo & Pusher
window.Pusher = Pusher;
const echo = new Echo({
    broadcaster: 'reverb',
    key: '1nw8pvfttvgig0fzoyyd',
    wsHost: '127.0.0.1',
    wsPort: 8080,
    forceTLS: false,
    enabledTransports: ['ws', 'wss'],
});

const Kitchen = () => {
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"];
    const [time, setTime] = useState(new Date());

    // State untuk filter aktif
    const [activeFilter, setActiveFilter] = useState('All');

    // Jam Realtime
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date())
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Format waktu agar selalu 2 digit (contoh: 09:05)
    const formatTime = (num) => num.toString().padStart(2, '0');

    // Koneksi Websocket
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
        });
    }, []);

    // Data Dummy Filter untuk Looping
    const filters = [
        { name: 'All', count: 8 },
        { name: 'New', count: 8 },
        { name: 'In Progress', count: 3 },
        { name: 'Ready To Pick Up', count: 1 },
        { name: 'History', count: 12 },
    ];

    return (
        <div className="min-h-screen w-full bg-linear-to-br from-white via-sky-50 to-sky-100 flex flex-col relative overflow-hidden">
            
            {/* Dekorasi Background Ambient */}
            <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-sky-200/40 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 pointer-events-none z-0"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-150 h-150 bg-white/60 rounded-full filter blur-[100px] opacity-80 pointer-events-none z-0"></div>

            <Navbar pageID={4} />

            {/* Main Container - h-screen agar layar tidak bablas ke bawah, scroll ada di dalam grid */}
            <div className="flex flex-col w-full h-screen lg:pl-26 lg:pr-6 py-6 px-4 z-10 gap-6">

                {/* === HEADER GLASSMORPHISM === */}
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

                {/* === FILTER BAR & SEARCH === */}
                <div className="w-full bg-white/40 backdrop-blur-xl rounded-4xl shadow-[0_4px_20px_0_rgba(186,230,253,0.3)] border border-white/60 p-4 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 shrink-0">
                    
                    {/* Pil Filter */}
                    <div className="flex gap-3 overflow-x-auto w-full xl:w-auto scrollbar-hide pb-2 xl:pb-2">
                        {filters.map((filter) => (
                            <button 
                                key={filter.name}
                                onClick={() => setActiveFilter(filter.name)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 shadow-sm border ${
                                    activeFilter === filter.name 
                                    ? 'bg-sky-500 text-white border-sky-500' 
                                    : 'bg-white/60 text-slate-500 border-white hover:bg-white'
                                }`}
                            >
                                <span className="font-semibold text-sm">{filter.name}</span>
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                    activeFilter === filter.name ? 'bg-white text-sky-500' : 'bg-slate-100 text-slate-500'
                                }`}>
                                    {filter.count}
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Notifikasi & Search */}
                    <div className="flex items-center gap-4 w-full xl:w-auto">
                        <div className="relative cursor-pointer hover:scale-105 transition-transform shrink-0">
                            <div className="w-10 h-10 bg-white/60 rounded-full flex items-center justify-center shadow-sm border border-white">
                                <Bell className="text-slate-500" size={20} />
                            </div>
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-sky-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                                3
                            </div>
                        </div>

                        <div className="relative w-full sm:w-64">
                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-sky-400">
                                <Search size={16} />
                            </div>
                            <input 
                                type="text" 
                                className="w-full h-10 bg-white/60 border border-white shadow-sm rounded-full pl-10 pr-4 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200 transition-all placeholder:text-slate-400" 
                                placeholder="Cari Order ID..." 
                            />
                        </div>
                    </div>
                </div>

                {/* === ORDER CARDS GRID (Scrollable Area) === */}
                <div className="flex-1 overflow-y-auto scrollbar-hide pb-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                        {/* --- KARTU ORDER 1 (NEW) --- */}
                        <div className="bg-white/60 backdrop-blur-xl rounded-4xl shadow-[0_8px_32px_0_rgba(186,230,253,0.3)] border border-white/60 flex flex-col overflow-hidden hover:-translate-y-1 transition-transform duration-300">
                            
                            {/* Card Header */}
                            <div className="p-5 flex justify-between items-center bg-white/40">
                                <h1 className="text-sky-500 text-2xl font-bold font-mono">#0001</h1>
                                <span className="bg-sky-100 text-sky-600 px-3 py-1 rounded-full text-xs font-bold border border-sky-200">
                                    NEW
                                </span>
                            </div>

                            {/* Customer Info */}
                            <div className="px-5 py-3 flex justify-between items-center bg-white/20">
                                <div className="flex items-center gap-2 text-slate-600">
                                    <User size={18} className="text-sky-400" />
                                    <span className="font-semibold text-sm">Eyra</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-500">
                                    <Clock size={16} />
                                    <span className="font-semibold text-sm">13:44</span>
                                </div>
                            </div>

                            <div className="w-full h-px bg-sky-100"></div>

                            {/* Item List (Scrollable if too many items) */}
                            <div className="flex-1 p-5 flex flex-col gap-4 max-h-62.5 overflow-y-auto scrollbar-hide">
                                
                                <div className="flex items-start gap-3">
                                    <div className="bg-sky-100 text-sky-600 font-bold rounded-lg w-8 h-8 flex items-center justify-center shrink-0 text-sm">1x</div>
                                    <div className="flex flex-col">
                                        <h1 className="font-bold text-slate-700 text-sm">Americano</h1>
                                        <h2 className="text-xs text-slate-500 mt-0.5">No Ice, Less Sugar</h2>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-3">
                                    <div className="bg-sky-100 text-sky-600 font-bold rounded-lg w-8 h-8 flex items-center justify-center shrink-0 text-sm">2x</div>
                                    <div className="flex flex-col">
                                        <h1 className="font-bold text-slate-700 text-sm">Fried Rice</h1>
                                        <h2 className="text-xs text-red-400 font-medium mt-0.5">Very Spicy, No Onion</h2>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="bg-sky-100 text-sky-600 font-bold rounded-lg w-8 h-8 flex items-center justify-center shrink-0 text-sm">1x</div>
                                    <div className="flex flex-col">
                                        <h1 className="font-bold text-slate-700 text-sm">French Fries</h1>
                                        <h2 className="text-xs text-slate-500 mt-0.5">Extra Sauce</h2>
                                    </div>
                                </div>

                            </div>

                            {/* Action Buttons */}
                            <div className="p-4 flex gap-3 bg-white/40 mt-auto border-t border-sky-50">
                                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full bg-white border border-sky-200 text-sky-600 font-bold text-sm hover:bg-sky-50 transition-colors shadow-sm">
                                    <Eye size={16} /> Details
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full bg-linear-to-r from-sky-400 to-sky-300 text-white font-bold text-sm hover:from-sky-500 hover:to-sky-400 transition-all shadow-[0_4px_15px_0_rgba(56,189,248,0.4)]">
                                    <Play size={16} className="fill-white" /> Progress
                                </button>
                            </div>
                        </div>

                        {/* --- KARTU ORDER 2 (IN PROGRESS) --- */}
                        <div className="bg-white/60 backdrop-blur-xl rounded-4xl shadow-[0_8px_32px_0_rgba(186,230,253,0.3)] border border-white/60 flex flex-col overflow-hidden hover:-translate-y-1 transition-transform duration-300">
                            
                            <div className="p-5 flex justify-between items-center bg-white/40">
                                <h1 className="text-sky-500 text-2xl font-bold font-mono">#0002</h1>
                                <span className="bg-amber-100 text-amber-600 px-3 py-1 rounded-full text-xs font-bold border border-amber-200">
                                    IN PROGRESS
                                </span>
                            </div>

                            <div className="px-5 py-3 flex justify-between items-center bg-white/20">
                                <div className="flex items-center gap-2 text-slate-600">
                                    <User size={18} className="text-amber-400" />
                                    <span className="font-semibold text-sm">Yire</span>
                                </div>
                                <div className="flex items-center gap-2 text-amber-500">
                                    <Clock size={16} className="animate-pulse" />
                                    <span className="font-semibold text-sm">13:40</span>
                                </div>
                            </div>

                            <div className="w-full h-px bg-sky-100"></div>

                            <div className="flex-1 p-5 flex flex-col gap-4 max-h-62.5 overflow-y-auto scrollbar-hide">
                                <div className="flex items-start gap-3">
                                    <div className="bg-amber-100 text-amber-600 font-bold rounded-lg w-8 h-8 flex items-center justify-center shrink-0 text-sm">1x</div>
                                    <div className="flex flex-col">
                                        <h1 className="font-bold text-slate-700 text-sm">Caramel Macchiato</h1>
                                        <h2 className="text-xs text-slate-500 mt-0.5">Less Ice</h2>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 flex gap-3 bg-white/40 mt-auto border-t border-sky-50">
                                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full bg-white border border-sky-200 text-sky-600 font-bold text-sm hover:bg-sky-50 transition-colors shadow-sm">
                                    <Eye size={16} /> Details
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full bg-linear-to-r from-emerald-400 to-emerald-300 text-white font-bold text-sm hover:from-emerald-500 hover:to-emerald-400 transition-all shadow-[0_4px_15px_0_rgba(52,211,153,0.4)]">
                                    <ThumbsUp size={16} className="fill-white" /> Finished
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default Kitchen;