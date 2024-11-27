import { IncomingForm } from "formidable";
import dbConnect from "../../../lib/mongodb";
import Recipe from "../../../models/Recipe";
import { saveFile } from "../../../lib/fileUpload";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await dbConnect();

    const form = new IncomingForm({
      keepExtensions: true,
      multiples: false,
    });

    const formData = await new Promise((resolve, reject) => {
      form.parse(req, async (err, fields, files) => {
        if (err) {
          reject(err);
          return;
        }
        resolve({ fields, files });
      });
    });

    const { fields, files } = formData;

    // Handle image upload
    let imagePath = "";
    if (files.image) {
      const imageFile = Array.isArray(files.image)
        ? files.image[0]
        : files.image;
      imagePath = await saveFile(imageFile);
    }

    // Extract single values from array fields
    const recipeData = {
      title: Array.isArray(fields.title) ? fields.title[0] : fields.title,
      description: Array.isArray(fields.description)
        ? fields.description[0]
        : fields.description,
      prepTime: Array.isArray(fields.prepTime)
        ? fields.prepTime[0]
        : fields.prepTime,
      cookTime: Array.isArray(fields.cookTime)
        ? fields.cookTime[0]
        : fields.cookTime,
      servings: Array.isArray(fields.servings)
        ? Number(fields.servings[0])
        : Number(fields.servings),
      calories: Array.isArray(fields.calories)
        ? Number(fields.calories[0])
        : Number(fields.calories),
      ingredients: JSON.parse(
        Array.isArray(fields.ingredients)
          ? fields.ingredients[0]
          : fields.ingredients || "[]"
      ),
      instructions: JSON.parse(
        Array.isArray(fields.instructions)
          ? fields.instructions[0]
          : fields.instructions || "[]"
      ),
      tags: JSON.parse(
        Array.isArray(fields.tags) ? fields.tags[0] : fields.tags || "[]"
      ),
      image: imagePath,
    };

    const recipe = new Recipe(recipeData);
    await recipe.save();

    return res.status(201).json({ success: true, data: recipe });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
}
