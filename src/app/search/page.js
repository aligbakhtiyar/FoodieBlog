"use client"; // Add this directive to ensure it's a Client Component

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";

const SearchItem = () => {
  const searchText = useParams();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryParam = params.get("query");
    if (queryParam) {
      setQuery(queryParam);
    }
  }, []); // Add an empty dependency array to run this effect only once

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://node-js-app-liard.vercel.app/api/items/search`,
          {
            params: { name: query },
          }
        );
        console.log(response.data); // Check the structure of the data here
        setResults(response.data);
      } catch (err) {
        setError(err.message || "Fetching Error");
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchItems();
    }
  }, [query]); // Fetch items when the query changes

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  console.log(results, "results"); // Check the structure of the results

  return (
    <div className="mx-auto max-w-7xl mt-10">
      <label
        className="mx-auto relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300"
        htmlFor="search-bar"
      >
        <input
          id="search-bar"
          placeholder="Your keyword here"
          className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white"
          value={query}
          onChange={handleChange}
        />
        <button
          className="w-full md:w-auto px-6 py-3 bg-blue-700 text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all disabled:opacity-70"
          type="button"
        >
          <div className="relative">
            {loading ? (
              <div className="flex items-center justify-center h-3 w-3 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transition-all">
                <svg
                  className="opacity-0 animate-spin w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx={12}
                    cy={12}
                    r={10}
                    stroke="currentColor"
                    strokeWidth={4}
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            ) : (
              <span className="text-sm font-semibold whitespace-nowrap truncate mx-auto">
                Search
              </span>
            )}
          </div>
        </button>
      </label>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <div className="results mt-6">
        {Array.isArray(results) && results.length > 0 ? (
          results.map((item) => (
            <div key={item.id}>{item.name}</div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchItem;
