interface DocumentationLayoutProps {
  children: React.ReactNode;
}

export default async function DocumentationLayout({
  children,
}: DocumentationLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="container flex-1">{children}</main>
    </div>
  );
}
