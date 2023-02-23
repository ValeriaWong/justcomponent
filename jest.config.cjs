const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname),
  clearMocks: true,
  collectCoverage:true,
  // coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  // 别名设置
  moduleNameMapper: {
      '\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
      '^~/(.*)$': '<rootDir>/$1',
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  // 测试文件
  // testMatch: ['<rootDir>/src/__tests__/unit/**/*.spec.(ts|tsx|js)'],
  testMatch: ['<rootDir>/src/__tests__/unit/**/*.spec.(ts|tsx|js)','<rootDir>/src/__tests__/performance/*.perf.spec.(ts|tsx|js)'],
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: ['/node_modules/'],
  // eslint-disable-next-line no-dupe-keys
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],

  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.(ts|tsx|js|jsx)$': [
      'babel-jest',
      {
        presets: [
          ['@babel/preset-env', { targets: { node: 'current' } }],
          ['@babel/preset-typescript'],
        ],
        plugins: ['@vue/babel-plugin-jsx'],
      },
    ],
  },
};
