import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import Modal from '../components/Modal';
import axios from "axios";

const Menu = () => {
  const [isOpen, SetIsOpen] = useState({
    id: null,
    isActive: false,
  });
  const [qty, setQty] = useState(1);
  const [cart, setCart] = useState([]);
  const [menus, setMenus] = useState([]);
  const [order, setOrder] = useState([])
  const [name, setName] = useState('');

  const [orderCode, setOrderCode] = useState(1127)

  useEffect(()=>{

  });

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/allMenus')
      .then(res => res.json())
      .then(data => setMenus(data))
  }, [])
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/countID')
      .then(res => res.json())
      .then(data => {
            const now = new Date();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const year = String(now.getFullYear());
            setOrderCode("ORD" + String(data) + month + year);
        });
  }, [])

  console.log(orderCode)



  const addQTY = () => {
    setQty(qty + 1)
  }
  const minQTY = () => {
    if (qty > 1) {
      setQty(qty - 1)
    }
  }

  const addCart = (menu, qty) => {
    let itemExists = false;

    const updatedCart = cart.map((item) => {
      if (item.id === menu.id) {
        itemExists = true;

        const newQty = item.qty + qty;
        const newSumPrice = calculateItemPrice(newQty, item.price);

        return {
          ...item,
          qty: newQty,
          sumPrice: newSumPrice,
        };
      }
      return item;
    });

    if (!itemExists) {
      const sumPrice = calculateItemPrice(qty, menu.price);

      updatedCart.push({
        id: menu.id,
        name: menu.name,
        price: menu.price,
        qty: qty,
        sumPrice: sumPrice,
      });
    }

    setCart(updatedCart);
  };


  const calculateItemPrice = (qty, price) => {
    const sumPrice = qty * price;
    return sumPrice;
  }

  const removeCart = (id, price) => {

    const updateCart = cart.map(item => {
      if (item.id === id) {
        const newQTY = item.qty - 1;

        return {
          ...item,
          qty: newQTY,
          sumPrice: item.sumPrice - price
        }

      }
      return item;
    })

    setCart(updateCart)
  }

  const calucalateAllItems = () => {
    let totalAmount = 0;
    cart.map(item => {
      totalAmount = totalAmount + item.sumPrice;
    })
    return totalAmount;
  }

  const calucalateAfterTax = (subPrice) => {
    let totalTax = 0;
    let afterTax = 0;

    totalTax = 0.11 * subPrice;
    afterTax = subPrice + totalTax

    return afterTax;
  }

  const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);
  const totalAmount = cart.reduce((amount, item) => amount + item.sumPrice, 0)

  const grandTotal = () => {
    let grand = totalAmount + totalAmount * 0.11;
    return grand;
  }



  // Payment - Midtrans
  const payNow = async () => {
    try {
      if (name !== '' && cart.length !== 0) {
        const res = await axios.post("http://localhost:8000/api/payment/create", {
          gross_amount: grandTotal(),
          name: name
        });
        const token = res.data.token;

        if (token) {

          const response = await axios.post("http://localhost:8000/api/payment/addOrders",{
            orderCode: orderCode ,
            totalPrice:123000,
            paymentMethod : 'cash',
            cashierId : 1,
            orderList : cart
            
          });



          window.snap.pay(token, {
            onSuccess: (result) => {
              console.log("SUCCESS:", result);
              setCart([])
              setName('')
            },
            onPending: (result) => {
              console.log("PENDING:", result);
            },
            onError: (result) => {
              console.log("ERROR:", result);
            },
            onClose: () => {
              alert("Popup closed!");
            }
          });
        }
      }
    } catch (error) {
      console.log(error)

    }
  };


  return (
    <div className='bg-blue-200 w-screen h-screen lg:p-10'>
      <Navbar pageID={1} ></Navbar>
      <div className="grid grid-cols-12 lg:visible w-full h-full gap-10">
        <div className="col-span-3 bg-white ml-15 w-110 h-full rounded-2xl p-5 flex flex-col items-center justify-start gap-10">

          <h1 className='text-4xl font-mono font-bold'>Pesanan</h1>

          <div className="flex w-full gap-5 h-fit justify-start items-center">
            <h1 className='text-xl font-jakarta font-semibold'>Name :</h1>
            <input type="text" name="" className='w-fit h-fit border-none bg-blue-100 rounded-xl text-lg font-jakarta font-semibold text-gray-400' placeholder='Input Customer Name' id=""
              onChange={(e) => {
                setName(e.target.value)
              }}
            />
          </div>

          <div className="flex flex-col w-full h-120 justify-start p-5 overflow-y-scroll gap-5 border-solid border-3 border-olive-200 rounded-2xl scrollbar-hide">
            {
              cart.map(item => {
                return (
                  <div className="flex flex-col w-full h-fit">
                    <div className="  w-full h-15 rounded-4xl flex justify-between items-center gap-5 px-2 py-2 ">
                      <h1 className='font-bold text-black text-lg'>{item.qty}x</h1>
                      <div className="w-0.5 h-full bg-black opacity-40 "></div>
                      <div className="w-10 h-10 bg-gray-600 rounded-2xl"></div>
                      <h1 className='font-mono text-lg font-bold line-clamp-2 w-25'>{item.name}</h1>
                      <h1 className='font-mono text-lg'>Rp.{item.sumPrice}</h1>
                    </div>
                    <div className="w-full h-0.5 bg-black opacity-30 mt-2 mb-2"></div>
                  </div>
                )
              })
            }
          </div>

          <div className=" w-full h-fit flex-col justify-between item-center">
            <div className="font-mono text-2xl flex justify-between">
              <h1>Total Items</h1>
              <h1>
                {
                  totalQty
                }
              </h1>
            </div>
            <div className="font-mono text-2xl  flex justify-between">
              <h1>Total Amount</h1>
              <h1>Rp {totalAmount}</h1>
            </div>
            <div className="w-full h-0.5 bg-black opacity-30 mt-5 mb-5"></div>
            <div className="font-mono text-2xl  flex justify-between">
              <h1>Tax(11%)</h1>
              <h1>Rp {totalAmount * 0.11}</h1>
            </div>
            <div className="font-mono text-2xl  flex justify-between">
              <h1>Grand Total</h1>
              <h1>Rp {grandTotal()}</h1>
            </div>

            <button type="submit" className='w-full h-15 rounded-2xl bg-blue-200 text-gray-400 text-center mt-10 mb-5 text-3xl font-jakarta font-semibold cursor-pointer hover:bg-blue-100 transition-colors duration-300'
              onClick={() => {
                payNow()
              }}
            > Proceed To Payment</button>


          </div>

        </div>
        <div className="col-span-9 bg-white w-full h-full rounded-2xl overflow-y-scroll">
          <div className="gap-5 w-full  h-15 grid grid-cols-12 px-15 py-5 ">
            <div className="col-span-8 w-full flex justify-between gap-5">
              <div className="w-fit h-15 px-5 rounded-2xl bg-blue-200 text-center font-bold  text-xl flex justify-center items-center">Tea</div>
              <div className="w-fit h-15 px-5 rounded-2xl bg-blue-200 text-center font-bold  text-xl flex justify-center items-center">Coffee</div>
              <div className="w-fit h-15 px-5 rounded-2xl bg-blue-200 text-center font-bold  text-xl flex justify-center items-center">Milk Shake</div>
              <div className="w-fit h-15 px-5 rounded-2xl bg-blue-200 text-center font-bold  text-xl flex justify-center items-center">Pastries</div>
              <div className="w-fit h-15 px-5 rounded-2xl bg-blue-200 text-center font-bold  text-xl flex justify-center items-center">Snack</div>
              <div className="w-fit h-15 px-5 rounded-2xl bg-blue-200 text-center font-bold  text-xl flex justify-center items-center">Havy Meal</div>
              <div className="w-fit h-15 px-5 rounded-2xl bg-blue-200 text-center font-bold  text-xl flex justify-center items-center">Others</div>
            </div>
            <div className="col-span-4">
              <input type="text" name="searchMenu" className='w-full h-15 text-xl font-mono bg-blue-100 p-5 rounded-2xl' placeholder='Search Menu' id="" />
            </div>

          </div>
          <div className="grid grid-cols-12 w-full h-full lg:p-10 gap-5">
            {
              menus.map(item => {
                if (item.is_available === 1) {
                  return (
                    <div id='content-menu' className="col-span-3 bg-blue-50 lg:h-80 lg:w-80 rounded-2xl flex flex-col items-center justify-center hover:shadow-2xl transition-shadow duration-300 cursor-pointer "
                      onClick={() => {
                        SetIsOpen({
                          id: item.id,
                          isActive: true
                        })
                      }}
                    >
                      <div className="bg-white lg:h-40 lg:w-40 rounded-full"></div>
                      <h1 className='font-mono text-2xl mt-10 font-bold line-clamp-2 text-center w-60'>{item.name}</h1>
                      <h1 className='text-xl font-mono '>Rp. {item.price}</h1>
                    </div>
                  )
                }

              })
            }



          </div>

        </div>
      </div>

      {/* Modal station */}

      <Modal isOpen={isOpen.isActive} onClose={() => SetIsOpen(false)} title="Add Bill" >
        <div className="flex flex-col justify-center items-center gap-5">
          <div className="w-35 h-35 bg-gray-300 rounded-2xl"></div>
          <h1 className='text-2xl font-jakarta font-semibold '>{isOpen.id ? menus[isOpen.id - 1].name : '-'}</h1>
        </div>
        <div className='mt-2'>
          <h1 className='text-lg font-semibold font-jakarta '>Sugar</h1>
          <div className="flex justify-center items-center gap-10">
            <div className=" flex gap-2 text-lg mt-2 justify-center items-center">
              <input type="checkbox" name="lessSGR" id="lessSGR" className='w-5 h-5' />
              <label htmlFor="lessSGR"> Less</label>
            </div>
            <div className=" flex gap-2 text-lg mt-2 justify-center items-center">
              <input type="checkbox" name="lessSGR" id="lessSGR" className='w-5 h-5' />
              <label htmlFor="lessSGR"> More</label>
            </div>
          </div>
        </div>
        <div className='mt-2'>
          <h1 className='text-xl font-jakarta font-semibold'>Ice</h1>
          <div className="flex justify-center items-center gap-10">
            <div className=" flex gap-2 text-lg mt-2 justify-center items-center">
              <input type="checkbox" name="lessSGR" id="lessSGR" className='w-5 h-5' />
              <label htmlFor="lessSGR"> Less</label>
            </div>
            <div className=" flex gap-2 text-lg mt-2 justify-center items-center">
              <input type="checkbox" name="lessSGR" id="lessSGR" className='w-5 h-5' />
              <label htmlFor="lessSGR"> More</label>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center">
          <div className="w-30 h-20 flex justify-between mt-5 items-center">
            <div className="w-8 h-8 flex justify-center items-center text-xl font-bold border-4 border-black/20 border-solid cursor-pointer hover:bg-gray-400 transition-colors duration-300"
              onClick={() => {
                minQTY()
              }}
            >-</div>
            <div className="w-8 h-8 flex justify-center items-center text-xl font-bold border-4 border-black/20 border-solid cursor-pointer">{qty}</div>
            <div className="w-8 h-8 flex justify-center items-center text-xl font-bold border-4 border-solid border-black/20 cursor-pointer hover:bg-gray-400 transition-colors duration-300"
              onClick={() => {
                addQTY()
              }}
            >+</div>
          </div>

          <button type="submit" className='bg-fuchsia-500 w-50 h-10 text-white text-xl font-jakarta font-semibold rounded-3xl cursor-pointer hover:bg-blue-200 hover:text-black transition-colors duration-300'
            onClick={() => {
              addCart(menus[isOpen.id - 1], qty)
              setQty(1)
              SetIsOpen({
                id: null,
                isActive: false
              })
            }}
          >Add</button>
        </div>
      </Modal>

    </div >
  )
}

export default Menu;
