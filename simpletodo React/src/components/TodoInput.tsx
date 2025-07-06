import { useState } from "react";  
import {removeCategory} from "./app"; 
interface TodoInputProps {
  categories: string[];
  addTodo: (text: string, category: string) => void;
  removeCategory: (category: string) => void; // Function to remove a category
}

const TodoInput = ({ categories, addTodo, removeCategory }: TodoInputProps) => {
  // State for the todo text input
  const [todoText, setTodoText] = useState('');
  // State for the selected category from the dropdown
  const [selectedCategory, setSelectedCategory] = useState(''); // Initialize with empty string for "Select category" option

  // Function to handle adding a new todo
  const handleAddTodo = () => {
    if (todoText.trim() === '') {
      alert('Please enter a todo item!');
      return;
    }
    if (selectedCategory === '') {
      alert('Please select a category!');
      return;
    }

    addTodo(todoText.trim(), selectedCategory); // Call the addTodo function passed from App.tsx
    setTodoText(''); // Clear the input field
    setSelectedCategory(''); // Reset the selected category
  };

  const handleRemoveCategory = () => {
    if (selectedCategory.trim() === '') {
      alert('Please select a category to remove.');
      return;
    }
    removeCategory(selectedCategory);
    setSelectedCategory(''); // Reset the selected category
  };

  return (
    <div className="todo-input">
      <input
        type="text"
        id="todo-text"
        placeholder="What needs to be done?"
        value={todoText} // Controlled input
        onChange={(e) => setTodoText(e.target.value)}
      />
      <select
        id="category"
        value={selectedCategory} // Controlled select
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">Select category</option>
        {/* Render categories dynamically */}
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <button id="remove-category" onClick={handleRemoveCategory}>Remove Category</button>
      <button id="add-todo" onClick={handleAddTodo}>
        Add Item
      </button>
      {/* remove category handled elsewhere, need to handle in categorysection or bulkactions later */}
    </div>
  );
};

export default TodoInput;