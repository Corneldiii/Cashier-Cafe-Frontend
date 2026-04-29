import { useState, useEffect } from 'react'
import '../index.css';

function login() {
    const [greatings, setGreating] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const hours = new Date().getHours();

        if (hours >= 5 && hours <= 11) {
            setGreating("Selamat Pagi !!")
        } else if (hours > 11 && hours <= 14) {
            setGreating("Selamat Siang !!")
        } else if (hours > 14 && hours <= 18) {
            setGreating("Selamat Sore !!")
        } else {
            setGreating("Selamat Malam !!")
        }
    }, []);




    return (
        <>
            <div className="w-screen h-screen bg-white flex justify-center items-center p-5 lg:p-0">
                <div className="bg-blue-100 w-full h-full lg:w-150 lg:h-fit lg:rounded-4xl rounded-t-4xl lg:shadow-2xl lg:p-10 flex flex-col items-center lg:gap-5">
                    <h1 className='lg:text-4xl lg:font-bold text-blue-900'>{greatings}</h1>
                    <h1 className='lg:text-3xl font-extrabold text-blue-900 '> L O G I N </h1>

                    <div id="input" className='flex flex-col justify-center items-center mt-15 w-full h-fit gap-8'>


                        <input type="email" name="" className='w-full lg:h-15 lg:rounded-2xl bg-white text-bold text-center text-gray-600 lg:p-5' placeholder='Username' id="username"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                        <div className="relative w-full lg:h-15 ">
                            <input type="password" name="" className=' w-full lg:h-15 lg:rounded-2xl bg-white text-bold text-center text-gray-600 lg:p-5' placeholder='password' id="password"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}

                            />
                            <div className="absolute lg:top-4 lg:right-5 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
                                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                                    <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                                </svg>
                            </div>
                        </div>

                        <button type="submit" className='w-full lg:h-15 bg-red-700 rounded-2xl text-white cursor-pointer hover:shadow-inner lg:shadow-black'>Sign In</button>
                    </div>

                </div>

            </div>
        </>
    )
}

export default login