import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header.tsx'; // Assuming you create Header.tsx in a 'components' folder
import CategorySection from './components/CategorySection';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import BulkActions from './components/BulkActions';
import Footer from './components/Footer';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  category: string; // Assuming each todo has a category
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(()=> {
    // runs only once during the initial render
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : []; // Load todos from localStorage or start with an empty array
  });
  
  const [categories, setCategories] = useState<string[]>(() => {
    // runs only once during the initial render
    // Load categories from localStorage or start with an empty array
    const savedCategories = localStorage.getItem('categories');
    return savedCategories ? JSON.parse(savedCategories) : []; 
  });

  useEffect(() => {
    // Save todos to localStorage whenever they change
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    // Save categories to localStorage whenever they change
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const addTodo = (text: string, category: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(), // Unique ID based on timestamp
      text,
      completed: false,
      category
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const toggleTodoComplete = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
  };

  return (
    <>
      {/* This React Fragment wraps your main structure */}
      {/* Your main application's structural HTML */}
      <Header />

      <main>
        <div className="app-container">
          <CategorySection categories={categories} setCategories={setCategories} /> {/* Pass props down */}
          <TodoInput categories={categories} addTodo={addTodo} />
          <TodoList todos={todos} toggleTodoComplete={toggleTodoComplete} removeTodo={removeTodo} /> {/* TodoList will render individual TodoItem components */}
          <BulkActions todos={todos} setTodos={setTodos} />
        </div>
      </main>

      <Footer />
    </>
  )
}

export default App
