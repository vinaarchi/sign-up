"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Register: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const router = useRouter();


  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // untuk registrasi
    console.log("Registering", { firstName,lastName, email, phone, password, countryCode, agreed });

    // ini untuk reset form nya
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setCountryCode("");
  };

  return (
    <form
    className="border-2 border-gray-300 rounded-lg p-6 max-w-md mx-auto shadow-lg"
    onSubmit={handleRegister}
  >
    <h2 className="text-xl font-semibold mb-4">Sign Up Now</h2>
    
    <div className="flex mb-4">
        <div className="w-1/2 pr-2">
          <label className="block text-sm font-medium mb-1" htmlFor="first-name">First Name</label>
          <input
            id="first-name"
            type="text"
            placeholder="Type your name"
            className="border border-gray-300 rounded-md p-2 w-full"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="w-1/2 pl-2">
          <label className="block text-sm font-medium mb-1" htmlFor="last-name">Last Name</label>
          <input
            id="last-name"
            type="text"
            placeholder="Type your name"
            className="border border-gray-300 rounded-md p-2 w-full"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          placeholder="Type your email"
          className="border border-gray-300 rounded-md p-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="phone">Phone Number</label>
        <div className="flex">
        <select
        onChange={(e) => setCountryCode(e.target.value)}
        className="border border-gray-300 rounded-l-md p-2"
        >
            <option value="+62">+62</option>
            <option value="+1">+1</option>
            <option value="+44">+44</option>
            <option value="+91">+91</option>
        </select>
        <input
          id="phone"
          type="text"
          placeholder="Type your phone number"
          className="border border-gray-300 rounded-md p-2 w-full"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
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
        className="absolute right-3 top-1/2 transform -translate-y-5 cursor-pointer"
        onClick={() => setShowPassword(!showPassword)} //toggle untuk password
        >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
        <p className="text-sm text-gray-600 mt-1">use 6 or more characters with a mix of letter, number & symbols</p>
      </div>

    <div className="mb-4">
        <input 
        type="checkbox"
        id="terms"
        checked={agreed}
        onChange={(e) => setAgreed(e.target.checked)}
        required
        className="mr-2"
        />
        <label htmlFor="terms" className="text-sm text-gray-600">
            By creating an account, i agree to our Terms of use and Privacy Policy
        </label>
    </div>

      <button
        type="submit"
        className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
      >
        Sign up now
      </button>
      <div className="mt-4 text-center">
        <span
        className="text-sm text-blue-500 cursor-pointer"
        onClick={() => router.push('/login')}
        >
            Already have an account? Log in
        </span>
      </div>
    </form>
  );
};

export default Register;