import { useTodo } from "../context/TodoContext";

const AddTodo = () => {
  const { newTodo, setNewTodo, addTodo } = useTodo();

  return (
    <form onSubmit={addTodo} className="mb-6 flex gap-2">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new todo"
        className="flex-1 p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add
      </button>
    </form>
  );
};

export default AddTodo;
