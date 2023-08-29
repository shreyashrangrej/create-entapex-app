import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/session";
import Profile from "@/components/Profile";
import { Icons } from "@/components/icons";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-2 text-center">EntApex App</h1>
        <h2 className="text-xl text-gray-600 mb-4 text-center">
          The Most Modern & TypeSafe Full-Stack Starter Kit for Next.js
        </h2>
        <div className="flex flex-col items-center justify-start">
          {user ? (
            <>
              <Profile
                user={{
                  name: user.name,
                  image: user.image,
                  email: user.email,
                }}
              />
            </>
          ) : (
            <>
              <h2 className="text-xl mb-8 text-center">User not Logged In</h2>
              <div className="flex gap-4">
                <Link href="/public">
                  <Button>Public</Button>
                </Link>
                <Link href="/protected">
                  <Button>Protected</Button>
                </Link>
                <Link href="/login">
                  <Button>
                    <Icons.login className="mr-2 h-4 w-4" />
                    Login
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
