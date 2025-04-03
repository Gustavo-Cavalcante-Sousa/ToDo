import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5051/api",
});

export const salvarTarefa = async (novaTarefa) => {
  try {
    const response = await api.post("/tarefas", novaTarefa); 
    return response.data;
  } catch (error) {
    console.error("Erro ao salvar tarefa:", error);
    throw error;
  }
};

export default api;
