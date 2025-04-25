//global state 
import { create } from "zustand"
import { persist } from "zustand/middleware"

//api 
import {  } from "../api/movie"

//step 1 : create Store
const cartStored = (set) => ({
  cart: [],
  subTotalPrice: 0 ,
  addCart: (cartProduct) => {
    set((state) => {
      // ตรวจสอบว่ามีสินค้าใน cart ที่ id ซ้ำกับที่เพิ่มหรือไม่
      const exists = state.cart.some((item) => item.id === cartProduct.id);

      if (exists) {
        console.log("Item already in cart");
        return state; // ไม่เปลี่ยนแปลง state
      }
      const price = cartProduct.price
      set((state) => ({
        subTotalPrice: state.subTotalPrice  + price
      }));

      return {
        cart: [...state.cart, cartProduct], // เพิ่มสินค้าใหม่เข้าไป
      };
    });
  },
  clearCart: () => {
    set(() => ({
      cart:[]   ,
      subTotalPrice: 0
  }));
  },
  removeProduct: (id,price)=> {
    console.log("removezz",id)
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    }));    
    set((state) => ({
      subTotalPrice: state.subTotalPrice - price
    }));
  },

});

//step 2 : export Store
const useCartStored = create(persist( cartStored, {name: 'cart-store'}) )
 export default useCartStored