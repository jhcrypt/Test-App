# PlantUML Diagram Generator

1. Determine Diagram Type
   Ask: "Which diagram type would you like to generate?

- Component diagram
- Class diagram
- Sequence diagram
- Activity diagram
- Use case diagram"

2. Scope Definition
   Ask: "What is the main functionality or system area you want to visualize?"

3. Entry Point Identification

- For component diagrams: "What is the main component that initiates the flow?"
- For class diagrams: "What is the primary class/interface?"
- For sequence diagrams: "What triggers this interaction?"
- For activity diagrams: "What starts this process?"
- For use case diagrams: "Who is the primary actor?"

4. Relationship Depth
   Ask: "How many levels of relationships should we include? Choose:
1. Direct relationships only
1. Secondary relationships (relationships of related components)
1. Full dependency chain"

1. Component Selection

- Analyze codebase from entry point
- List discovered components at chosen depth
- Ask: "I found these components. Select numbers to exclude any that aren't relevant:

1. [Component A]
2. [Component B]"

3. Generate PlantUML
   Output:

```plantuml
@startuml
' Theme selection
!theme plain

' Diagram content
[Component definitions]
[Relationship definitions]

@enduml
```
