import { create } from "zustand";
import {
  combine,
  subscribeWithSelector,
  persist,
  createJSONStorage,
  devtools,
} from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

/**
 * 1. combine 미들웨어
 * combine을 사용하면 첫 번째 인수를 기준으로 타입을 자동 추론하여 따로 타입을 작성할 필요가 없어짐
 */

/**
 * 2. immer 미들웨어
 * 불변성 유지를 도와주는 미들웨어
 * state를 직접 수정하더라도 불변성 유지되므로, state 업데이트 코드가 간결해짐
 */

/**
 * 3. subscribeWithSelector
 * 특정 값이 변경되었을 때 콜백 함수를 실행하는 미들웨어 (Like useEffect)
 */

/**
 * 4. persist 미들웨어
 * 브라우저의 로컬 스토리지에 데이터를 저장하는 미들웨어
 * 두 번째 인수: 저장할 데이터의 키와 옵션
 * 이때, actions 객체는 저장되지 않으므로 옵션을 전달하여 원하는 값만을 저장하도록 해야 함
 * (새로고침 시 스토어를 덮어씌우는 과정에서 함수가 동작하지 않게 될 수 있음)
 */

/**
 * 5. devtools 미들웨어
 * 브라우저의 개발자 도구에 스토어 상태를 표시하는 미들웨어 (디버깅용)
 * Redux DevTools Extension 설치 필요 (브라우저)
 */

// 미들웨어의 적용 순서가 중요하므로, 되도록이면 아래 작성된 순서를 따를 것
export const useCountStore = create(
  devtools(
    persist(
      subscribeWithSelector(
        immer(
          combine({ count: 0 }, (set, get) => ({
            actions: {
              increase: () => {
                set((state) => {
                  // 이렇게 값을 바꾸더라도 immer를 사용하면 불변성 유지됨
                  state.count += 1;
                });
              },
              decrease: () => {
                set((state) => {
                  state.count -= 1;
                });
              },
            },
          })),
        ),
      ),
      {
        name: "count-store",
        partialize: (state) => ({ count: state.count }), // 저장할 데이터
        storage: createJSONStorage(() => sessionStorage), // 스토리지 종류 변경
      },
    ),
    {
      name: "countStore",
    },
  ),
);

/**
 * 첫 번째 인수: 감시할 값
 * 두 번째 인수: 감시할 값이 변경되었을 때 실행할 콜백 함수
 */
useCountStore.subscribe(
  (store) => store.count,
  (count, prevCount) => {
    // Listener
    // 변경 전의 값도 제공
    console.log(count, prevCount);

    // store에 접근 가능
    const store = useCountStore.getState();
    // useCountStore.setState((store) => ({count: 10}))
  },
);

// export const useCountStore = create<Store>((set, get) => ({
//   count: 0,
//   actions: {
//     increase: () => {
//       set((store) => ({ count: store.count + 1 }));
//     },
//     decrease: () => {
//       set((store) => ({ count: store.count - 1 }));
//     },
//   },
// }));

/**
 * 유지보수를 위해 아래와 같이 커스텀 훅을 만들어서 외부에서 사용
 */
export const useCount = () => {
  /**
   * Zustand는 불러온 스토어의 값이 변경되면 컴포넌트를 리렌더링 시키기 때문에,
   * 불필요한 리렌더링을 방지하기 위해 원하는 값만 추출하여 사용할 수 있다.
   * 아래와 같은 형태를 selector(선택자) 함수라고 한다.
   */
  const count = useCountStore((store) => store.count);

  return count;
};

export const useIncreaseCount = () => {
  const increase = useCountStore((store) => store.actions.increase);

  return increase;
};

export const useDecreaseCount = () => {
  const decrease = useCountStore((store) => store.actions.decrease);

  return decrease;
};
