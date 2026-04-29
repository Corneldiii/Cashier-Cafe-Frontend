import React from 'react'

const Menu = () => {
  return (
    <div className='bg-blue-200 w-screen h-screen lg:p-10'>
      <div className="grid grid-cols-12 lg:visible w-full h-full gap-10">
        <div className="col-span-3 bg-white w-full h-full rounded-2xl p-5 flex flex-col items-center justify-start gap-10">
          <input type="text" name="searchMenu" className='w-full h-10 bg-blue-300 p-5 rounded-2xl' placeholder='Search Menu' id="" />

          <h1 className='text-4xl font-mono font-bold'>Pesanan</h1>

          <div className="flex flex-col w-full h-120 justify-start p-5 overflow-y-scroll gap-5 border-solid border-3 border-olive-200 rounded-tl-4xl rounded-bl-4xl">
            <div className="flex flex-col w-full h-fit">
              <div className="  w-full h-15 rounded-4xl flex justify-between items-center gap-5 px-2 py-2 ">
                <h1 className='font-bold text-black text-lg'>5X</h1>
                <div className="w-0.5 h-full bg-black opacity-40 "></div>
                <div className="w-13 h-13 bg-gray-600 rounded-2xl"></div>
                <h1 className='font-mono text-xl font-bold'>Americano</h1>
                <h1 className='font-mono text-lg'>RP.60.000</h1>
              </div>
              <div className="w-full h-0.5 bg-black opacity-30 mt-2 mb-2"></div>
            </div>
          </div>

          <div className=" w-full h-fit flex-col justify-between item-center">
            <div className="font-mono text-2xl flex justify-between">
              <h1>Total Items</h1>
              <h1>6</h1>
            </div>
            <div className="font-mono text-2xl  flex justify-between">
              <h1>Total Amount</h1>
              <h1>Rp 120.000</h1>
            </div>
            <div className="w-full h-0.5 bg-black opacity-30 mt-5 mb-5"></div>
            <div className="font-mono text-2xl  flex justify-between">
              <h1>Sub Total</h1>
              <h1>Rp 120.000</h1>
            </div>
            <div className="font-mono text-2xl  flex justify-between">
              <h1>Tax(10%)</h1>
              <h1>Rp 12.000</h1>
            </div>

            <button type="submit" className='w-full h-15 rounded-2xl bg-blue-200 text-white text-center mt-10 mb-5 text-3xl font-bold cursor-pointer hover:bg-blue-500 transition-colors duration-300'> Proceed To Payment</button>
            <div className="font-mono text-2xl  flex justify-center item-center gap-5">
              <h1>Total: </h1>
              <h1>Rp 112.000</h1>
            </div>


          </div>

        </div>
        <div className="col-span-9 bg-white w-full h-full rounded-2xl overflow-y-scroll">
          <div className="grid grid-cols-12 w-full h-full lg:p-10 gap-5">
            <div id='content-menu' className="col-span-3 bg-blue-300 lg:h-80 lg:w-80 rounded-2xl flex flex-col items-center justify-center hover:shadow-2xl transition-shadow duration-300 cursor-pointer ">
              <div className="bg-white lg:h-40 lg:w-40 rounded-full"></div>
              <h1 className='font-mono text-3xl mt-10 font-bold'>Americano</h1>
              <h1 className='text-xl font-mono '>Rp. 12.000</h1>
            </div>
            <div id='content-menu' className="col-span-3 bg-blue-300 lg:h-80 lg:w-80 rounded-2xl flex flex-col items-center justify-center hover:shadow-2xl transition-shadow delay-100 cursor-pointer ">
              <div className="bg-white lg:h-40 lg:w-40 rounded-full"></div>
              <h1 className='font-mono text-3xl mt-10 font-bold'>Americano</h1>
              <h1 className='text-xl font-mono '>Rp. 12.000</h1>
            </div>
            <div id='content-menu' className="col-span-3 bg-blue-300 lg:h-80 lg:w-80 rounded-2xl flex flex-col items-center justify-center hover:shadow-2xl transition-shadow delay-100 cursor-pointer ">
              <div className="bg-white lg:h-40 lg:w-40 rounded-full"></div>
              <h1 className='font-mono text-3xl mt-10 font-bold'>Americano</h1>
              <h1 className='text-xl font-mono '>Rp. 12.000</h1>
            </div>
            <div id='content-menu' className="col-span-3 bg-blue-300 lg:h-80 lg:w-80 rounded-2xl flex flex-col items-center justify-center hover:shadow-2xl transition-shadow delay-100 cursor-pointer ">
              <div className="bg-white lg:h-40 lg:w-40 rounded-full"></div>
              <h1 className='font-mono text-3xl mt-10 font-bold'>Americano</h1>
              <h1 className='text-xl font-mono '>Rp. 12.000</h1>
            </div>
            <div id='content-menu' className="col-span-3 bg-blue-300 lg:h-80 lg:w-80 rounded-2xl flex flex-col items-center justify-center hover:shadow-2xl transition-shadow delay-100 cursor-pointer ">
              <div className="bg-white lg:h-40 lg:w-40 rounded-full"></div>
              <h1 className='font-mono text-3xl mt-10 font-bold'>Americano</h1>
              <h1 className='text-xl font-mono '>Rp. 12.000</h1>
            </div>
            <div id='content-menu' className="col-span-3 bg-blue-300 lg:h-80 lg:w-80 rounded-2xl flex flex-col items-center justify-center hover:shadow-2xl transition-shadow delay-100 cursor-pointer ">
              <div className="bg-white lg:h-40 lg:w-40 rounded-full"></div>
              <h1 className='font-mono text-3xl mt-10 font-bold'>Americano</h1>
              <h1 className='text-xl font-mono '>Rp. 12.000</h1>
            </div>
            <div id='content-menu' className="col-span-3 bg-blue-300 lg:h-80 lg:w-80 rounded-2xl flex flex-col items-center justify-center hover:shadow-2xl transition-shadow delay-100 cursor-pointer ">
              <div className="bg-white lg:h-40 lg:w-40 rounded-full"></div>
              <h1 className='font-mono text-3xl mt-10 font-bold'>Americano</h1>
              <h1 className='text-xl font-mono '>Rp. 12.000</h1>
            </div>
            <div id='content-menu' className="col-span-3 bg-blue-300 lg:h-80 lg:w-80 rounded-2xl flex flex-col items-center justify-center hover:shadow-2xl transition-shadow delay-100 cursor-pointer ">
              <div className="bg-white lg:h-40 lg:w-40 rounded-full"></div>
              <h1 className='font-mono text-3xl mt-10 font-bold'>Americano</h1>
              <h1 className='text-xl font-mono '>Rp. 12.000</h1>
            </div>
            <div id='content-menu' className="col-span-3 bg-blue-300 lg:h-80 lg:w-80 rounded-2xl flex flex-col items-center justify-center hover:shadow-2xl transition-shadow delay-100 cursor-pointer ">
              <div className="bg-white lg:h-40 lg:w-40 rounded-full"></div>
              <h1 className='font-mono text-3xl mt-10 font-bold'>Americano</h1>
              <h1 className='text-xl font-mono '>Rp. 12.000</h1>
            </div>
            <div id='content-menu' className="col-span-3 bg-blue-300 lg:h-80 lg:w-80 rounded-2xl flex flex-col items-center justify-center hover:shadow-2xl transition-shadow delay-100 cursor-pointer ">
              <div className="bg-white lg:h-40 lg:w-40 rounded-full"></div>
              <h1 className='font-mono text-3xl mt-10 font-bold'>Americano</h1>
              <h1 className='text-xl font-mono '>Rp. 12.000</h1>
            </div>
            <div id='content-menu' className="col-span-3 bg-blue-300 lg:h-80 lg:w-80 rounded-2xl flex flex-col items-center justify-center hover:shadow-2xl transition-shadow delay-100 cursor-pointer ">
              <div className="bg-white lg:h-40 lg:w-40 rounded-full"></div>
              <h1 className='font-mono text-3xl mt-10 font-bold'>Americano</h1>
              <h1 className='text-xl font-mono '>Rp. 12.000</h1>
            </div>
            <div id='content-menu' className="col-span-3 bg-blue-300 lg:h-80 lg:w-80 rounded-2xl flex flex-col items-center justify-center hover:shadow-2xl transition-shadow delay-100 cursor-pointer ">
              <div className="bg-white lg:h-40 lg:w-40 rounded-full"></div>
              <h1 className='font-mono text-3xl mt-10 font-bold'>Americano</h1>
              <h1 className='text-xl font-mono '>Rp. 12.000</h1>
            </div>
            <div id='content-menu' className="col-span-3 bg-blue-300 lg:h-80 lg:w-80 rounded-2xl flex flex-col items-center justify-center hover:shadow-2xl transition-shadow delay-100 cursor-pointer ">
              <div className="bg-white lg:h-40 lg:w-40 rounded-full"></div>
              <h1 className='font-mono text-3xl mt-10 font-bold'>Americano</h1>
              <h1 className='text-xl font-mono '>Rp. 12.000</h1>
            </div>
            <div id='content-menu' className="col-span-3 bg-blue-300 lg:h-80 lg:w-80 rounded-2xl flex flex-col items-center justify-center hover:shadow-2xl transition-shadow delay-100 cursor-pointer ">
              <div className="bg-white lg:h-40 lg:w-40 rounded-full"></div>
              <h1 className='font-mono text-3xl mt-10 font-bold'>Americano</h1>
              <h1 className='text-xl font-mono '>Rp. 12.000</h1>
            </div>

          </div>

        </div>
      </div>


    </div >
  )
}

export default Menu;
