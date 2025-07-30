import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTodo = () => {
    if (input.trim() === '') {
      alert("Please enter some todo");
      return;
    }
    const newTodo = {
      id: Date.now(),
      item: input.trim()
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    console.log(updatedTodos);

    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setInput('');
  };

  const handleDeleteTodo = (idToDelete) => {
    const updateTodos = todos.filter(todo => todo.id !== idToDelete);
    setTodos(updateTodos);
    localStorage.setItem('todos', JSON.stringify(updateTodos));
  };

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  return (
  <>
    <div className=" bg-white p-6 shadow-lg rounded-lg flex flex-col min-w-[600px] gap-4">
      <h1 className="font-bold text-3xl">SIMPLE TO-DO APP</h1>
        <div className=" bg-gray-100 flex gap-2 shadow-sm rounded-lg w-full p-3">
          <input
           type="text"
           placeholder='Enter here..'
           value={input}
           className=' bg-white border px-2 py-3 w-full rounded-sm border-blue-300 focus:outline-none focus:border-blue-700'
           onInput={(e) => setInput(e.target.value)}
           onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddTodo();
            }
          }}
          />
          <button 
           onClick={handleAddTodo}
           className="p-3 text-xl bg-gray-600 text-white rounded-sm hover:bg-gray-400 transition-all duration-400">+</button>
        </div>
        {todos.map((todo) => (
        <div className='flex items-center justify-between shadow-lg p-2 rounded-lg w-full'>
          <p>{todo.item}</p>
          <button
            onClick={() => handleDeleteTodo(todo.id)} 
           className="p-3 text-xl bg-red-500 text-white rounded-sm hover:bg-red-300 transition-all duration-400">x</button>
        </div>
        ))}
        
    </div>
  </>
  );
}

export default App
