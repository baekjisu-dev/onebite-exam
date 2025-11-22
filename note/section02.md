# Section 02 Note

## 유익한 extensions

### prettier tailwind plugin

- `npm i -D prettier prettier-plugin-tailwindcss`로 설치
- `.prettierrc` 파일을 루트 폴더에 생성
- 아래와 같이 코드 작성
  ```json
  {
    "plugins": ["prettier-plugin-tailwindcss"]
  }
  ```
- tailwind의 클래스 이름을 연관성에 따라서 자동 정렬

## 경로 별칭 옵션

- `tsconfig.json` 파일에 아래와 같이 작성
  ```json
   "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
  ```
- `tsconfig.app.json` 파일에 아래와 같이 작성
  ```json
  {
    "compilerOptions": {
      // ...
      "baseUrl": ".",
      "paths": {
        "@/*": ["./src/*"]
      }
      // ...
    }
  }
  ```
- `vite.config.ts` 파일에 아래와 같이 작성

  ```typescript
  import path from "path";
  import tailwindcss from "@tailwindcss/vite";
  import react from "@vitejs/plugin-react";
  import { defineConfig } from "vite";

  // https://vite.dev/config/
  export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  });
  ```
