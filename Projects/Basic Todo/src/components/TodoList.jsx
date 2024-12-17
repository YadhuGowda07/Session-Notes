import { Trash2, Edit2, Check, X } from "lucide-react";
import { useTodo } from "../context/TodoContext";

const TodoList = () => {
  const {
    todos,
    editingId,
    editText,
    setEditText,
    startEditing,
    updateTodo,
    deleteTodo,
    setEditingId,
  } = useTodo();

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="flex items-center gap-2 p-3 border rounded"
        >
          {editingId === todo.id ? (
            <>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="flex-1 p-2 border rounded"
              />
              <button
                onClick={() => updateTodo(todo.id)}
                className="text-green-600 hover:text-green-700"
              >
                <Check size={20} />
              </button>
              <button
                onClick={() => setEditingId(null)}
                className="text-red-600 hover:text-red-700"
              >
                <X size={20} />
              </button>
            </>
          ) : (
            <>
              <span className="flex-1">{todo.text}</span>
              <button
                onClick={() => startEditing(todo)}
                className="text-blue-600 hover:text-blue-700"
              >
                <Edit2 size={20} />
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 size={20} />
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TodoList;
