module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
  ],
  env: {
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
    mocha: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint', 'filenames', 'prettier'],
  rules: {
    // typescript
    '@typescript-eslint/explicit-member-accessibility': ['off'],
    '@typescript-eslint/explicit-function-return-type': [
      'off',
      {
        allowExpressions: true,
      },
    ],
    '@typescript-eslint/prefer-interface': 'off',
    '@typescript-eslint/no-require-imports': 'error',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        variables: false,
        functions: false,
        typedefs: false,
      },
    ],
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-require-imports': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    // Disable default eslint indent, as it may break typescript indent
    // Typescript indent is handled by prettier
    indent: 'off',

    // filenames
    'filenames/match-regex': ['error', '^_?[a-z][a-z-.]*[a-z]$'],

    // Code
    semi: ['error', 'always'],
    // Handled by prettier
    'max-len': 'off',

    // Use prettier
    'prettier/prettier': 'error',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-dupe-class-members': 'off',
      },
    },
  ],
};
