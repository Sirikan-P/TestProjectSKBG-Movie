import React, { useEffect, useState } from 'react'



/////image slider-------------------
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import { actionGetBestRateProduct } from '../api/movie';

function Landing() {
  const [newProduct,setNewProduct] = useState([])

    const getNewProduct = async() => {
      try {   
           
          const res = await actionGetBestRateProduct()         
          const { results} = res.data        
          setNewProduct( results.slice(0, 6) )
          
           return ("success")
      } catch (error) {
          console.log(error)
           return ("fail")
      }
    }
  
    useEffect( ()=>{ getNewProduct() } ,[])
  
  

  return (
    <div className=' flex flex-col w-[1200px] p-10 m-auto'>  

      <div className="h-[500px] m-auto">
        <Carousel autoPlay showArrows={true} infiniteLoop showThumbs={false} interval={6000}>
          {newProduct && newProduct.map(item => {
            return <img src={`https://image.tmdb.org/t/p/w500${item?.backdrop_path}`} key={item?.id} />
          })}

        </Carousel>
      </div>
    </div>
  )
}

export default Landing