import { createContext, useState, useContext, useEffect } from "react";
import secureLocalStorage from "react-secure-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);

  // 🔹 Ler token salvo ao iniciar a aplicação
  useEffect(() => {
    const savedToken = secureLocalStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // 🔹 Função chamada no login
  const login = (newToken, userData) => {
    secureLocalStorage.setItem("token", newToken);
    setToken(newToken);
    setUsuario(userData);
  };

  // 🔹 Função de logout
  const logout = () => {
    secureLocalStorage.removeItem("token");
    setToken(null);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ token, usuario, setUsuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);