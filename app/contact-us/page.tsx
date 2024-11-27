"use client";
import Link from "next/link";
import { ChefHat, Mail, Phone, MapPin, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

export default function Component() {
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
                  href="/About"
                  className="hover:text-green-500  block py-2 md:py-0">
                  About Us
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

      <main className="flex-grow container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-green-800">
          Contact Us
        </h1>
        <div className="grid md:grid-cols-2 gap-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-green-700">
                Get in Touch
              </CardTitle>
              <CardDescription>
                We'd love to hear from you. Send us a message and we'll respond
                as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Your message" rows={4} />
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <Send className="mr-2 h-4 w-4" /> Send Message
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-green-700">
                Contact Information
              </CardTitle>
              <CardDescription>
                You can also reach us using the following information:
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2 text-green-600">
                <Mail className="h-5 w-5" />
                <span>contact@greeneats.com</span>
              </div>
              <div className="flex items-center space-x-2 text-green-600">
                <Phone className="h-5 w-5" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-green-600">
                <MapPin className="h-5 w-5" />
                <span>123 Green Street, Eco City, EC 12345</span>
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full h-48 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600">Map placeholder</span>
              </div>
            </CardFooter>
          </Card>
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
