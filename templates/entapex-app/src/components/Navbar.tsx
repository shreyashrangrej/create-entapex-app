import { getCurrentUser } from "@/lib/session";
import { ModeToggle } from "./ThemeToggle";
import { UserAccountNav } from "./UserAccountNav";
import { Button } from "./ui/button";
import Link from "next/link";
import { Icons } from "./icons";

const Navbar = async () => {
  const user = await getCurrentUser();

  return (
    <nav className="flex justify-between items-center p-4">
      {/* Right side of the Navbar */}
      <div className="flex space-x-4 ml-auto">
        <ModeToggle />
        {user ? (
          <UserAccountNav user={user} />
        ) : (
          <Link href="/login">
            <Button variant="secondary">
              <Icons.login className="mr-2 h-4 w-4" />
              Login
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
