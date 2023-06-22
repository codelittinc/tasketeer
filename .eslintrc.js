module.exports = {
  root: true,
  extends: ['airbnb', 'airbnb/hooks'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'no-unused-vars': ['error', {
      args: 'after-used',
      argsIgnorePattern: '_',
    }],
    'no-param-reassign': 0,
    'import/no-named-as-default-member': 0,
    'import/no-named-as-default': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/function-component-definition': [
      1,
      { namedComponents: 'arrow-function' },
    ],
    'no-console': 0,
    'no-alert': 0,
  },
};
