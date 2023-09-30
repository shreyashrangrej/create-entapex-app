import { EmailTemplate } from "@/components/emails/FirstEmail";
import { resend } from "@/lib/email";
import { emailSchema } from "@/lib/email/utils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const json = await request.json();
  const { name, email, body } = emailSchema.parse(json);
  try {
    const data = await resend.emails.send({
      from: "EntApex App <noreply@entapex.com>",
      to: [email],
      subject: "Hello world!",
      react: EmailTemplate({ firstName: name, body: body }),
      text: "Email powered by Resend.",
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
