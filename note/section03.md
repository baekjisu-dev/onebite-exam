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
