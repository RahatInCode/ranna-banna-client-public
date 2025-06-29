import { ChefHat, Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <ChefHat className="h-6 w-6" />
              <span className="font-bold">Ranna-Banna</span>
            </Link>
            <p className="text-muted-foreground max-w-md">
              A culinary community where food lovers discover, share, and celebrate recipes from around the world.
              Join us to explore flavors and create memorable dining experiences.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/AllRecipe" className="text-muted-foreground hover:text-foreground transition-colors">
                  All Recipes
                </Link>
              </li>
              <li>
                <Link to="/AddRecipe" className="text-muted-foreground hover:text-foreground transition-colors">
                  Add Recipe
                </Link>
              </li>
              <li>
                <Link to="/MyRecipe" className="text-muted-foreground hover:text-foreground transition-colors">
                  My Recipes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <address className="not-italic text-muted-foreground space-y-2">
              <p>123 Cooking Street</p>
              <p>Foodie City, FC 12345</p>
              <p>Email: hello@rannabanna.com</p>
              <p>Phone: (123) 456-7890</p>
            </address>

            <div className="flex gap-4 mt-4">
              <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Ranna-Banna. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
