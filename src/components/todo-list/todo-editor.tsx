import { useCreateTodo } from "@/store/todos";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";

export default function TodoEditor() {
  const createTodo = useCreateTodo();

  const [content, setContent] = useState("");

  const handleAddClick = () => {
    console.log("content", content);
    if (content.trim() === "") return;

    createTodo(content);

    setContent("");
  };

  return (
    <div className="flex gap-2">
      <Input
        placeholder="새로운 할 일을 입력하세요..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button onClick={handleAddClick}>추가</Button>
    </div>
  );
}
