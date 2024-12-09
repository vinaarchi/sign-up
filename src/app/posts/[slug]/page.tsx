"use client";

import * as React from "react";
import axios from "axios";
import { callAPI } from "@/config/axios";

interface IDetailProps {
  params: Promise<{ slug: string }>;
}

const Detail: React.FunctionComponent<IDetailProps> = ({ params }) => {
  const [detailPost, setDetailPost] = React.useState<any>(null);
  const getDetailPosts = async () => {
    try {
      const slug = (await params).slug;
      const res = await callAPI.get(`/posts?id=${slug}`);
      setDetailPost(res.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getDetailPosts();
  }, []);

  if (!detailPost) {
    return <p className="text-7xl">Loading...</p>;
  }

  return (
    <div>
      <p className="text-3xl">Posts Title : {detailPost?.title}</p>
    </div>
  );
};

export default Detail;
