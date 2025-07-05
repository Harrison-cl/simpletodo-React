// src/components/TodoList.tsx
import React from 'react'; // React import is good practice for components, even minimal ones

const TodoList = () => {
  return (
    <ul id="todo-list">
      {/* Items will be rendered by React state here */}
      <li className="todo-header">
        <span>Category</span>
        <span>to-do</span>
        <span>Status</span>
        <span>Select</span>
      </li>
    </ul>
  );
};

export default TodoList;