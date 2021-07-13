module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    babelOptions: {
      configFile: './babel.config.json',
    },
  },
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  rules: {
    'semi': 'off',
    'require-jsdoc': 'off',
    'object-curly-spacing': ['error', 'always'],
    'operator-linebreak': [
      'error',
      'after',
      { overrides: { '?': 'ignore', ':': 'ignore' } },
    ],
    'skipBlankLines': 'off',
  },
  extends: ['eslint:recommended', 'google'],
}
