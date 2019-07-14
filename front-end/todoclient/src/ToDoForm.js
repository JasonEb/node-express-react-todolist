import React from 'react';
import {useState} from 'react';

function ToDoForm(props) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    //change handlers
    const handleTitleChange = (event) =>  setTitle(event.target.value);
    const handleDescriptionChange = (event) =>  setDescription(event.target.value);

    const handleSubmit = (event) => {
        event.preventDefault()
        const newTitle = title
        const newDescription = description

        const data = { title: newTitle, description: newDescription }

        //post to back-end
        postTodo(data)
    }

	return <form onSubmit={handleSubmit}><h3>New ToDo</h3>
        <label>
            <div>Todo: Title</div>
            <input name="toDoTitle" value={title} onChange={handleTitleChange} />
        </label>

        <label>
            <div>Todo: Description</div>
            <input name="toDoDescription" value={description} onChange={handleDescriptionChange} />
        </label>

        <div>
            <input type="submit" />
        </div>
    </form>
}

export const postTodo = (data) => {
    const apiUrl = 'http://localhost:6969/api/todos';
    return fetch(apiUrl, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
      .then( (response) => console.log("response: ", response.json()))
  };

export default ToDoForm