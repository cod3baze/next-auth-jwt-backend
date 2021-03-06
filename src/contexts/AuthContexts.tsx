import Router from "next/router";
import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies";

import { recoverUserInformation, signRequest } from "../services/auth";

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

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();

    if (token) {
      recoverUserInformation().then((response) => setUser(response.user));
    }
  }, []);

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
