# Codebase Context Specification

Specification Version: 1.0-RFC
Date: 2024-08-31

## 1. Overview

The AI Context Convention is a standardized method for embedding rich contextual information within codebases to enhance AI-assisted development. This specification outlines a flexible, language-agnostic approach to providing both structured and unstructured context at various levels of a project, catering to the needs of different team roles.

## 2. Key Principles

1. **Flexibility**: Support multiple file formats and context types.
2. **Proximity**: Keep context close to the code it describes.
3. **Hierarchy**: Allow for project-wide, directory-level, and file-specific context.
4. **Clarity**: Promote clear, maintainable context files.
5. **AI-Centric**: Optimize for AI model consumption and interpretation.

## 3. File Structure

### 3.1 File Names

Context files must use one of the following extensions:

- `.context.md`: Markdown format (default, supports both structured and unstructured content)
- `.context.yaml` or `.context.yml`: YAML format
- `.context.json`: JSON format

The `.md` extension is the default and recommended format as it supports both structured (via YAML front matter) and unstructured content.

### 3.2 File Locations

Context files can be placed at two levels within a project:

- Project root: For project-wide context
- Directories: For context specific to that directory and its contents

Example structure:

```
project_root/
├── .context.md
├── .contexignore
├── .contextdocs.md
├── src/
│   ├── .context.yaml
│   ├── module1/
│   │   └── .context.md
│   └── module2/
│       └── .context.json
└── tests/
    └── .context.md
```

## 4. File Formats

### 4.1 Markdown Format (Default)

Markdown files (.context.md) are the default and recommended format. They can include an optional YAML front matter for structured data, followed by free-form Markdown content. The structured data should now include role-specific sections.

Example:

```markdown
---
project-name: MyAwesomeProject
version: 1.0.0
description: A revolutionary web application
main-technologies:
  - Node.js
  - React
  - MongoDB
conventions:
  - Use consistent naming conventions within each file type
  - Each function should have a single responsibility
ai-prompts:
  - Focus on performance optimizations
  - Suggest ways to improve error handling
architecture:
  style: Microservices
  main-components:
    - Auth Service
    - User Service
    - Data Processing Service
  data-flow:
    - Client -> API Gateway -> Services -> Database
development:
  setup-steps:
    - Install Node.js v14+
    - Run `npm install` in each service directory
    - Set up MongoDB instance
  build-command: npm run build
  test-command: npm test
business-requirements:
  key-features:
    - User authentication
    - Real-time data processing
    - Mobile-responsive UI
  target-audience: Small to medium-sized businesses
  success-metrics:
    - User adoption rate
    - System response time
    - Data processing accuracy
quality-assurance:
  testing-frameworks:
    - Jest
    - Cypress
  coverage-threshold: 80%
  performance-benchmarks:
    - API response time < 200ms
    - Database query time < 100ms
deployment:
  platform: AWS
  cicd-pipeline: GitHub Actions
  staging-environment: dev.myawesomeproject.com
  production-environment: myawesomeproject.com
---

# MyAwesomeProject

This document provides comprehensive context for the MyAwesomeProject, a revolutionary web application designed to streamline business processes.

## Architecture Overview

MyAwesomeProject follows a microservices architecture, consisting of the following main components:

1. Auth Service: Handles user authentication and authorization.
2. User Service: Manages user profiles and preferences.
3. Data Processing Service: Processes and analyzes business data in real-time.

The system uses an API Gateway to route requests to appropriate services, ensuring scalability and maintainability.

## Development Guidelines

- Follow the conventions listed in the front matter.
- Use feature branches and pull requests for all changes.
- Write unit tests for all new features and bug fixes.
- Document all public APIs using JSDoc comments.

## Business Context

The primary goal of MyAwesomeProject is to provide small to medium-sized businesses with a powerful tool for real-time data analysis and visualization. Key features include:

- Secure user authentication
- Real-time data processing with customizable dashboards
- Mobile-responsive design for on-the-go access

Success will be measured by user adoption rates, system performance metrics, and data processing accuracy.

## Quality Assurance

Our QA process ensures high-quality, reliable software through:

- Comprehensive unit and integration testing using Jest
- End-to-end testing with Cypress
- Continuous integration and deployment via GitHub Actions
- Regular performance testing and optimization

## Deployment and Operations

MyAwesomeProject is deployed on AWS using a robust CI/CD pipeline:

1. Developers push code to GitHub
2. GitHub Actions run tests and build the application
3. Successful builds are deployed to the staging environment
4. After approval, changes are promoted to production

Monitoring and logging are handled through AWS CloudWatch and ELK stack.
```

### 4.2 YAML Format

YAML format (.context.yaml or .context.yml) should now include the expanded role-specific sections and use kebab-case for key names.

Example:

```yaml
project-name: MyAwesomeProject
version: 1.0.0
description: A revolutionary web application
main-technologies:
  - Node.js
  - React
  - MongoDB
conventions:
  - Use consistent naming conventions within each file type
  - Each function should have a single responsibility
ai-prompts:
  - Focus on performance optimizations
  - Suggest ways to improve error handling
architecture:
  style: Microservices
  main-components:
    - Auth Service
    - User Service
    - Data Processing Service
  data-flow:
    - Client -> API Gateway -> Services -> Database
development:
  setup-steps:
    - Install Node.js v14+
    - Run `npm install` in each service directory
    - Set up MongoDB instance
  build-command: npm run build
  test-command: npm test
business-requirements:
  key-features:
    - User authentication
    - Real-time data processing
    - Mobile-responsive UI
  target-audience: Small to medium-sized businesses
  success-metrics:
    - User adoption rate
    - System response time
    - Data processing accuracy
quality-assurance:
  testing-frameworks:
    - Jest
    - Cypress
  coverage-threshold: 80%
  performance-benchmarks:
    - API response time < 200ms
    - Database query time < 100ms
deployment:
  platform: AWS
  cicd-pipeline: GitHub Actions
  staging-environment: dev.myawesomeproject.com
  production-environment: myawesomeproject.com
```

### 4.3 JSON Format

JSON format (.context.json) should also include the expanded role-specific sections. Note that JSON doesn't support kebab-case for key names, so we'll use camelCase as it's a common convention in JSON.

Example:

```json
{
  "projectName": "MyAwesomeProject",
  "version": "1.0.0",
  "description": "A revolutionary web application",
  "mainTechnologies": ["Node.js", "React", "MongoDB"],
  "conventions": [
    "Use consistent naming conventions within each file type",
    "Each function should have a single responsibility"
  ],
  "aiPrompts": ["Focus on performance optimizations", "Suggest ways to improve error handling"],
  "architecture": {
    "style": "Microservices",
    "mainComponents": ["Auth Service", "User Service", "Data Processing Service"],
    "dataFlow": ["Client -> API Gateway -> Services -> Database"]
  },
  "development": {
    "setupSteps": [
      "Install Node.js v14+",
      "Run `npm install` in each service directory",
      "Set up MongoDB instance"
    ],
    "buildCommand": "npm run build",
    "testCommand": "npm test"
  },
  "businessRequirements": {
    "keyFeatures": ["User authentication", "Real-time data processing", "Mobile-responsive UI"],
    "targetAudience": "Small to medium-sized businesses",
    "successMetrics": ["User adoption rate", "System response time", "Data processing accuracy"]
  },
  "qualityAssurance": {
    "testingFrameworks": ["Jest", "Cypress"],
    "coverageThreshold": "80%",
    "performanceBenchmarks": ["API response time < 200ms", "Database query time < 100ms"]
  },
  "deployment": {
    "platform": "AWS",
    "cicdPipeline": "GitHub Actions",
    "stagingEnvironment": "dev.myawesomeproject.com",
    "productionEnvironment": "myawesomeproject.com"
  }
}
```

## 5. Context Accumulation

1. Context accumulates as you traverse deeper into the directory structure.
2. More specific contexts provide additional detail to broader contexts.
3. AI models should consider all relevant context files, prioritizing more specific contexts when appropriate.
4. There is no strict overriding; AI judges context relevance based on the query or task.

## 6. The .contexignore File

The `.contexignore` file, placed in the project root, excludes files or directories from context consideration.

### Syntax

- Uses glob patterns similar to `.gitignore`
- Lines starting with `#` are comments

Example:

```
# Ignore all .log files
*.log

# Ignore the entire build directory
build/

# Ignore all .test.js files
**/*.test.js

# Ignore a specific file
src/deprecated-module.js

# Ignore all files in any directory named 'temp'
**/temp/*
```

## 7. Security Considerations

1. Avoid including sensitive information (API keys, passwords) in context files.
2. Be cautious with proprietary algorithms or trade secrets.
3. Use `.gitignore` to exclude sensitive context files from version control if necessary.

## 8. The .contextdocs File

The `.contextdocs` file allows developers to specify external documentation sources that should be incorporated into the project's context. This feature is particularly useful for including documentation from dependencies, libraries, or related projects.

### 8.1 Location and Naming

- The `.contextdocs` file should be placed in the root directory of the project.
- It must use one of the following extensions:
  - `.contextdocs.md` (default, recommended)
  - `.contextdocs.yaml` or `.contextdocs.yml`
  - `.contextdocs.json`

### 8.2 File Structure

The `.contextdocs` file should contain an array of documentation sources. Each source can be:

- A file path relative to the project root
- A URL to a markdown file
- A package name with associated documentation files

### 8.3 Examples

#### Markdown Format (.contextdocs.md) - Default

```markdown
---
documentation:
  - type: local
    path: docs/project_overview.md
  - type: url
    url: https://raw.githubusercontent.com/example/repo/main/API.md
  - type: package
    name: express
    version: 4.17.1
    docs:
      - README.md
      - docs/api.md
      - docs/guide/routing.md
---

# Additional Documentation Notes

This section can include any free-form text to provide context about the listed documentation sources, their relevance to the project, or any other pertinent information.
```

#### YAML Format (.contextdocs.yaml)

```yaml
documentation:
  - type: local
    path: docs/project_overview.md
  - type: url
    url: https://raw.githubusercontent.com/example/repo/main/API.md
  - type: package
    name: express
    version: 4.17.1
    docs:
      - README.md
      - docs/api.md
      - docs/guide/routing.md
```

#### JSON Format (.contextdocs.json)

```json
{
  "documentation": [
    {
      "type": "local",
      "path": "docs/project_overview.md"
    },
    {
      "type": "url",
      "url": "https://raw.githubusercontent.com/example/repo/main/API.md"
    },
    {
      "type": "package",
      "name": "express",
      "version": "4.17.1",
      "docs": ["README.md", "docs/api.md", "docs/guide/routing.md"]
    }
  ]
}
```

### 8.4 Behavior

- When an AI model or related tool is processing the project context, it should fetch and incorporate the specified documentation.
- For local files, the content should be read from the specified path.
- For URLs, the content should be fetched from the provided URL.
- For packages, the documentation should be fetched from the package's repository or documentation site, based on the package name and version.

### 8.5 Use Cases

- Including documentation for key dependencies
- Referencing company-wide coding standards or guidelines
- Incorporating design documents or architectural overviews
- Linking to relevant external resources or tutorials

### 8.6 Considerations

- Ensure that URLs point to stable, version-controlled documentation to maintain consistency.
- Be mindful of the total volume of documentation to avoid overwhelming the AI model with irrelevant information.
- Regularly review and update the `.contextdocs` file to ensure all referenced documentation remains relevant and up-to-date.
- Consider implementing caching mechanisms for external documentation to improve performance and reduce network requests.

## 9. Conclusion

The AI Context Convention provides a flexible, standardized approach to enriching codebases with contextual information for AI models. By adopting this convention and including role-specific information, development teams can enhance AI-assisted workflows, improving code quality and development efficiency across projects of any scale or complexity. The addition of role-specific guidelines and consistent naming conventions ensures that AI models have access to comprehensive, relevant, and well-structured information tailored to different aspects of the software development lifecycle.

## 10. TypeScript Linter Implementation

For details on the TypeScript implementation of the linter for validating AI Context Convention files, please refer to the [TypeScript Linter README](linters/typescript/README.md).

---

contextdocs:

- name: TypeScript
  relationship: Main language for linter implementation
  resources:

  - Official Documentation: https://www.typescriptlang.org/docs/
  - TypeScript Handbook: https://www.typescriptlang.org/docs/handbook/intro.html
  - TypeScript Deep Dive: https://basarat.gitbook.io/typescript/

- name: Node.js
  relationship: Runtime environment for TypeScript linter
  resources:

  - Official Documentation: https://nodejs.org/en/docs/
  - Getting Started Guide: https://nodejs.org/en/docs/guides/getting-started-guide/
  - Node.js Best Practices: https://github.com/goldbergyoni/nodebestpractices

- name: Jest
  relationship: Testing framework for TypeScript linter
  resources:

  - Official Documentation: https://jestjs.io/docs/getting-started
  - Testing TypeScript with Jest: https://basarat.gitbook.io/typescript/intro-1/jest
  - Jest with TypeScript in Node.js: https://stackoverflow.com/questions/54822273/how-to-use-jest-with-typescript-in-node-js

- name: ESLint
  relationship: Linting tool used as a reference for our custom linter
  resources:

  - Official Documentation: https://eslint.org/docs/user-guide/getting-started
  - ESLint with TypeScript: https://khalilstemmler.com/blogs/typescript/eslint-for-typescript/
  - Configuring ESLint for TypeScript: https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project

- name: YAML
  relationship: Used in .context.yaml/.context.yml files
  resources:

  - Official Specification: https://yaml.org/spec/1.2.2/
  - Learn YAML in Y minutes: https://learnxinyminutes.com/docs/yaml/
  - Common YAML Gotchas: https://stackoverflow.com/questions/3790454/how-do-i-break-a-string-over-multiple-lines

- name: JSON
  relationship: Used in .context.json files
  resources:

  - Official Specification: https://www.json.org/json-en.html
  - JSON Schema: https://json-schema.org/learn/getting-started-step-by-step
  - Working with JSON in TypeScript: https://blog.logrocket.com/working-with-json-typescript/

- name: Markdown
  relationship: Used for documentation and .context.md files
  resources:

  - Official Guide: https://www.markdownguide.org/
  - GitHub Flavored Markdown Spec: https://github.github.com/gfm/
  - Mastering Markdown: https://guides.github.com/features/mastering-markdown/

- name: Python
  relationship: Used for Python version of the linter
  resources:
  - Official Documentation: https://docs.python.org/3/
  - Real Python Tutorials: https://realpython.com/
  - Python Linting Best Practices: https://stackoverflow.com/questions/1428872/pylint-pep8-and-pyflakes

---

This file contains a list of external dependencies and libraries used in the Codebase Context Specification project. The YAML front-matter above provides structured data about each dependency, including its relationship to the project and links to relevant resources. These resources include official documentation, articles, blogs, and Stack Overflow posts. This structure allows for easy parsing by automated tools while maintaining readability for developers.

--

# Generating .context Files

You are an AI assistant specialized in creating .context.md files for software projects. Your task is to generate comprehensive .context.md and .contextdocs.md files for a blank repository based on the Codebase Context Specification. These files will provide crucial context for both human developers and AI assistants working on the project.

## Guidelines

1. Use the Markdown format (.context.md) with YAML front matter for structured data.
2. Include all necessary sections as specified in the Codebase Context Specification.
3. Provide detailed and relevant information for each section.
4. Use clear and concise language throughout the document.
5. Ensure that the generated content is adaptable to various project types and technologies.
6. Create both .context.md and .contextdocs.md files.

## Required Sections for .context.md

Include the following sections in the YAML front matter:

1. module-name
2. version
3. description
4. related-modules (if any)
5. technologies
6. conventions
7. directives
8. diagrams
9. architecture
10. development
11. business-requirements
12. quality-assurance
13. deployment

## Required Sections for .contextdocs.md

Include the following sections in the YAML front matter:

1. contextdocs (an array of external documentation sources)

## Markdown Content

After the YAML front matter, include detailed Markdown content that expands on the structured data and provides additional context. This should include:

1. A general overview of the project
2. Detailed explanations of the architecture and design decisions
3. Development guidelines and best practices
4. Business context and objectives
5. Quality assurance processes and standards
6. Deployment and operational procedures

## Example Structure for .context.md

Use the following structure as a guide:

```markdown
---
module-name: [Project Name]
version: [Version Number]
description: [Brief project description]
related-modules:
  - name: [Related Module 1 Name]
    path: [Local path or URL to the related module]
  - name: [Related Module 2 Name]
    path: [Local path or URL to the related module]
technologies:
  - [Technology 1]
  - [Technology 2]
  - [Technology 3]
conventions:
  - [Convention 1]
  - [Convention 2]
  - [Convention 3]
directives:
  - [Directive 1]
  - [Directive 2]
  - [Directive 3]
diagrams:
  - name: [Diagram Name]
    path: [Path to the diagram file]
  - name: [Another Diagram Name]
    path: [Path to the diagram file]
architecture:
  style: [Architecture style]
  components:
    - [Component 1]
    - [Component 2]
    - [Component 3]
  data-flow:
    - [Data flow description]
development:
  setup-steps:
    - [Step 1]
    - [Step 2]
    - [Step 3]
  build-command: [Build command]
  test-command: [Test command]
business-requirements:
  key-features:
    - [Feature 1]
    - [Feature 2]
    - [Feature 3]
  target-audience: [Target audience description]
  success-metrics:
    - [Metric 1]
    - [Metric 2]
    - [Metric 3]
quality-assurance:
  testing-frameworks:
    - [Framework 1]
    - [Framework 2]
  coverage-threshold: [Coverage percentage]
  performance-benchmarks:
    - [Benchmark 1]
    - [Benchmark 2]
deployment:
  platform: [Deployment platform]
  cicd-pipeline: [CI/CD pipeline]
  staging-environment: [Staging environment URL]
  production-environment: [Production environment URL]
---

# [Project Name]

[Provide a comprehensive overview of the project, its goals, and its significance.]

## Architecture Overview

[Describe the project's architecture in detail, including the main components, their interactions, and the rationale behind the chosen architecture style.]

## Development Guidelines

[Outline the development process, coding standards, and best practices to be followed in the project.]

## Business Context

[Explain the business objectives, target audience, and success metrics for the project.]

## Quality Assurance

[Detail the quality assurance processes, including testing strategies, performance benchmarks, and code review procedures.]

## Deployment and Operations

[Describe the deployment process, including the CI/CD pipeline, staging and production environments, and any operational considerations.]
```

## Example Structure for .contextdocs.md

Use the following structure as a guide:

```markdown
---
contextdocs:
  - name: [Documentation Name]
    type: URL
    link: [URL to the documentation]
    relationship: [primary/secondary]
    resources:
      - [resource-key]: [Resource description]
      - [another-resource-key]: [Another resource description]
---

# External Documentation Sources

This file lists external documentation sources relevant to the [Project Name] project.

## [Documentation Name]

- Description: [Brief description of the documentation and its relevance to the project]
```

## Instructions

When generating .context.md and .contextdocs.md files:

1. Ask for essential information about the project, such as its name, purpose, and main technologies.
2. Based on the provided information, create comprehensive .context.md and .contextdocs.md files following the structures and guidelines outlined above.
3. Ensure that all sections are filled with relevant and detailed information.
4. If certain information is not available, make reasonable assumptions based on common practices in software development.
5. Tailor the content to the specific type of project (e.g., web application, mobile app, data processing system) while maintaining the overall structure.
6. When specifying related modules, include both the name of the module and its path. The path must be a valid relative path specification from the current directory or .context.md file. These should be directories that contain a .context file.
7. In the diagrams section, include references to any architectural, flow, or other diagrams that help visualize the project's structure or processes. Provide both the name and path for each diagram. Prefer .mermaid files for diagrams, but also allow other lightweight diagramming formats (see Diagram Specifications section).
8. For .contextdocs.md, ensure that each item in the contextdocs array includes name, type, link, relationship, and resources fields. The resources field should be an array of objects, each with a single key-value pair.

## Diagram Specifications

When referencing diagrams in the .context.md file:

1. Prefer .mermaid files for diagrams. These offer the best support for context and markdown fluency.
2. Other allowed file formats include: .mmd, .pdf, .png, .jpg, .jpeg.
3. The diagram path should point to a specific file, not just a directory.
4. When possible, include a brief description of what the diagram represents in the Markdown content section.

Remember, the goal is to create .context.md and .contextdocs.md files that provide valuable context for both human developers and AI assistants, enabling more effective collaboration and development on the project.

## Linting and testing the new .context.md and .contextdocs.md

Use the terminal to run the linting command to review the output.
Fix any errors or warnings by reviewing the codebase and filling in the missing pieces.

Usage of official linter for .context.md and .contextdocs.md files:

1. Run the linter from the directory the files are in:
   `npx codebase-context-lint .`
2. Repair and re-run until you have full coverage for both files.
3. Pay special attention to the format of the resources in .contextdocs.md, ensuring they are objects with single key-value pairs.

By following these guidelines and instructions, you should be able to create comprehensive and properly formatted .context.md and .contextdocs.md files that will pass the linter checks and provide valuable context for the project.

Review the CODEBASE-CONTEXT.md file provided for the full specification.
