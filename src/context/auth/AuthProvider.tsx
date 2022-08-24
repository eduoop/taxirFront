import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { User } from "../../models/user.model";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);
  const api = useApi();

  useEffect(() => {
    const recoverdUser = localStorage.getItem("user");

    if (recoverdUser) {
      setUser(JSON.parse(recoverdUser));
    }
  }, []);

  const signin = async (email: string, password: string) => {
    const data = await api.signin(email, password);
    if (data.user && data.token) {
      setUser(data.user);
      console.log(data.user)

      const loggedUser = data.user;
      setToken(data.token.token);

      localStorage.setItem("user", JSON.stringify(loggedUser));

      return true;
    }
    return false;
  };

  const refreshContex = async () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const data = await api.validate(token);

      setUser(data.user);

      const loggedUser = data.user;
      localStorage.setItem("user", JSON.stringify(loggedUser));
    }
  };

  const setToken = (token: string) => {
    localStorage.setItem("authToken", token);
  };

  const singout = async () => {
    await api.logout();
    localStorage.removeItem("user");
    setToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signin, singout, refreshContex }}>
      {children}
    </AuthContext.Provider>
  );
};
