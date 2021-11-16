module.exports = {
  plugins: [
    'eslint-plugin-import',
    'eslint-plugin-jsx-a11y',
    'eslint-plugin-prettier',
    'eslint-plugin-react',
    'eslint-plugin-react-hooks',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    'no-param-reassign': 'warn',
    'react/no-array-index-key': 'warn',
    'no-plusplus': 'warn',
  },
  extends: ['airbnb-typescript', 'airbnb/hooks', 'plugin:prettier/recommended'],
};
