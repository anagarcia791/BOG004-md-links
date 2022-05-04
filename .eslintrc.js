module.exports = {
  env: {
    node: true,
    commonjs: true,
    // browser: true,
    // es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 8,
  },
  rules: {
    'linebreak-style': 0,
    'prefer-destructuring': 0,
  },
};
