import React, { createContext, useContext, useState, useEffect } from "react";
import secureLocalStorage from "react-secure-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);

  // ✅ Função de login — salva no secureLocalStorage
  const login = (tokenRecebido, usuarioDecodificado) => {
    console.log("Salvando token no secureLocalStorage...");
    secureLocalStorage.setItem("token", tokenRecebido);
    secureLocalStorage.setItem("usuario", JSON.stringify(usuarioDecodificado));

    setToken(tokenRecebido);
    setUsuario(usuarioDecodificado);
  };

  // ✅ Logout — limpa tudo
  const logout = () => {
    secureLocalStorage.removeItem("token");
    secureLocalStorage.removeItem("usuario");
    setToken(null);
    setUsuario(null);
  };

  // ✅ Carrega o usuário salvo ao abrir o app
  useEffect(() => {
    const tokenSalvo = secureLocalStorage.getItem("token");
    const usuarioSalvo = secureLocalStorage.getItem("usuario");

    if (tokenSalvo && usuarioSalvo) {
      setToken(tokenSalvo);
      setUsuario(JSON.parse(usuarioSalvo));
      console.log("Usuário e token carregados do secureLocalStorage!");
    } else {
      console.warn("Nenhum token encontrado no secureLocalStorage!");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, token, setUsuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);