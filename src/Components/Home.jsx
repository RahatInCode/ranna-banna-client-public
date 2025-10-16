import { useLoaderData, useNavigate } from 'react-router';
import RecipeCard from './RecipeCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Autoplay } from 'swiper/modules';
import { FaLeaf, FaHeart, FaUtensils } from 'react-icons/fa';
import { Typewriter } from 'react-simple-typewriter';
import { Fade, Slide } from 'react-awesome-reveal';

const Home = () => {
  const initialRecipes = useLoaderData();
  const navigate = useNavigate();

  // Sort by most liked
  const topRecipes = [...initialRecipes].sort((a, b) => (b.likes || 0) - (a.likes || 0)).slice(0, 6);

  return (
    <div>
      {/* Hero Swiper Banner */}
      <Swiper
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        modules={[Pagination, Autoplay]}
        className="mySwiper rounded-xl overflow-hidden h-96 md:h-[500px] mb-12 shadow-2xl"
      >
        <SwiperSlide
          className="bg-cover bg-center text-white relative"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1470&q=80')`,
          }}
        >
          <div className="flex flex-col justify-center items-center h-full gap-6 px-4">
            <Fade cascade damping={0.2}>
              <h1 className="text-4xl md:text-6xl font-black text-center">
                Welcome to Ranna-Banna 🍽️
              </h1>
              <p className="text-xl md:text-2xl text-center max-w-2xl">
                Discover, Share & Enjoy Delicious Recipes from Around the World
              </p>
            </Fade>
          </div>
        </SwiperSlide>

        <SwiperSlide
          className="bg-cover bg-center text-white relative"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=1470&q=80')`,
          }}
        >
          <div className="flex flex-col justify-center items-center h-full gap-6 px-4">
            <Fade cascade>
              <h1 className="text-4xl md:text-6xl font-black text-center">
                Your Go-To Recipe Hub 👨‍🍳
              </h1>
              <p className="text-xl md:text-2xl text-center max-w-2xl">
                Join thousands of food lovers sharing their culinary secrets
              </p>
            </Fade>
          </div>
        </SwiperSlide>

        <SwiperSlide
          className="bg-cover bg-center text-white relative"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1470&q=80')`,
          }}
        >
          <div className="flex flex-col justify-center items-center h-full gap-6 px-4">
            <Fade cascade>
              <h1 className="text-4xl md:text-6xl font-black text-center">
                Share Your Recipe Today! ✨
              </h1>
              <button 
                onClick={() => navigate('/AddRecipe')}
                className="btn btn-warning btn-lg hover:scale-110 transition-transform"
              >
                Add Your Recipe
              </button>
            </Fade>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Top Recipes Section */}
      <div className="text-center mt-16 mb-10 px-4">
        <Slide direction="down">
          <h2 className="text-5xl font-black bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
            Most Loved Recipes ❤️
          </h2>
        </Slide>
        
        <div className="text-3xl font-bold text-gray-700 mb-4">
          <Typewriter
            words={['Tasty', 'Cheesy', 'Crispy', 'Spicy', 'Delicious', 'Mouthwatering']}
            loop={0}
            cursor
            cursorStyle='|'
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </div>
        
        <p className="text-gray-600 text-lg mb-6">
          Recipes that stole the hearts of our community
        </p>
        
        <button
          onClick={() => navigate('/AllRecipe')}
          className="btn btn-warning btn-lg hover:scale-105 transition-transform shadow-lg"
        >
          Explore All Recipes →
        </button>
      </div>

      {/* Recipe Cards */}
      <div className="container mx-auto px-4">
        <Fade cascade damping={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topRecipes.map(recipe => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        </Fade>
      </div>

      {/* Why Choose Section */}
      <section className="my-20 px-4 bg-gradient-to-r from-orange-50 to-red-50 py-16">
        <Fade>
          <h2 className="text-5xl font-black text-center mb-12 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Why Choose Ranna-Banna? 🌟
          </h2>
        </Fade>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Slide direction="up" cascade damping={0.2}>
            <div className="card bg-white shadow-2xl hover:scale-105 transition-transform">
              <div className="card-body items-center text-center">
                <FaUtensils className="text-6xl text-orange-500 mb-4" />
                <h3 className="card-title text-2xl">Authentic Recipes</h3>
                <p className="text-gray-600">
                  Traditional recipes with modern twists from real food lovers
                </p>
              </div>
            </div>

            <div className="card bg-white shadow-2xl hover:scale-105 transition-transform">
              <div className="card-body items-center text-center">
                <FaHeart className="text-6xl text-pink-500 mb-4" />
                <h3 className="card-title text-2xl">Community Driven</h3>
                <p className="text-gray-600">
                  Join a passionate community of home chefs and food enthusiasts
                </p>
              </div>
            </div>

            <div className="card bg-white shadow-2xl hover:scale-105 transition-transform">
              <div className="card-body items-center text-center">
                <FaLeaf className="text-6xl text-green-500 mb-4" />
                <h3 className="card-title text-2xl">Easy to Follow</h3>
                <p className="text-gray-600">
                  Step-by-step instructions make cooking a breeze for everyone
                </p>
              </div>
            </div>
          </Slide>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="my-20 px-4">
        <Fade>
          <h2 className="text-5xl font-black text-center mb-12 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Browse by Category 🍴
          </h2>
        </Fade>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Slide cascade damping={0.1}>
            {[
              { name: 'Breakfast', img: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80', emoji: '🍳' },
              { name: 'Lunch', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80', emoji: '🍛' },
              { name: 'Dinner', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80', emoji: '🍝' },
              { name: 'Dessert', img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80', emoji: '🍰' },
              { name: 'Vegan', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80', emoji: '🥗' },
              { name: 'Snacks', img: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=800&q=80', emoji: '🍿' },
            ].map(category => (
              <div
                key={category.name}
                className="card image-full shadow-2xl cursor-pointer hover:scale-105 transition-transform group"
                onClick={() => navigate(`/category/${category.name.toLowerCase()}`)}
              >
                <figure>
                  <img src={category.img} alt={category.name} className="w-full h-64 object-cover" />
                </figure>
                <div className="card-body justify-center items-center">
                  <div className="text-6xl mb-4 group-hover:scale-125 transition-transform">{category.emoji}</div>
                  <h2 className="card-title text-3xl font-bold">{category.name}</h2>
                  <p className="text-center">Explore delicious {category.name.toLowerCase()} recipes</p>
                  <button className="btn btn-warning mt-4">View Recipes</button>
                </div>
              </div>
            ))}
          </Slide>
        </div>
      </section>
    </div>
  );
};

export default Home;