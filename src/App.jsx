import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import { v4 } from "uuid"; //cria id aleatório
import Title from "./components/Tittle";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    //recebendo parâmetros, primeiro uma arrow function e depois uma lista. Executa primeiro a função sempre que algum valor da lista (que vem depois) for alterado
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // useEffect(() => {
  // const fetchTasks = async () => {
  // //CHAMAR API
  //    const response = await fetch(
  //       "https://jsonplaceholder.typicode.com/todos?_limit=10",
  //       {
  //         method: "GET",
  //       }
  //     );

  // PEGAR OS DADOS QUE ELA RETORNA
  //     const data = await response.json();
  // ARMAZENAR/PERSISTIR ESSES DADOS NO STATE
  //     setTasks(data);
  //   };
  // fetchTasks();
  // });

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      //preciso atualizar esta tarefa
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      //não preciso atualizar esta tarefa
      return task;
    });
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(), //cria id aleatório
      title,
      description,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Title>Gerenciador de tarefas</Title>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
