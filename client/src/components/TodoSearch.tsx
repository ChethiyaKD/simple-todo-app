import { Input } from "@heroui/react";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import { todoSelector, setSearchQuery } from "@/redux/todoSlice";

export default function TodoSearch() {
  const dispatch = useDispatch<AppDispatch>();
  const searchQuery = useSelector(todoSelector).searchQuery;

  return (
    <Input
      placeholder="Search tasks..."
      value={searchQuery}
      onValueChange={(value) => dispatch(setSearchQuery(value))}
      variant="bordered"
      startContent={<Search size={16} className="text-default-400" />}
      className="bg-white"
    />
  );
}
