import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import {
    BellAlertIcon,
    BellIcon,
    UserIcon,
    ClockIcon,
    EyeIcon,
    PlayIcon,
    HandThumbUpIcon
} from '@heroicons/react/24/outline';

const Kitchen = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date())
        }, 1000)

        return () => clearInterval(timer);
    }, [])
    return (
        <div>
            <Navbar pageID={4} />
            <div className="w-full h-full">
                <div className="w-[96%] h-screen overflow-x-hidden scroll-smooth ml-20 flex flex-col ">
                    <div className="w-[90%] h-25 mt-10 bg-sky-400 p-5 flex justify-between items-center">
                        <div className="flex gap-10 justify-start items-center">
                            <h1 className='text-7xl font-extrabold text-white'>I N C O M I N G </h1>
                            <h1 className='text-7xl font-extrabold text-white'>O R D E R</h1>
                        </div>
                        <div className="flex flex-col justify-end items-center w-fit h-full text-white ">
                            <div className="flex gap-2 w-60  h-fit text-2xl font-semibold justify-end">
                                <h1>{time.getHours()}</h1>
                                <h1>:</h1>
                                <h1>{time.getMinutes()}</h1>
                            </div>
                            <div className="flex gap-1 w-60 h-fit text-xl font-semibold justify-end">
                                <h1>{days[time.getDay()]}</h1>
                                <h1>,</h1>
                                <h1>{time.getDate()}</h1>
                                <h1>{months[time.getMonth()]}</h1>
                                <h1>{time.getFullYear()}</h1>
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-20 flex justify-between">
                        <div className="w-full h-full p-5 px-15 flex gap-5">

                            <div className="rounded-xl w-fit h-fit bg-blue-500 flex justify-between items-center py-2 px-3 cursor-pointer gap-3">
                                <h1 className='text-white font-jakarta font-semibold text-xl'>All</h1>
                                <div className="rounded-full w-7 h-7 bg-white flex justify-center items-center">
                                    <h1 className='text-blue-500 text-lg font-jakarta font-semibold '>8</h1>
                                </div>
                            </div>
                            <div className="rounded-xl w-fit h-fit gap-3 bg-white border-2 border-solid border-black/15 flex justify-between items-center py-2 px-3 cursor-pointer">
                                <h1 className='text-black/35 font-jakarta font-semibold text-xl'>New</h1>
                                <div className="rounded-full w-7 h-7 bg-black/5 flex justify-center items-center">
                                    <h1 className='text-black/35 text-lg font-jakarta font-semibold '>8</h1>
                                </div>
                            </div>
                            <div className="rounded-xl w-fit h-fit gap-3 bg-white border-2 border-solid border-black/15 flex justify-between items-center py-2 px-3 cursor-pointer">
                                <h1 className='text-black/35 font-jakarta font-semibold text-xl'>In Progress</h1>
                                <div className="rounded-full w-7 h-7 bg-black/5 flex justify-center items-center">
                                    <h1 className='text-black/35 text-lg font-jakarta font-semibold '>3</h1>
                                </div>
                            </div>
                            <div className="rounded-xl w-fit h-fit gap-3 bg-white border-2 border-solid border-black/15 flex justify-between items-center py-2 px-3 cursor-pointer">
                                <h1 className='text-black/35 font-jakarta font-semibold text-xl'>Ready To Pick Up</h1>
                                <div className="rounded-full w-7 h-7 bg-black/5 flex justify-center items-center">
                                    <h1 className='text-black/35 text-lg font-jakarta font-semibold '>1</h1>
                                </div>
                            </div>
                            <div className="rounded-xl w-fit h-fit gap-3 bg-white border-2 border-solid border-black/15 flex justify-between items-center py-2 px-3 cursor-pointer">
                                <h1 className='text-black/35 font-jakarta font-semibold text-xl'>History</h1>
                                <div className="rounded-full w-7 h-7 bg-black/5 flex justify-center items-center">
                                    <h1 className='text-black/35 text-lg font-jakarta font-semibold '>12</h1>
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-full p-5 px-15 flex justify-end items-center">
                            <div className="w-[50%] h-full flex justify-between items-center gap-5">
                                <div className="h-fit w-fit relative">
                                    <BellIcon className='size-10 text-black/40 cursor-pointer' />
                                    <div className="absolute w-5 h-5 bg-blue-500 top-0 right-0 text-white flex justify-center items-center rounded-full">
                                        <h1 className='text-xs font-jakarta font-semibold'>3</h1>
                                    </div>
                                </div>
                                <input type="search" name="searchOrder" placeholder='search order id' className='w-full h-full border-solid border-2 border-black/20 rounded-xl fon-jakarta font-semibold text-black/40' id="" />
                            </div>

                        </div>
                    </div>

                    <div className="w-full h-full grid grid-cols-5 p-5 justify-items-center">
                        {/* card Start */}
                        <div className=" w-90 h-fit rounded-xl border-2 border-solid border-black/15 flex flex-col">
                            <div className="w-full h-fit ">
                                {/* head order start */}
                                <div className="w-full h-fit flex justify-between items-center py-3 px-5">
                                    <h1 className='text-blue-500 text-4xl font-jakarta font-semibold '>#0001</h1>
                                    <div className="w-15 h-8 rounded-xl bg-blue-200 text-blue-500 flex justify-center items-center">
                                        <h1 className='font-jakarta font-semibold '>NEW</h1>
                                    </div>
                                </div>
                                <div className="w-full h-fit flex justify-between items-center px-5 py-3">
                                    <div className="w-fit h-fit flex justify-between items-center gap-3">
                                        <UserIcon className='size-6 text-black/55' />
                                        <h1 className='font-jakarta font-semibold text-lg text-black/55'>Eyra</h1>
                                    </div>
                                    <div className="w-fit h-fit flex justify-between items-center gap-3">
                                        <ClockIcon className='size-6 text-black/55' />
                                        <h1 className='font-jakarta font-semibold text-lg text-black/55'>13:44</h1>
                                    </div>


                                </div>
                                {/* head order start */}

                            </div>
                            <div className="w-full h-0.5 bg-black/15"></div>
                            <div className="w-full h-80 overflow-x-hidden overflow-y-auto scrollbar-hide px-3 py-2 flex flex-col gap-4">
                                {/* Start Menu List */}
                                <div className="w-full h-fit flex justify-between items-center">
                                    <div className="w-[20%] h-full font-jakarta font-semibold flex justify-center items-center text-black/55 text-xl">
                                        <h1>1x</h1>
                                    </div>
                                    <div className="w-[75%] h-full flex flex-col justify-start items-start font-jakarta font-semibold  ">
                                        <h1 className='text-xl text-black/55 '>Americano</h1>
                                        <h1 className='text-sm text-black/35'>No Ice, Less Sugar</h1>
                                    </div>
                                </div>
                                <div className="w-full h-fit flex justify-between items-center">
                                    <div className="w-[20%] h-full font-jakarta font-semibold flex justify-center items-center text-black/55 text-xl">
                                        <h1>1x</h1>
                                    </div>
                                    <div className="w-[75%] h-full flex flex-col justify-start items-start font-jakarta font-semibold  ">
                                        <h1 className='text-xl text-black/55 '>Fried Rice</h1>
                                        <h1 className='text-sm text-black/35'>Very Spicy</h1>
                                    </div>
                                </div>
                                <div className="w-full h-fit flex justify-between items-center">
                                    <div className="w-[20%] h-full font-jakarta font-semibold flex justify-center items-center text-black/55 text-xl">
                                        <h1>1x</h1>
                                    </div>
                                    <div className="w-[75%] h-full flex flex-col justify-start items-start font-jakarta font-semibold  ">
                                        <h1 className='text-xl text-black/55 '>Fried Rice</h1>
                                        <h1 className='text-sm text-black/35'>Very Spicy</h1>
                                    </div>
                                </div>
                                <div className="w-full h-fit flex justify-between items-center">
                                    <div className="w-[20%] h-full font-jakarta font-semibold flex justify-center items-center text-black/55 text-xl">
                                        <h1>1x</h1>
                                    </div>
                                    <div className="w-[75%] h-full flex flex-col justify-start items-start font-jakarta font-semibold  ">
                                        <h1 className='text-xl text-black/55 '>Fried Rice</h1>
                                        <h1 className='text-sm text-black/35'>Very Spicy</h1>
                                    </div>
                                </div>
                                <div className="w-full h-fit flex justify-between items-center">
                                    <div className="w-[20%] h-full font-jakarta font-semibold flex justify-center items-center text-black/55 text-xl">
                                        <h1>1x</h1>
                                    </div>
                                    <div className="w-[75%] h-full flex flex-col justify-start items-start font-jakarta font-semibold  ">
                                        <h1 className='text-xl text-black/55 '>Fried Rice</h1>
                                        <h1 className='text-sm text-black/35'>Very Spicy</h1>
                                    </div>
                                </div>
                                <div className="w-full h-fit flex justify-between items-center">
                                    <div className="w-[20%] h-full font-jakarta font-semibold flex justify-center items-center text-black/55 text-xl">
                                        <h1>1x</h1>
                                    </div>
                                    <div className="w-[75%] h-full flex flex-col justify-start items-start font-jakarta font-semibold  ">
                                        <h1 className='text-xl text-black/55 '>Fried Rice</h1>
                                        <h1 className='text-sm text-black/35'>Very Spicy</h1>
                                    </div>
                                </div>
                                {/* End Menu List */}
                            </div>
                            <div className="w-full h-fit flex justify-between items-center px-3 py-2 gap-4">
                                <button type="submit" className='w-fit gap-3 h-fit px-5 py-2 flex justify-between items-center text-2xl text-blue-700 font-jakarta font-semibold bg-white boder-solid border-2 border-blue-700 rounded-xl'>Details <EyeIcon className='size-5' /></button>
                                <button type="submit" className='w-fit gap-3 h-fit px-5 py-2 flex justify-between items-center text-2xl text-white font-jakarta font-semibold bg-blue-700 boder-solid border-2 border-blue-700 rounded-xl'>Progress <PlayIcon className='size-5 fill-white' /></button>
                            </div>
                        </div>
                        <div className=" w-90 h-fit rounded-xl border-2 border-solid border-black/15 flex flex-col">
                            <div className="w-full h-fit ">
                                {/* head order start */}
                                <div className="w-full h-fit flex justify-between items-center py-3 px-5">
                                    <h1 className='text-blue-500 text-4xl font-jakarta font-semibold '>#0002</h1>
                                    <div className="w-fit h-8 rounded-xl bg-blue-200 text-blue-500 flex justify-center items-center px-3 py-2">
                                        <h1 className='font-jakarta font-semibold '>In Progress</h1>
                                    </div>
                                </div>
                                <div className="w-full h-fit flex justify-between items-center px-5 py-3">
                                    <div className="w-fit h-fit flex justify-between items-center gap-3">
                                        <UserIcon className='size-6 text-black/55' />
                                        <h1 className='font-jakarta font-semibold text-lg text-black/55'>Yire</h1>
                                    </div>
                                    <div className="w-fit h-fit flex justify-between items-center gap-3">
                                        <ClockIcon className='size-6 text-black/55' />
                                        <h1 className='font-jakarta font-semibold text-lg text-black/55'>13:44</h1>
                                    </div>


                                </div>
                                {/* head order start */}

                            </div>
                            <div className="w-full h-0.5 bg-black/15"></div>
                            <div className="w-full h-80 overflow-x-hidden overflow-y-auto scrollbar-hide px-3 py-2 flex flex-col gap-4">
                                {/* Start Menu List */}
                                <div className="w-full h-fit flex justify-between items-center">
                                    <div className="w-[20%] h-full font-jakarta font-semibold flex justify-center items-center text-black/55 text-xl">
                                        <h1>1x</h1>
                                    </div>
                                    <div className="w-[75%] h-full flex flex-col justify-start items-start font-jakarta font-semibold  ">
                                        <h1 className='text-xl text-black/55 '>Americano</h1>
                                        <h1 className='text-sm text-black/35'>No Ice, Less Sugar</h1>
                                    </div>
                                </div>
                                <div className="w-full h-fit flex justify-between items-center">
                                    <div className="w-[20%] h-full font-jakarta font-semibold flex justify-center items-center text-black/55 text-xl">
                                        <h1>1x</h1>
                                    </div>
                                    <div className="w-[75%] h-full flex flex-col justify-start items-start font-jakarta font-semibold  ">
                                        <h1 className='text-xl text-black/55 '>Fried Rice</h1>
                                        <h1 className='text-sm text-black/35'>Very Spicy</h1>
                                    </div>
                                </div>
                                <div className="w-full h-fit flex justify-between items-center">
                                    <div className="w-[20%] h-full font-jakarta font-semibold flex justify-center items-center text-black/55 text-xl">
                                        <h1>1x</h1>
                                    </div>
                                    <div className="w-[75%] h-full flex flex-col justify-start items-start font-jakarta font-semibold  ">
                                        <h1 className='text-xl text-black/55 '>Fried Rice</h1>
                                        <h1 className='text-sm text-black/35'>Very Spicy</h1>
                                    </div>
                                </div>
                                <div className="w-full h-fit flex justify-between items-center">
                                    <div className="w-[20%] h-full font-jakarta font-semibold flex justify-center items-center text-black/55 text-xl">
                                        <h1>1x</h1>
                                    </div>
                                    <div className="w-[75%] h-full flex flex-col justify-start items-start font-jakarta font-semibold  ">
                                        <h1 className='text-xl text-black/55 '>Fried Rice</h1>
                                        <h1 className='text-sm text-black/35'>Very Spicy</h1>
                                    </div>
                                </div>
                                <div className="w-full h-fit flex justify-between items-center">
                                    <div className="w-[20%] h-full font-jakarta font-semibold flex justify-center items-center text-black/55 text-xl">
                                        <h1>1x</h1>
                                    </div>
                                    <div className="w-[75%] h-full flex flex-col justify-start items-start font-jakarta font-semibold  ">
                                        <h1 className='text-xl text-black/55 '>Fried Rice</h1>
                                        <h1 className='text-sm text-black/35'>Very Spicy</h1>
                                    </div>
                                </div>
                                <div className="w-full h-fit flex justify-between items-center">
                                    <div className="w-[20%] h-full font-jakarta font-semibold flex justify-center items-center text-black/55 text-xl">
                                        <h1>1x</h1>
                                    </div>
                                    <div className="w-[75%] h-full flex flex-col justify-start items-start font-jakarta font-semibold  ">
                                        <h1 className='text-xl text-black/55 '>Fried Rice</h1>
                                        <h1 className='text-sm text-black/35'>Very Spicy</h1>
                                    </div>
                                </div>
                                {/* End Menu List */}
                            </div>
                            <div className="w-full h-fit flex justify-between items-center px-3 py-2 gap-4">
                                <button type="submit" className='w-fit gap-3 h-fit px-5 py-2 flex justify-between items-center text-2xl text-blue-700 font-jakarta font-semibold bg-white boder-solid border-2 border-blue-700 rounded-xl'>Details <EyeIcon className='size-5' /></button>
                                <button type="submit" className='w-fit gap-3 h-fit px-5 py-2 flex justify-between items-center text-2xl text-blue-700 font-jakarta font-semibold bg-white boder-solid border-2 border-blue-700 rounded-xl'>Finished <HandThumbUpIcon className='size-5 fill-blue-700' /></button>
                            </div>
                        </div>
                        {/* cards end */}
                    </div>


                </div>

            </div>

        </div>
    )
}

export default Kitchen
