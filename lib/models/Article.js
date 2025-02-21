import mongoose from "mongoose";

// Define the Article Schema
const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
  summary: { type: String, required: true },
  image: { type: String, required: true }, // Thumbnail image URL
  category: { type: String, required: true },  
  createdAt: { type: Date, default: Date.now },
});

// Check if the model already exists, if not, create a new one
const Article = mongoose.models.Article || mongoose.model("Article", ArticleSchema);

export default Article;
