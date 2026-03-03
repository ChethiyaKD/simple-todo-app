import {
  Checkbox,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { Trash2 } from "lucide-react";

interface TodoItemProps {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({
  id,
  title,
  description,
  completed,
  onToggle,
  onDelete,
}: TodoItemProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleConfirmDelete = () => {
    onDelete(id);
    onClose();
  };

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
          onClick={onOpen}
          className="text-default-400 hover:text-danger transition-colors"
          aria-label="Delete task"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={onClose} size="sm">
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
            <Button variant="flat" onPress={onClose}>
              Cancel
            </Button>
            <Button color="danger" onPress={handleConfirmDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
