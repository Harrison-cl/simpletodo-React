// src/components/TodoList.tsx
import React from 'react'; 

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  category: string; 
}

interface TodoItemProps {
  todo: Todo;
  toggleTodoComplete: (id: string) => void;
  removeTodo: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodoComplete, removeTodo }) => {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <span className="todo-category">{todo.category}</span>
      <span className="todo-text">{todo.text}</span>
      <span className="todo-status">
        {todo.completed ? 'Completed' : 'Pending'}
      </span>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodoComplete(todo.id)}
      />
      <button onClick={() => removeTodo(todo.id)}>Remove</button>
    </li>
  );
}

interface TodoListProps {
  todos: Todo[];
  toggleTodoComplete: (id: string) => void;
  removeTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodoComplete, removeTodo }) => {
  return (
    <ul id="todo-list">
      <li className="todo-header">
        <span>Category</span>
        <span>to-do</span>
        <span>Status</span>
        <span>Select</span>
      </li>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodoComplete={toggleTodoComplete}
          removeTodo={removeTodo}
        />
      ))}
    </ul>
  );
};


export default TodoList;