/* eslint-disable */
export default {
  displayName: 'nx-plugin-nx-plugin-component-vue3-e2e',
  preset: '../../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory:
    '../../../coverage/packages/nx-plugin/nx-plugin-component-vue3-e2e',
};
