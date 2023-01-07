const path = require('path');

const { compilerOptions } = require('./tsconfig');
const { pathsToModuleNameMapper } = require('ts-jest');

/** @type {import('jest').Config} */
module.exports = {
  clearMocks: true,
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: path.resolve(__dirname, 'coverage'),
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: __dirname }),
  modulePaths: [compilerOptions.baseUrl],
  roots: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'test')],
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest'
  }
};
