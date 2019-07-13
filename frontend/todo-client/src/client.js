import React from 'react';
import TodoIndex from './components/TodoIndex'
import {useState, useEffect} from 'react';

function Client() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos().then ( (resp)=>{
      let todos = resp.todos
      setTodos(todos)
    })
  }, []);

  return (
    <div>
      <h1>Todos Index</h1>
      <TodoIndex todos={todos}/>
    </div>
  );
}

export const fetchTodos = () => {
  const apiUrl = `http://localhost:6969/api/todos`;

  return fetch(apiUrl)
      .then( (response) => response.json());
};

export default Client;

