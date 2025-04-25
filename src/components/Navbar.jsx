import React, { useState } from 'react'
import { Link } from 'react-router'
import { useNavigate } from 'react-router-dom'
import useCartStored from '../stores/cart-store';
import {
  ShoppingCart,
  User,
  Search,
} from "lucide-react";

function Navbar() {
  const [searchText, setSearchText] = useState("");
  const cart = useCartStored(state => state.cart)

  const navigate = useNavigate()
  const hdlSubmit = (value) => {
    setSearchText("")
    navigate(`/view?category=All&keyword=${value}`)
  }



  return (

    <nav >
      <div className='flex flex-col  text-white'>
        <div className='text-center text-4xl p-4  text-sky-600 font-bold '><Link to="/">Movies Skubies</Link> </div>
        <div className="          
            flex
            justify-between            
            px-16 py-4   
            ">
          <div className='flex gap-8 '>            
            <Link className='px-2 hover:cursor-pointer hover:bg-sky-600 hover:rounded-sm '
                to="/">Home</Link> 
            <div className="dropdown">              
            <Link > Movies</Link>
                <ul tabIndex={0} className="dropdown-content menu rounded-box z-1 w-52 p-2 shadow-sm bg-gray-800">
                  <li> <Link to="/view?category=movie&keyword=popular">Popular</Link></li>
                  <li> <Link to="/view?category=movie&keyword=now_playing">Now Playing</Link></li>
                  <li> <Link to="/view?category=movie&keyword=upcoming">Up Coming</Link></li>
                  <li> <Link to="/view?category=movie&keyword=top_rated">Top Rated</Link></li>
                </ul>              
            </div>           
            <div className="dropdown">              
            <Link >TV Shows</Link>
                <ul tabIndex={0} className="dropdown-content menu rounded-box z-1 w-52 p-2 shadow-sm bg-gray-800">
                  <li> <Link to="/view?category=tv&keyword=popular">Popular</Link></li>
                  <li> <Link to="/view?category=tv&keyword=on_the_air">On Airy</Link></li>
                  <li> <Link to="/view?category=tv&keyword=airing_today">Airing Today</Link></li>
                  <li> <Link to="/view?category=tv&keyword=top_rated">Top Rated</Link></li>
                </ul>              
            </div>
            
            {/* <Link className='px-2 hover:cursor-pointer hover:bg-sky-600 hover:rounded-sm '
              to="/view?category=Sports&keyword=*" >Sports</Link>
            <Link className='px-2 hover:cursor-pointer hover:bg-sky-600 hover:rounded-sm '
              to="/view?category=Kids&keyword=*" >Kids</Link> */}
          </div>
          <div className='flex  gap-8 text-sky-600'>
            <Link className='px-2 hover:cursor-pointer hover:bg-white hover:rounded-sm '
              to="/register">Register</Link>
            <Link className='px-2 hover:cursor-pointer hover:bg-white hover:rounded-sm '
              to="/login"> Login</Link>
            <div className="dropdown">              
                <Link > <User /> </Link>
                <ul tabIndex={0} className="dropdown-content menu rounded-box z-1 w-52 p-2 shadow-sm bg-gray-800">
                  <li> <Link to="/user/account">ACCOUNT</Link></li>
                  <li> <Link to="/user/setting">SETTING</Link></li>
                  <li> <Link to="/user/logout">LOGOUT</Link></li>
                </ul>              
            </div>
            <Link to="/mycart">
              <ShoppingCart />
              {(cart.length > 0) && <div className="bg-red-600 absolute top-22 right-82 w-4 h-4 rounded-4xl text-xs text-center text-white">{cart.length} </div>}
            </Link>
            <input className='w-full bg-[27, 27, 27] border-0 border-b-2 border-[196, 193, 193]'
              name="search"
              placeholder="Movie Name"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter")
                  hdlSubmit(e.target.value);
              }}
            />
           <div onClick={()=>hdlSubmit(searchText)} > <Search /></div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar