# Prompt Chain Orchestrator Metadata

## Purpose

This orchestrator ensures proper sequencing, dependency validation, and artifact generation across the SDLC process by managing prompt chain execution and validation.

## Dependencies

- All SDLC phase prompts
- Generated artifacts
- Validation rules
- Recovery procedures

## Outputs

- Chain status reports
- Validation reports
- Recovery plans
- Phase transition validations

## Related Templates

- All SDLC phase prompts
- All validation templates
- All recovery templates

## Version History

- 1.0.0: Initial template creation
  - Command-based activation system
  - Comprehensive validation rules
  - Recovery procedures
  - Status tracking
  - Chain management

## Usage Guidelines

1. Start chains with `#start-chain [phase_name]`
2. Monitor progress with `#chain-status`
3. Validate state with `#validate-chain`
4. Follow recovery procedures when needed
5. Ensure all validations pass before transitions

## Success Criteria

- Complete chain execution
- All artifacts validated
- Proper phase transitions
- Clean validation reports
- Successful recovery from issues
- Maintained chain consistency

## Integration Points

- SDLC process management
- Validation systems
- Recovery procedures
- Status tracking
- Artifact management

## Best Practices

1. Always validate prerequisites
2. Maintain chain state consistency
3. Follow recovery procedures
4. Document state changes
5. Enforce dependencies
6. Track validation status
7. Handle failures gracefully
8. Ensure artifact quality
9. Monitor chain progress
10. Maintain traceability
