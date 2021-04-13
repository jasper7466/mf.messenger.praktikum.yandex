module.exports = {
    env: {
        'browser': true,
        'es2021': true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        'ecmaVersion': 12,
        'sourceType': 'module'
    },
    plugins: [
        '@typescript-eslint'
    ],
    rules: {
        '@typescript-eslint/ban-ts-comment' : 1,
        '@typescript-eslint/ban-types': 1,
        '@typescript-eslint/no-empty-function': 1,
        '@typescript-eslint/no-this-alias': 1,
        'no-prototype-builtins': 1
    }
};
