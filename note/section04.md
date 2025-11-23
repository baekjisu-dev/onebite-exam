# Section 03 Note

## library

### json-server

- 간단한 API 서버를 만들어주는 도구
- json 파일 하나로 CRUD가 모두 가능한 심플한 백엔드 서버 구축 가능
- 프로젝트 루트 경로에 `db.json` 파일 생성 후 저장할 형태의 데이터를 생성
- `vite.config.js` 파일에 아래와 같은 코드 추가
  ```typescript
  // 아래 코드를 추가함으로써, server 폴더 내 파일에 변경사항이 생기더라도 어플리케이션이 재시작되는 등의 불필요한 동작이 수행되지 않음
  export default defineConfig({
    // ...
    server: {
      watch: {
        ignored: ["**/sever/**"],
      },
    },
    // ...
  });
  ```
- 이후 터미널에서 `npx json-server server/db.json` 명령어를 입력하여 서버 실행

## tanstack-query

### 리페칭

- staleTime이 지나 stale한 상태가 된 데이터를 다시 불러오는 과정
- Mount: 캐시 데이터를 사용하는 컴포넌트가 마운트 되었을 때
- WindowFocus: 사용자가 이 탭에 다시 돌아왔을 때
- Reconnect: 인터넷 연결이 끊어졌다가 다시 연결되었을 때
- Interval: 특정 시간을 주기로
- 위의 설정을 사용자가 임의로 설정할 수 있음

### 개발에 도움을 주는 도구

- react-query-devtools: 캐시를 시각적으로 볼 수 있도록 도움을 줌
  - `npm i @tanstack/react-query-devtools` 명령어로 설치
