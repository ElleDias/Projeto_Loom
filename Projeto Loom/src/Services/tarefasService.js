import axios from "axios";
import secureLocalStorage from "react-secure-storage";

const API_URL = "https://localhost:7283/api/Tarefas";
const API_FUNC_URL = "https://localhost:7283/api/Funcionario";

// Buscar tarefas
export const getTarefas = async () => {
  const token = secureLocalStorage.getItem("token");

  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};

// Criar tarefa
export const criarTarefa = async (novaTarefa) => {
  const token = secureLocalStorage.getItem("token");

  const response = await axios.post(API_URL, novaTarefa, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};

// Buscar funcionários (AGORA FUNCIONA)
export const getFuncionarios = async () => {
  const token = secureLocalStorage.getItem("token");

  const response = await axios.get(API_FUNC_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};
