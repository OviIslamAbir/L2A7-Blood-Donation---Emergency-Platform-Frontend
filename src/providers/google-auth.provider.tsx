"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";

export default function GoogleAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const clientId = process.env.GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={clientId ?? ""}>
      {children}
    </GoogleOAuthProvider>
  );
}