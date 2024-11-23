# Prompt Chain Index

## Overview

This index organizes prompts into specialized chains that work together to manage different aspects of the software development lifecycle. Each chain has a specific focus while maintaining clear integration points with other chains.

## Core Chains

### 1. Project Requirements Chain

Location: `chains/project_requirements_chain.md`
Purpose: Manages the complete project requirements lifecycle
Components:

- Initial requirements generation
- Requirements revision
- Feature specifications
- Requirements maintenance

### 2. Architecture & Design Chain

Location: `chains/architecture_design_chain.md`
Purpose: Manages software architecture and design process
Components:

- System architecture
- Component diagrams
- API design
- Architectural documentation
- Architecture evolution

### 3. UI/UX Chain

Location: `chains/ui_ux_chain.md`
Purpose: Manages user interface and experience design
Components:

- Wireframe generation
- Layout design
- SVG creation
- UI styling

### 4. Code Quality Chain

Location: `chains/code_quality_chain.md`
Purpose: Manages code quality improvement process
Components:

- Code evaluation
- Code improvement
- Code rating
- Code generation

### 5. Testing Chain

Location: `chains/testing_chain.md`
Purpose: Manages testing processes and validation
Components:

- Unit testing
- Performance testing
- Test execution
- Results analysis

### 6. Backend Development Chain

Location: `chains/backend_development_chain.md`
Purpose: Manages backend development process
Components:

- Backend generator
- Database generator
- API implementation
- Security configuration
- Monitoring setup

## Chain Commands

### Project Requirements Chain

- #generate-requirements - Generate initial requirements
- #revise-requirements - Review and revise requirements
- #generate-frd - Generate feature requirements document
- #requirements-status - Check chain status

### Architecture & Design Chain

- #generate-architecture - Generate system architecture
- #generate-diagrams - Create PlantUML diagrams
- #design-api - Design API specifications
- #evolve-architecture - Update architecture for new sprint
- #architecture-status - Check chain status

### UI/UX Chain

- #generate-wireframes - Generate initial wireframes
- #design-layout - Design detailed layouts
- #create-svg - Create SVG wireframes
- #style-ui - Apply UI styling
- #ui-ux-status - Check chain status

### Code Quality Chain

- #evaluate-code - Start code evaluation
- #improve-code - Improve code based on evaluation
- #rate-code - Rate code improvements
- #generate-code - Generate final improved code
- #code-quality-status - Check chain status

### Testing Chain

- #generate-unit-tests - Generate unit tests
- #generate-performance-tests - Create performance tests
- #execute-tests - Run test suites
- #testing-status - Check chain status

### Backend Development Chain

- #generate-backend - Generate server implementation
- #generate-database - Create database schema
- #implement-api - Implement API endpoints
- #backend-status - Check chain status

## Chain Dependencies

### Project Requirements Chain

Dependencies:

- Input: Business requirements, stakeholder needs
- Output: Requirements documentation, feature specifications
  Used by: All other chains

### Architecture & Design Chain

Dependencies:

- Input: Project requirements
- Output: System architecture, API specifications
  Used by: UI/UX Chain, Backend Development Chain, Code Quality Chain

### UI/UX Chain

Dependencies:

- Input: Project requirements, system architecture
- Output: UI designs, component specifications
  Used by: Code Quality Chain

### Code Quality Chain

Dependencies:

- Input: All previous chain outputs
- Output: Validated code implementations
  Used by: Testing Chain

### Testing Chain

Dependencies:

- Input: Code implementations, requirements
- Output: Test results, validation reports
  Used by: All chains for validation

### Backend Development Chain

Dependencies:

- Input: Architecture design, API specifications
- Output: Backend implementation, database schema
  Used by: Testing Chain, Code Quality Chain

## Usage Guidelines

1. Start with Project Requirements Chain

   - Generate initial requirements
   - Review and revise as needed
   - Create feature specifications

2. Use Architecture & Design Chain

   - Generate system architecture
   - Create component diagrams
   - Design API specifications

3. Implement UI/UX Chain

   - Generate wireframes
   - Design layouts
   - Apply styling

4. Develop Backend Chain

   - Generate database schema
   - Implement server
   - Configure APIs

5. Apply Code Quality Chain

   - Evaluate code
   - Implement improvements
   - Validate changes

6. Execute Testing Chain
   - Generate tests
   - Execute test suites
   - Validate results

## Success Criteria

- Complete feature coverage
- Consistent documentation
- Clear traceability
- Regular validation
- Maintained quality
- Integration completeness
- Performance standards
- Security compliance

## Note

This index is maintained as chains are updated or new chains are added. Each chain includes its own detailed documentation and usage guidelines.
