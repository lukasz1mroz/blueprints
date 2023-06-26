import * as React from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import api from "../handlers/ApiCalls";

interface AuthContextType {
  token: string;
  username: string;
  signin: (user: User, callback: VoidFunction) => Promise<void>;
  signout: (callback: VoidFunction) => Promise<void>;
}

interface User {
  username: string;
  password: string;
}

let AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  let [token, setToken] = React.useState<any>(null);
  let [username, setUsername] = React.useState<any>(null);

  let signin = async (newUser: User, callback: VoidFunction) => {
    const response = await api.login(
      newUser.username as string,
      newUser.password as string
    );
    setToken(response.data.accessToken);
    setUsername(newUser.username);
    return callback();
  };

  let signout = async (callback: VoidFunction) => {
    setToken(null);
    setUsername(null);
    return callback();
  };

  let value = { token, username, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}

export function AuthStatus() {
  let auth = useAuth();
  let navigate = useNavigate();

  if (!auth.token) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      Welcome {auth.username}!{" "}
      <button
        onClick={() => {
          auth.signout(() => navigate("/"));
        }}
      >
        Sign out
      </button>
    </p>
  );
}

export function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.username) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
