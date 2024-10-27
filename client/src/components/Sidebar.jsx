import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { context } from "../../context/context";
export default function Sidebar() {
  const PF = "http://localhost:3000/images/"
  const [category, setCategory] = useState([]);
  const {user} = useContext(context)
  useEffect(() => {
    const categoryFetcher = async () => {
      const response = await axios.get("http://localhost:3000/api/category");
      setCategory(response.data);
    };
    categoryFetcher();
  }, []);
  return (
    <div className="flex-12 flex items-center flex-col py-5 text-center text-gray-700 mt-6 md:flex-6 lg:flex-3">
      <h2 className="font-bold text-3xl text-gray-800">About me</h2>
      <img
        className="w-40 h-40 my-4 rounded-sm object-cover"
        src={PF + user.image}
        alt=""
      />
      <p className="leading-normal">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit.{" "}
      </p>
      <h3 className="font-bold text-xl mt-4 mb-3">Categories</h3>
      <ul className="grid grid-cols-2 gap-1  w-full ">
        {category.map((cat) => (
          <li className="cursor-pointer ">{cat.name}</li>
        ))}
      </ul>
      <h3 className="font-bold text-xl mt-4 mb-3">Contact</h3>
      <div className="flex gap-6 items-center justify-center ">
        <i class="fa-brands fa-facebook text-xl cursor-pointer text-gray-700"></i>
        <i class="fa-brands fa-twitter text-xl cursor-pointer text-gray-700"></i>
        <i class="fa-brands fa-linkedin text-xl cursor-pointer text-gray-700"></i>
        <i class="fa-brands fa-whatsapp text-xl cursor-pointer text-gray-700"></i>
      </div>
    </div>
  );
}
