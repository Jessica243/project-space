// eslint-disable-next-line no-undef
module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 'latest',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    semi: 'error',
    indent: [ 'error', 2 ],
    quotes: [ 2, 'single', 'avoid-escape' ],
    'comma-spacing': [ 'error', { 'before': false, 'after': true } ],
    'object-curly-spacing': [ 'error', 'always' ],
    'array-bracket-spacing': [ 'error', 'always' ],
    'computed-property-spacing': [ 'error', 'always' ],
    'comma-dangle': [ 'error', {
      'arrays': 'always-multiline',
      'objects': 'always-multiline',
      'imports': 'always-multiline',
      'exports': 'always-multiline',
      'functions': 'always-multiline',
    } ],
    'max-len': [ 'error', {
      'code': 100,
      'ignoreStrings': true,
      'ignoreRegExpLiterals': true,
      'ignoreTemplateLiterals': true,
      'ignoreTrailingComments': true,
    } ],
    'no-trailing-spaces': 'error',
    'no-multiple-empty-lines': [ 'error', { 'max': 1, 'maxEOF': 0 } ],
  },
};
