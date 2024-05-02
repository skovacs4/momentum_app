module.exports = {
	env: {
	  node: true,
	  es2021: true,
	},
	extends: [
	  'eslint:recommended',
	],
	parserOptions: {
	  ecmaVersion: 12,
	},
	rules: {
	  // Disable 'no-unused-vars' rule for specific variables
	  'no-unused-vars': ['error', { varsIgnorePattern: 'onRequest|logger' }],
	},
  };
  