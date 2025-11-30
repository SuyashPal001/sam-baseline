module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
    'no-console': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
  },
  overrides: [
    {
      // Logger implementations and shared services can use console
      files: [
        'src/shared/utils/logger.ts',
        'src/shared/utils/systemLogger.ts',
        'src/shared/services/**/*.ts'
      ],
      rules: {
        'no-console': 'off',
      }
    }
  ],
  ignorePatterns: ['node_modules/', 'dist/', '.aws-sam/', 'layers/']
};
