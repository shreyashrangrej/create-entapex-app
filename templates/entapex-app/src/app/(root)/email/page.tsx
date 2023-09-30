import Link from "next/link";

import { EmailSendForm } from "@/components/forms/EmailSendForm";

export default function Page() {
  return (
    <main className="max-w-2xl mx-auto p-4 md:p-0">
      <div>
        <h1 className="text-2xl font-bold my-4">Send Email with Resend</h1>
        <div>
          <ol className="list-decimal list-inside space-y-1">
            <li>
              <Link
                className="text-primary hover:text-muted-foreground underline"
                href="https://resend.com/signup"
                target="_blank"
              >
                Sign up
              </Link>{" "}
              or{" "}
              <Link
                className="text-primary hover:text-muted-foreground underline"
                href="https://resend.com/login"
                target="_blank"
              >
                Login
              </Link>{" "}
              to your Resend account
            </li>
            <li>Add and verify your domain</li>
            <li>
              Create an API Key and add to{" "}
              <span className="ml-1 font-mono font-thin bg-zinc-100 dark:bg-slate-800 p-0.5">
                .env
              </span>
            </li>
            <li>
              Update &quot;from:&quot; in{" "}
              <span className="ml-1 font-mono font-thin bg-zinc-100 dark:bg-slate-800 p-0.5">
                app/api/email/route.ts
              </span>
            </li>
            <li>Send email 🎉</li>
          </ol>
        </div>
      </div>
      <EmailSendForm />
    </main>
  );
}
