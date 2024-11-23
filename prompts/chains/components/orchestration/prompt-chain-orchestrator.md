# Prompt Chain Orchestrator

This orchestrator manages the flow of prompts in the SDLC process, ensuring proper sequencing, dependency validation, and artifact generation.

## Command Activation

The orchestrator responds to these commands:

- `#start-chain [phase_name]` - Starts or resumes a prompt chain for a specific SDLC phase
- `#chain-status` - Shows current progress in the prompt chain
- `#validate-chain` - Validates current chain state and artifacts

## Chain Validation Protocol

[STEP 1] For each prompt in the chain:

1. Validate Prerequisites

```yaml
validation:
  prerequisites:
    - Check required input documents exist
    - Verify document format and structure
    - Validate content completeness
```

2. Validate Outputs

```yaml
validation:
  outputs:
    - Verify all required artifacts generated
    - Check artifact format and structure
    - Validate content against requirements
```

3. Validate Dependencies

```yaml
validation:
  dependencies:
    - Check all dependent prompts completed
    - Verify dependency artifacts exist
    - Validate artifact relationships
```

## Chain Flow Control

### Phase Transitions

```yaml
transitions:
  requirements_to_design:
    required_artifacts:
      - product_requirements.md
      - feature_requirements.md
      - business_ontology.owl
    validation:
      - Verify all requirements documented
      - Check requirement relationships
      - Validate completeness

  design_to_implementation:
    required_artifacts:
      - system_architecture.md
      - api_specification.yaml
      - database_schema.sql
    validation:
      - Verify design completeness
      - Check component relationships
      - Validate technical feasibility

  implementation_to_testing:
    required_artifacts:
      - implemented_features.md
      - test_plans.md
      - deployment_docs.md
    validation:
      - Verify feature completion
      - Check test coverage
      - Validate deployment readiness
```

### Checkpoint System

```yaml
checkpoints:
  requirements:
    entry:
      - Verify project scope defined
      - Check stakeholder approval
      - Validate resource availability
    exit:
      - Verify all requirements documented
      - Check requirement completeness
      - Validate requirement relationships

  design:
    entry:
      - Verify requirements approved
      - Check technical feasibility
      - Validate design approach
    exit:
      - Verify design completeness
      - Check component relationships
      - Validate implementation readiness

  implementation:
    entry:
      - Verify design approved
      - Check development environment
      - Validate technical capabilities
    exit:
      - Verify feature completion
      - Check code quality
      - Validate deployment readiness
```

## Recovery Procedures

### Artifact Recovery

```yaml
recovery:
  missing_artifact:
    steps:
      - Identify missing artifact
      - Locate last valid state
      - Regenerate from dependencies
      - Validate regenerated artifact

  invalid_artifact:
    steps:
      - Identify validation failure
      - Locate error source
      - Correct and regenerate
      - Revalidate artifact chain
```

### Chain Recovery

```yaml
recovery:
  broken_chain:
    steps:
      - Identify break point
      - Validate previous state
      - Regenerate affected artifacts
      - Revalidate chain from break

  invalid_state:
    steps:
      - Identify invalid state
      - Locate last valid state
      - Rebuild chain from valid state
      - Validate rebuilt chain
```

## Status Tracking

When `#chain-status` is called, provide:

```yaml
status:
  current_phase: '[phase name]'
  completed_prompts:
    - prompt: '[prompt name]'
      artifacts: ['artifact list']
      status: 'validated'
  current_prompt:
    name: '[prompt name]'
    status: 'in_progress'
    blocking_issues: ['issue list']
  next_prompts:
    - name: '[prompt name]'
      dependencies: ['dependency list']
  validation_status:
    - artifact: '[artifact name]'
      status: 'valid/invalid'
      issues: ['issue list']
```

## Chain Validation

When `#validate-chain` is called:

1. Check all completed prompts
2. Validate all generated artifacts
3. Verify dependency relationships
4. Report validation status:

```yaml
validation_report:
  chain_status: 'valid/invalid'
  issues_found: ['issue list']
  recovery_needed: true/false
  recovery_plan:
    - step: '[recovery step]'
      artifacts: ['affected artifacts']
```

## Usage Example

```bash
# Start requirements phase chain
#start-chain requirements

# Check chain status
#chain-status

# Validate current chain state
#validate-chain

# Proceed with next prompt in chain
#[prompt-specific-command]
```

## Critical Rules

1. Never skip validation steps
2. Always verify prerequisites before starting a prompt
3. Validate all artifacts after prompt completion
4. Maintain chain state consistency
5. Follow recovery procedures for any issues
6. Track and report all validation failures
7. Ensure proper phase transitions
8. Maintain artifact traceability
9. Document all chain state changes
10. Enforce dependency requirements
