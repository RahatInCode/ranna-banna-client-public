import React from 'react';
import { useNavigate } from 'react-router';
import { FaHome } from 'react-icons/fa';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl animate-fade-in">
        {/* Animated 404 */}
        <div className="relative">
          <h1 className="text-[150px] md:text-[200px] font-black text-orange-500 opacity-20 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2927/2927347.png"
              alt="Chef"
              className="w-40 md:w-60 animate-bounce"
            />
          </div>
        </div>

        {/* Error Message */}
        <div className="mt-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Oops! Recipe Not Found 🍳
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Looks like this dish isn't on our menu! The recipe you're looking for has been eaten... we mean deleted.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="btn btn-warning btn-lg gap-2 hover:scale-105 transition-transform"
            >
              <FaHome /> Back to Home
            </button>
            <button
              onClick={() => navigate('/AllRecipe')}
              className="btn btn-outline btn-lg hover:scale-105 transition-transform"
            >
              Browse All Recipes
            </button>
          </div>
        </div>

        {/* Fun Facts */}
        <div className="mt-12 p-6 bg-white rounded-2xl shadow-xl">
          <p className="text-sm text-gray-500 italic">
            "Cooking is like love. It should be entered into with abandon or not at all." - Harriet Van Horne
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;