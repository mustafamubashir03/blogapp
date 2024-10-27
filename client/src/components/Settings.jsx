import React, { useContext, useState } from "react";
import Button from "./Button";
import axios from "axios";
import { context } from "../../context/context";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const {user,dispatch} = useContext(context);
  const navigate = useNavigate()
  const [image,setImage] = useState(null);
  const [success,setSuccess] = useState(false)
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const PF = "http://localhost:3000/images/"
  const [email,setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type:"UPDATE_START"})
    try {
      const updateUser = {
        username,
        password,
        email,
        id:user._id
      };
      if (image) {
        const data = new FormData();
        const filename = Date.now() + image.name;
        data.append("name", filename);
        data.append("file", image);
        console.log(data); 
        updateUser.image = filename;
        console.log(updateUser);
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
      console.log(updateUser);
       const response2 = await axios.put(
        "http://localhost:3000/api/users/"+user._id,
        updateUser
      );
      setSuccess(true)
      dispatch({type:"UPDATE_SUCCESS",payload:response2.data})
    } catch (error) {
      dispatch({type:"UPDATE_FAILURE"})
      console.log(error);
    }
  };
  const deleteAccount = async()=>{
    console.log(user._id)
    await axios.delete("http://localhost:3000/api/users/"+user._id,{data:{id:user._id}})
    localStorage.clear();
    navigate("/sign-up")
  }
  return (
    <div className="flex-12 flex items-center flex-col py-5 text-center text-gray-700 mt-6 md:flex-6 lg:flex-9">
      <div className="flex-col flex items-center justify-between w-full mb-6 md:flex-row">
        <h2 className="font-bold text-3xl text-gray-800">
          Update your Account
        </h2>
        <p onClick={deleteAccount} className="  text-red-700 font-semibold cursor-pointer">Delete Account</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-2 w-full ">
        <img
          className="w-40 h-40 my-4 rounded-full object-cover"
          src={image? URL.createObjectURL(image) : PF+user.image }
          alt=""
        />
        <div className="border-2 border-green-800 bg-green-100 w-10 h-10 flex justify-center items-center rounded-full">
          <label htmlFor="profile">
            <i class="text-green-800 text-xl cursor-pointer fa-solid fa-user"></i>
          </label>
          <input className="hidden" type="file" id="profile" name="profile" onChange={e=>setImage(e.target.files[0])} />
        </div>
        <div className="flex flex-col text-gray-600 w-full items-stretch gap-4  ">
          <input
            className="border-b-2 focus:border-b-2   border-gray-300 rounded-sm py-2 px-4 w-full"
            type="text"
            placeholder={user.username}
            onChange={e=>setUsername(e.target.value)}
          />
          <input
            className="border-b-2 focus:border-b-2 italic border-gray-300 rounded-sm py-2 px-4"
            type="email"
            placeholder={user.email}
            onChange={e=>setEmail(e.target.value)}
          />
          <input
            className="border-b-2 focus:border-b-2 italic border-gray-300 rounded-sm py-2 px-4"
            type="text"
            onChange={e=>setPassword(e.target.value)}
            placeholder="Enter Password"
          />
        </div>
        <Button type={"submit"} label={"Update info"} />
        {success && <p className="text-green-800 mt-3">Updated Successfully</p>}
      </form>
    </div>
  );
}
