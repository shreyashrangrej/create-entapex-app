import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  body: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  body
}) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
    <p>
      {body}
    </p>
    <hr />
    <p>Sent with help from Resend and EntApex App 😊</p>
  </div>
);
