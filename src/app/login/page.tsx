"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // untuk login
    console.log("Logging In", { username, password });

    //reset form
    setUsername("");
    setPassword("");
  };

  return (
    <form
      className="border-2 border-gray-300 rounded-lg p-6 max-w-md mx-auto shadow-lg"
      onSubmit={handleLogin}
    >
      <div>
        <form onSubmit={handleLogin}>
          <h2 className="text-xl font-semibold mb-4">Log in Now</h2>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              placeholder="Type your Email/Username"
              className="border border-gray-300 rounded-md p-2 w-full"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-7 relative">
        <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Type your password"
          className="border border-gray-300 rounded-md p-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <span
        className="absolute right-3 top-9 cursor-pointer"
        onClick={() => setShowPassword(!showPassword)} //toggle untuk password
        >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
        
      </div>
          
          <button 
          type="submit"
          className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
          >
            Login
            </button>
            <div className="mt-4 text-center">
        <span
        className="text-sm text-blue-500 cursor-pointer"
        onClick={() => router.push('/register')}
        >
             Don't have account? Sign Up
        </span>
      </div>
        </form>
      </div>
    </form>
  );
};

export default Login;
