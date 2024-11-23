#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

// Helper functions
const log = {
  info: msg => console.log(`${colors.cyan}${msg}${colors.reset}`),
  success: msg => console.log(`${colors.green}✓ ${msg}${colors.reset}`),
  warning: msg => console.log(`${colors.yellow}⚠ ${msg}${colors.reset}`),
  error: msg => console.log(`${colors.red}✗ ${msg}${colors.reset}`),
};

const runCommand = (command, errorMessage) => {
  try {
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    log.error(errorMessage || `Failed to execute ${command}`);
    return false;
  }
};

const createDirectory = dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    log.success(`Created directory: ${dir}`);
  }
};

// Main setup function
async function setup() {
  log.info('Starting project setup...\n');

  // 1. Create necessary directories
  log.info('Creating project directories...');
  const directories = [
    'src/app',
    'src/components/ui',
    'src/components/features',
    'src/components/layouts',
    'src/lib',
    'src/hooks',
    'src/types',
    'src/styles',
    'public',
    'tests/unit',
    'tests/integration',
    'tests/e2e',
  ];

  directories.forEach(createDirectory);
  log.success('Project directories created\n');

  // 2. Install dependencies
  log.info('Installing dependencies...');
  const installSuccess = runCommand('npm install', 'Failed to install dependencies');
  if (!installSuccess) process.exit(1);
  log.success('Dependencies installed\n');

  // 3. Create environment files
  log.info('Creating environment files...');
  const envExample = `
# Application
NEXT_PUBLIC_APP_NAME=Visual Text Transformer
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/visual_text_transformer

# Authentication
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=7d

# API Keys
AI_SERVICE_API_KEY=your-ai-service-key

# Redis
REDIS_URL=redis://localhost:6379

# File Storage
STORAGE_BUCKET=your-storage-bucket
STORAGE_REGION=your-storage-region
`;

  fs.writeFileSync('.env.example', envExample.trim());
  fs.writeFileSync('.env.local', envExample.trim());
  log.success('Environment files created\n');

  // 4. Initialize Git hooks
  log.info('Setting up Git hooks...');
  const huskySuccess = runCommand('npx husky install', 'Failed to initialize Husky');
  if (huskySuccess) {
    runCommand('npx husky add .husky/pre-commit "npm run lint && npm run test"');
    log.success('Git hooks configured\n');
  }

  // 5. Create initial test setup
  log.info('Setting up test environment...');
  const jestConfig = `
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
  ],
};
`;

  fs.writeFileSync('jest.config.js', jestConfig.trim());
  createDirectory('tests');
  fs.writeFileSync('tests/jest.setup.js', "import '@testing-library/jest-dom';");
  log.success('Test environment configured\n');

  // 6. Update package.json scripts
  log.info('Updating package.json scripts...');
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  packageJson.scripts = {
    ...packageJson.scripts,
    'test:unit': 'jest',
    'test:integration': 'jest --config jest.integration.config.js',
    'test:e2e': 'cypress run',
    'test:all': 'npm run test:unit && npm run test:integration && npm run test:e2e',
    lint: 'next lint',
    'lint:fix': 'next lint --fix',
    format: 'prettier --write .',
    prepare: 'husky install',
  };
  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
  log.success('Package.json updated\n');

  // Final success message
  log.info(`
${colors.bright}Setup completed successfully!${colors.reset}

Next steps:
1. Update .env.local with your configuration
2. Start the development server: ${colors.cyan}npm run dev${colors.reset}
3. Begin development!

Documentation:
- README.md for project overview
- CONTRIBUTING.md for development guidelines
- /docs for detailed documentation

Happy coding! 🚀
`);
}

// Run setup
setup().catch(error => {
  log.error('Setup failed:');
  console.error(error);
  process.exit(1);
});
