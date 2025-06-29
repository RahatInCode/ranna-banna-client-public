
import Swal from 'sweetalert2';

const AddRecipe = () => {
  const handleAddRecipe = e => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const recipeData = Object.fromEntries(formData.entries());
    console.log(recipeData);

    //send data to the server
    fetch('https://ranna-banna-server-7kse1solg-ahmedrahat9901-gmailcoms-projects.vercel.app/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipeData),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.insertedId);
        Swal.fire({
  title: 'Recipe Added',
  text: 'Your recipe has been added successfully',
  icon: 'success',
 draggable: true,
});
form.reset();
      });
  };

  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-lg">
        <header className="p-6 border-b border-gray-200">
          <h1 className="text-3xl font-bold">Add New Recipe</h1>
          <p className="mt-1 text-gray-600">Share your culinary creations with the community</p>
        </header>

        <main className="p-6">
          <form onSubmit={handleAddRecipe} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="block font-medium">Recipe Title</label>
              <input
                id="title"
                name="title"
                placeholder="Enter recipe title"
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="image" className="block font-medium">Image URL</label>
              <input
                id="image"
                name="image"
                placeholder="Enter image URL"
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="ingredients" className="block font-medium">Ingredients</label>
              <textarea
                id="ingredients"
                name="ingredients"
                placeholder="Enter ingredients (one per line)"
                rows={5}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="instructions" className="block font-medium">Instructions</label>
              <textarea
                id="instructions"
                name="instructions"
                placeholder="Enter step-by-step instructions"
                rows={5}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="cuisineType" className="block font-medium">Cuisine Type</label>
                <select
                  id="cuisineType"
                  name="cuisineType"
                  className="w-full border rounded px-3 py-2"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>Select cuisine type</option>
                  <option value="Italian">Italian</option>
                  <option value="Mexican">Mexican</option>
                  <option value="Indian">Indian</option>
                  <option value="Chinese">Chinese</option>
                  <option value="American">American</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="prepTime" className="block font-medium">Preparation Time (minutes)</label>
                <input
                  id="prepTime"
                  name="prepTime"
                  type="number"
                  placeholder="Enter prep time in minutes"
                  min="1"
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <p className="font-medium">Categories</p>
              <div className="grid grid-cols-2 gap-2">
                {["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan"].map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <input type="checkbox" id={category} name="categories" value={category} className="cursor-pointer" />
                    <label htmlFor={category} className="cursor-pointer">{category}</label>
                  </div>
                ))}
              </div>
            </div>

            <button  type="submit" className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700">
              Add Recipe
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default AddRecipe;