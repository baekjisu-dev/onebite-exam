import { fetchTodos } from "@/api/fetch-todos";
import { QUERY_KEYS } from "@/lib/constants";
import type { Todo } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useTodosData() {
  const queryClient = useQueryClient();

  return useQuery({
    queryFn: async () => {
      const todos = await fetchTodos();

      // todo 리스트를 전체적으로 불러옴과 동시에 개별 todo 데이터를 캐시 데이터에 추가
      todos.forEach((todo) => {
        queryClient.setQueryData<Todo>(QUERY_KEYS.todo.detail(todo.id), todo);
      });

      // todo 리스트는 id만 저장
      return todos.map((todo) => todo.id);
    },
    queryKey: QUERY_KEYS.todo.list,
  });
}
