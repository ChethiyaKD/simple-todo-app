import CreateTaskForm from "@/components/CreateTaskForm";
import TodoSearch from "@/components/TodoSearch";
import TodoList from "@/components/TodoList";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-default-100">
      <div className="flex-1 w-full max-w-2xl mx-auto px-4 py-10 flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold text-default-900">
            Simple Todo App
          </h1>
          <span className="text-sm text-default-500 mt-1">
            Just organize your day.
          </span>
        </div>
        <CreateTaskForm />
        <TodoSearch />
        <TodoList />
      </div>
    </div>
  );
}
