import { createContext, useContext, useState, useEffect } from "react";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:8000/todos");
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const response = await fetch("http://localhost:8000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newTodo }),
      });
      const data = await response.json();
      setTodos([...todos, data]);
      setNewTodo("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:8000/todos/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const updateTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: editText }),
      });
      const data = await response.json();
      setTodos(todos.map((todo) => (todo.id === id ? data : todo)));
      setEditingId(null);
      setEditText("");
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const value = {
    todos,
    newTodo,
    setNewTodo,
    editingId,
    editText,
    setEditText,
    addTodo,
    deleteTodo,
    startEditing,
    updateTodo,
    setEditingId,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
};
