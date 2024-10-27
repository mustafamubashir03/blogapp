import React from "react";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  let PF = "http://localhost:3000/images/"

  return (
    <Link to={`/single-page/${post._id}`}>
      <div className="w-full text-gray-700  border-2 border-gray-200 hover:border-blue-200 transition-colors duration-300 ease-in-out rounded-md py-4 px-5 overflow-hidden cursor-pointer">
        {post.image && (
          <img
            className="mb-4 w-full  object-cover rounded-md h-52"
            src={PF + post.image}
            alt=""
          />
        )}
        <h3 className="font-bold text-xl mt-4 mb-3">{post.title}</h3>
        <div className="mb-2  font-bold text-gray-500 flex justify-center items-center gap-4">
          {post.categories.map((cat) => (
            <p className="text-green-700">{cat}</p>
          ))}
        </div>
        <p className="leading-normal mb-4 text-clip line-clamp-3 ">
          {post.description}
        </p>
        <p className="mb-2  font-semibold text-gray-400">
          {new Date(post.createdAt).toDateString()}
        </p>
      </div>
    </Link>
  );
}
