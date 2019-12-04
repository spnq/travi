module.exports = {
    "moduleDirectories": [
      "node_modules",
      "src"
    ],
    "moduleFileExtensions": [
      "js",
      "json",
      "ts",
      "node"
    ],
    "testRegex": ".spec.ts$",
    "transform": {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
};