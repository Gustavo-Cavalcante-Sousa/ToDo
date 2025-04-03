import React, { useState, useEffect } from "react";
import TarefaLista from "../components/tarefaLista";
import TarefaForm from "../components/tarefaForm";
import api from "../services/api";

const Home = () => {
  const [tarefas, setTarefas] = useState([]);
  const [tarefaEditando, setTarefaEditando] = useState(null);

  const carregarTarefas = async () => {
    try {
      const response = await api.get("/tarefas");
      setTarefas(response.data);
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
    }
  };

  useEffect(() => {
    carregarTarefas();
  }, []);

  const atualizarLista = () => {
    setTarefaEditando(null);
    carregarTarefas(); 
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Título */}
      <h1 className="text-4xl font-bold text-blue-700 mb-6 shadow-lg p-3 rounded-lg bg-white">
        Gerenciador de Tarefas
      </h1>

      {/* Container Principal */}
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6 space-y-6">
        {/* Formulário de Tarefa */}
        <TarefaForm tarefaEditando={tarefaEditando} onSalvar={atualizarLista} />

        {/* Lista de Tarefas */}
        <TarefaLista tarefas={tarefas} onEdit={setTarefaEditando} />
      </div>
    </div>
  );
};

export default Home;
