import { useState } from 'react'
import './App.css'
import Header from './components/Header'; // Assuming you create Header.tsx in a 'components' folder
import CategorySection from './components/CategorySection';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import BulkActions from './components/BulkActions';
import Footer from './components/Footer';

function App() {
  const [todos, setTodos] = useState([]); 
  const [categories, setCategories] = useState([]);
  const addTodo = (text: string, category: string) => {
    // Logic to add a new todo
  };

  return (
    <>
      {/* This React Fragment wraps your main structure */}
      {/* Your main application's structural HTML */}
      <Header /> {/* Render your Header component */}

      <main>
        <div className="app-container">
          <CategorySection categories={categories} setCategories={setCategories} /> {/* Pass props down */}
          <TodoInput categories={categories} addTodo={addTodo} />
          <TodoList todos={todos} setTodos={setTodos} /> {/* TodoList will render individual TodoItem components */}
          <BulkActions todos={todos} setTodos={setTodos} />
        </div>
      </main>

      <Footer /> {/* Render your Footer component */}
    </>
  )
}

export default App
