# Contributing to Visual Text Transformer

Thank you for your interest in contributing to Visual Text Transformer! This document provides guidelines and standards for contributing to the project.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Process](#development-process)
4. [Coding Standards](#coding-standards)
5. [Testing Guidelines](#testing-guidelines)
6. [Documentation](#documentation)
7. [Pull Request Process](#pull-request-process)
8. [Review Process](#review-process)

## Code of Conduct

This project adheres to a Code of Conduct that all contributors are expected to follow. Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before contributing.

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone [your-fork-url]
   cd visual-text-transformer
   ```
3. Add upstream remote:
   ```bash
   git remote add upstream [main-repository-url]
   ```
4. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Process

### Branch Naming Convention

- Feature branches: `feature/description`
- Bug fixes: `bugfix/description`
- Documentation: `docs/description`
- Performance improvements: `perf/description`

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): description

[optional body]

[optional footer]
```

Types:

- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- style: Code style changes
- refactor: Code refactoring
- perf: Performance improvements
- test: Adding or updating tests
- chore: Maintenance tasks

### Development Workflow

1. Sync with upstream:
   ```bash
   git fetch upstream
   git rebase upstream/develop
   ```
2. Make your changes
3. Write/update tests
4. Update documentation
5. Run tests locally
6. Commit changes
7. Push to your fork
8. Create pull request

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Enable strict mode
- Define interfaces for data structures
- Use type inference where possible
- Document complex types

### React/Next.js

- Use functional components
- Implement proper error boundaries
- Follow React hooks best practices
- Use Server Components where appropriate
- Implement proper loading states

### CSS/Styling

- Use Tailwind CSS utility classes
- Follow mobile-first approach
- Maintain consistent spacing
- Use CSS variables for theming
- Follow BEM naming for custom CSS

### Code Organization

```
src/
├── app/                 # Next.js app directory
├── components/         # React components
│   ├── ui/            # Basic UI components
│   ├── features/      # Feature-specific components
│   └── layouts/       # Layout components
├── lib/               # Utility functions
├── hooks/             # Custom React hooks
├── types/             # TypeScript types
└── styles/            # Global styles
```

## Testing Guidelines

### Unit Tests

- Test individual components and functions
- Use Jest and React Testing Library
- Follow AAA pattern (Arrange, Act, Assert)
- Mock external dependencies
- Maintain high test coverage

### Integration Tests

- Test component interactions
- Test API integrations
- Test data flow
- Verify error handling

### E2E Tests

- Use Cypress for E2E testing
- Test critical user paths
- Test responsive behavior
- Test cross-browser compatibility

## Documentation

### Code Documentation

- Use JSDoc for function documentation
- Document complex algorithms
- Explain non-obvious code
- Keep comments up to date

### Component Documentation

- Document props using TypeScript
- Provide usage examples
- Document side effects
- Include accessibility considerations

### API Documentation

- Document all endpoints
- Provide request/response examples
- Document error responses
- Include authentication requirements

## Pull Request Process

1. Update documentation
2. Add/update tests
3. Ensure all tests pass
4. Update CHANGELOG.md
5. Fill out PR template
6. Request review
7. Address feedback
8. Squash commits if requested

### PR Template

```markdown
## Description

[Description of changes]

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] E2E tests added/updated

## Documentation

- [ ] Documentation updated
- [ ] CHANGELOG.md updated

## Screenshots (if applicable)

[Add screenshots]

## Additional Notes

[Any additional information]
```

## Review Process

### Reviewer Guidelines

- Check code quality
- Verify test coverage
- Review documentation
- Test functionality
- Consider performance
- Evaluate accessibility
- Check security implications

### Author Responsibilities

- Respond to feedback promptly
- Make requested changes
- Keep PR up to date
- Resolve conflicts
- Update tests as needed

## Questions?

If you have questions about contributing:

1. Check existing documentation
2. Search closed issues/PRs
3. Open a new issue
4. Ask in discussions

Thank you for contributing to Visual Text Transformer!
