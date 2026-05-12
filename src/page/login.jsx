import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Coffee, User, Lock } from 'lucide-react';
import '../index.css';
import api from '../api/axios';
import Loading from '../components/Loading';

function login() {
    const navigate = useNavigate();

    // State Management
    const [greeting, setGreeting] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [users, setUsers] = useState()

    useEffect(() => {
        const hours = new Date().getHours();
        if (hours >= 5 && hours <= 11) {
            setGreeting("Selamat Pagi !!");
        } else if (hours > 11 && hours <= 14) {
            setGreeting("Selamat Siang !!");
        } else if (hours > 14 && hours <= 18) {
            setGreeting("Selamat Sore !!");
        } else {
            setGreeting("Selamat Malam !!");
        }
    }, []);

    useEffect(() => {
        if (cookies.token) {
            const fetchMe = async () => {
                try {
                    const res = await api.get('/me');
                    const user = res.data;
                    if (user.role === "kasir" || user.role === "owner") {
                        navigate("/Menu",{ replace: true });
                    } else if (user.role === "kitchen") {
                        navigate("/Kitchen",{ replace: true });
                    }
                } catch (error) {
                    removeCookie('token');
                }
            };
            fetchMe();
        }
    }, [cookies.token]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg('');

        try {
            const res = await api.post('/login', { username, password });

            if (res.data && res.data.token) {
                setCookie('token', res.data.token, { path: '/', maxAge: 604800 })
                const userRole = res.data.user.role;

                if (userRole === "kasir" || userRole === "owner") {
                    navigate("/Menu");  
                } else if (userRole === "kitchen") {
                    console.log(userRole)
                    navigate("/Kitchen");
                }
            }
        } catch (error) {
            setErrorMsg(error.response?.data?.message || "Kredensial tidak valid. Silakan coba lagi.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Loading isLoading={isLoading} />

            {/* Background Wrapper - Dibuat secerah dan selembut mungkin menyerupai cahaya ruangan */}
            <div className="min-h-screen w-full flex justify-center items-center p-4 relative overflow-hidden bg-linear-to-br from-white via-sky-100 to-sky-600">

                {/* Efek Cahaya / Bokeh di Background */}
                <div className="absolute top-[-20%] left-[-10%] w-125 h-125 bg-sky-200/40 rounded-full mix-blend-multiply filter blur-[80px] opacity-70"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-150 h-150 bg-white/60 rounded-full filter blur-[100px] opacity-80"></div>
                <div className="absolute top-[20%] right-[10%] w-75 h-75 bg-sky-100/50 rounded-full filter blur-[60px] opacity-60"></div>

                <div className="relative w-full max-w-md bg-white/40 backdrop-blur-xl rounded-[2.5rem] shadow-[0_8px_32px_0_rgba(186,230,253,0.3)] border border-white/60 p-8 sm:p-10 flex flex-col items-center z-10">

                    <div className="flex flex-col items-center w-full mb-8">
                        <div className="w-20 h-20 bg-linear-to-br from-white to-sky-50 rounded-full flex items-center justify-center text-sky-400 mb-4 shadow-[0_4px_20px_0_rgba(125,211,252,0.4)] border border-white">
                            <Coffee size={36} strokeWidth={2} />
                        </div>
                        <div className="px-4 py-1 bg-sky-100/50 text-sky-500 text-xs font-bold tracking-widest uppercase rounded-full mb-3 border border-sky-200/50">
                            CasierCafe POS
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-700 text-center mb-1">{greeting}</h1>
                        <p className="text-slate-500 text-sm text-center">Silakan masuk untuk memulai *shift* Anda</p>
                    </div>

                    {errorMsg && (
                        <div className="w-full p-3 mb-5 bg-white/50 backdrop-blur-sm border border-red-200 text-red-500 text-sm font-medium rounded-2xl text-center shadow-sm">
                            {errorMsg}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="w-full flex flex-col gap-5">

                        {/* Input Username */}
                        <div className="relative flex items-center w-full">
                            <div className="absolute left-4 text-sky-400/70">
                                <User size={20} />
                            </div>
                            <input
                                type="text"
                                required
                                value={username}
                                className="w-full h-14 rounded-full bg-white/50 border border-white/80 text-slate-700 pl-12 pr-5 focus:outline-none focus:bg-white focus:border-sky-300 focus:ring-4 focus:ring-sky-100 transition-all shadow-sm placeholder:text-slate-400"
                                placeholder="Username kasir / kitchen"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        {/* Input Password */}
                        <div className="relative flex items-center w-full">
                            <div className="absolute left-4 text-sky-400/70">
                                <Lock size={20} />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                className="w-full h-14 rounded-full bg-white/50 border border-white/80 text-slate-700 pl-12 pr-12 focus:outline-none focus:bg-white focus:border-sky-300 focus:ring-4 focus:ring-sky-100 transition-all shadow-sm placeholder:text-slate-400"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="absolute right-4 text-sky-400/70 hover:text-sky-500 transition-colors p-1"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        {/* Spacer & Lupa Password (Opsional) */}
                        <div className="flex justify-end w-full px-2 -mt-2">
                            <span className="text-xs font-medium text-sky-500 hover:text-sky-600 cursor-pointer transition-colors">
                                Butuh bantuan?
                            </span>
                        </div>

                        {/* Tombol Login */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-14 mt-2 bg-linear-to-r from-sky-400 to-sky-300 hover:from-sky-500 hover:to-sky-400 active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 text-white font-bold text-lg rounded-full shadow-[0_8px_20px_0_rgba(56,189,248,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                            {isLoading ? 'Menyeduh Data...' : 'Mulai Sesi'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default login;