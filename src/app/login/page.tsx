"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { callAPI } from "@/config/axios";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setSignIn } from "@/lib/redux/features/userSlice"

interface ISignInProps {}

const Login: React.FunctionComponent<ISignInProps> = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // Define dispatch from useAppDispatch for execute function actions from redux
  const dispatch = useAppDispatch();

  const onSignIn = async () => {
    try {
      const response = await callAPI.get(
        `/users?email=${username}&password=${password}`
      );
      console.log("CHECK SIGN IN RESPONSE:", response.data);
      dispatch(setSignIn(response.data[0])); //store data to global store redux
      localStorage.setItem("dataUser", JSON.stringify(response.data[0]));
      router.push("/"); // Ganti dengan path yang sesuai
      // Reset form
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onSignIn(); // Panggil fungsi onSignIn
  };

  return (
    <form
      className="border-2 border-gray-300 rounded-lg p-6 max-w-md mx-auto shadow-lg"
      onSubmit={handleLogin}
    >
      <h2 className="text-xl font-semibold mb-4">Log in Now</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="username">
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
        <label className="block text-sm font-medium mb-1" htmlFor="password">
          Password
        </label>
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
          onClick={() => setShowPassword(!showPassword)} // Toggle untuk password
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
          onClick={() => router.push("/register")}
        >
          Don't have an account? Sign Up
        </span>
      </div>
    </form>
  );
};

export default Login;

//contoh dari ka abdi
// const SignIn:  = (props) => {

//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");

//   const onSignIn = async () => {
//     try {
//       const response = await callAPI.get(
//         `/users?email=${email}&password=${password}`
//       );
//       console.log("CHECK SIGN IN RESPONSE :", response.data);
//       localStorage.setItem("dataUser", JSON.stringify (response.data[0]))
//     } catch (error) {
//       console.log(error);
//     }
//   };
