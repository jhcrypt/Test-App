# Unit Test Generator

1. Test Scope Selection
   Ask: "Would you like to:
1. Generate tests for a specific file/component
1. Generate tests for new/modified code
1. Add tests for uncovered functionality"

1. Code Analysis

- Identify function signatures
- Map dependencies and imports
- Detect state management
- Find edge cases
- Review existing tests

3. Test Framework Detection

- Check project for testing setup
- Identify test patterns in use
- Match existing test style
- Determine language and framework

4. Generate Test Suite
   Based on detected language and framework, generate appropriate test structure.

Example structures by language:

For JavaScript/TypeScript (Jest):

```typescript:src/__tests__/component.test.ts
import { Component } from '../component';

describe('ComponentName', () => {
  test('should behave as expected', () => {
    // Arrange
    // Act
    // Assert
  });

  test('should handle edge case', () => {
    // Edge case testing
  });
});
```

For Java (JUnit):

```
import org.junit.Test;
import static org.junit.Assert.*;

public class ComponentTest {
    @Test
    public void shouldBehaveAsExpected() {
        // Arrange
        // Act
        // Assert
    }

    @Test
    public void shouldHandleEdgeCase() {
        // Edge case testing
    }
}
```

For Python (pytest):

```
from component import Component

def test_should_behave_as_expected():
    # Arrange
    # Act
    # Assert

def test_should_handle_edge_case():
    # Edge case testing
```

For Ruby (RSpec):

```
require 'component'

RSpec.describe Component do
  it "should behave as expected" do
    # Arrange
    # Act
    # Assert
  end

  it "should handle edge case" do
    # Edge case testing
  end
end
```

5. Test Cases Include
   For each function/method:

Core Testing

- Happy path with expected inputs
- Edge cases and boundary values
- Error/exception handling
- Input validation
- State changes before/after
- Resource initialization/cleanup

Integration Points

- Dependencies and mocks
- External service calls
- Database operations
- File system interactions

Performance

- Response time requirements
- Resource usage limits
- Concurrency handling
- Load conditions

6. Coverage Validation
   Code Analysis

- Branch coverage
- Statement coverage
- Path coverage
- Exception coverage

Quality Checks

- Test isolation
- Mock usage
- Assertion completeness
- Setup/teardown cleanup

Recommendations

- Missing test cases
- Additional edge cases
- Integration scenarios
- Performance tests
