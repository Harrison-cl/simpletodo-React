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
    // Load categories from localStorage or start with default categories
    const savedCategories = localStorage.getItem('categories');
    const defaultCategories = ['General', 'Work', 'Personal', 'Shopping', 'Health']; // Default categories
    return savedCategories ? JSON.parse(savedCategories) : defaultCategories; // Default categories
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
    if (text.trim() === '') return;
    if (category.trim() === '') { // Ensure a category is selected
        alert('Please select a category for the todo!');
        return;
    }
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      category,
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


  const removeCategory = (categoryToRemove: string) => {
    if (categoryToRemove.trim() === '') {
        alert('Please select a category to remove.');
        return;
    }
    if (!categories.includes(categoryToRemove)) {
        alert(`Category "${categoryToRemove}" not found.`);
        return;
    }

    // Remove the category from the categories list
    setCategories((prevCategories) =>
      prevCategories.filter(cat => cat !== categoryToRemove)
    );

    // Remove all todos associated with this category
    setTodos((prevTodos) =>
      prevTodos.filter(todo => todo.category !== categoryToRemove)
    );

    alert(`Category "${categoryToRemove}" and its associated tasks have been removed.`);
  };

  const removeCompletedTodos = () => {
    setTodos((prevTodos) => prevTodos.filter(todo => !todo.completed));
  };

  return (
    <>
      <Header />

      <main>
        <div className="app-container">
          <CategorySection categories={categories} setCategories={setCategories} /> {/* Pass props down */}
          <TodoInput categories={categories} addTodo={addTodo} removeCategory={removeCategory}  /> {/* pass down function */}
          <TodoList todos={todos} toggleTodoComplete={toggleTodoComplete} removeTodo={removeTodo} /> {/* TodoList will render individual TodoItem components */}
          <BulkActions removeCompletedTodos={removeCompletedTodos} />
        </div>
      </main>

      <Footer />
    </>
  )
}

export default App
