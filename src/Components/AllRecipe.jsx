import { useLoaderData } from 'react-router';
import RecipeCard from './RecipeCard';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Fade } from 'react-awesome-reveal';

const AllRecipe = () => {
  const allRecipes = useLoaderData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter recipes
  const filteredRecipes = allRecipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.ingredients?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCuisine = selectedCuisine === 'All' || recipe.cuisineType === selectedCuisine;
    const matchesCategory = selectedCategory === 'All' || recipe.categories?.includes(selectedCategory);
    return matchesSearch && matchesCuisine && matchesCategory;
  });

  const cuisines = ['All', 'Italian', 'Mexican', 'Indian', 'Chinese', 'American', 'Japanese', 'Thai', 'French', 'Greek', 'Middle Eastern', 'Vietnamese', 'Others'];
  const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Vegan', 'Snacks'];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <Fade>
          <h1 className="text-5xl font-black bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
            All Recipes 🍽️
          </h1>
          <p className="text-gray-600 text-lg">Discover amazing recipes from our community</p>
        </Fade>
      </div>

      {/* Search & Filter */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search Bar */}
          <div className="flex-1">
            <label className="input input-bordered flex items-center gap-2 bg-white shadow-lg border-2 border-gray-200 focus-within:border-orange-500 transition-all">
              <FaSearch className="text-orange-500" />
              <input
                type="text"
                className="grow"
                placeholder="Search recipes by name or ingredients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="btn btn-ghost btn-sm btn-circle"
                >
                  ✕
                </button>
              )}
            </label>
          </div>

          {/* Cuisine Filter */}
          <select
            className="select select-bordered bg-white shadow-lg w-full md:w-48 border-2 border-gray-200 focus:border-orange-500"
            value={selectedCuisine}
            onChange={(e) => setSelectedCuisine(e.target.value)}
          >
            {cuisines.map(cuisine => (
              <option key={cuisine} value={cuisine}>
                {cuisine === 'All' ? '🌍 All Cuisines' : cuisine}
              </option>
            ))}
          </select>

          {/* Category Filter */}
          <select
            className="select select-bordered bg-white shadow-lg w-full md:w-48 border-2 border-gray-200 focus:border-orange-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'All' ? '🍴 All Categories' : category}
              </option>
            ))}
          </select>
        </div>

        {/* Active Filters & Results Count */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {searchTerm && (
              <span className="badge badge-warning gap-2 p-3">
                Search: {searchTerm}
                <button onClick={() => setSearchTerm('')}>✕</button>
              </span>
            )}
            {selectedCuisine !== 'All' && (
              <span className="badge badge-warning gap-2 p-3">
                {selectedCuisine}
                <button onClick={() => setSelectedCuisine('All')}>✕</button>
              </span>
            )}
            {selectedCategory !== 'All' && (
              <span className="badge badge-warning gap-2 p-3">
                {selectedCategory}
                <button onClick={() => setSelectedCategory('All')}>✕</button>
              </span>
            )}
            {(searchTerm || selectedCuisine !== 'All' || selectedCategory !== 'All') && (
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCuisine('All');
                  setSelectedCategory('All');
                }}
                className="btn btn-sm btn-ghost"
              >
                Clear All Filters
              </button>
            )}
          </div>
          
          <p className="text-gray-600 font-semibold">
            {filteredRecipes.length === allRecipes.length ? (
              <span>Showing all {allRecipes.length} recipes</span>
            ) : (
              <span>Showing {filteredRecipes.length} of {allRecipes.length} recipes</span>
            )}
          </p>
        </div>
      </div>

      {/* Recipes Grid */}
      {filteredRecipes.length === 0 ? (
        <div className="text-center py-20 animate-fade-in">
          <div className="text-8xl mb-6">🔍</div>
          <h2 className="text-4xl font-bold mb-4 text-gray-800">No recipes found</h2>
          <p className="text-gray-600 text-lg mb-6">
            We couldn't find any recipes matching your criteria
          </p>
          <button 
            onClick={() => { 
              setSearchTerm(''); 
              setSelectedCuisine('All'); 
              setSelectedCategory('All');
            }} 
            className="btn btn-warning btn-lg hover:scale-105 transition-transform"
          >
            🔄 Clear All Filters
          </button>
        </div>
      ) : (
        <Fade cascade damping={0.05}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRecipes.map(recipe => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        </Fade>
      )}

      {/* Quick Stats */}
      {allRecipes.length > 0 && (
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="card bg-gradient-to-br from-orange-50 to-orange-100 shadow-lg">
            <div className="card-body items-center text-center">
              <div className="text-4xl mb-2">🍽️</div>
              <p className="text-3xl font-black text-orange-600">{allRecipes.length}</p>
              <p className="text-gray-700 font-semibold">Total Recipes</p>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-pink-50 to-pink-100 shadow-lg">
            <div className="card-body items-center text-center">
              <div className="text-4xl mb-2">❤️</div>
              <p className="text-3xl font-black text-pink-600">
                {allRecipes.reduce((sum, recipe) => sum + (recipe.likes || 0), 0)}
              </p>
              <p className="text-gray-700 font-semibold">Total Likes</p>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-green-50 to-green-100 shadow-lg">
            <div className="card-body items-center text-center">
              <div className="text-4xl mb-2">🌍</div>
              <p className="text-3xl font-black text-green-600">
                {new Set(allRecipes.map(r => r.cuisineType)).size}
              </p>
              <p className="text-gray-700 font-semibold">Cuisines</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllRecipe;