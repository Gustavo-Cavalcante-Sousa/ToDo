import { useState, useEffect } from "react";
import api from "../services/api";

const TarefaLista  = ({ onEdit }) => {
    const [tarefas , setTarefas] = useState([]);


    useEffect(() => {
        buscarTarefas()
    }, [])

    const buscarTarefas = async () => {
        try {
            const response = await api.get("/tarefas"); 
            setTarefas(response.data);
        } catch (error) {
            console.error("Erro ao buscar tarefas:", error);
        }
    };
    
    const deletarTarefa = async (id) => {
        try {
            await api.delete(`/tarefas/${id}`); 
            buscarTarefas();
        } catch (error) {
            console.error("Erro ao deletar tarefa:", error);
        }
    };

    return (
        <div>
            <h2>Lista de Tarefas</h2>
            <ul>
            {tarefas.map((tarefa) => (
            <li key={tarefa.id}>
                <strong>{tarefa.titulo}</strong> - {tarefa.descricao} -{" "}
                {tarefa.dataConclusao ? `Concluído em ${tarefa.dataConclusao}` : "Pendente"}
                <button onClick={() => onEdit(tarefa)}>Editar</button>
                <button onClick={() => deletarTarefa(tarefa.id)}>Excluir</button>
            </li>
            ))}
        </ul>
        </div>
        
    )
}

export default TarefaLista