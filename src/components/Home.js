"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { fetchBlogPosts } from "../app/page";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchBlogPosts();
        if (Array.isArray(data)) {
          setPosts(data);
          setFilteredPosts(data); // Set filteredPosts to all posts initially
        } else {
          setPosts([]);
          setFilteredPosts([]);
        }
      } catch (error) {
        console.error(error);
        setPosts([]);
        setFilteredPosts([]);
      }
    };

    loadPosts();
  }, []);

  const handleSearch = async (query) => {
    if (query.trim() === "") {
      setFilteredPosts(posts); // Reset to all posts if the query is empty
      setNotFound(false);
      return;
    }
    const url = `https://node-js-app-liard.vercel.app/api/items/search?name=${query}`;
    console.log(url);
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      console.log(data, "jjjjj");
      if (Array.isArray(data) && data.length > 0) {
        setFilteredPosts(data);
        setNotFound(false);
      } else {
        setFilteredPosts([]);
        setNotFound(true);
      }
    } catch (error) {
      console.error(error);
      setFilteredPosts([]);
      setNotFound(true);
    }
  };

  return (
    <div className="mx-auto max-w-7xl bg-[#f7f7f7]">
      <h2 className="flex justify-center font-semibold pt-32 mb-12 text-blue-500 text-3xl">
        Food: What do you want?
      </h2>

      <SearchBar onSearch={handleSearch} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 mx-6">
        {notFound ? (
          <p className="col-span-full text-center text-red-500 text-lg">
            No items found.
          </p>
        ) : (
          filteredPosts.map((post) => (
            <div
              key={post._id}
              className="relative flex flex-col mt-8 pt-12 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl"
            >
              <div className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                <img
                  src={post.thumbnail_image}
                  alt={post.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                  {post.name}
                </h5>
                <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                  {post.instructions.substring(0, 100)}...
                </p>
              </div>
              <div className="p-6 pt-0">
                <button
                  className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                  type="button"
                >
                  Read More
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
