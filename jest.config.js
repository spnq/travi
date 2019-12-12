module.exports = {
//   preset: 'ts-jest',
  moduleFileExtensions: ["ts", "d.ts", "js", "json"],
  transform: {'^.+\\.ts': 'ts-jest'},
  testEnvironment: 'node',
  testRegex: "src/tests/.*\\.spec.ts$",
}