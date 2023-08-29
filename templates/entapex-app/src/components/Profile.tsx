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
      <h2 className="text-xl mb-8">Logged in as: {user?.email}</h2>
      <div className="flex gap-4">
        <Link href="/public">
          <Button>Public</Button>
        </Link>
        <Link href="/protected">
          <Button>Protected</Button>
        </Link>
        <Button
          onClick={async (event) => {
            event.preventDefault();
            await signOut();
          }}
        >
          <Icons.logout className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </>
  );
};

export default Profile;
