import React, { useState, useEffect } from "react";
import api from "../services/api";

const TarefaForm = ({ tarefaEditando, onSalvar }) => {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataConclusao, setDataConclusao] = useState("");

  useEffect(() => {
    if (tarefaEditando) {
      setTitulo(tarefaEditando.titulo);
      setDescricao(tarefaEditando.descricao);
      setDataConclusao(tarefaEditando.dataConclusao || "");
    }
  }, [tarefaEditando]);

  const salvarTarefa = async (e) => {
    e.preventDefault();
    const tarefa = { titulo, descricao, dataConclusao };
  
    try {
      if (tarefaEditando) {
        // Atualizando uma tarefa existente
        await api.put(`/tarefas/${tarefaEditando.id}`, tarefa);
      } else {
        // Criando uma nova tarefa
        await api.post("/tarefas", tarefa);
      }
  
      onSalvar(); // Garante que a lista será recarregada após salvar
      setTitulo("");
      setDescricao("");
      setDataConclusao("");
    } catch (error) {
      console.error("Erro ao salvar tarefa:", error);
    }
  };
  

  return (
    <div>
      <h2>{tarefaEditando ? "Editar Tarefa" : "Criar Tarefa"}</h2>
      <form onSubmit={salvarTarefa}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <input
          type="date"
          value={dataConclusao}
          onChange={(e) => setDataConclusao(e.target.value)}
        />
        <button type="submit">{tarefaEditando ? "Atualizar" : "Criar"}</button>
      </form>
    </div>
  );
};

export default TarefaForm;
