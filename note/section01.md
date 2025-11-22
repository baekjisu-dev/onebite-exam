# Section 01 Note

## tsconfig

### tsconfig.app.json

- 리액트 앱에서, 그 앱을 구동하는 타입스크립트 옵션 파일
- 브라우저 환경에서만 실행되는 코드들의 옵션을 설정 (컴포넌트 내 함수 등)

### tsconfig.node.json

- node.js 환경에서 실행되는 코드를 위한 타입스크립트 옵션 파일
- e.g. 테스트 코드

### tsconfig.json

- 위의 두 가지 파일이 해당 파일에서 references 항목으로 참조되어 전체 프로젝트에 적용

### 타입 에러

- 프로젝트의 typescript 버전과 IDE의 typescript 버전이 상이하여 발생
- ctrl + shift + P를 입력하며 IDE의 typescript 버전을 변경하면 해결됨
