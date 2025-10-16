import Swal from 'sweetalert2';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { getAuth } from 'firebase/auth';
import toast from 'react-hot-toast';

const AddRecipe = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const handleAddRecipe = e => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please login to add a recipe!");
      navigate('/login');
      return;
    }

    const form = e.target;
    const formData = new FormData(form);
    
    // Get all checked categories
    const categories = formData.getAll('categories');
    
    const recipeData = {
      title: formData.get('title'),
      image: formData.get('image'),
      ingredients: formData.get('ingredients'),
      instructions: formData.get('instructions'),
      cuisineType: formData.get('cuisineType'),
      prepTime: formData.get('prepTime'),
      categories: categories,
      creatorEmail: user.email,
      creatorName: user.displayName || "Anonymous",
      creatorPhoto: user.photoURL || "",
      likes: 0,
      likedBy: [],
      createdAt: new Date().toISOString(),
    };

    setLoading(true);

    // Send data to the server
    fetch('https://ranna-banna-server-7kse1solg-ahmedrahat9901-gmailcoms-projects.vercel.app/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipeData),
    })
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        if (data.insertedId) {
          Swal.fire({
            title: 'Recipe Added! 🎉',
            text: 'Your delicious recipe has been shared with the community!',
            icon: 'success',
            showConfirmButton: true,
            confirmButtonColor: '#ea580c',
            timer: 3000
          });
          form.reset();
          setTimeout(() => navigate('/MyRecipe'), 2000);
        }
      })
      .catch(err => {
        setLoading(false);
        toast.error("Failed to add recipe. Please try again!");
        console.error(err);
      });
  };

  return (
    <div className="container py-12 animate-fade-in">
      <div className="max-w-3xl mx-auto bg-base-100 shadow-2xl rounded-2xl overflow-hidden">
        <header className="p-6 bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <h1 className="text-4xl font-bold">Add New Recipe 🍳</h1>
          <p className="mt-2 text-orange-100">Share your culinary masterpiece with food lovers worldwide</p>
        </header>

        <main className="p-6">
          <form onSubmit={handleAddRecipe} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="block font-semibold text-lg">Recipe Title *</label>
              <input
                id="title"
                name="title"
                placeholder="e.g., Grandma's Special Biryani"
                className="w-full border-2 border-gray-300 focus:border-orange-500 rounded-lg px-4 py-3 transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="image" className="block font-semibold text-lg">Image URL *</label>
              <input
                id="image"
                name="image"
                placeholder="https://example.com/image.jpg"
                className="w-full border-2 border-gray-300 focus:border-orange-500 rounded-lg px-4 py-3 transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="ingredients" className="block font-semibold text-lg">Ingredients *</label>
              <textarea
                id="ingredients"
                name="ingredients"
                placeholder="• 2 cups rice&#10;• 500g chicken&#10;• 1 tbsp garam masala"
                rows={5}
                className="w-full border-2 border-gray-300 focus:border-orange-500 rounded-lg px-4 py-3 transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="instructions" className="block font-semibold text-lg">Instructions *</label>
              <textarea
                id="instructions"
                name="instructions"
                placeholder="1. Wash and soak rice&#10;2. Marinate chicken..."
                rows={6}
                className="w-full border-2 border-gray-300 focus:border-orange-500 rounded-lg px-4 py-3 transition-all"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="cuisineType" className="block font-semibold text-lg">Cuisine Type *</label>
                <select
                  id="cuisineType"
                  name="cuisineType"
                  className="w-full border-2 border-gray-300 focus:border-orange-500 rounded-lg px-4 py-3 transition-all"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>Select cuisine type</option>
                  <option value="Italian">🇮🇹 Italian</option>
                  <option value="Mexican">🇲🇽 Mexican</option>
                  <option value="Indian">🇮🇳 Indian</option>
                  <option value="Chinese">🇨🇳 Chinese</option>
                  <option value="American">🇺🇸 American</option>
                  <option value="Japanese">🇯🇵 Japanese</option>
                  <option value="Thai">🇹🇭 Thai</option>
                  <option value="Others">🌍 Others</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="prepTime" className="block font-semibold text-lg">Prep Time (minutes) *</label>
                <input
                  id="prepTime"
                  name="prepTime"
                  type="number"
                  placeholder="e.g., 30"
                  min="1"
                  className="w-full border-2 border-gray-300 focus:border-orange-500 rounded-lg px-4 py-3 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <p className="font-semibold text-lg">Categories</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan", "Snacks"].map((category) => (
                  <div key={category} className="flex items-center space-x-2 bg-orange-50 p-3 rounded-lg hover:bg-orange-100 transition-all">
                    <input 
                      type="checkbox" 
                      id={category} 
                      name="categories" 
                      value={category} 
                      className="checkbox checkbox-warning" 
                    />
                    <label htmlFor={category} className="cursor-pointer font-medium">{category}</label>
                  </div>
                ))}
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-lg font-bold text-lg hover:scale-105 transition-transform shadow-lg disabled:opacity-50"
            >
              {loading ? "Adding Recipe..." : "🍽️ Add Recipe"}
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default AddRecipe;