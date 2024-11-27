"use client";
import Link from "next/link";
import { ChefHat, Leaf, Users, Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";

export default function AboutPage() {
  const [menuOpen, setMenuOpen] = useState(false);
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
                  href="/contact-us"
                  className="hover:text-green-500  block py-2 md:py-0">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/add-recipe"
                  className="hover:text-green-500  block py-2 md:py-0">
                  Add Recipe
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-4xl font-bold mb-8 text-center text-green-800">
              About GreenEats
            </h1>
            <div className="prose prose-lg mx-auto">
              <p className="mb-6">
                GreenEats is more than just a recipe app – it's a movement
                towards healthier, more sustainable eating. Our mission is to
                inspire and empower people to make eco-friendly and nutritious
                food choices that are good for both their bodies and the planet.
              </p>
              <p className="mb-6">
                Founded in 2023 by a group of passionate foodies and
                environmental enthusiasts, GreenEats has grown into a vibrant
                community of health-conscious cooks and green living advocates.
                We believe that every meal is an opportunity to make a positive
                impact on our health and the environment.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-green-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-green-800">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Sustainability",
                  description:
                    "We promote recipes and cooking methods that minimize environmental impact.",
                  icon: <Leaf className="w-12 h-12 text-green-600 mb-4" />,
                },
                {
                  title: "Community",
                  description:
                    "We foster a supportive community of like-minded individuals passionate about green eating.",
                  icon: <Users className="w-12 h-12 text-green-600 mb-4" />,
                },
                {
                  title: "Health",
                  description:
                    "We prioritize nutritious recipes that contribute to overall wellbeing.",
                  icon: <Heart className="w-12 h-12 text-green-600 mb-4" />,
                },
              ].map((value, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <CardTitle className="flex flex-col items-center">
                      {value.icon}
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{value.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-8 text-center text-green-800">
              Meet Our Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Alex Green",
                  role: "Founder & Head Chef",
                  image: "/random.jpg",
                },
                {
                  name: "Sam Eco",
                  role: "Nutritionist",
                  image: "/girl.jpg",
                },
                {
                  name: "Jamie Sustain",
                  role: "Environmental Specialist",
                  image: "/boy.jpg",
                },
              ].map((member, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={200}
                      height={200}
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                    />
                    <CardTitle>{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-green-600 text-white">
          <div className="container mx-auto text-center px-4">
            <h2 className="text-3xl font-bold mb-8">Join Our Green Movement</h2>
            <p className="mb-8 max-w-2xl mx-auto">
              Be part of our mission to make the world healthier and more
              sustainable, one recipe at a time. Sign up now to get access to
              exclusive recipes, tips, and a supportive community of green food
              enthusiasts.
            </p>
            <Button className="bg-white text-green-600 hover:bg-green-100">
              Sign Up Now
            </Button>
          </div>
        </section>
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
