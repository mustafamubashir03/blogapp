import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { context } from "../../context/context";

export const Topbar = () => {
  const { user, dispatch } = useContext(context);
  let PF = "http://localhost:3000/images/"
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="w-screen top-0 sticky z-50 bg-white  py-3">
      <div className=" h-20 flex flex-col md:h-32 justify-center items-center md:flex-col lg:h-12 lg:flex-row lg:justify-between">
        <div className=" hidden md:flex-1 md:flex gap-6 items-center justify-center">
          <i className="fa-brands fa-facebook text-xl cursor-pointer text-gray-700 hover:text-gray-900 hover:text-2xl transition-all"></i>
          <i className="fa-brands fa-twitter text-xl cursor-pointer text-gray-700 hover:text-gray-900 hover:text-2xl transition-all"></i>
          <i className="fa-brands fa-linkedin text-xl cursor-pointer text-gray-700 hover:text-gray-900 hover:text-2xl transition-all"></i>
          <i className="fa-brands fa-whatsapp text-xl cursor-pointer text-gray-700 hover:text-gray-900 hover:text-2xl transition-all"></i>
        </div>
        <div className="flex-1 lg:flex hidden justify-center">
          <ul className="flex gap-6 items-center justify-center">
            <Link to="/">
              <li className="cursor-pointer font-bold text-gray-700 hover:text-gray-900 hover:text-lg transition-all">
                Home
              </li>
            </Link>
            <Link to="/">
              <li className="cursor-pointer font-bold text-gray-700 hover:text-gray-900 hover:text-lg transition-all">
                About
              </li>
            </Link>
            <Link to="/">
              <li className="cursor-pointer font-bold text-gray-700 hover:text-gray-900 hover:text-lg transition-all">
                Contact
              </li>
            </Link>
            <Link to="/write">
              <li className="cursor-pointer font-bold text-gray-700 hover:text-gray-900 hover:text-lg transition-all">
                Write
              </li>
            </Link>
            <Link to="/log-in">
              <li
                onClick={() => {
                  dispatch({ type: "LOGOUT" });
                }}
                className="cursor-pointer font-bold text-gray-700 hover:text-gray-900 hover:text-lg transition-all"
              >
                Log out
              </li>
            </Link>
          </ul>
        </div>
        <div className="flex-1 flex gap-6 items-center justify-center">
          {user ? (
            <Link to="/settings">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={PF + user.image}
                alt=""
              />
            </Link>
          ) : (
            <div className="flex gap-6">
              <Link to="/log-in">
                <li className="cursor-pointer font-bold text-gray-700 list-none hover:text-gray-900 hover:text-lg transition-all">
                  Log in
                </li>
              </Link>
              <Link to="/sign-up">
                <li className="cursor-pointer font-bold text-gray-700 list-none hover:text-gray-900 hover:text-lg transition-all">
                  Sign up
                </li>
              </Link>
            </div>
          )}
          <i className="fa-solid fa-magnifying-glass text-xl cursor-pointer text-gray-700"></i>
        </div>
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div className={`${isMenuOpen ? "block" : "hidden"} lg:hidden`}>
        <ul className="flex flex-col gap-6 items-center py-5 bg-white">
          <Link to="/">
            <li
              onClick={() => setIsMenuOpen(false)}
              className="cursor-pointer font-bold text-gray-700 hover:text-gray-900 hover:text-lg transition-all"
            >
              Home
            </li>
          </Link>
          <Link to="/">
            <li
              onClick={() => setIsMenuOpen(false)}
              className="cursor-pointer font-bold text-gray-700 hover:text-gray-900 hover:text-lg transition-all"
            >
              About
            </li>
          </Link>
          <Link to="/">
            <li
              onClick={() => setIsMenuOpen(false)}
              className="cursor-pointer font-bold text-gray-700 hover:text-gray-900 hover:text-lg transition-all"
            >
              Contact
            </li>
          </Link>
          <Link to="/write">
            <li
              onClick={() => setIsMenuOpen(false)}
              className="cursor-pointer font-bold text-gray-700 hover:text-gray-900 hover:text-lg transition-all"
            >
              Write
            </li>
          </Link>
          <Link to="/log-in">
            <li
              onClick={() => setIsMenuOpen(false)}
              className="cursor-pointer font-bold text-gray-700 hover:text-gray-900 hover:text-lg transition-all"
            >
              Log out
            </li>
          </Link>
          <Link to="/log-in">
            <li
              onClick={() => setIsMenuOpen(false)}
              className="cursor-pointer font-bold text-gray-700 list-none hover:text-gray-900 hover:text-lg transition-all"
            >
              Log in
            </li>
          </Link>
          <Link to="/sign-up">
            <li
              onClick={() => setIsMenuOpen(false)}
              className="cursor-pointer font-bold text-gray-700 list-none hover:text-gray-900 hover:text-lg transition-all"
            >
              Sign up
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};
