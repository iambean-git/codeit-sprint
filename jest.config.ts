import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  // 테스트 전에 실행할 설정 파일을 지정
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  // 커버리지 수집 대상 설정
  collectCoverageFrom: [
    "src/utils/**/*.ts",
    // !는 제외하는 것을 의미
    "!src/utils/test-helpers.ts",
    "!src/utils/test-setup.ts",
    "!src/utils/userHelpers.ts",
  ],

  // 커버리지 보고서 디렉토리
  coverageDirectory: "coverage",

  // 커버리지 임계값 설정
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 70,
      functions: 80,
      lines: 80,
    },
    // 특정 파일/디렉토리에 대한 임계값
    // "src/utils/user.ts": {
    //   statements: 90,
    //   branches: 85,
    // },
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
