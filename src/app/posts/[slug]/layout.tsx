import * as React from "react";
import { Metadata } from "next";
import { callAPI } from "@/config/axios";

interface IPostDetailLayout {
  children: React.ReactNode;
}

type PropsParam = {
  params: { slug: string };
};

//Dynamic Metadata
export const generateMetadata = async ({
  params,
}: PropsParam): Promise<Metadata> => {
  const res = await callAPI.get(`/posts?id=${params.slug}`);
  return {
    title: res.data[0].title,
  };
};

const PostDetailLayout: React.FunctionComponent<IPostDetailLayout> = ({
  children,
}) => {
  return <div>{children}</div>;
};

export default PostDetailLayout;
