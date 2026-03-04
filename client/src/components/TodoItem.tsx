import {
  Checkbox,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
} from "@heroui/react";
import { useCallback, useState } from "react";
import { Trash2, Pencil } from "lucide-react";

interface TodoItemProps {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string, description: string) => void;
}

export default function TodoItem({
  id,
  title,
  description,
  completed,
  onToggle,
  onDelete,
  onEdit,
}: TodoItemProps) {
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedDescription, setUpdatedDescription] = useState(description);

  const handleConfirmDelete = () => {
    onDelete(id);
    setDeleteOpen(false);
  };

  const handleConfirmEdit = useCallback(() => {
    onEdit(id, updatedTitle, updatedDescription);
    setEditOpen(false);
  }, [id, updatedTitle, updatedDescription]);

  return (
    <>
      <div className="flex items-center gap-3 bg-white border border-default-200 rounded-xl px-4 py-3 group">
        <Checkbox
          isSelected={completed}
          onValueChange={() => onToggle(id)}
          color="primary"
        />
        <div className="flex-1 min-w-0">
          <p
            className={`text-sm font-semibold truncate ${completed ? "line-through text-default-400" : "text-default-800"}`}
          >
            {title}
          </p>
          <p
            className={`text-sm truncate ${completed ? "line-through text-default-400" : "text-default-500"}`}
          >
            {description}
          </p>
        </div>

        <button
          onClick={() => setEditOpen(true)}
          className="text-default-400 hover:text-danger transition-colors"
          aria-label="Delete task"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={() => setDeleteOpen(true)}
          className="text-default-400 hover:text-danger transition-colors"
          aria-label="Delete task"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <Modal
        isOpen={isDeleteOpen}
        onClose={() => setDeleteOpen(false)}
        size="sm"
      >
        <ModalContent>
          <ModalHeader className="text-base">Delete Task</ModalHeader>
          <ModalBody>
            <div className="text-sm text-default-600">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-default-800">"{title}"</span>?
              This action cannot be undone.
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={() => setDeleteOpen(false)}>
              Cancel
            </Button>
            <Button color="danger" onPress={handleConfirmDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isEditOpen} onClose={() => setEditOpen(false)} size="md">
        <ModalContent>
          <ModalHeader className="text-base">Edit Task</ModalHeader>
          <ModalBody>
            <div className="text-sm text-default-600">
              You can edit the task title and description.
            </div>
            <Input
              placeholder="Task title"
              defaultValue={title}
              variant="bordered"
              onValueChange={setUpdatedTitle}
            />
            <Textarea
              placeholder="Task description"
              defaultValue={description}
              variant="bordered"
              minRows={3}
              onValueChange={setUpdatedDescription}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={() => setEditOpen(false)}>
              Cancel
            </Button>
            <Button color="primary" onPress={handleConfirmEdit}>
              Edit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
