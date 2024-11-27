"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChefHat, Clock, Users, Leaf, Loader2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function RecipeDetails() {
  const params = useParams(); // Access params
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`/api/recipes/${params.id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRecipe(data.data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setError("Failed to load recipe. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  if (!recipe) {
    return <div className="text-center">Recipe not found.</div>;
  }

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      <header className="bg-green-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold flex items-center gap-2">
            <ChefHat size={32} />
            GreenEats
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/About" className="hover:text-green-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-green-200">
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-4 text-green-700">
              {recipe.title}
            </h1>
            <Image
              src={recipe.image || "/placeholder.svg?height=400&width=800"}
              alt={recipe.title}
              width={800}
              height={400}
              className="w-full h-96 object-cover rounded-lg mb-3"
            />
            <div className="flex flex-wrap gap-2 mb-4 text-green-800 ">
              {recipe.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-md">
                  {tag}
                </Badge>
              ))}
            </div>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{recipe.description}</p>
              </CardContent>
            </Card>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Recipe Details</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="text-green-600" />
                  <span>Prep: {recipe.prepTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="text-green-600" />
                  <span>Cook: {recipe.cookTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="text-green-600" />
                  <span>Serves: {recipe.servings}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Leaf className="text-green-600" />
                  <span>{recipe.calories} cal</span>
                </div>
              </CardContent>
            </Card>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Ingredients</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal pl-5 space-y-2">
                  {recipe.instructions.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

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
