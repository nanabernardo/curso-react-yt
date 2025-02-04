import { useState } from "react";
import Input from "./Input";

function AddTask({ onAddTaskSubmit }) {
  //criar um State para pegar e usar o input
  const [title, setTitle] = useState("");
  const [description, setDescreption] = useState("");

  return (
    <div className="space-y-4 p-6 bg-slate-200 rounded-md shadow flex flex-col">
      <Input
        type="text"
        placeholder="Digite o título da tarefa"
        value={title}
        onChange={(event) => setTitle(event.target.value)} //atualiza o state conforme muda no input
      />
      <Input
        type="text"
        placeholder="Digite a descrição da tarefa"
        value={description}
        onChange={(event) => setDescreption(event.target.value)}
      />
      <button
        onClick={() => {
          //verificar se o título e a descrição estão preenchidos
          if (!title.trim() || !description.trim()) {
            //trim() inclui espaços em branco como vazio
            return alert("Preencha o título e a descrição da tarefa.");
          }
          onAddTaskSubmit(title, description);
          setTitle("");
          setDescreption("");
        }}
        className="bg-slate-500 text-white px-4 py-2 rounded-md font-medium"
      >
        Adicionar
      </button>
    </div>
  );
}

export default AddTask;
