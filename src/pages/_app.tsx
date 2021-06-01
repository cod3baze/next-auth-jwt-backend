import React from "react";
import "tailwindcss/tailwind.css";
import { AuthProvider } from "../contexts/AuthContexts";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
