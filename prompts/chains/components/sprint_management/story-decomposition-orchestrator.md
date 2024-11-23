# Story Decomposition and Testing Orchestrator

This orchestrator manages the breakdown of user stories into testable tasks and generates unit tests from acceptance criteria.

## Command Activation

The orchestrator responds to these commands:

- `#decompose-story S<X.Y>` - Starts story decomposition process
- `#generate-story-tests S<X.Y>` - Generates unit tests from acceptance criteria
- `#story-status S<X.Y>` - Shows decomposition and testing status

## Story Decomposition Process

[STEP 1] Story Analysis:

```yaml
analysis:
  components:
    - User role identification
    - Feature scope definition
    - Value proposition clarity
    - Technical dependencies
    - Implementation complexity
  validation:
    - Story completeness
    - Acceptance criteria clarity
    - Technical feasibility
```

[STEP 2] Task Breakdown:

```yaml
task_generation:
  levels:
    epic:
      format: 'E<epic_number>'
      components:
        - Business objective
        - Success metrics
        - User value
        - Feature scope
        - Dependencies

    story:
      format: 'S<sprint>.<story_number>'
      components:
        - User role
        - Feature description
        - Value proposition
        - Acceptance criteria
        - Technical notes

    task:
      format: 'T<story_id>.<task_number>'
      components:
        - Implementation goal
        - Technical scope
        - Dependencies
        - Completion criteria
```

## Acceptance Criteria to Test Mapping

[STEP 3] Criteria Analysis:

```yaml
criteria_mapping:
  format: 'Given-When-Then'
  components:
    given:
      - Initial state
      - Prerequisites
      - Setup requirements
    when:
      - User action
      - System event
      - Trigger condition
    then:
      - Expected outcome
      - State change
      - System response
```

[STEP 4] Test Generation:

```yaml
test_generation:
  unit_tests:
    format:
      describe: 'Feature or component under test'
      context: 'Specific scenario or condition'
      it: 'Expected behavior'

    components:
      - Test setup (Given)
      - Action execution (When)
      - Result verification (Then)

    coverage:
      - Happy path
      - Edge cases
      - Error conditions
      - State transitions
```

## Task Relationship Management

[STEP 5] Dependency Mapping:

```yaml
relationships:
  epic_to_story:
    mapping:
      - Epic business value to story objectives
      - Epic scope to story features
      - Epic metrics to story criteria
    validation:
      - Value alignment
      - Scope coverage
      - Success measurement

  story_to_task:
    mapping:
      - Story acceptance criteria to task goals
      - Story scope to task implementation
      - Story value to task purpose
    validation:
      - Implementation completeness
      - Technical feasibility
      - Value delivery
```

## Test Coverage Validation

[STEP 6] Coverage Analysis:

```yaml
coverage_validation:
  acceptance_criteria:
    - Each criterion has corresponding tests
    - All scenarios covered
    - Edge cases addressed

  implementation:
    - All tasks have tests
    - Critical paths covered
    - Error handling tested
```

## Example Story Decomposition

```markdown
Epic E001: User Authentication System
Description: Implement secure user authentication
Value: Enable user-specific features and data protection
Success Metrics:

- 100% of user actions properly authenticated
- Zero unauthorized access incidents
- < 2 second authentication time

Story S1.1: User Login
As a registered user
I want to log into my account
So that I can access my personalized features

Acceptance Criteria:

1. Given valid credentials
   When user submits login form
   Then user is authenticated and redirected to dashboard

2. Given invalid credentials
   When user submits login form
   Then appropriate error message is shown

Tasks:
T1.1.1: Implement Login Form

- Create login form component
- Add input validation
- Style according to design system

T1.1.2: Implement Authentication Logic

- Add authentication service
- Integrate with backend API
- Handle response states

T1.1.3: Implement Post-Login Flow

- Add route protection
- Handle session management
- Implement redirect logic
```

## Generated Test Structure

```typescript
describe('User Login', () => {
  context('Valid Credentials', () => {
    it('should authenticate user and redirect to dashboard', () => {
      // Given valid credentials
      const credentials = {
        email: 'valid@example.com',
        password: 'validPassword',
      };

      // When user submits login form
      const result = submitLogin(credentials);

      // Then user is authenticated and redirected
      expect(result.authenticated).to.be.true;
      expect(result.redirectUrl).to.equal('/dashboard');
    });
  });

  context('Invalid Credentials', () => {
    it('should show appropriate error message', () => {
      // Given invalid credentials
      const credentials = {
        email: 'invalid@example.com',
        password: 'wrongPassword',
      };

      // When user submits login form
      const result = submitLogin(credentials);

      // Then error message is shown
      expect(result.error).to.equal('Invalid credentials');
      expect(result.authenticated).to.be.false;
    });
  });
});
```

## Status Tracking

When `#story-status S<X.Y>` is called, provide:

```yaml
status:
  story:
    id: 'S<X.Y>'
    decomposition:
      - Total tasks identified
      - Tasks created
      - Tasks remaining
    testing:
      - Acceptance criteria mapped
      - Tests generated
      - Coverage status

  validation:
    - Task completeness
    - Test coverage
    - Dependency status
```

## Critical Rules

1. Every acceptance criterion must map to at least one test
2. Tasks must be atomic and independently testable
3. Dependencies must be explicitly documented
4. Test coverage must be comprehensive
5. Value delivery must be traceable
6. Implementation details must be clear
7. Edge cases must be considered
8. Error scenarios must be handled
9. State transitions must be validated
10. Integration points must be tested
