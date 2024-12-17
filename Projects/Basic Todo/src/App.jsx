import { TodoProvider } from "./context/TodoContext";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";

export default function App() {
  return (
    <TodoProvider>
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Todo App</h1>
        <AddTodo />
        <TodoList />
      </div>
    </TodoProvider>
  );
}
