import React from 'react';
import TodoIndex from './components/TodoList'
import {useState, useEffect} from 'react';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos().then ( (resp)=>{
      debugger
    })
  }, []);

  return (
    <TodoIndex />
  );
}

export const fetchTodos = () => {
  const apiUrl = `http://localhost:6969/api/todos`;

  return fetch(apiUrl)
      .then( (response) => response.json());
};

export default App;

