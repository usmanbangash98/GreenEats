import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  prepTime: { type: String, required: true },
  cookTime: { type: String, required: true },
  servings: { type: Number, required: true },
  calories: { type: Number, required: true },
  ingredients: [{ type: String, required: true }],
  instructions: [{ type: String, required: true }],
  tags: [{ type: String }],
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Recipe || mongoose.model("Recipe", RecipeSchema);
