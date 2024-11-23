const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
};

function log(message, type = 'info') {
  const color = {
    info: colors.blue,
    success: colors.green,
    warning: colors.yellow,
    error: colors.red,
  }[type];

  console.log(`${color}${colors.bright}${message}${colors.reset}`);
}

function executeCommand(command, errorMessage, continueOnError = false) {
  try {
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    log(`Warning: ${errorMessage}`, 'warning');
    log(`Command: ${command}`, 'warning');
    if (!continueOnError) {
      log('Continuing setup process...', 'info');
    }
    return false;
  }
}

function setupDevelopmentEnvironment() {
  log('🚀 Setting up development environment...', 'info');

  // Check if npm is installed
  try {
    execSync('npm --version', { stdio: 'pipe' });
  } catch (error) {
    log('npm is not installed. Please install Node.js and npm first.', 'error');
    process.exit(1);
  }

  // Remove existing node_modules and package-lock.json
  log('🧹 Cleaning up existing dependencies...', 'info');
  try {
    if (fs.existsSync('node_modules')) {
      fs.rmSync('node_modules', { recursive: true, force: true });
    }
    if (fs.existsSync('package-lock.json')) {
      fs.unlinkSync('package-lock.json');
    }
  } catch (error) {
    log('Warning: Could not remove existing dependencies', 'warning');
  }

  // Install dependencies with legacy peer deps
  log('📦 Installing dependencies...', 'info');
  if (!executeCommand('npm install', 'Failed to install dependencies')) {
    process.exit(1);
  }

  // Install VSCode extensions
  log('🔧 Installing recommended VSCode extensions...', 'info');
  const extensions = [
    // Essential Extensions
    'ritwickdey.liveserver', // Live Server
    'esbenp.prettier-vscode', // Prettier
    'dbaeumer.vscode-eslint', // ESLint
    'formulahendry.auto-rename-tag', // Auto Rename Tag
    'formulahendry.auto-close-tag', // Auto Close Tag
    'naumovs.color-highlight', // Color Highlight
    'christian-kohler.path-intellisense', // Path Intellisense
    'pkief.material-icon-theme', // Material Icon Theme
    'ms-vsliveshare.vsliveshare', // Live Share

    // JavaScript/TypeScript
    'dsznajder.es7-react-js-snippets', // ES7+ React/Redux/React-Native snippets
    'xabikos.javascriptsnippets', // JavaScript (ES6) code snippets
    'sburg.vscode-javascript-booster', // JavaScript Booster

    // CSS/Tailwind
    'bradlc.vscode-tailwindcss', // Tailwind CSS IntelliSense
    'pranaygp.vscode-css-peek', // CSS Peek
    'zignd.html-css-class-completion', // IntelliSense for CSS class names

    // Git
    'eamodio.gitlens', // GitLens
    'mhutchie.git-graph', // Git Graph

    // Productivity
    'usernamehw.errorlens', // Error Lens
    'streetsidesoftware.code-spell-checker', // Code Spell Checker
    'wayou.vscode-todo-highlight', // TODO Highlight
    'gruntfuggly.todo-tree', // Todo Tree
    'yzhang.markdown-all-in-one', // Markdown All in One
    'shd101wyy.markdown-preview-enhanced', // Markdown Preview Enhanced

    // Theme
    'zhuangtongfa.material-theme', // One Dark Pro
    'pkief.material-icon-theme', // Material Icon Theme
  ];

  extensions.forEach(extension => {
    executeCommand(
      `code --install-extension ${extension}`,
      `Failed to install extension: ${extension}`,
      true
    );
  });

  // Create necessary directories
  log('📁 Creating necessary directories...', 'info');
  const directories = [
    '.vscode',
    'src/components/ui',
    'src/lib/hooks',
    'src/types',
    'public/assets',
  ];

  directories.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  // Run type checking
  log('🔍 Running type check...', 'info');
  executeCommand('npm run type-check', 'Type check found issues', true);

  // Run linting
  log('🧹 Running linter...', 'info');
  executeCommand('npm run lint', 'Linting found issues', true);

  // Format code
  log('✨ Formatting code...', 'info');
  executeCommand('npm run format', 'Code formatting found issues', true);

  log('\n✅ Development environment setup completed with recommended extensions', 'success');
  log('\nNext steps:', 'info');
  log('1. Review any type checking or linting warnings', 'info');
  log('2. Restart VSCode to activate the new extensions', 'info');
  log('3. Run `npm run dev` to start the development server', 'info');
  log('4. Open http://localhost:3000 in your browser', 'info');

  log('\n📚 Installed Extensions Include:', 'info');
  log('• Live Server - For static file serving', 'info');
  log('• Prettier & ESLint - Code formatting and linting', 'info');
  log('• Auto Rename/Close Tag - HTML/JSX tag management', 'info');
  log('• Path Intellisense - File path autocompletion', 'info');
  log('• GitLens & Git Graph - Enhanced Git integration', 'info');
  log('• Error Lens - Inline error display', 'info');
  log('• Todo Tree - Task management', 'info');
  log('• Material Theme & Icons - Enhanced visual experience', 'info');
}

setupDevelopmentEnvironment();
