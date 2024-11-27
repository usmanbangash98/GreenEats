"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ChefHat,
  Plus,
  X,
  Salad,
  WheatOff,
  Fish,
  Cake,
  Pizza,
  HandPlatter,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

export default function Component() {
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);
  const [tag, setTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const categories = [
    { name: "Vegetarian", icon: Salad },
    { name: "Gluten-Free", icon: WheatOff },
    { name: "Seafood", icon: Fish },
    { name: "Desserts", icon: Cake },
    { name: "Fast Food", icon: Pizza },
    { name: "Traditional", icon: HandPlatter },
  ];

  const addField = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter((prev) => [...prev, ""]);
  };

  const removeField = (
    index: number,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  const updateField = (
    index: number,
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev) => prev.map((item, i) => (i === index ? value : item)));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    // Filter out empty values before stringifying
    const filteredIngredients = ingredients.filter((i) => i.trim() !== "");
    const filteredInstructions = instructions.filter((i) => i.trim() !== "");

    // Add arrays to formData
    formData.set("ingredients", JSON.stringify(filteredIngredients));
    formData.set("instructions", JSON.stringify(filteredInstructions));
    formData.set("tags", JSON.stringify([tag]));

    // Check if an image file was selected
    const imageFile =
      form.querySelector<HTMLInputElement>('input[type="file"]')?.files?.[0];
    if (imageFile) {
      formData.set("image", imageFile);
    }

    try {
      const response = await fetch("/api/recipes/add", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType?.includes("application/json")) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to add recipe");
        } else {
          const errorText = await response.text();
          console.error("Server responded with non-JSON content:", errorText);
          throw new Error("Server error occurred. Please try again later.");
        }
      }

      const data = await response.json();
      toast({
        title: "Success",
        description: "Your recipe has been added successfully!",
        variant: "default",
      });

      // Delay navigation for 3 seconds
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    } catch (error) {
      console.error("Error adding recipe:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to add recipe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      <header className="bg-green-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold flex items-center gap-2 hover:text-green-500">
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
                  className="hover:text-green-500  block py-2 md:py-0">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="hover:text-green-500  block py-2 md:py-0">
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center text-green-800">
          Add New Recipe
        </h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Recipe Details</CardTitle>
              <CardDescription>
                Provide the basic information about your recipe.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Recipe Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter recipe title"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Briefly describe your recipe"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="prepTime">Preparation Time</Label>
                  <Input
                    id="prepTime"
                    name="prepTime"
                    placeholder="e.g. 15 mins"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cookTime">Cooking Time</Label>
                  <Input
                    id="cookTime"
                    name="cookTime"
                    placeholder="e.g. 30 mins"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="servings">Servings</Label>
                  <Input
                    id="servings"
                    name="servings"
                    type="number"
                    placeholder="e.g. 4"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="calories">Calories</Label>
                  <Input
                    id="calories"
                    name="calories"
                    type="number"
                    placeholder="e.g. 300"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ingredients</CardTitle>
              <CardDescription>
                List the ingredients needed for your recipe.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={ingredient}
                    onChange={(e) =>
                      updateField(index, e.target.value, setIngredients)
                    }
                    placeholder={`Ingredient ${index + 1}`}
                    required
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeField(index, setIngredients)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => addField(setIngredients)}
                className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add Ingredient
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Instructions</CardTitle>
              <CardDescription>
                Provide step-by-step instructions for your recipe.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {instructions.map((instruction, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Textarea
                    value={instruction}
                    onChange={(e) =>
                      updateField(index, e.target.value, setInstructions)
                    }
                    placeholder={`Step ${index + 1}`}
                    required
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeField(index, setInstructions)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => addField(setInstructions)}
                className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add Step
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Category</CardTitle>
              <CardDescription>
                Select a category for your recipe.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select onValueChange={setTag} required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {categories.map((category) => (
                    <SelectItem key={category.name} value={category.name}>
                      <div className="flex items-center">
                        <category.icon className="mr-2 h-4 w-4" />
                        {category.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recipe Image</CardTitle>
              <CardDescription>Upload an image of your recipe.</CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                aria-label="Recipe image"
                required={false}
              />
            </CardContent>
          </Card>

          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Recipe"}
          </Button>
        </form>
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
