// TODO [2024-11-24]: ESLint Configuration with Backup Tracking
// Purpose:
// 1. Track file changes and backups
// 2. Link TODOs to specific versions
// 3. Maintain history of modifications

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@next/next/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // Require timestamps in TODOs but don't block on warnings
    'no-warning-comments': ['warn', {
      terms: ['TODO', 'FIXME', 'HACK', 'BUG'],
      location: 'start'
    }],

    // Only error on critical issues
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@next/next/no-html-link-for-pages': 'warn',
  },

  // File header template
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      rules: {
        'spaced-comment': ['warn', 'always', {
          markers: ['/'],
          exceptions: ['-', '+', '*']
        }]
      }
    }
  ]
}
