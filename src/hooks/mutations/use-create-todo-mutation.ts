import { createTodo } from "@/api/create-todo";
import { QUERY_KEYS } from "@/lib/constants";
import type { Todo } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateTodoMutation() {
  /** store로서 서버 상태와 관련된 모든 것을 저장하는 저장소 */
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,
    // 요청 시작
    onMutate: () => {},
    // 요청 종료
    onSettled: () => {},
    // 요청 성공
    // response data를 parameter로 받아서 사용
    onSuccess: (newTodo) => {
      /** 쿼리 무효화 메서드
       *  "todos"라는 키를 가진 모든 쿼리를 무효화
       *  따라서 불필요한 무효화를 피하기 위해 아래와 같이 하나의 객체로 쿼리 키를 관리
       *  QueryKey Factory 패턴 - 다만 이 패턴은 요청해야 하는 데이터가 많아질수록 서버에 부담을 줄 수 있음
       *  queryClient.invalidateQueries({ queryKey: QUERY_KEYS.todo.list });
       */
      /** 받아온 데이터를 캐시 데이터에 직접 추가하는 패턴
       * 첫 번째 인수는 쿼리 키, 두 번째 인수는 캐시 데이터를 업데이트할 데이터
       * setQueryData 메서드를 사용하여 데이터 리페칭 없이 새로운 데이터를 캐시 데이터에 직접 추가
       */
      // queryClient.setQueryData<Todo[]>(QUERY_KEYS.todo.list, (prevTodos) => {
      //   if (!prevTodos) return [newTodo];
      //   return [...prevTodos, newTodo];
      // });

      queryClient.setQueryData<Todo>(
        QUERY_KEYS.todo.detail(newTodo.id),
        newTodo,
      );

      queryClient.setQueryData<string[]>(
        QUERY_KEYS.todo.list,
        (prevTodoIds) => {
          if (!prevTodoIds) return [newTodo.id];

          return [...prevTodoIds, newTodo.id];
        },
      );
    },
    // 요청 실패
    onError: (error) => {
      window.alert(error.message);
    },
  });
}
