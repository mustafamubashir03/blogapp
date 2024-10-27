import { useEffect, useState } from "react";
import Header from "../components/Header";
import Posts from "../components/Posts";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  useEffect(() => {
    const dataFetcher = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/post/${search}`
      );
      setPosts(response.data);
    };
    dataFetcher();
  }, [search]);

  return (
    <div>
      <Header />
        <div className="max-w-screen-xl m-auto px-4">
        <div className="flex flex-col gap-10 md:flex-row lg:flex-row">
          <Posts posts={posts} />
          <Sidebar />
        </div>
      </div>
    </div>
  );
} 
