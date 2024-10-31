"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { FaImage, FaFolder, FaTrash } from "react-icons/fa";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [status, setStatus] = useState("");
  const [stories, setStories] = useState<string[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      setUsers(data);
    };

    const fetchPosts = async () => {
      try {
        const response = await axios.get<Post[]>(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setPosts(response.data);
      } catch (error) {
        console.log("Error fetching posts:", error);
      }
    };

    fetchUsers();
    fetchPosts();
  }, []);

  const handlePost = () => {
    if (status.trim()) {
      //untuk cek kalo status tidak kosong
      setStories([...stories, status]); //nambahin status skrngnya ke story
      setStatus(""); //buat clear textareanya setelah diposting
    }
  };

  const handleDeleteStory = (index: number) => {
    setStories(stories.filter((_, i) => i !== index)); // Menghapus cerita berdasarkan index
  };

  const handleDeletePost = (id: number) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Main Content - Status Input */}
      <div className="flex-1 p-4">
        <div className="mb-4">
          <div className="flex items-center border border-gray-300 rounded p-2">
            <textarea
              className="flex-1 p-2 border-none resize-none"
              placeholder="Type your Story"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
            <div className="flex mt-2">
              <FaImage className="text-gray-500 mr-2" />
              <FaFolder className="text-gray-500 mr-2" />
            </div>
            <button
              onClick={handlePost}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Post
            </button>
          </div>
        </div>

       <div className="space-y-2">
          {stories.map((story, index) => (
            <div key={index} className="p-2 border border-gray-300 rounded flex justify-between items-center">
              <span>{story}</span>
              <button onClick={() => handleDeleteStory(index)}>
                <FaTrash className="text-red-500 hover:text-red-700" />
              </button>
            </div>
          ))}
        </div>
        {/* Posts from API - Moved Here */}

        <div className="mt-4 w-full overflow-y-auto">
          <h2 className="font-bold mb-2">Posts</h2>
          <div className="space-y-2">
            {posts.map((post) => (
              <div
                key={post.id}
                className="p-4 border border-gray-300 rounded mb-2 shadow-md flex"
              >
                <div className="flex">
                <img
                  src={`https://robohash.org/${post.userId}.png`}
                  alt={`User ${post.userId}`}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold">{post.title}</h3>
                  <p className="text-gray-700">{post.body}</p>
                  </div>
                </div>
                <button onClick={() => handleDeletePost(post.id)}>
                  <FaTrash className="text-red-500 hover:text-red-700" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar - Users */}
      <div className="w-full md:w-1/3 p-4 overflow-y-auto">
        <h2 className="font-bold mb-2">Users</h2>
        <div className="space-y-2">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center p-4 border border-gray-300 rounded shadow-md"
            >
              <img
                src={`https://robohash.org/${user.id}.png`}
                alt={user.name}
                className="w-16 h-16 rounded-full mr-4" // Mengatur ukuran gambar dan memberi margin kanan
              />
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
