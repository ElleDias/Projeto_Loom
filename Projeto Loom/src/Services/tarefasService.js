import axios from "axios";

const API_URL = "https://localhost:7283/api/Tarefas"; // 🔁 ajuste para o seu endpoint real

// Buscar todas as tarefas
export const getTarefas = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Cadastrar uma nova tarefa
export const criarTarefa = async (novaTarefa) => {
  const response = await axios.post(API_URL, novaTarefa);
  return response.data;
};

// (Opcional) Excluir tarefa
export const deletarTarefa = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

// (Opcional) Atualizar tarefa
export const atualizarTarefa = async (id, tarefaAtualizada) => {
  const response = await axios.put(`${API_URL}/${id}`, tarefaAtualizada);
  return response.data;
};

