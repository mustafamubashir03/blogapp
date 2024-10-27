import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { context } from "../../context/context";


export default function SinglePage() {
  const { user } = useContext(context);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  let id = pathname.split("/")[2];
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  let PF = "http://localhost:3000/images/";
  useEffect(() => {
    const dataFetcher = async () => {
      const response = await axios.get(`http://localhost:3000/api/post/${id}`);
      setPost(response.data);
      setTitle(response.data.title);
      setDescription(response.data.description);
    };
    dataFetcher();
  }, [id]);

  const handleDelete = async () => {
    await axios.delete(
      "http://localhost:3000/api/post/" + id,
      { data: { username: user.username } }
    );
    navigate("/");
  };
  const handleUpdate = async () => {
    const response = await axios.put("http://localhost:3000/api/post/" + id, {
      username: user.username,
      title,
      description,
    });
    console.log(response.data);
    setUpdateMode(false);
  };

  return (
    <div className="flex px-8 flex-col gap-10 text-center max-w-screen-xl mx-auto  md:flex-row md:px-4 lg:flex-row lg:px-4 ">
      <div className="mt-5 flex-12  text-gray-700 w-full border-2 border-gray-200 rounded-md py-4 px-5 overflow-hidden md:flex-9 lg:flex-9">
        <img
          className="mb-4 w-full  object-cover rounded-md h-80"
          src={
            PF + post.image ||
            "https://images.unsplash.com/photo-1463569482774-e63b918040ff?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt=""
        />
        <div className="flex items-center justify-between">
          {updateMode ? (
            <input
              className="focus:border-none text-center py-4 px-5 border-none text-2xl font-bold text-gray-900 w-full border focus:border-transparent focus:outline-none focus:ring-0"
              type="text"
              autoFocus={true}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Title"
            />
          ) : (
            <h3 className="font-bold text-2xl mt-4 mb-3">{title}</h3>
          )}

          {user.username === post.username && (
            <div className="justify-self-end flex gap-3">
              <i
                onClick={() => setUpdateMode(true)}
                class="text-xl cursor-pointer text-blue-500 fa-solid fa-pen-to-square"
              ></i>
              <i
                onClick={handleDelete}
                class="text-xl cursor-pointer text-red-500 fa-solid fa-trash"
              ></i>
            </div>
          )}
        </div>
        <Link to={`/?username=${post.username}`}>
          <p className="mb-2  font-semibold text-gray-400 text-left cursor-pointer">
            {post.username}
          </p>
        </Link>
        {updateMode ? (
          <textarea
            type="text"
            className="text-center py-4 px-5 border-none text-gray-800 w-full border focus:border-transparent focus:outline-none focus:ring-0"
            placeholder="Share your Story..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        ) : (
          <p className="leading-normal mb-4  text-gray-500 text-left">
            {description}
          </p>
        )}

        <p className="mb-2  font-semibold text-gray-400">
          {new Date(post.createdAt).toDateString()}
        </p>
        {updateMode && (
          <button
            onClick={handleUpdate}
            className={`bg-blue-700 mt-6 
             text-white  font-bold border-none py-3 px-16  rounded-md    active:bg-blue-600  transition-all duration-300 ease-in-out hover:bg-blue-900`}
          >
            Update
          </button>
        )}
      </div>

      <Sidebar />
    </div>
  );
}
