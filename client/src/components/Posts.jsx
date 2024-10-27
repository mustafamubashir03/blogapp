import React from "react";
import Post from "./Post";

export default function Posts({ posts }) {
  console.log(posts);
  return (
    <div className="flex-12  flex justify-center items-center flex-col py-5 text-center text-gray-700 mt-6 md:flex-6 lg:flex-9">
      <h2 className="font-bold text-3xl text-center text-gray-800 mb-4">
        Posts
      </h2>
      {posts.length !== 0 ? (
        <div className="grid px-8 grid-cols-1  gap-6 md:grid-cols-1 lg:grid-cols-2">
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      ) : (
        "No posts at the moment"
      )}
    </div>
  );
}
