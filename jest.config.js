module.exports = {
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  testEnvironment: "node",
  testRegex: "./src/.*\\.(test|spec)?\\.(ts|ts)$",
  moduleFileExtensions: ["ts", "json", "node"],
  roots: ["<rootDir>/src"],
};
