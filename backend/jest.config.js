module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleFileExtensions: ["ts", "tsx", "js"],
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest",
    },
    testMatch: ["**/tests/**/*.test.(ts|js)"],
    setupFiles: ["<rootDir>/jest.setup.js"],
  };  