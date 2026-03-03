export type ApiRequestTypes = {
  body?: any;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  url: string;
};

export type Todo = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TodoCreateTypes = {
  title: string;
  description: string;
};
