import * as React from "react";
import { Metadata } from "next";
import AuthGuard from "@/guard/AuthGuard";
import { resolve } from "path";

interface IPostLayout {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Post List | View Other Story",
  description: "Join to share your story",
};

const PostLayout: React.FunctionComponent<IPostLayout> = async ({
  children,
}) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return <AuthGuard>{children}</AuthGuard>;
};

export default PostLayout;
