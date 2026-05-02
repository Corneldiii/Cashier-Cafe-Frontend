import React from 'react'
import Navbar from '../components/Navbar'
import {
    ArrowsPointingOutIcon,
    ArrowRightStartOnRectangleIcon,
    BellIcon,
    WalletIcon,
    ArrowDownOnSquareIcon,
    ArrowTrendingUpIcon,
    ShoppingBagIcon,
    ArrowUpIcon,
    ArrowDownIcon
} from '@heroicons/react/24/outline';

const Employee = () => {
    return (
        <div>
            <Navbar pageID={5} />
            <div className="w-full h-fit overflow-x-hidden">
                <div className="w-[96%] h-fit ml-0 sm:ml-10 lg:ml-20 scrollbar-hide px-2 sm:px-0 lg">
                    {/* Header */}
                    <div className="w-full h-fit px-3 sm:px-5 py-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
                        <div className="w-full lg:w-fit h-fit flex flex-col justify-center items-center sm:items-start lg:items-start">
                            <h1 className='text-lg sm:text-xl md:text-2xl font-jakarta font-semibold'>Hello Good Morning, Owner</h1>
                            <h1 className='font-jakarta text-sm sm:text-sm md:text-base'>Here's what's happening with your cafe today.</h1>
                        </div>
                        <div className="w-full sm:w-fit h-full flex justify-between sm:justify-end items-center gap-3 sm:gap-4 md:gap-5">
                            <div className="relative w-fit h-fit">
                                <BellIcon className='size-8 sm:size-9 md:size-10 text-gray-500' />
                                <div className="absolute bg-blue-700 text-white flex justify-center items-center font-jakarta font-semibold rounded-full w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-xs sm:text-xs md:text-sm top-0 right-0">3</div>
                            </div>
                            <input type="date" name="" id="" className='border-2 border-solid border-black/20 rounded-xl text-sm sm:text-sm md:text-base' />
                            <button type="button" className='rounded-full p-2 sm:p-2 md:p-3 bg-white flex gap-2 sm:gap-2 md:gap-3 font-jakarta font-semibold justify-center items-center text-gray-500 text-sm sm:text-sm md:text-base'>
                                <ArrowRightStartOnRectangleIcon className='size-5 sm:size-5 md:size-6 text-gray-500' /> Logout
                            </button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 h-fit px-3 sm:px-4 md:px-5 py-2 gap-3 md:gap-4 justify-items-center">
                        {/* Card 1 - Income */}
                        <div className="w-full h-fit sm:h-36 md:h-45 border-2 border-solid border-black/10 rounded-2xl shadow-lg px-4 sm:px-4 md:px-5 py-4 sm:py-2 flex justify-between items-center gap-5 sm:gap-6 md:gap-10">
                            <div className="w-fit h-full flex justify-center items-center">
                                <div className="rounded-full w-16 h-16 sm:w-20 sm:h-20 md:w-25 md:h-25 bg-blue-100 flex justify-center items-center">
                                    <WalletIcon className='size-9 sm:size-11 md:size-13 text-blue-600' />
                                </div>
                            </div>
                            <div className="w-full h-full flex flex-col justify-center items-start gap-2 sm:gap-3 md:gap-5">
                                <h1 className='text-base sm:text-lg md:text-2xl font-jakarta text-gray-500'>Income This Month</h1>
                                <h1 className='text-2xl sm:text-3xl md:text-4xl font-jakarta font-bold'>Rp. 12.561.500</h1>
                                <div className="text-sm sm:text-base md:text-lg font-jakarta text-gray-500 font-semibold flex gap-2 justify-center items-center">
                                    <ArrowUpIcon className='size-4 sm:size-4 md:size-5 text-green-400' />
                                    <h1 className='text-green-400'>12.5%</h1>
                                    <h1>from last month</h1>
                                </div>
                            </div>
                        </div>

                        {/* Card 2 - Expenses */}
                        <div className="w-full h-fit sm:h-36 md:h-45 border-2 border-solid border-black/10 rounded-2xl shadow-lg px-4 sm:px-4 md:px-5 py-4 sm:py-2 flex justify-between items-center gap-5 sm:gap-6 md:gap-10">
                            <div className="w-fit h-full flex justify-center items-center">
                                <div className="rounded-full w-16 h-16 sm:w-20 sm:h-20 md:w-25 md:h-25 bg-green-100 flex justify-center items-center">
                                    <ArrowDownOnSquareIcon className='size-9 sm:size-11 md:size-13 text-green-600' />
                                </div>
                            </div>
                            <div className="w-full h-full flex flex-col justify-center items-start gap-2 sm:gap-3 md:gap-5">
                                <h1 className='text-base sm:text-lg md:text-2xl font-jakarta text-gray-500'>Expenses This Month</h1>
                                <h1 className='text-2xl sm:text-3xl md:text-4xl font-jakarta font-bold'>Rp. 1.561.500</h1>
                                <div className="text-sm sm:text-base md:text-lg font-jakarta text-gray-500 font-semibold flex gap-2 justify-center items-center">
                                    <ArrowDownIcon className='size-4 sm:size-4 md:size-5 text-red-700' />
                                    <h1 className='text-red-700'>2.5%</h1>
                                    <h1>from last month</h1>
                                </div>
                            </div>
                        </div>

                        {/* Card 3 - Trending */}
                        <div className="w-full h-fit sm:h-36 md:h-45 border-2 border-solid border-black/10 rounded-2xl shadow-lg px-4 sm:px-4 md:px-5 py-4 sm:py-2 flex justify-between items-center gap-5 sm:gap-6 md:gap-10">
                            <div className="w-fit h-full flex justify-center items-center">
                                <div className="rounded-full w-16 h-16 sm:w-20 sm:h-20 md:w-25 md:h-25 bg-green-100 flex justify-center items-center">
                                    <ArrowTrendingUpIcon className='size-9 sm:size-11 md:size-13 text-green-600' />
                                </div>
                            </div>
                            <div className="w-full h-full flex flex-col justify-center items-start gap-2 sm:gap-3 md:gap-5">
                                <h1 className='text-base sm:text-lg md:text-2xl font-jakarta text-gray-500'>Income This Month</h1>
                                <h1 className='text-2xl sm:text-3xl md:text-4xl font-jakarta font-bold'>Rp. 12.561.500</h1>
                                <div className="text-sm sm:text-base md:text-lg font-jakarta text-gray-500 font-semibold flex gap-2 justify-center items-center">
                                    <ArrowUpIcon className='size-4 sm:size-4 md:size-5 text-green-400' />
                                    <h1 className='text-green-400'>12.5%</h1>
                                    <h1>from last month</h1>
                                </div>
                            </div>
                        </div>

                        {/* Card 4 - Shopping */}
                        <div className="w-full h-fit sm:h-36 md:h-45 border-2 border-solid border-black/10 rounded-2xl shadow-lg px-4 sm:px-4 md:px-5 py-4 sm:py-2 flex justify-between items-center gap-5 sm:gap-6 md:gap-10">
                            <div className="w-fit h-full flex justify-center items-center">
                                <div className="rounded-full w-16 h-16 sm:w-20 sm:h-20 md:w-25 md:h-25 bg-blue-100 flex justify-center items-center">
                                    <ShoppingBagIcon className='size-9 sm:size-11 md:size-13 text-blue-600' />
                                </div>
                            </div>
                            <div className="w-full h-full flex flex-col justify-center items-start gap-2 sm:gap-3 md:gap-5">
                                <h1 className='text-base sm:text-lg md:text-2xl font-jakarta text-gray-500'>Income This Month</h1>
                                <h1 className='text-2xl sm:text-3xl md:text-4xl font-jakarta font-bold'>Rp. 12.561.500</h1>
                                <div className="text-sm sm:text-base md:text-lg font-jakarta text-gray-500 font-semibold flex gap-2 justify-center items-center">
                                    <ArrowUpIcon className='size-4 sm:size-4 md:size-5 text-green-400' />
                                    <h1 className='text-green-400'>12.5%</h1>
                                    <h1>from last month</h1>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Charts Row 1 */}
                    <div className="w-full h-fit sm:h-80 md:h-100 grid grid-cols-1 sm:grid-cols-2 px-4 sm:px-5 md:px-7 py-2 gap-5 mt-5 sm:mt-8 md:mt-10">
                        <div className="w-full h-48 sm:h-full border-solid border-2 border-black/10 rounded-2xl shadow-lg">
                            <div className="w-full h-full"></div>
                        </div>
                        <div className="w-full h-48 sm:h-full border-solid border-2 border-black/10 rounded-2xl shadow-lg">
                            <div className="w-full h-full"></div>
                        </div>
                    </div>

                    {/* Charts Row 2 */}
                    <div className="w-full h-fit sm:h-100 md:h-150 grid grid-cols-1 sm:grid-cols-2 px-4 sm:px-5 md:px-7 py-2 gap-5 my-5 sm:my-8 md:my-10">
                        <div className="w-full h-48 sm:h-full border-solid border-2 border-black/10 rounded-2xl shadow-lg">
                            <div className="w-full h-full"></div>
                        </div>
                        <div className="w-full h-48 sm:h-full border-solid border-2 border-black/10 rounded-2xl shadow-lg">
                            <div className="w-full h-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Employee