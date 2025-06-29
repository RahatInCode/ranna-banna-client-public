import React from 'react'
import { Clock, Heart, UtensilsCrossed } from 'lucide-react';
import { Link } from 'react-router';
const RecipeCard = ({recipe}) => {
    const {image,title,cuisineType,prepTime}=recipe;

  return (
    
   <div className="card bg-base-100  shadow-sm">
  <figure className='w-full h-64 overflow-hidden'>
    <img
    className="w-full h-full object-cover"
      src={image}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">
      {title}
    </h2>
   <div className='flex justify-between'>
    
  <div className="flex items-center space-x-1 text-yellow-500">
  <UtensilsCrossed className="w-4 h-4" />
  <span>{cuisineType}</span>
</div>
    

   <div className="flex items-center space-x-1 text-gray-500">
  <Clock className="w-4 h-4" />
  <span>{prepTime} mins</span> 
</div>
    <Heart className="w-4 h-4 text-pink-500" />
    
    </div> 


    <div className="card-actions justify-end">
     <Link to={`/RecipeDetails/${recipe._id}`}>
      <button className="btn btn-warning">Details</button>
     </Link>
      <button className="btn">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-[1.2em]"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
  Like
</button>
    </div>
  </div>
</div>
  )
}

export default RecipeCard

