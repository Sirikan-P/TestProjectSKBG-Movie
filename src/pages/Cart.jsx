import React, { useEffect, useRef, useState } from 'react'
import useCartStored from "../stores/cart-store";
import ProductCart from '../components/ProductCart';
import generatePayload from 'promptpay-qr';
import qrcode from 'qrcode';

function Cart() {
  const cart = useCartStored(state => state.cart)
  const clearCart = useCartStored((state => state.clearCart))
  const subTotalPrice = useCartStored((state => state.subTotalPrice))
  const discount = (cart.length < 3) ? 0 : (cart.length < 5) ? 0.1 : 0.2
  const totalPrice = (subTotalPrice == 0) ? 0 : subTotalPrice - (discount * subTotalPrice)

  //open modal
  const [open, setOpen] = useState(false);
  const [qrUrl, setQrUrl] = useState(null);

  //close modal
  const timeoutRef = useRef(null); 
  const [countdown, setCountdown] = useState(60);
  useEffect(() => {
    if (open) {
      setCountdown(60);
      const interval = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
  
      const timeout = setTimeout(() => {
        setOpen(false);
      }, 60000);
  
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
        clearCart()
      };
    }
  }, [open]);

  const hdlClear = () => {
    clearCart()
  }

  const hdlOrder = async () => {
    const payload = generatePayload("0812345678", { amount: totalPrice });
    const url = await qrcode.toDataURL(payload);
    setQrUrl(url);
    setOpen(true); // open modal
  };



  return (
    <div className="py-6 relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto ">

        <h2 className="title font-bold text-2xl leading-10 mb-8 text-center text-black">
          My Cart
        </h2>
        {cart && cart.map(item => {
          return <ProductCart productInCart={item.movie} key={item.id} price={item.price} />
        })
        }

        <div className="flex flex-col md:flex-row items-center md:items-center justify-between lg:px-6 pb-6 border-b border-gray-200 max-lg:max-w-lg max-lg:mx-auto">
          <h5 className="text-gray-900 font-manrope font-semibold text-2xl leading-9 w-full max-md:text-center max-md:mb-4">
            Subtotal
          </h5>

          <div className="flex items-center justify-between gap-5 ">
            <button
              className="rounded-full py-2.5 px-3 bg-indigo-50 text-sky-600 font-semibold text-xl text-center whitespace-nowrap transition-all duration-500 hover:bg-indigo-100">Discount : {discount * 100} % </button>
            <h6 className="font-manrope font-bold text-2xl lead-10 text-sky-600">
              {subTotalPrice} THB
            </h6>
          </div>
        </div>

        <div className="max-lg:max-w-lg max-lg:mx-auto">
          <p className="font-bold text-4xl leading-7  text-yellow-300 text-center mb-5 mt-6">Total : {totalPrice} THB</p>
          <div className="flex w-full gap-8">
            <button
              onClick={hdlClear}
              className="flex-1 rounded-full py-4 px-6 bg-sky-800 font-semibold text-lg  text-center transition-all duration-500 hover:bg-sky-500 ">
              ClearCart
            </button>
            <button
              onClick={hdlOrder}
              className="flex-1 rounded-full py-4 px-6 bg-sky-600 font-semibold text-lg  text-center transition-all duration-500 hover:bg-sky-500 ">
              Checkout
            </button>
          </div>
        </div>

        {/* Modal */}
        {open && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white text-black p-6 rounded-xl w-96 max-w-full">
              <h3 className="font-bold text-lg mb-4">สแกนเพื่อชำระ {totalPrice.toFixed(2)} บาท</h3>
              {qrUrl ? (
                <img src={qrUrl} alt="PromptPay QR" className="mx-auto" />
              ) : (
                <p>กำลังโหลด QR...</p>
              )}
              <p>ธนาคารไทยพานิชย์ เลขที่บัญชี : 1234567890 ชื่อบัญชี บริษัท จำกัด </p>
              <p className="mt-4 text-center text-red-600">
                  ปิดตัวเองใน {countdown} วินาที
              </p>
              <div className="mt-6 text-right">
                <button
                  onClick={() => { 
                    setOpen(false)
                    clearCart()
                  }}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
                >
                  ปิด
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart