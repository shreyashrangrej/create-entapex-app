import Navbar from "@/components/Navbar";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
