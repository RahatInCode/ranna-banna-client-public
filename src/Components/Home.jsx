
import { useLoaderData, useNavigate } from 'react-router';
import RecipeCard from './RecipeCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { FaLeaf, FaHeart, FaUtensils } from 'react-icons/fa';
import { Typewriter } from 'react-simple-typewriter';
import { Fade } from 'react-awesome-reveal';

const Home = () => {
  const initialRecipes = useLoaderData();
  const navigate = useNavigate();

  return (
    <div>
      {/* Swiper Banner */}
      <Swiper
    
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="mySwiper rounded-xl overflow-hidden h-64 md:h-96 mb-8 text-center items-center"
      >
       <SwiperSlide
  className="bg-cover bg-center text-white shadow-lg"
  style={{
    backgroundImage: `url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1470&q=80')`,
  }}
>
  <div className="flex flex-col justify-center items-center h-full text-3xl md:text-5xl font-bold gap-4 text-center">
   <Fade>Welcome to Ranna-Banna</Fade>
    <label className="input flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
      <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </g>
      </svg>
      <input type="search" required placeholder="Search" className="outline-none bg-transparent text-black" />
    </label>
  </div>
</SwiperSlide>

       <SwiperSlide
  className="bg-cover bg-center text-white shadow-lg"
  style={{
    backgroundImage: `url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1470&q=80')`,
  }}
>
  <div className="flex flex-col justify-center items-center h-full text-3xl md:text-5xl font-bold gap-4 text-center">
    <Fade>Your go to recipe page</Fade>
    <label className="input flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
      <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </g>
      </svg>
      <input type="search" required placeholder="Search" className="outline-none bg-transparent text-black" />
    </label>
  </div>
</SwiperSlide>

       <SwiperSlide
  className="bg-cover bg-center text-white shadow-lg"
  style={{
    backgroundImage: `url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1470&q=80')`,
  }}
>
  <div className="flex flex-col justify-center items-center h-full text-3xl md:text-5xl font-bold gap-4 text-center">
    <Fade>
      Add your own recipe TODAY!!!
    </Fade>
    <label className="input flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
      <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </g>
      </svg>
      <input type="search" required placeholder="Search" className="outline-none bg-transparent text-black" />
    </label>
  </div>
</SwiperSlide>

      </Swiper>

      {/* Top Recipes Header */}
      <div className="text-center mt-10 mb-6">
       <Fade>
         <h2 className="text-3xl font-bold text-orange-600 mb-2">Top Recipes</h2>
       </Fade>
        <Typewriter
words={['Cheesy', 'Crispy', 'Spicy', 'Saucy', 'Mouthwatering']}
  loop={5}
  cursor
  cursorStyle='_'
  typeSpeed={70}
  deleteSpeed={50}
  delaySpeed={1000}
/>
        <p className="text-gray-600">Most loved recipes by our communities</p>
        <button
          onClick={() => navigate('/AllRecipe')}
          className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 transition"
        >
          See All Recipes
        </button>
      </div>

      {/* Recipe Cards */}
      <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {
          initialRecipes.map(recipe => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))
        }
      </div>
    </div>

      {/* Why Choose Ranna-Banna */}
      <section className="my-12 px-4">
        <Fade>
          <h2 className="text-3xl font-bold text-center mb-6 text-orange-600">Why Choose Ranna-Banna?</h2>
        </Fade>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 shadow-lg rounded-xl bg-white text-center hover:scale-105 transition-transform">
            <FaUtensils className="text-4xl text-orange-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Authentic Recipes</h3>
            <p>We bring you grandma-approved, traditional recipes with modern twists.</p>
          </div>
          <div className="p-6 shadow-lg rounded-xl bg-white text-center hover:scale-105 transition-transform">
            <FaHeart className="text-4xl text-orange-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Expert Chefs</h3>
            <p>Learn from the best chefs who know how to make magic in the kitchen.</p>
          </div>
          <div className="p-6 shadow-lg rounded-xl bg-white text-center hover:scale-105 transition-transform">
            <FaLeaf className="text-4xl text-orange-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Easy for Beginners</h3>
            <p>Step-by-step instructions make even tough recipes a breeze to cook.</p>
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="my-12 px-4">
       <Fade>
         <h2 className="text-3xl font-bold text-center mb-6 text-orange-600">Browse by Category</h2>
       </Fade>
        <div className="flex flex-wrap gap-6 justify-center">
          {[
            { name: 'Breakfast', img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80' },
            { name: 'Lunch', img: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80' },
            { name: 'Dinner', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80' },
            { name: 'Dessert', img: 'https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=800&q=80' },
            { name: 'Vegan', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_kMuWPMUAfPySoP-vMP5QkP2bC2cWz4v1Jw&s' }
          ].map(category => (
            <div
              key={category.name}
              className="card w-80 bg-base-100 image-full shadow-sm cursor-pointer hover:scale-105 transition-transform"
              onClick={() => navigate(`/category/${category.name.toLowerCase()}`)}
            >
              <figure>
                <img src={category.img} alt={category.name} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{category.name}</h2>
                <p>Explore delicious {category.name.toLowerCase()} recipes tailored just for you!</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">View</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;