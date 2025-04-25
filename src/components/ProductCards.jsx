import React from 'react'
import { useNavigate } from 'react-router-dom'

function  ProductCards(props) {
  const {product} = props

  const imageUrl = `https://image.tmdb.org/t/p/w500${product.poster_path}`

  const navigate = useNavigate()
  const hdlViewDetail = ()=> {
    navigate(`/movieinfo/${product.id}`)
  }

  return (
    <div className="card bg-black w-64 shadow-sm">
      <figure>
        <img
          src={imageUrl}
          alt="Movie poster" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {product.original_title}
        </h2>
          <div className="badge badge-secondary">{product.vote_average}</div>
        
        <p>{product.original_language.toUpperCase()}</p>
        <p>{product.release_date}</p>
        <div className="card-actions justify-end">
          <button className="btn bg-sky-600 border-0 hover:bg-sky-700"
                onClick={hdlViewDetail}>View Details</button>
        </div>
      </div>
    </div>
  )
}

export default ProductCards