import { ApiClient } from "./apiClient";
import { config } from "@/config";
import type { TodoCreateTypes } from "@/types";

const baseUrl = config.baseUrl;

export const getTodos = async () => {
  const url = `${baseUrl}/todos/`;
  return ApiClient({
    url,
    method: "GET",
  });
};

export const createTodo = (body: TodoCreateTypes) => {
  const url = `${baseUrl}/todos/`;
  return ApiClient({
    url,
    method: "POST",
    body,
  });
};

export const updateTodo = (body: TodoCreateTypes, id: string) => {
  const url = `${baseUrl}/todos/${id}`;
  return ApiClient({
    url,
    method: "PUT",
    body,
  });
};

export const patchTodo = (id: string) => {
  const url = `${baseUrl}/todos/${id}/done`;
  return ApiClient({
    url,
    method: "PATCH",
  });
};

export const deleteTodo = (id: string) => {
  const url = `${baseUrl}/todos/${id}`;
  return ApiClient({
    url,
    method: "DELETE",
  });
};
