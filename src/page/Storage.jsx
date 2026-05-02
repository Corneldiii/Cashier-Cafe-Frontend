import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import {
  CubeIcon,
} from '@heroicons/react/24/outline';
import Table from "../components/table/Table";
import { columns } from "../components/table/Columns";

const data = [
    { name: "Coffee Beans", stock: 20, category: "Raw Material" },
    { name: "Milk", stock: 10, category: "Dairy" },
    { name: "Sugar", stock: 5, category: "Ingredients" },
  ];

const Storage = () => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
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
      <Navbar pageID={2}></Navbar>
      <div className="w-screen h-fit overflow-x-hidden">
        <div className="h-screen w-[96%] ml-20 flex flex-col">
          <div className="w-[90%] h-25 mt-10 bg-sky-400 p-5 flex justify-between items-center">
            <div className="flex gap-10 justify-start items-center">
              <h1 className='text-7xl font-extrabold text-white'>L O G I S T I C S </h1>
              <h1 className='text-7xl font-extrabold text-white'>M A N A G E M E N T</h1>
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

          <div className="w-full h-screen grid p-10">
            {/* bagian atas */}
            <div className="row-span-1">
              <div className="w-full h-full grid grid-cols-12 justify-items-center items-center">
                {/* card */}
                <div className="col-span-3 w-115 h-35 bg-white rounded-3xl shadow-2xl border-4 border-solid border-black/5 flex justify-between items-center px-5 py-2 gap-10">
                  <div className="w-25 h-25 bg-green-100 rounded-2xl flex justify-center items-center">
                    <CubeIcon className='size-15 text-amber-700 ' />
                  </div>
                  <div className="w-70 h-25 flex flex-col justify-start items-start gap-1">
                    <h1 className='text-gray-500 font-semibold'>Total Items</h1>
                    <h1 className='font-mono font-semibold text-5xl text-center'>123</h1>
                    <h1 className=' font-semibold text-gray-500'>All Materials and Goods</h1>
                  </div>
                </div>
                <div className="col-span-3 w-115 h-35 bg-white rounded-3xl shadow-2xl border-4 border-solid border-black/5 flex justify-between items-center px-5 py-2 gap-10">
                  <div className="w-25 h-25 bg-green-100 rounded-2xl flex justify-center items-center">
                    <CubeIcon className='size-15 text-amber-700 ' />
                  </div>
                  <div className="w-70 h-25 flex flex-col justify-start items-start gap-1">
                    <h1 className='text-gray-500 font-semibold'>Total Items</h1>
                    <h1 className='font-mono font-semibold text-5xl text-center'>123</h1>
                    <h1 className=' font-semibold text-gray-500'>All Materials and Goods</h1>
                  </div>
                </div>
                <div className="col-span-3 w-115 h-35 bg-white rounded-3xl shadow-2xl border-4 border-solid border-black/5 flex justify-between items-center px-5 py-2 gap-10">
                  <div className="w-25 h-25 bg-green-100 rounded-2xl flex justify-center items-center">
                    <CubeIcon className='size-15 text-amber-700 ' />
                  </div>
                  <div className="w-70 h-25 flex flex-col justify-start items-start gap-1">
                    <h1 className='text-gray-500 font-semibold'>Total Items</h1>
                    <h1 className='font-mono font-semibold text-5xl text-center'>123</h1>
                    <h1 className=' font-semibold text-gray-500'>All Materials and Goods</h1>
                  </div>
                </div>
                <div className="col-span-3 w-115 h-35 bg-white rounded-3xl shadow-2xl border-4 border-solid border-black/5 flex justify-between items-center px-5 py-2 gap-10">
                  <div className="w-25 h-25 bg-green-100 rounded-2xl flex justify-center items-center">
                    <CubeIcon className='size-15 text-amber-700 ' />
                  </div>
                  <div className="w-70 h-25 flex flex-col justify-start items-start gap-1">
                    <h1 className='text-gray-500 font-semibold'>Total Items</h1>
                    <h1 className='font-mono font-semibold text-5xl text-center'>123</h1>
                    <h1 className=' font-semibold text-gray-500'>All Materials and Goods</h1>
                  </div>
                </div>
                {/* card */}
              </div>
            </div>
            {/* bagian atas selesai */}
            <div className="row-span-10 mt-10">
              <div className="w-full h-full grid grid-cols-12 gap-10 p-5">
                <div className="col-span-9 ">
                  <div className="w-full h-250 shadow-2xl border-4 border-solid border-black/5 rounded-3xl">
                  
                  </div>
                </div>
                <div className="col-span-3 flex flex-col gap-10 ">
                  <div className="w-full h-fit shadow-2xl border-4 border-solid border-black/5 rounded-3xl flex flex-col gap-5 p-5">
                    <div className="w-full h-fit flex flex-col gap-5 ">
                      <div className="flex justify-between items-center">
                        <div className="w-20 h-20 bg-gray-300 rounded-2xl"></div>
                        <div className="flex flex-col justify-center items-start gap-2">
                          <h1 className='text-xl font- font-semibold'>Susuh UHT Full Cream</h1>
                          <div className="flex gap-2">
                            <h1 className='text-sm  font-semibold'>Dairy</h1>
                            <h1 className='text-sm font-extrabold'>•</h1>
                            <h1 className='text-sm font-semibold'>Liter</h1>
                          </div>
                        </div>
                        <div className="w-20 h-10 bg-green-300 font-bold flex justify-center items-center text-green-600 rounded-3xl">Aman</div>
                      </div>
                      <div className="w-full h-0.5 bg-black/10 rounded-4xl"></div>
                    </div>

                    <div className="w-full h-full flex flex-col justify-start items-start gap-3">
                      <h1 className='font-semibold text-xl'>Stock Informations</h1>
                      <div className="w-full h-fit flex justify-between items-center">
                        <h1 className='font-semibold text-gray-400 text-xl'>Stock Saat Ini</h1>
                        <div className="flex gap-2">
                          <h1 className='font-semibold text-xl'>10</h1>
                          <h1 className='font-semibold  text-xl'>Liter</h1>
                        </div>
                      </div>
                      <div className="w-full h-fit flex justify-between items-center">
                        <h1 className='font-semibold text-gray-400 text-xl'>Stock Minimum</h1>
                        <div className="flex gap-2">
                          <h1 className='font-semibold text-xl'>3</h1>
                          <h1 className='font-semibold  text-xl'>Liter</h1>
                        </div>
                      </div>
                      <div className="w-full h-fit flex justify-between items-center">
                        <h1 className='font-semibold text-gray-400 text-xl'>Stock Maximum</h1>
                        <div className="flex gap-2">
                          <h1 className='font-semibold text-xl'>10</h1>
                          <h1 className='font-semibold  text-xl'>Liter</h1>
                        </div>
                      </div>
                      <div className="w-full h-fit flex justify-between items-center">
                        <h1 className='font-semibold text-gray-400 text-xl'>Unit</h1>
                        <h1 className='font-semibold  text-xl'>Liter</h1>
                      </div>
                      <div className="w-full h-fit flex justify-between items-center">
                        <h1 className='font-semibold text-gray-400 text-xl'>Tipe</h1>
                        <h1 className='font-semibold  text-xl'>Materials</h1>
                      </div>
                      <div className="w-full h-fit flex justify-between items-center">
                        <h1 className='font-semibold text-gray-400 text-xl'>Storage Location</h1>
                        <h1 className='font-semibold  text-xl'>Refrigerator 1</h1>
                      </div>


                    </div>

                  </div>
                  <div className="w-full h-130 shadow-2xl border-4 border-solid border-black/5 rounded-3xl"></div>

                </div>
              </div>
            </div>
          </div>


        </div>
      </div>


    </div>
  )
}

export default Storage
