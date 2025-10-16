import React, { useState, useEffect } from 'react';
import { useLoaderData, useParams, useNavigate } from 'react-router';
import { FaHeart, FaRegClock, FaUtensils, FaUser, FaCalendar } from 'react-icons/fa';
import { getAuth } from 'firebase/auth';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const RecipeDetails = () => {
  const allRecipes = useLoaderData();
  const { id } = useParams();
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const recipe = allRecipes.find(recipe => recipe._id === id);

  const [likes, setLikes] = useState(recipe?.likes || 0);
  const [likedBy, setLikedBy] = useState(recipe?.likedBy || []);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    if (user && likedBy.includes(user.email)) {
      setHasLiked(true);
    }
  }, [user, likedBy]);

  if (!recipe) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-red-500">Recipe not found! 🍽️</h2>
        <button onClick={() => navigate('/')} className="btn btn-warning mt-4">Go Home</button>
      </div>
    );
  }

  const {
    image,
    title,
    cuisineType,
    prepTime,
    creatorEmail,
    creatorName,
    creatorPhoto,
    ingredients,
    instructions,
    categories,
    createdAt,
  } = recipe;

  const isOwner = user && user.email === creatorEmail;

  const handleLike = () => {
    if (!user) {
      toast.error("Please login to like recipes!");
      navigate('/login');
      return;
    }

    if (isOwner) {
      toast.error("You can't like your own recipe! 😄");
      return;
    }

    if (hasLiked) {
      toast.error("You've already liked this recipe!");
      return;
    }

    // Update in backend
    fetch(`https://ranna-banna-server-7kse1solg-ahmedrahat9901-gmailcoms-projects.vercel.app/recipes/${id}/like`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userEmail: user.email }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          setLikes(prev => prev + 1);
          setLikedBy(prev => [...prev, user.email]);
          setHasLiked(true);
          toast.success("Recipe liked! ❤️");
        }
      })
      .catch(err => {
        console.error(err);
        toast.error("Failed to like recipe");
      });
  };

  const handleDelete = () => {
    Swal.fire({
      title: 'Delete Recipe?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://ranna-banna-server-7kse1solg-ahmedrahat9901-gmailcoms-projects.vercel.app/recipes/${id}`, {
          method: 'DELETE',
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              Swal.fire('Deleted!', 'Your recipe has been deleted.', 'success');
              navigate('/MyRecipe');
            }
          });
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 animate-fade-in">
      {/* Hero Image */}
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-[500px] object-cover rounded-3xl shadow-2xl" 
        />
        <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
          <FaHeart className="text-pink-500" />
          <span className="font-bold">{likes}</span>
        </div>
      </div>

      {/* Title & Actions */}
      <div className="mt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">{title}</h1>
          <div className="flex flex-wrap gap-2 mt-3">
            {categories?.map(cat => (
              <span key={cat} className="badge badge-warning badge-lg">{cat}</span>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          {!isOwner && (
            <button
              onClick={handleLike}
              disabled={hasLiked}
              className={`btn ${hasLiked ? 'btn-disabled' : 'btn-error'} gap-2 hover:scale-110 transition-transform`}
            >
              <FaHeart /> {hasLiked ? 'Liked' : 'Like'}
            </button>
          )}

          {isOwner && (
            <>
              <button className="btn btn-primary gap-2">Edit</button>
              <button onClick={handleDelete} className="btn btn-error gap-2">Delete</button>
            </>
          )}
        </div>
      </div>

      {/* Recipe Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="card bg-orange-50 shadow-xl">
          <div className="card-body items-center text-center">
            <FaUtensils className="text-4xl text-orange-500" />
            <h3 className="card-title">Cuisine</h3>
            <p className="text-2xl font-bold">{cuisineType}</p>
          </div>
        </div>

        <div className="card bg-blue-50 shadow-xl">
          <div className="card-body items-center text-center">
            <FaRegClock className="text-4xl text-blue-500" />
            <h3 className="card-title">Prep Time</h3>
            <p className="text-2xl font-bold">{prepTime} mins</p>
          </div>
        </div>

        <div className="card bg-green-50 shadow-xl">
          <div className="card-body items-center text-center">
            <FaHeart className="text-4xl text-pink-500" />
            <h3 className="card-title">People Interested</h3>
            <p className="text-2xl font-bold">{likes}</p>
          </div>
        </div>
      </div>

      {/* Creator Info */}
      <div className="card bg-base-100 shadow-xl mt-8">
        <div className="card-body">
          <h3 className="card-title text-2xl mb-4">👨‍🍳 Recipe Creator</h3>
          <div className="flex items-center gap-4">
            <div className="avatar">
              <div className="w-16 rounded-full ring ring-orange-500 ring-offset-2">
                <img src={creatorPhoto || "https://i.ibb.co/2ZqYCZF/user.png"} alt={creatorName} />
              </div>
            </div>
            <div>
              <p className="font-bold text-lg">{creatorName}</p>
              <p className="text-sm text-gray-500">{creatorEmail}</p>
              <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                <FaCalendar /> {new Date(createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ingredients */}
      <div className="card bg-base-100 shadow-xl mt-8">
        <div className="card-body">
          <h3 className="card-title text-3xl mb-4">🥘 Ingredients</h3>
          <div className="bg-orange-50 p-6 rounded-xl">
            <pre className="whitespace-pre-wrap font-sans text-lg leading-relaxed">{ingredients}</pre>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="card bg-base-100 shadow-xl mt-8 mb-12">
        <div className="card-body">
          <h3 className="card-title text-3xl mb-4">👩‍🍳 Cooking Instructions</h3>
          <div className="bg-blue-50 p-6 rounded-xl">
            <pre className="whitespace-pre-wrap font-sans text-lg leading-relaxed">{instructions}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;