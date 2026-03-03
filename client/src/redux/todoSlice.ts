import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import type { RootState } from "./store";

interface TodoCreateTypes {
  title: string;
  description: string;
}
interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  loading: boolean;
  searchQuery: string;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  searchQuery: "",
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TodoCreateTypes>) => {
      state.todos.push({
        id: uuid(),
        title: action.payload.title,
        description: action.payload.description,
        completed: false,
      });
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (!todo) return;

      todo.completed = !todo.completed;
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { addTodo, toggleTodo, removeTodo, setSearchQuery } =
  todoSlice.actions;
export default todoSlice.reducer;

export const todoSelector = (state: RootState) => state.todo;
