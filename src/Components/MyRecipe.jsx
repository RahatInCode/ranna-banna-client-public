import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import RecipeCard from './RecipeCard';
import { useNavigate } from 'react-router';
import { FaPlus } from 'react-icons/fa';

const MyRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    fetch(`https://ranna-banna-server-7kse1solg-ahmedrahat9901-gmailcoms-projects.vercel.app/recipes?email=${user.email}`)
      .then(res => res.json())
      .then(data => {
        setRecipes(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-orange-500"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
          My Recipes 🍳
        </h1>
        <p className="text-gray-600 text-lg">Your culinary creations in one place</p>
      </div>

      {recipes.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🍽️</div>
          <h2 className="text-3xl font-bold mb-4">No recipes yet!</h2>
          <p className="text-gray-600 mb-6">Start sharing your delicious recipes with the community</p>
          <button 
            onClick={() => navigate('/AddRecipe')}
            className="btn btn-warning btn-lg gap-2"
          >
            <FaPlus /> Add Your First Recipe
          </button>
        </div>
      ) : (
        <>
          <div className="text-right mb-6">
            <button 
              onClick={() => navigate('/AddRecipe')}
              className="btn btn-warning gap-2"
            >
              <FaPlus /> Add New Recipe
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map(recipe => (
              <RecipeCard key={recipe._id} recipe={recipe} showActions={true} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyRecipe;