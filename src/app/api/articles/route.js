import { connectDB } from "../../../../lib/config/db";
import Article from "../../../../lib/models/Article";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    console.log("POST request started");
    await connectDB(); // Ensure MongoDB is connected

    const { category } = await req.json();
    console.log("Category from request:", category);

    // Delete old articles before saving new ones
    await Article.deleteMany({ category });
    console.log("Old articles deleted, saving new ones...");

    console.log("Fetching new articles from Serper.dev API...");
    const searchQuery = category || "latest headlines worldwide";

    const response = await fetch("https://google.serper.dev/news", {
      method: "POST",
      headers: {
        'X-API-KEY': process.env.SERPER_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ q: searchQuery, num: 12 }), // Requesting exactly 12 articles
    });

    const data = await response.json();
    console.log("Serper API response:", data);

    if (!data?.news?.length) {
      return NextResponse.json({ error: "No articles found" }, { status: 404 });
    }

    // Ensure only 12 articles are saved
    const newArticles = data.news.slice(0, 12);

    // Save new articles to MongoDB
    const savedArticles = await Promise.all(
      newArticles.map(async (article) => {
        return Article.create({
          title: article.title,
          link: article.link,
          summary: article.snippet || "No summary available.",
          image: article.imageUrl || "/default-thumbnail.jpg",
          category,
          createdAt: new Date(), // Save timestamp for freshness check
        });
      })
    );

    console.log("New articles saved successfully");
    return NextResponse.json({ message: "Articles updated", savedArticles }, { status: 201 });

  } catch (error) {
    console.error("Error saving articles:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}



export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || "All";
    console.log("GET request for category:", category);

    const filter = category === "All" ? {} : { category };
    const articles = await Article.find(filter).sort({ createdAt: -1 }).limit(12);

    console.log("Fetched articles count:", articles.length);
    return NextResponse.json({ savedArticles: articles }, { status: 200 });

  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
