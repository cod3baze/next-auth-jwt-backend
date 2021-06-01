import { createContext, useState } from "react";
import { signRequest } from "../services/auth";
import Router from "next/router";

import { setCookie } from "nookies";

type SignInDataType = {
  email: string;
  password: string;
};

type UserType = {
  name: string;
  email: string;
  avatar_url: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  signIn(data: SignInDataType): Promise<void>;
  user: UserType;
};

const AuthContext = createContext({} as AuthContextType);

function AuthProvider({ children }) {
  const [user, setUser] = useState<UserType | null>(null);

  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInDataType) {
    const { token, user } = await signRequest({
      email,
      password,
    });

    setCookie(undefined, "nextauth.token", token, {
      maxAge: 60 * 60 * 1, // 1 hour
    });

    setUser(user);

    Router.push("/dashboard");
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
