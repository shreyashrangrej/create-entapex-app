import { getCurrentUser } from "@/lib/session";

export default async function Home() {
  const user = await getCurrentUser();
  return (
    <section className="relative overflow-hidden mt-56">
      <div className="text-center">
        <h1 className="text-3xl font-semibold">Protected Page</h1>
        <p className="text-gray-600">
          Hello, {user?.email}. You are able visit this page because you are
          signed in.
        </p>
      </div>
    </section>
  );
}
