"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";

export default function GoogleAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const clientId = "857382144519-1jmihe97jq0gu2l1t2pvk6nt1ic7hfub.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={clientId ?? ""}>
      {children}
    </GoogleOAuthProvider>
  );
}