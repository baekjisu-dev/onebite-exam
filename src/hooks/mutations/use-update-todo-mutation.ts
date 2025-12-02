import { updateTodo } from "@/api/update-todo";
import { QUERY_KEYS } from "@/lib/constants";
import type { Todo } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodo,
    // 낙관적 업데이트를 위한 이벤트 핸들러 등록
    onMutate: async (updatedTodo) => {
      // 예외 상황 2. 업데이트 이전에 실행되었던 조회 API의 response가 뒤늦게 도착하여 이전 데이터로 덮어씌워지는 것을 방지
      // await queryClient.cancelQueries({
      //   queryKey: QUERY_KEYS.todo.list,
      // });

      // const preTodos = queryClient.getQueryData<Todo[]>(QUERY_KEYS.todo.list);

      // queryClient.setQueryData<Todo[]>(QUERY_KEYS.todo.list, (prevTodos) => {
      //   if (!prevTodos) return [];

      //   return prevTodos.map((prevTodo) =>
      //     prevTodo.id === updatedTodo.id
      //       ? { ...prevTodo, ...updatedTodo }
      //       : prevTodo,
      //   );
      // });

      // return { preTodos };

      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.todo.detail(updatedTodo.id),
      });

      const prevTodo = queryClient.getQueryData<Todo>(
        QUERY_KEYS.todo.detail(updatedTodo.id),
      );

      queryClient.setQueryData<Todo>(
        QUERY_KEYS.todo.detail(updatedTodo.id),
        (prevTodo) => {
          if (!prevTodo) return;

          return { ...prevTodo, ...updatedTodo };
        },
      );

      return {
        prevTodo,
      };
    },
    // 예외 상황 1. 요청 실패 시, 낙관적으로 업데이트한 캐시 데이터를 원상복구: context를 활용
    // onMutate에서 반환한 context를 활용하여 캐시 데이터를 원상복구
    onError: (error, variable, context) => {
      if (context && context.prevTodo) {
        queryClient.setQueryData<Todo>(
          QUERY_KEYS.todo.detail(context.prevTodo.id),
          context.prevTodo,
        );
      }
    },
    // onSettled: () => {
    //   // 예외 상황 3. 데이터 수정 요청이 완료되었는데 낙관적 업데이트의 결과와 실제 결과가 상이할 경우, 캐시 데이터를 무효화
    //   queryClient.invalidateQueries({
    //     queryKey: QUERY_KEYS.todo.list,
    //   });
    // },
  });
}
