"use client";

import * as React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaFile, FaImage } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";
import { callAPI } from "@/config/axios";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { getPostsList, setPosts } from "@/lib/redux/features/postSlice";

interface IPostPageProps {}

const PostPage: React.FunctionComponent<IPostPageProps> = (props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const postsList = useAppSelector((state) => state.postReducer);

  const [userList, setUserList] = React.useState<any[]>([]);

  // const [postsList, setPostsList] = React.useState<any[]>([]);
  const [newpost, setNewPost] = React.useState<string>("");
  const getUserList = async () => {
    try {
      const res = await callAPI.get("/users");
      setUserList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // const getPostsList = async () => {
  //   try {
  //     const res = await callAPI.get("/posts");
  //     // setPostsList(res.data);
  //     dispatch(setPosts(res.data)); //store data to globalStore redux
  //     console.log(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  React.useEffect(() => {
    getUserList();
    dispatch(getPostsList());
  }, []);

  const printUserList = () => {
    return userList.map((val: any) => {
      return (
        <div
          key={val.id}
          className="flex bg-white rounded-lg py-2 mb-2 shadow-md cursor-pointer"
        >
          <img
            className="w-10 h-10 mx-3 rounded-full shadow-md"
            src={`https://robohash.org/${val.username}.png`}
            alt="icon"
          />
          <div>
            <h3 className="font-semibold">{val.name}</h3>
            <p className="text-xs font-extralight">{val.phone}</p>
          </div>
        </div>
      );
    });
  };

  const printPostsList = () => {
    return postsList.map((val: any, idx: number) => {
      return (
        <div
          key={idx}
          className="flex items-center bg-white rounded-s-full rounded-e-xl cursor-pointer"
          onClick={() => router.push(`/posts/${val.id}`)}
        >
          <img
            className="w-20 h-20 bg-slate-100 rounded-full shadow-md"
            src={`https://robohash.org/${val.userId}-${val.id}.png`}
            alt="icon"
          />
          <div className="px-8">
            <h4 className="uppercase font-semibold">{val.title}</h4>
            <p className="font-thin">{val.body}</p>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="px-24 py-14 bg-slate-100 min-h-screen flex gap-8">
      <div id="timeline" className="w-full">
        <div className="flex items-center">
          <img
            className="w-20 h-20 mx-3 bg-slate-100 rounded-full shadow-md"
            src={`https://robohash.org/random.png`}
            alt="icon"
          />
          <div className="w-full bg-white p-3 rounded-lg shadow-md">
            <div className="relative w-full">
              <textarea
                className="w-full p-3 rounded-md resize-none"
                rows={2}
                onChange={(e: any) => setPosts(e.target.value)}
                placeholder="Type your Story"
              />
              <span className="absolute right-2 bottom-2 text-sm text-gray-400">
                {newpost.length}/350
              </span>
            </div>
            <hr className="mb-4" />
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <button>
                  <FaImage size={24} color="#334156" />
                </button>
                <button>
                  <FaFile size={24} color="#334156" />
                </button>
                <button>
                  <FaLocationPin size={24} color="#334156" />
                </button>
              </div>
              <button
                type="button"
                className="bg-slate-700 text-white px-3 py-1 text-sm rounded-full shadow"
              >
                Post
              </button>
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <div className="space-y-3">{printPostsList()}</div>
      </div>
      <div id="user-list" className="w-1/4">
        <div className="sticky top-2">{printUserList()}</div>
      </div>
    </div>
  );
};

export default PostPage;
