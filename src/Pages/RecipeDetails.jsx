import React, { useState } from 'react';
import { useLoaderData, useParams } from 'react-router';
import { FaHeart, FaRegClock, FaUtensils } from 'react-icons/fa';
import { getAuth } from 'firebase/auth';

const RecipeDetails = () => {
  const allRecipes = useLoaderData();
  const { id } = useParams();
  const auth = getAuth();
  const user = auth.currentUser;

  const recipe = allRecipes.find(recipe => recipe._id === id);

  const [likes, setLikes] = useState(recipe?.likes || 0);

  if (!recipe) return <div className="text-center text-xl py-10">Recipe not found!</div>;

  const {
    image,
    title,
    cuisineType,
    prepTime,
    creatorEmail,
    ingredients,
    instructions,
  } = recipe;

  const isOwner = user && user.email === creatorEmail;

  const handleLike = () => {
    if (isOwner) return alert("You can't like your own recipe!");
    setLikes(prev => prev + 1);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <img src={image} alt={title} className="w-full h-96 object-cover rounded-lg shadow-md" />

      <div className="mt-6 flex justify-between items-center">
        <h2 className="text-3xl font-bold">{title}</h2>
        <button
          onClick={handleLike}
          disabled={isOwner}
          className={`flex items-center gap-2 px-4 py-2 rounded ${
            isOwner ? 'bg-gray-300 cursor-not-allowed' : 'bg-pink-500 hover:bg-pink-600 text-white'
          }`}
        >
          <FaHeart /> Like
        </button>
      </div>

      <p className="text-gray-600 mt-1 text-lg">{likes} people interested in this recipe</p>

      <div className="mt-4 flex items-center gap-4 text-gray-700">
        <span className="flex items-center gap-2"><FaUtensils /> {cuisineType}</span>
        <span className="flex items-center gap-2"><FaRegClock /> {prepTime} mins</span>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Ingredients</h3>
       {ingredients}
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Instructions</h3>
        <p className="text-gray-800 leading-relaxed whitespace-pre-line">{instructions}</p>
      </div>
    </div>
  );
};

export default RecipeDetails;


