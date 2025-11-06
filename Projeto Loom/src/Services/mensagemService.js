import api from "./services";

export const mensagemService = {
  getConversation: (userAId, userBId) =>
    api.get(`/mensagem/conversation/${userAId}/${userBId}`),

  sendMessage: (mensagem) => api.post("/mensagem", mensagem),
};
