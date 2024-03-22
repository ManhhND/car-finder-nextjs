import type { Config } from "@jest/types";
import nextJest from "next/jest";

export const customJestConfig: Config.InitialOptions = {
  testEnvironment: "jest-environment-jsdom",
  verbose: true,
  coverageProvider: "v8",
  preset: "ts-jest",
  reporters: [
    "default",
    [
      "jest-html-reporters",
      {
        publicPath: "./html-report",
        filename: "report.html",
        expand: true,
      },
    ],
  ],
  coverageThreshold: {
    global: {
      lines: 80,
      statements: 80,
      branches: 80,
      functions: 80,
    },
  },
};

export const createJestConfig = nextJest({
  dir: "./",
});

const jestConfig = async () => {
  const nextJestConfig = await createJestConfig(customJestConfig)();
  return {
    ...nextJestConfig,
    moduleNameMapper: {
      "@/(.*)": "<rootDir>/$1",
      // Workaround to put our SVG mock first
      "\\.svg$": "<rootDir>/__tests__/__mocks__/svg.ts",
      ...nextJestConfig.moduleNameMapper,
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    testPathIgnorePatterns: [
      "<rootDir>/__tests__/__mocks__/",
      "<rootDir>/__tests__/utils/",
    ],
  };
};

module.exports = jestConfig;
