import api from "../Services/services";

export const mensagemService = {
  getConversation: (userAId, userBId) =>
    api.get(`/Mensagem/conversation/${userAId}/${userBId}`),

  sendMessage: (mensagem) => api.post("/Mensagem", mensagem),
};