import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from '../layouts/Layout'

import Notfound from '../pages/Notfound'
import Home from '../pages/Home'
import SingleProduct from '../pages/SingleProduct'
import Cart from '../pages/Cart'
import Order from '../pages/Order'
import View from '../pages/View';

function AppRoutes() {
  return (
    <>
    <BrowserRouter>
    <Routes >
      < Route path="/" element={ < Layout /> }> 
                <Route index element= { < Home /> } /> 
                <Route path="view" element= { < View /> } /> 
                <Route path="movieinfo/:id" element= { < SingleProduct /> } /> 
                <Route path="mycart" element= { < Cart /> } /> 
                <Route path="mymovie" element= { < Order /> } />                 
                
                <Route path = "*" element = { <Notfound /> }/>
      </Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default AppRoutes