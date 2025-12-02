import { deleteTodo } from "@/api/delete-todo";
import { QUERY_KEYS } from "@/lib/constants";
import type { Todo } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodo,

    // 1. 캐시 무효화 -> invalidateQueries: 직관적이고 구현하기 쉬우나 서버에 부담을 줄 수 있음 (성능적 문제)
    // 2. 수정 요청의 응답값 활용 -> onSuccess: 데이터 리페칭이 일어나지 않는 대신 response가 늦으면 그만큼 반응도 늦어짐 **채택**
    // 3. 낙관적 업데이트 -> onMutate: 화면을 빠르게 업데이트할 수 있지만 데이터 삭제의 경우, 원상복구 시켰을 때의 변화가 너무 큼
    onSuccess: (deletedTodo) => {
      // queryClient.setQueryData<Todo>(QUERY_KEYS.todo.list, (prevTodos) => {
      //   if (!prevTodos) return [];
      //   return prevTodos.filter((todo) => todo.id !== deletedTodo.id);
      // });

      queryClient.removeQueries({
        queryKey: QUERY_KEYS.todo.detail(deletedTodo.id),
      });
      queryClient.setQueryData<string[]>(
        QUERY_KEYS.todo.list,
        (prevTodoIds) => {
          if (!prevTodoIds) return [];

          return prevTodoIds.filter((todoId) => todoId !== deletedTodo.id);
        },
      );
    },
  });
}
