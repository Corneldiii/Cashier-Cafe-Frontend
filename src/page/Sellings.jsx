import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Coins, LineChart } from "lucide-react";
import { ShoppingCartIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import "flowbite"
import { Table } from "flowbite-react";

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


const Sellings = () => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer);
  }, [])


  return (
    <div>
      <Navbar></Navbar>

      <div className="w-screen h-screen overflow-y-scroll overflow-x-hidden">
        <div className="w-[96%] ml-20 h-full">

          <div className="w-[90%] h-25 mt-20 bg-sky-400 p-5 flex justify-between items-center">

            <div className="flex gap-10 justify-start items-center">
              <h1 className='text-7xl font-extrabold text-white'>D A I L Y </h1>
              <h1 className='text-7xl font-extrabold text-white'>S A L E S</h1>
              <h1 className='text-7xl font-extrabold text-white'>R E P O R T</h1>
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
          {/* recap sales */}

          <div className="w-full h-full ">
            <div className="grid grid-cols-12">
              <div className="col-span-9">
                <div className="grid grid-cols-12 gap-10 p-10 pr-10 ">
                  {/* top display */}
                  <div className="col-span-4 bg-white shadow-xl border-4 border-black/5 border-solid rounded-2xl w-110 h-55 p-5">
                    <div className="flex justify-between items-center">
                      <div className="w-15 h-15 rounded-2xl bg-sky-100 flex justify-center items-center">
                        <Coins className='text-black size-8' />
                      </div>
                      <div className="w-full h-fit text-center">
                        <h1 className='text-2xl font-semibold '>Total Income For Today</h1>
                      </div>
                    </div>
                    <div className="w-full h-fit text-center mt-5">
                      <h1 className='text-5xl font-bold'>Rp. 4.986.900</h1>
                    </div>
                    <div className="w-full h-fit text-green-500 text-2xl font-semibold mt-5">+12%</div>
                  </div>
                  <div className="col-span-4 bg-white shadow-xl border-4 border-black/5 border-solid rounded-2xl w-110 h-55 p-5">
                    <div className="flex justify-between items-center">
                      <div className="w-15 h-15 rounded-2xl bg-sky-100 flex justify-center items-center">
                        <ShoppingCartIcon className='text-black size-8' />
                      </div>
                      <div className="w-full h-fit text-center">
                        <h1 className='text-2xl font-semibold '>Total Order For Today</h1>
                      </div>
                    </div>
                    <div className="w-full h-fit text-center mt-5">
                      <h1 className='text-5xl font-bold'>102</h1>
                    </div>
                    <div className="w-full h-fit text-red-900 text-2xl font-semibold mt-5">-2%</div>
                  </div>
                  <div className="col-span-4 bg-white shadow-xl border-4 border-black/5 border-solid rounded-2xl w-110 h-55 p-5">
                    <div className="flex justify-between items-center">
                      <div className="w-15 h-15 rounded-2xl bg-sky-100 flex justify-center items-center">
                        <ChartBarIcon className='text-black size-8' />
                      </div>
                      <div className="w-full h-fit text-center">
                        <h1 className='text-2xl font-semibold '>Average Transaction</h1>
                      </div>
                    </div>
                    <div className="w-full h-fit text-center mt-5">
                      <h1 className='text-5xl font-bold'>Rp. 40.500</h1>
                    </div>
                    <div className="w-full h-fit text-green-500 text-2xl font-semibold mt-5">+6%</div>
                  </div>
                  {/* end top display */}
                </div>

                {/* Chart Start */}
                <div className="w-full p-10 pr-15 h-fit">
                  <div className="w-full h-74 bg-white p-5 rounded-2xl shadow-2xl border-4 border-black/5 border-solid pb-15 ">
                    <h2 className="text-3xl font-semibold mb-3">
                      Hourly Sales Trend Today
                    </h2>

                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data}>
                        <defs>
                          <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.05} />
                          </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" opacity={1} />

                        <XAxis dataKey="time" tick={{ fontSize: 22 }} />
                        <YAxis tick={{ fontSize: 15 }} />

                        <Tooltip />

                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="#38bdf8"
                          strokeWidth={3}
                          fill="url(#colorBlue)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                {/* chart end */}

                <div className="w-full h-fit p-10 pr-15">
                  {/* Table start */}
                  <div className="w-full h-100 bg-white shadow-2xl border-solid border-4 border-black/5 rounded-2xl">

                  </div>
                  {/* Table ends */}
                </div>
              </div>

              <div className="col-span-3 w-full h-full p-10">
                <div className="flex flex-col gap-10 justify-center items-center">
                  <h1 className='font-extrabold text-sky-700 text-4xl '>F A V O R I T E S</h1>
                  <div className="w-full h-20 bg-white rounded-2xl shadow-2xl border-4 border-solid flex justify-between items-center border-black/5 py-10 px-5">
                    <div className="w-15 h-15 bg-gray-600 rounded-2xl"></div>
                    <h1 className='font-semibold text-2xl '>Americano</h1>
                    <h1 className='font-semibold text-xl text-black/30 line-clamp-2 w-25'>125 Cups Sold</h1>
                  </div>
                  <div className="w-full h-20 bg-white rounded-2xl shadow-2xl border-4 border-solid flex justify-between items-center border-black/5 py-10 px-5">
                    <div className="w-15 h-15 bg-gray-600 rounded-2xl"></div>
                    <h1 className='font-semibold text-2xl '>Americano</h1>
                    <h1 className='font-semibold text-xl text-black/30 line-clamp-2 w-25'>125 Plates Sold</h1>
                  </div>
                </div>
              </div>
            </div>


          </div>


        </div>

      </div>
    </div>
  )
}

export default Sellings
