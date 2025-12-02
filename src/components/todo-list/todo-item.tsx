import { Button } from "../ui/button";
import { Link } from "react-router";
import { useUpdateTodoMutation } from "@/hooks/mutations/use-update-todo-mutation";
import { useDeleteTodoMutation } from "@/hooks/mutations/use-delete-todo-mutation";
import { useTodoDataById } from "@/hooks/queries/use-todo-data-by-id";

export default function TodoItem({ id }: { id: string }) {
  // 정규화를 통해 캐싱되어 있는 데이터를 사용
  const { data: todo } = useTodoDataById(id, "LIST");

  if (!todo) throw new Error("Todo Data Undefined");

  const { content, isDone } = todo;

  const { mutate: updateTodo } = useUpdateTodoMutation();
  const { mutate: deleteTodo, isPending: isDeleteTodoPending } =
    useDeleteTodoMutation();

  const handleDeleteClick = () => {
    deleteTodo(id);
  };

  const handleCheckboxClick = () => {
    updateTodo({ id, isDone: !isDone });
  };

  return (
    <div className="flex items-center justify-between border p-2">
      <div className="flex gap-5">
        <input onClick={handleCheckboxClick} type="checkbox" checked={isDone} />
        <Link to={`/todolist/${id}`}>{content}</Link>
      </div>
      <Button
        disabled={isDeleteTodoPending}
        variant="destructive"
        onClick={handleDeleteClick}
      >
        삭제
      </Button>
    </div>
  );
}
