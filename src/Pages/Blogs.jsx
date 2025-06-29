import React from 'react';
import { useNavigate } from 'react-router';

const Blogs = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-yellow-50 flex items-center justify-center min-h-screen px-4 relative overflow-hidden">

      <div className="text-center max-w-md z-10">
        <img
          src="https://www.shutterstock.com/image-vector/chef-banner-600nw-346874531.jpg"
          alt="Food Not Found"
          className="w-40 mx-auto mb-6 animate-bounce"
        />

        <h1 className="text-6xl font-extrabold text-red-600">404</h1>
        <p className="text-2xl font-semibold text-gray-800 mt-2">
          Page not on the menu 🍟
        </p>
        <p className="text-gray-600 mt-4">
          Sorry chef, the dish you're looking for doesn't exist.
          <br />
          Maybe it got burned or never cooked.
        </p>

        <button
          onClick={() => navigate('/')}
          className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:scale-105"
        >
          🍕 Take Me Home
        </button>
      </div>
    </div>
  );
};

export default Blogs;
