import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, removeTodo, updateTodo } from './features/todo/todoSlice';
import '../src/app.css'

const App = () => {

  const [todo, setTodo] = useState({});
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todos)


  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo({ ...todo, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo.id) {
      dispatch(updateTodo(todo))
      setTodo({})
    }
    else {
      dispatch(addTodo(todo))
      setTodo({})
    }
  }

  const handleEdit = (id) => {
    const newData = todos.find(val => val.id == id)
    setTodo(newData);
  }

  return (
    <div>
      <h2>Todo App</h2>
      <form action="" method="post" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="todo">Todo</label> {" "}
          <input type="text" name="text" id="todo" onChange={handleChange} value={todo.text || ''} />
          <button type='submit'>Submit</button>
        </div>
      </form>

      <table border={1} width={400}>
        <thead>
          <tr>
            <td>Sr.No</td>
            <td>Todo</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {
            todos.map((item, index) => {
              const { text, id } = item;
              return (
                <tr key={id}>
                  <td>{index + 1}</td>
                  <td>{text}</td>
                  <td><button type='button' onClick={() => { dispatch(removeTodo({ id })) }}>Delete</button>
                  <button type='button' onClick={()=>handleEdit(id)}>Edit</button></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default App
