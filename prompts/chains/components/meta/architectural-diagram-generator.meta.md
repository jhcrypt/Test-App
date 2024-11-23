# Architectural Diagram Generator Metadata

## Purpose

This prompt template generates comprehensive PlantUML diagrams that visualize system architecture, component relationships, user flows, state machines, and business processes through clear and maintainable diagrams.

## Dependencies

- UX Sitemap Document
- Wireframe Specifications
- Technical Stack BOM
- Project Requirements Document
- Implementation Status Report (if available)

## Outputs

- User Flow Diagrams (sequence)
- State Machine Diagrams
- Activity Diagrams
- Class/Component Diagrams
- Use Case Diagrams
- Technical Documentation
- Relationship Maps

## Related Templates

- ux_site_map_document.md
- software_archtect.md
- implementation-analysis-prompt.md
- wireframe-generation-prompt.md
- generate-high-level-system-architecture.md

## Version History

- 1.0.0: Initial template creation
  - Command-based activation system
  - Five core diagram types
  - PlantUML syntax generation
  - Comprehensive documentation
  - Technical handoff guidelines

## Usage Guidelines

1. Ensure all prerequisite documents are available
2. Use `#generate-diagrams [type]` to initiate diagram creation
3. Use `#diagram-status` to track progress
4. Follow the step-by-step process for each diagram type
5. Complete all documentation sections before handoff

## Success Criteria

- Complete diagrams for all system aspects
- Clear component relationships
- Documented user flows
- Defined state machines
- Mapped business processes
- Optimized diagram layouts
- Comprehensive technical documentation

## Best Practices

1. Keep diagrams focused and readable
2. Use consistent naming conventions
3. Include only relevant components
4. Add descriptive comments
5. Follow PlantUML best practices
6. Maintain consistent style
7. Provide clear legends
8. Document relationships
9. Optimize for readability
10. Consider diagram dependencies

## Integration Points

- UX Sitemap Document

  - User flows
  - Navigation paths
  - Screen transitions

- Wireframe Specifications

  - Component structure
  - State transitions
  - User interactions

- Technical Stack BOM

  - System components
  - Technology relationships
  - Integration points

- Requirements Document
  - Use cases
  - Business processes
  - System behaviors

## Validation Requirements

1. Diagram Completeness

   - All components included
   - Relationships mapped
   - Flows documented
   - States covered

2. Visual Clarity

   - Clear layout
   - Readable labels
   - Logical grouping
   - Appropriate detail level

3. Technical Accuracy

   - Correct relationships
   - Valid flows
   - Proper inheritance
   - Accurate states

4. Documentation Quality
   - Clear descriptions
   - Helpful comments
   - Usage examples
   - Integration notes
