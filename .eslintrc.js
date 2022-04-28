module.exports = {
  env: {
    node: true,
    // browser: true,
    // commonjs: true,
    // es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'linebreak-style': 0,
    'prefer-destructuring': 0,
  },
};
