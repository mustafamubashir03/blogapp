import React, { useContext, useState } from "react";
import Button from "../components/Button";
import axios from "axios";
import { context } from "../../context/context";
import { useNavigate } from "react-router-dom";

export default function Write() {
  const { user } = useContext(context);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleWrite = async (e) => {
    e.preventDefault();
    try {
      const newPost = {
        title,
        description,
        username: user.username,
      };
      if (image) {
        console.log("I ran");
        const data = new FormData();
        const filename = Date.now() + image.name;
        data.append("name", filename);
        data.append("file", image);
        console.log(data); 
        newPost.image = filename;
        console.log(newPost);
        try {
          const response = await axios.post(
            "http://localhost:3000/api/upload",
            data
          );
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      }
      console.log(newPost);
      const response2 = await axios.post(
        "http://localhost:3000/api/post",
        newPost
      );
      console.log(response2.data)
      navigate("/single-page/" + response2.data._id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-screen h-full flex flex-col justify-center items-center text-center">
      <h2 className="font-bold text-3xl text-gray-800 mb-5 mt-5">Write Blog</h2>
      <form
        className="border-2 border-gray-300 flex flex-col mb-5 pb-6 pt-6 px-6 gap-4 md:py-4 md:px-6 lg:gap-8 items-center w-2/3 lg:py-8 lg:px-10 "
        onSubmit={handleWrite}
      >
        {image && (
          <img
            className=" w-full my-4 object-cover rounded-md  h-56"
            src={URL.createObjectURL(image)}
            alt=""
          />
        )}
        <div className="border-2 border-gray-600 h-14 w-14 flex justify-center items-center cursor-pointer rounded-full">
          <label htmlFor="file">
            <i className="text-4xl text-gray-700 fa-solid fa-plus cursor-pointer"></i>
          </label>
          <input
            className="hidden"
            type="file"
            id="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <input
          className="focus:border-none text-center py-4 px-5 border-none text-4xl font-bold text-gray-900 w-full border focus:border-transparent focus:outline-none focus:ring-0"
          type="text"
          autoFocus={true}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Title"
        />
        <textarea
          type="text"
          className="text-center py-4 px-5 border-none text-gray-800 w-full border focus:border-transparent focus:outline-none focus:ring-0"
          placeholder="Share your Story..."
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button type={"submit"} label={"Publish"} />
      </form>
    </div>
  );
}
