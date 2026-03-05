import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Textarea,
} from "@heroui/react";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/redux/store";

import { addTodo, todoSelector } from "@/redux/todoSlice";
import { createTodo as createTodoApi } from "@/api/todoApi";

export default function CreateTaskForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const isLoading = useSelector(todoSelector).loading;

  const handleSubmit = async () => {
    if (!title.trim()) return;

    const createdTask = await createTodoApi({
      title: title.trim(),
      description: description.trim(),
    });
    dispatch(
      addTodo({
        id: createdTask._id,
        title: title.trim(),
        description: description.trim(),
        completed: false,
      }),
    );

    setTitle("");
    setDescription("");
  };

  return (
    <Card className="w-full shadow-sm border border-default-200">
      <CardHeader className="flex flex-col items-start gap-1 pb-0">
        <h2 className="text-lg font-bold">Create New Task</h2>
      </CardHeader>
      <CardBody className="flex flex-col gap-4 pt-4">
        <Input
          label="Task Title"
          labelPlacement="outside"
          placeholder="e.g. Buy groceries"
          value={title}
          onValueChange={setTitle}
          variant="bordered"
        />
        <Textarea
          label="Description"
          labelPlacement="outside"
          placeholder="Add a description for your task..."
          value={description}
          onValueChange={setDescription}
          variant="bordered"
          minRows={3}
        />
        <div className="flex justify-end">
          <Button
            color="primary"
            onPress={handleSubmit}
            isLoading={isLoading}
            isDisabled={!title.trim()}
            startContent={!isLoading && <Plus size={16} />}
          >
            Add Task
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
