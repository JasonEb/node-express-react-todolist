import React from 'react';

function TodoIndex(props) {
  let {todos} = props

  const todoItems = todos.map((todo) => {
    return <li key={todo.id}>{todo.title}</li>
  });

  return (
    <ol className="index">
      {todoItems}
    </ol>
  );
}

export default TodoIndex;
