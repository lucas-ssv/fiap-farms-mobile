import type { Config } from "jest";

const config: Config = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg|@gluestack-ui|@legendapp/motion|react-redux)',
  ],
  moduleNameMapper: {
    '^@tests/(.*)$': '<rootDir>/tests/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.svg': '<rootDir>/svg-mock.ts',
  },
  setupFiles: ['<rootDir>/jestSetupFile.ts'],
}

export default config;
