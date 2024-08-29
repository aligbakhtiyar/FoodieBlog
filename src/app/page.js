import Header from "../components/Header";
import Home from "@/components/Home";

export const fetchBlogPosts = async () => {
  const res = await fetch("https://node-js-app-liard.vercel.app/api/items");
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return await res.json();
};

export default async function BlogPostPage() {
  const post = await fetchBlogPosts();

  return (
    <>
      <Header />
      <Home/>
    </>
  );
}