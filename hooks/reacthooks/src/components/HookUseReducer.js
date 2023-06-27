import { useReducer, useState } from "react";

const HookUseReducer = () => {
  // 1 - começando com o useReducer
  const [number, dispatch] = useReducer((state, action) => {
    //nome da variável//nome que geralmente chamado de dispatch é onde executaremos a função para alterar aquele valor dinâmico
    //state - number(nome da variável)

    return Math.random(state); //pega valor inicial do state e coloca ele para um número aleaório
  });

  // 2 - avançando no useReducer
  const initialTasks = [
    { id: 1, text: "Fazer alguma coisa" },
    { id: 2, text: "Fazer outra coisa" },
  ];
  //envocando tarefas existente e adicionando

  const taskReducer = (state, action) => {
    //função reducer, geralmente também é extraída do useReducer
    switch (action.type) {
      case "ADD": //case ADD, haverá a adição de tarefa
        const newTask = {
          id: Math.random(),
          text: taskText,
        };

        setTaskText(""); //zerando o setTask para input ficar em branco para a adição de mais uma tarefa
        return [...state, newTask]; //spreadoperator - utilizado para recuperar todos os dados(já que é um array)
      //trazendo state atual (tarefas existentes) e nova tarefa (newTask)
      case "DELETE":
        return state.filter((task)=> task.id !== action.id)//retornando a state como um método filter(irá filtrar todas as tarefas)
        //todos as tarefas que não tiverem o id enviados pela action.id serão deletadas
      default://caso contrário retornará o state atual
        return state
    }
  };

  const [taskText, setTaskText] = useState("");
  const [tasks, dispatchTasks] = useReducer(taskReducer, initialTasks); //taskReducer-função que vai alterar estado//initialTasks - estado inicial

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatchTasks({ type: "ADD" });
  };

  const removeTask = (id)=>{//id passado pelo parâmetro da função
    dispatchTasks({type: "DELETE", id})//na action podem ser passados outros parâmetros
  }

  return (
    <div>
      <h2>useReducer</h2>
      <p>Número: {number}</p>
      <button onClick={dispatch}>Alterar número!</button>
      <h3>Tarefas:</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setTaskText(e.target.value)}
          value={taskText}
        />
        <input type="submit" value="Enviar" />
      </form>
      {tasks.map((task) => (
        <li key={task.id} onDoubleClick={()=>removeTask(task.id)}>{task.text}</li>
      //onDoubleClick - ativado por click duplo // geralmente é evitado o ato de colocar o reducer diretamente, pois geralmente algo será processado antes e para não complicar lógica da função
      ))}
      <hr />
    </div>
  );
};

export default HookUseReducer;
