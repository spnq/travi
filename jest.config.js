module.exports = {
  roots: [
    "<rootDir>/src"
  ],
  testMatch: [
    "<rootDIr>/tests/*.spec.+(ts|tsx|js)",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
}