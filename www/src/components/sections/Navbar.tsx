import Link from "next/link";
import { Button } from "../ui/button";
import { Github } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4">
      {/* Right side of the Navbar */}
      <div className="flex space-x-4 ml-auto">
        <Button variant="outline" asChild>
          <Link href="https://github.com/shreyashrangrej/create-entapex-app" target="_blank">
            <div className="flex items-center space-x-1">
              <Github className="" />
            </div>
          </Link>
        </Button>
        <Button variant="secondary">
          <Link href="https://entapex-app.vercel.app" target="_blank">Live Preview</Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
