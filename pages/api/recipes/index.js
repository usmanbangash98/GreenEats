// pages/api/recipes/index.js
import dbConnect from "../../../lib/mongodb";
import Recipe from "../../../models/Recipe";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await dbConnect(); // Ensure connection is established

    const recipes = await Recipe.find({}).sort({ createdAt: -1 }).limit(10);

    res.status(200).json({ success: true, data: recipes });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}
