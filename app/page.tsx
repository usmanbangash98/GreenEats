"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  UtensilsCrossed,
  Pizza,
  ChefHat,
  Fish,
  Cake,
  Salad,
  WheatOff,
  HandPlatter,
  Search,
  Share2,
  Loader2,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HomePage() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [displayedRecipes, setDisplayedRecipes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("/api/recipes");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRecipes(data.data);
        setDisplayedRecipes(getRandomRecipes(data.data, 6));
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setError("Failed to load recipes. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const getRandomRecipes = (recipeList: any[], count: number) => {
    const shuffled = [...recipeList].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const getIcon = (iconName: string) => {
    const icons = {
      UtensilsCrossed,
      Pizza,
      ChefHat,
      Fish,
      Cake,
      Salad,
      WheatOff,
      HandPlatter,
    };
    return icons[iconName as keyof typeof icons] || UtensilsCrossed;
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    const filteredRecipes = recipes.filter((recipe: any) =>
      recipe.tags.includes(category)
    );
    if (filteredRecipes.length > 0) {
      setDisplayedRecipes(filteredRecipes);
      setError(null);
    } else {
      setDisplayedRecipes([]);
      setError(`No recipes found in the ${category} category.`);
    }
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchResults = recipes.filter((recipe: any) =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (searchResults.length > 0) {
      setDisplayedRecipes(searchResults);
      setError(null);
    } else {
      setDisplayedRecipes([]);
      setError(`No recipes found matching "${searchTerm}".`);
    }
    setSearchTerm("");
  };

  const galleryImages = [
    { src: "/salad.jpg", alt: "Colorful salad" },
    { src: "/fish.jpg", alt: "Grilled salmon" },
    { src: "/ribs.jpg", alt: "Vegetarian pasta" },
    { src: "/biryani.jpg", alt: "Fruit smoothie" },
    { src: "/pizza.jpg", alt: "Homemade pizza" },
    { src: "/dessert.jpg", alt: "Chocolate dessert" },
    { src: "/bbq.jpg", alt: "Bbq" },
    { src: "/kabab.jpg", alt: "Seekh kabab" },
    { src: "/handi.jpg", alt: "handi" },
  ];

  const categories = [
    { name: "Vegetarian", icon: "Salad" },
    { name: "Gluten-Free", icon: "WheatOff" },
    { name: "Seafood", icon: "Fish" },
    { name: "Desserts", icon: "Cake" },
    { name: "Fast Food", icon: "Pizza" },
    { name: "Traditional", icon: "HandPlatter" },
  ];

  return (
    <div className="min-h-screen bg-green-50">
      {/* navbar */}
      <header className="bg-green-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold flex items-center gap-2 hover:text-green-500"
            onClick={(e) => {
              e.preventDefault();
              window.location.reload();
            }}>
            <ChefHat size={32} />
            GreenEats
          </Link>
          <button
            className="text-white focus:outline-none md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
          <nav
            className={`${
              menuOpen ? "block" : "hidden"
            } md:block md:items-center`}>
            <ul className="flex flex-col md:flex-row md:space-x-4">
              <li>
                <Link
                  href="/About"
                  className="hover:text-green-500 block py-2 md:py-0">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="hover:text-green-500 block py-2 md:py-0">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/add-recipe"
                  className="hover:text-green-500 block py-2 md:py-0">
                  Add Recipe
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* hero image with search */}
      <main>
        <section className="relative h-[75vh]">
          <div className="absolute inset-0 z-0 ">
            <Image
              src="/ggg.jpg"
              alt="Fresh vegetables and herbs"
              className="w-full h-full object-cover"
              width={1920}
              height={1080}
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>
          <div className="relative z-10 container mx-auto px-4 py-20 text-center text-white">
            <h1 className="text-4xl font-bold mb-4">
              Discover Delicious Green Recipes
            </h1>
            <p className="mb-8 text-xl">
              Find and share the best eco-friendly and healthy recipes
            </p>
            <form onSubmit={handleSearch} className="flex justify-center">
              <div className="relative w-full max-w-xl">
                <Input
                  type="search"
                  placeholder="Search for recipes..."
                  className="w-full py-3 pl-12 pr-4 text-green-900 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-green-600"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button
                  type="submit"
                  className="absolute left-1 top-0 text-green-700">
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </form>
          </div>
        </section>

        {/* featured recipes */}
        <section className="py-9">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-green-800">
              {selectedCategory
                ? `${selectedCategory} Recipes`
                : "Featured Recipes"}
            </h2>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-green-600" />
              </div>
            ) : error ? (
              <div className="text-center text-red-600">{error}</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedRecipes.map((recipe: any) => (
                  <Card
                    key={recipe._id}
                    className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <UtensilsCrossed />
                        {recipe.title}
                      </CardTitle>
                      <CardDescription>{recipe.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src={
                          recipe.image ||
                          "/placeholder.svg?height=200&width=400"
                        }
                        alt={recipe.title}
                        className="w-full h-48 object-cover rounded-md"
                        width={400}
                        height={200}
                      />
                    </CardContent>
                    <CardFooter>
                      <Link href={`/recipe/${recipe._id}`} className="w-full">
                        <Button className="w-full bg-green-600 hover:bg-green-700">
                          View Recipe
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* categories list */}
        <section className="bg-green-100 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-green-800">
              Recipe Categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category, index) => {
                const IconComponent = getIcon(category.icon);
                return (
                  <Card
                    key={index}
                    className={`text-center hover:shadow-md transition-shadow cursor-pointer ${
                      selectedCategory === category.name ? "bg-green-200" : ""
                    }`}
                    onClick={() => handleCategoryClick(category.name)}>
                    <CardContent className="pt-6">
                      <IconComponent className="mx-auto" size={32} />
                      <h3 className="mt-2 font-semibold">{category.name}</h3>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* images gallery */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-green-800">
              Culinary Inspiration Gallery
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="relative h-64 overflow-hidden rounded-lg">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={800}
                    height={400}
                    className="transition-transform duration-300 hover:scale-110 object-cover md:object-contain w-full h-auto"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* sharing section */}
        <section className="py-16 bg-green-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-green-800">
              Discover the Joy of Online Recipe Sharing
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Image
                  src="/recipe-sharing.jpg"
                  alt="People sharing recipes online"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-md"
                />
              </div>
              <div className="space-y-4">
                <p className="text-lg">
                  Accessing and sharing recipes has never been easier! With
                  GreenEats, you can:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Find recipes from around the world in seconds</li>
                  <li>Share your favorite recipes with a global community</li>
                  <li>Save and organize recipes for quick access</li>
                  <li>Collaborate with friends on meal planning</li>
                </ul>
                <p className="text-lg">
                  Join our community today and experience the fun of culinary
                  exploration and sharing!
                </p>
                <Link href="/add-recipe">
                  <Button className="mt-4 bg-green-600 hover:bg-green-700">
                    <Share2 className="mr-2 h-4 w-4" /> Start Sharing Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* footer */}
      <footer className="bg-green-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 GreenEats Recipe App. All rights reserved.</p>
          <div className="mt-4 flex justify-center gap-4">
            <Link href="/Policy" className="hover:text-green-200">
              Privacy Policy
            </Link>
            <Link href="/About" className="hover:text-green-200">
              About Us
            </Link>
            <Link href="/Terms" className="hover:text-green-200">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
