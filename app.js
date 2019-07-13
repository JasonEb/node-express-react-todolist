import express from 'express'
import dataArray from './db/db'
import bodyParser from 'body-parser'
import path from 'path'
import cors from 'cors'

const app = express();

//setup cors
app.use(cors({}));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// get all todos
app.get('/api/todos', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'todos retrieved successfully',
    todos: dataArray
  })
});

//create an endpoint to get a single todo from the database
app.get('/api/todos/:id', (req, res) => {
	const id = parseInt(req.params.id, 10);
	dataArray.map((todo) => {
		if (todo.id === id) {
		return res.status(200).send({
			success: 'true',
			message: 'todo retrieved successfully',
			todo,
		});
		} 
	});
	return res.status(404).send({
		success: 'false',
		message: 'todo does not exist',
	});
	});



app.post('/api/todos', (req, res) => {
	const todo = {
	  id: dataArray.length + 1,
	  title: req.body.title,
	  description: req.body.description
	}
	//validate that user inputs both title and description
	//if not, returns this error without pushing input to db
	if (!req.body.title) {
        return res.status(400).send({
        success: 'false',
        message: 'title is required'
        });
    } else if(!req.body.description) {
        return res.status(400).send({
        success: 'false',
        message: 'description is required'
        });
    }
	dataArray.push(todo);
	return res.status(201).send({
	  success: 'true',
	  message: 'todo added successfully',
	  todo: todo
	})
});
app.delete('/api/todos/:id', (req, res) => {
	const id = parseInt(req.params.id, 10);
	
	dataArray.map((todo, index) => {
		if (todo.id === id) {
			dataArray.splice(index, 1);
			return res.status(200).send({
			success: 'true',
			message: 'Todo deleted successfuly',
			});
		}
	});	
		return res.status(404).send({
		success: 'false',
		message: 'todo not found',
		});
	
	
	});

//frontend
app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});  


const PORT = 6969;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});


