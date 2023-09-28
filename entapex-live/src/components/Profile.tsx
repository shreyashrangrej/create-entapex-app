"use client";

import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import { Icons } from "./icons";

interface UserAccountProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "name" | "image" | "email">;
}

const Profile = ({ user }: UserAccountProps) => {
  return (
    <>
      <h2 className="text-xl mb-8 text-center">Logged in as: {user?.email}</h2>
      <div className="flex gap-4">
        <Link href="/public">
          <Button>Public</Button>
        </Link>
        <Link href="/protected">
          <Button>Protected</Button>
        </Link>
        <Link href="/email">
          <Button>Email</Button>
        </Link>
      </div>
    </>
  );
};

export default Profile;
