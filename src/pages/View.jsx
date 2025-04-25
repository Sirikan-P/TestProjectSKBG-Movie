import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import ProductCards from '../components/ProductCards';
import { actionGetProduct } from '../api/movie';

function View() {
  const queryParams = new URLSearchParams(useLocation().search);
  const category = queryParams.get('category');
  const keyword = queryParams.get('keyword');

  const [allProducts, setAllProducts] = useState([])

  //get product data
  const getProduct = async (category, keyword) => {
    try {

      const res = await actionGetProduct(category,keyword)
      const { results } = res.data
      setAllProducts( results)

      return ("success")
    } catch (error) {
      console.log(error)
      return ("fail")
    }
  }

  //effect
  useEffect(() => { getProduct(category, keyword) }, [category, keyword])

  return (
    <div>
      <div className='text-2xl text-center py-6'>
        <p className='italic text-3xl font-extrabold py-6'> See what's {keyword} ... {category}</p>
        
      </div>
      <div className='flex flex-wrap justify-center px-12 gap-12' >

        {allProducts.map(el => (
          <ProductCards key={el?.id} product={el} />
        ))
        }

      </div>
    </div>
  )
}

export default View