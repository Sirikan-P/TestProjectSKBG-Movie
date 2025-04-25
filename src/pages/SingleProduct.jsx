import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import numeral from 'numeral';
import { actionGetMovieDetail } from '../api/movie';
import useCartStored from "../stores/cart-store";

function SingleProduct() {
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState({})
  const navigate = useNavigate()
  const addCart = useCartStored((state => state.addCart))
  const getMovie = async() => {
      try {   
           
          const res = await actionGetMovieDetail(id)         
          const  results = res.data            
          setSingleProduct( results )          
           return ("success")
      } catch (error) {
          console.log(error)
           return ("fail")
      }
    }
  
    useEffect( ()=>{ getMovie() } ,[])

    //---------------------------------------------
    const hdlAddtoCart =  () => {  
      const value = {
        id: singleProduct.id ,
        movie: singleProduct , 
        price: 300 
      }             
        addCart(value);  

        navigate(`/mycart`)    
    }

  return (
    <>
      <div className='flex justify-center  w-full gap-20 p-20 py-4'>
        <div className=' flex flex-col w-full border-0 m-auto'>
          {/* mock ui */}
          <section className="py-2 lg:py-24">
            <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
              <div className="flex gap-8 lg:gap-16 h-[680px]">
                
                  <img className='object-contain h-full'
                    src={`https://image.tmdb.org/t/p/w500${singleProduct.poster_path}`}
                    alt="movie!" />
                
                <div className="w-full flex flex-col ">
                  <h2 className='text-4xl font-bold'>{singleProduct.title}</h2>
                  <p className="font-medium text-lg text-sky-700 mb-4">
                    Score : {singleProduct?.vote_average}
                  </p>
                  <p className="font-normal text-lg">
                    Release Date : {singleProduct?.release_date}
                  </p>
                  <h2 className="mb-2  font-bold text-3xl leading-10 text-gray-900">
                    {singleProduct?.productName}
                  </h2>
                  <p className='text-xl italic'> {singleProduct?.seller?.shopName?.toUpperCase()} </p>
                  <div className="flex flex-col sm:flex-row sm:items-center mb-6">


                    <h6 className=" font-semibold text-2xl leading-9 text-yellow-300 pr-5 sm:border-r border-gray-200 mr-5">
                      {numeral(300).format(0, 0)} : THB </h6>
                    <p> Status : {singleProduct.status}</p>
                  </div>

                  <p className="text-gray-500 text-base font-normal mb-8 ">
                    {singleProduct.overview }
                  </p>


                  <div className="block w-full">

                    <div className="text">
                      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 mb-8">


                        <button
                          onClick={() => hdlAddtoCart()}
                          className="group py-4 px-5 rounded-[8px] bg-sky-600 font-semibold text-lg 
                                                        w-full flex items-center justify-center gap-2 shadow-sm shadow-transparent transition-all duration-500
                                                        hover:bg-sky-700 hover:shadow-sky-800">

                          ADD TO CART</button>

                      </div>
                    </div>

                  </div>

                </div>
              </div>
            </div>
          </section>
          {/* mock ui */}

        </div>
      </div>
    </>
  )
}

export default SingleProduct