import { getCurrentUser } from "@/lib/session";

export default async function Home() {
  const user = await getCurrentUser();
  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">Protected Page</h1>
          <p className="text-gray-600">
            Hello, {user?.email}. You are able visit this page because you are
            signed in.
          </p>
        </div>
      </div>
    </>
  );
}
