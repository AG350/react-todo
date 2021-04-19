import React, { useState, useEffect } from "react";
import './App.css';

//Importar componentes
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {
  //states
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus ] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);
  //Run once
  useEffect(()=>{
    getLocalTodos();
  },[])
  //use effect
  useEffect(()=>{
    const filterHandler = () => {
      switch (status) {
        case 'completed':
          setFilteredTodos(todos.filter(todo => todo.completed === true))        
          break;
        case 'uncompleted':
          setFilteredTodos(todos.filter(todo => todo.completed === false))        
          break;
        default:
          setFilteredTodos(todos);
          break;
      }
    };
    const saveLocalTodos = () => {
      localStorage.setItem("todos", JSON.stringify(todos));
    };
    filterHandler();
    saveLocalTodos()
  },[todos, status])
  //functions 

  

  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  }
  
  return (
    <div className="App">
      <header>
        <h1>Lista de tareas de Ale</h1>
      </header>
      <Form
        todos={todos}
        filteredTodos={filteredTodos}
        setTodos={setTodos}
        setInputText={setInputText}
        inputText={inputText}
        setStatus={setStatus}
      />
      <TodoList
        setTodos={setTodos}
        todos={todos}
        filteredTodos={filteredTodos}
        setFilteredTodos={setFilteredTodos}
      />
    </div>
  );
}

export default App;
