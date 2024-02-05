import './app.css'
import { useState } from 'react'
import { useEffect } from 'react';
function App() {
  const [todos, setTodos] = useState([]);
  
  useEffect(()=>{
    setInterval(()=>{
      fetch('http://localhost:3000/todos', {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((data) => {
          setTodos(data)
        });
    },200)
  },[])

  function delteToDO(id){
    fetch('http://localhost:3000/deleteTodo/'+id, {
      method: 'DELETE',
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
    }) // Add a semicolon here
    .catch((error)=>{
      console.log(error);
    })
  }
  function sendToServer()
  {
    const inp = document.querySelector('input');
    const title = inp.value;
    if(title == '')
    {
      alert('Please enter a task');
      return;
    }
    fetch('http://localhost:3000/todos', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        status: 0
    }),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    })
    .then((response)=>response.json())
    .then((data)=>{
      console.log(data);
      inp.value = '';
    })
  }
  
  // here starts html code
  return (
    <>
      <div className="container">
        <h1>TodoApp</h1>
        <input type="text" placeholder="Enter your task" />
        <button id='send' onClick={sendToServer}>Add todo</button>
          {todos.map((todo) => {
            return (
              <div id='insideTask' key={todo.id}>
                <h2>{todo.title}</h2>
                
                {/* <h1>{todo.status}</h1> */}
                <button onClick={()=>{
                  delteToDO(todo.id);
                }}>Delete</button>
                <button>Done</button>
              </div>
            )
          })}
      </div>
    </>
  )
}

export default App