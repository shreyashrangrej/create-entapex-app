import Background from "@/components/marketing/background";
import Navbar from "@/components/sections/Navbar";
import SiteFooter from "@/components/sections/SiteFooter";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header>
        <Navbar />
      </header>
      <main className="container flex-1">{children}</main>
      <SiteFooter />
      <Background />
    </div>
  );
}
