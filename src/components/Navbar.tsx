"use client"
import { LanguageContext } from "@/contexts/LanguageContext";
import React from "react";


const Navbar: React.FC = () => {
const { language, setLanguage} = React.useContext(LanguageContext)

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
          <li>
            <span className="uppercase border p-1 rounded text-white">{language}</span>
            <select 
            className="bg-transparent text-white" 
            value={language} 
            onChange={(e:any) => setLanguage(e.target.value)}>
                <option value="en">English (United State)</option>
                <option value="id">Indonesian</option>
            </select>
          </li>
          <button className="ml-4 p-2 bg-green-500 text-white rounded-md">
            Login
          </button>
          <button className="ml-2 p-2 bg-green-700 text-white rounded-md">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
