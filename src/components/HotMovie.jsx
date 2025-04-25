import React, { useEffect, useState } from 'react'
import ProductCards from './ProductCards'
import { actionGetHotProduct } from '../api/movie'


function HotMovie() {
  const [newProduct,setNewProduct] = useState([])

  const getNewProduct = async() => {
    try {   
         
        const res = await actionGetHotProduct()         
        const { results} = res.data        
        setNewProduct( results.slice(0, 8) )
        
         return ("success")
    } catch (error) {
        console.log(error)
         return ("fail")
    }
  }

  useEffect( ()=>{ getNewProduct() } ,[])

  return (
    <div>         
      <div className='text-2xl text-center py-6'> 
        <p className='italic text-3xl font-extrabold py-6'> See what's Hot ... </p>
        <p>Top Movies</p> 
      </div>
      <div className='flex flex-wrap justify-center px-12 gap-12' >
        
        {newProduct.map(el => (
          <ProductCards key={el?.id} product={el} />
        ))
        }

      </div>
    </div>
  )
}

export default HotMovie