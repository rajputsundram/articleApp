"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import BlogItem from "./BlogItem";

const BlogList = () => {
  const [menu, setMenu] = useState("All"); // Category state
  const [blogData, setBlogData] = useState([]); // State to store articles
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Function to fetch articles from database
  const fetchArticles = async (category) => {
    setLoading(true);
    setError(null);

    try {
      const getResponse = await axios.get(`/api/articles?category=${category}`);
      if (getResponse.data?.savedArticles) {
        setBlogData(getResponse.data.savedArticles);
      } else {
        setBlogData([]);
      }
    } catch (err) {
      setError("Failed to load articles. Please try again later.");
      setBlogData([]);
    }

    setLoading(false);
  };

  // Fetch articles on component mount and when category changes
  useEffect(() => {
    fetchArticles(menu);
  }, [menu]);

  return (
    <div>
      {/* Category Buttons */}
      <div className="flex justify-center gap-6 my-10">
        {["All", "News", "Technology", "Lifestyle"].map((cat) => (
          <button
            key={cat}
            onClick={() => setMenu(cat)}
            className={`py-1 px-4 rounded-sm transition-colors duration-200 ${
              menu === cat
                ? "bg-black text-white shadow-lg"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Pass Articles as Props to BlogItem */}
      <div className="flex flex-wrap justify-around gap-4 mb-16 xl:mx-24">
        {loading && <p>Loading articles...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error &&
          blogData.length > 0 &&
          blogData.map((item) => (
            <BlogItem
              key={item._id}
              id={item._id}
              link={item.link}
              image={item.image || "/default-thumbnail.jpg"}
              title={item.title}
              description={item.summary}
              category={item.category}
            />
          ))}
      </div>
    </div>
  );
};

export default BlogList;
