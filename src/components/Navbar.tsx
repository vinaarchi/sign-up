"use client";
import { LanguageContext } from "@/contexts/LanguageContext";
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";
import { setSignIn, setSignOut } from "@/lib/redux/features/userSlice";
import React, { useEffect, useState } from "react";

const Navbar: React.FC = () => {
  const { language, setLanguage } = React.useContext(LanguageContext);
  const dispatch = useAppDispatch(); // untuk manggil useAppDispatch sebagai fungsi

  //REDUX
  //Get value from global store reducer user
  const user = useAppSelector((state) => state.userReducer);
  const [loggedInUser, setLoggedInUser] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();

        // Misalnya ngambil pengguna pertama
        // const loggedInUser = {
        //   id: data[0].id.toString(),
        //   name: data[0].name,
        //   username: data[0].username,
        //   email: data[0].email,
        // };

        // Simpan pengguna ke Redux setelah diambil
        setLoggedInUser(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
  const handleLogin = () => {
    // Simulasi login
    console.log("Login button clicked");

    dispatch(setSignIn(loggedInUser));
  };

  const handleLogout = () => {
    dispatch(setSignOut());
    console.log("User logged out");
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">P</div>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 rounded-l-md border border-gray-300"
          />
          <button className="p-2 bg-blue-500 text-white rounded-r-md">
            Search
          </button>
          <ul className="flex items-center space-x-4">
            <li>
              <span className="uppercase border p-1 rounded text-white">
                {language}
              </span>
              <select
                className="bg-transparent text-white"
                value={language}
                onChange={(e: any) => setLanguage(e.target.value)}
              >
                <option value="en">English (United State)</option>
                <option value="id">Indonesian</option>
              </select>
            </li>
            <li>
              {user.name ? (
                <>
                  <p>{user.email}</p>
                  <button
                    onClick={handleLogout}
                    className="ml-4 p-2 bg-red-500 text-white rounded-md"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <a
                    href="./login"
                    onClick={handleLogin}
                    className="ml-4 p-2 bg-green-500 text-white rounded-md"
                  >
                    Login
                  </a>
                  <a
                    href="./register"
                    className="ml-2 p-2 bg-green-700 text-white rounded-md"
                  >
                    Sign Up
                  </a>
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
