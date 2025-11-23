import { fetchTodoById } from "@/api/fetch-todo-by-id";
import { useQuery } from "@tanstack/react-query";

export function useTodoDataById(id: string) {
  return useQuery({
    queryFn: () => fetchTodoById(id),
    queryKey: ["todos", id],
    staleTime: 5000, // 보통은 과한 데이터의 리프레싱을 방지하기 위해 5000 ~ 30000ms 사이로 설정
    gcTime: 5000, // 아무런 컴포넌트에서도 해당 데이터를 사용하지 않는 inactive 상태가 5초 이상 지속되면 캐시 데이터를 메모리에서 삭제
    // refetchOnMount: true, 컴포넌트가 마운트 될 때 stale한 데이터를 다시 불러옴
    // refetchOnWindowFocus: true, 컴포넌트가 포커스될 때 stale한 데이터를 다시 불러옴
    // refetchOnReconnect: true, 인터넷 연결이 끊어졌다가 다시 연결될 때 stale한 데이터를 다시 불러옴
    // refetchInterval: 1000, 1초마다 stale한 데이터를 다시 불러옴
    // refetchIntervalInBackground: true, 백그라운드에서 stale한 데이터를 다시 불러옴
  });
}
