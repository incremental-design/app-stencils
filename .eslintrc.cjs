// eslint-disable-next-line no-undef
module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    env: {
        node: true
    },
    rules: {
        "@typescript-eslint/naming-convention": "warn"
    }
}