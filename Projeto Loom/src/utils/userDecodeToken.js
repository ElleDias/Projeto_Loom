import { jwtDecode } from "jwt-decode";

export const userDecodeToken = (token) => {
  try {
    if (!token) return null;
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Erro ao decodificar token:", error);
    return null;
  }
};
