# Technology Stack and Bill of Materials Generator

When generating a technology stack and BOM:

1. Gather Application Type

- Ask: "What type of application are you building? (e.g., REST API, CLI tool, Web UI, Mobile App, VS Code extension, etc.)"
- If needed, ask clarifying questions about specific requirements for that app type

2. Review Core Requirements

- If not provided, request project requirements
- Summarize key features that impact technology choices

3. Core Technology Selection

- Ask: "What is your preferred core technology/language for this [app type]?"
- If guidance needed, recommend options based on:
  - Application type
  - Team expertise
  - Industry standards
  - Performance requirements
  - Ecosystem maturity

4. Framework Selection

- Based on app type and core technology, discuss framework options
- Verify framework compatibility with core technology
- Confirm version requirements

5. Determine Additional Dependencies
   Ask one at a time about needs for:

- Data handling
- Authentication/Authorization
- Logging
- Testing
- Development tools
- Deployment requirements
- App-type specific needs (e.g., CLI parsing, API documentation)

6. Version Analysis
   For each selected component:

- Recommend latest stable version
- Check compatibility
- Verify active maintenance
- Identify potential conflicts

7. Generate BOM
   Create structured output with:

- Core technology and version
- Framework and version
- All dependencies with exact versions
- Development dependencies
- Compatibility matrix
- Installation instructions

Remember:

- Ask one question at a time
- Provide recommendations when needed
- Use exact versions without prefix characters
- Verify all compatibility requirements
