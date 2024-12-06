"use client";
import * as React from "react";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { LanguageContext } from "@/contexts/LanguageContext";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { callAPI } from "@/config/axios";
import { setSignIn } from "@/lib/redux/features/userSlice";
interface INavbarProps {}

const Navbar: React.FunctionComponent<INavbarProps> = (props) => {
  const { language, setLanguage } = React.useContext(LanguageContext);
  // Redux
  const dispatch = useAppDispatch();
  // Get value from global store reducer user
  const user = useAppSelector((state) => state.userReducer);

  const keepLogin = async () => {
    try {
      const tokenData = localStorage.getItem("dataUser");
      if (tokenData) {
        const response = await callAPI.get(
          `/users?id=${JSON.parse(tokenData)?.id}`
        );
        console.log("CHECK SIGNIN RESPONSE : ", response.data);
        dispatch(setSignIn({ ...response.data[0], isAuth: true })); // store data to global store redux
        localStorage.setItem("dataUser", JSON.stringify(response.data[0]));
      } else {
        dispatch(setSignIn({ isAuth: false })); // store data to global store redux
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    keepLogin();
  }, []);
  return (
    <div className="flex items-center justify-between px-24 py-5">
      <Link href="/" className="text-3xl font-bold">
        P
      </Link>
      <ul className="flex items-center gap-5">
        <li>
          <div className="relative">
            <span className="absolute top-2.5 left-2">
              <FaSearch color="gray" />
            </span>
            <input
              type="text"
              placeholder="Search"
              className="border w-28 px-3 py-1 rounded-full pl-8"
            />
          </div>
        </li>
        <li>
          <span className="uppercase border p-1 rounded mx-2">{language}</span>
          <select
            className="bg-transparent"
            value={language}
            onChange={(e: any) => setLanguage(e.target.value)}
          >
            <option value="en">English (United State)</option>
            <option value="id">Indonesia</option>
          </select>
        </li>
        <li className="flex gap-2">
          {user.email ? (
            <p>{user.email}</p>
          ) : (
            <>
              <Link
                href="/sign-up"
                className="bg-slate-200 text-slate-700 px-3 py-1 rounded-md shadow"
              >
                Sign Up
              </Link>
              <Link
                href="/sign-in"
                className="bg-slate-700 text-white px-3 py-1 rounded-md shadow"
              >
                Sign In
              </Link>
            </>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;