import { Chip } from "@heroui/react";
import TodoItem from "./TodoItem";
import { useSelector, useDispatch } from "react-redux";
import {
  todoSelector,
  toggleTodo,
  removeTodo,
  setTodos,
} from "@/redux/todoSlice";
import type { AppDispatch } from "@/redux/store";
import { deleteTodo, patchTodo, getTodos, updateTodo } from "@/api/todoApi";
import { useCallback, useEffect } from "react";
import { authSelector, setToken } from "@/redux/authSlice";
import { getAuthToken } from "@/api/authApi";
import type { Todo } from "@/types";

export default function TaskList() {
  const todos = useSelector(todoSelector).todos;
  const searchQuery = useSelector(todoSelector).searchQuery;
  const activeCount = todos.filter((t) => !t.completed).length;
  const isToken = !!useSelector(authSelector).token;

  const dispatch = useDispatch<AppDispatch>();

  const onToggle = async (id: string) => {
    dispatch(toggleTodo(id));
    await patchTodo(id);
  };

  const onDelete = async (id: string) => {
    await deleteTodo(id);
    dispatch(removeTodo(id));
  };

  const onEdit = async (id: string, title: string, description: string) => {
    await updateTodo({ title, description }, id);
    const updatedList = todos.map((todo) =>
      todo.id === id ? { ...todo, title, description } : todo,
    );
    dispatch(setTodos(updatedList));
  };

  const filteredTodos = todos.filter((todo) =>
    todo?.title?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const fetchTodos = useCallback(async () => {
    const response = (await getTodos()) as { data: Todo[] };
    dispatch(setTodos(response.data));
  }, [isToken]);

  useEffect(() => {
    if (isToken) {
      fetchTodos();
      return;
    }

    (async () => {
      const response = await getAuthToken();
      dispatch(setToken(response.data));
    })();
  }, [isToken]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-widest text-default-500">
          Active Tasks
        </span>
        <Chip size="sm" color="primary" variant="flat">
          {activeCount} {activeCount === 1 ? "Task" : "Tasks"}
        </Chip>
      </div>
      {filteredTodos.length === 0 ? (
        <p className="text-sm text-default-400 text-center py-8">
          No tasks found.
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {filteredTodos.map((todoItem) => (
            <TodoItem
              key={todoItem.id}
              id={todoItem.id}
              title={todoItem.title}
              description={todoItem.description}
              completed={todoItem.completed}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
}
