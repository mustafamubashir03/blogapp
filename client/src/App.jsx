
import { useContext, useEffect } from "react";
import { Topbar } from "./components/Topbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SettingsPage from "./pages/SettingsPage";
import Signup from "./pages/Signup";
import SinglePage from "./pages/SinglePage";
import Write from "./pages/Write";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { context } from "../context/context";

function App() {
  const {user} = useContext(context);

  return (
    <BrowserRouter>
      <Topbar />
      <Routes>
        <Route path="/" element={user === "Invalid credentials" || user === null || user.message === "Invalid input format" || user.message === "Invalid credentials"?<Signup />:<Home/>} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/sign-up"  element={<Signup />} />
        <Route path="/write" element={user === "Invalid credentials" || user === null || user.message === "Invalid input format" || user.message === "Invalid credentials"?<Signup />:<Write />} />
        <Route path="/single-page/:id" element={<SinglePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
