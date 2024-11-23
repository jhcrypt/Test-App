# SVG Wireframe Generator Prompt

## Purpose

This prompt guides the generation of clean, well-organized SVG wireframes following established design principles and best practices.

## Design Principles

### Layout Organization

- Maintain proportional whitespace
- Use consistent spacing between elements
- Implement proper padding within containers
- Follow a grid-based layout system
- Ensure responsive design considerations

### Text Handling

- Prevent text overflow from containers
- Apply text wrapping when needed
- Adjust font size to fit containers
- Maintain proper text alignment (left, right, center)
- Use appropriate font hierarchy

### Alignment & Spacing

- Use appropriate vertical alignment (top, middle, bottom)
- Implement consistent horizontal alignment
- Maintain proper spacing between sections
- Avoid element overlapping
- Use consistent margins and padding

### Container Management

- Size containers appropriately for content
- Add padding within containers
- Maintain clear boundaries between elements
- Use proper nesting of elements
- Implement consistent container styles

## SVG Structure Guidelines

### Base Template

```xml
<svg width="[width]" height="[height]" viewBox="0 0 [width] [height]" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Reusable elements -->
  </defs>

  <g id="layout">
    <!-- Layout structure -->
  </g>

  <g id="content">
    <!-- Content elements -->
  </g>
</svg>
```

### Common Components

#### Buttons

```xml
<g class="button">
  <rect
    x="[x]" y="[y]"
    width="[width]" height="40"
    rx="4"
    fill="#E5E7EB"
  />
  <text
    x="[x+width/2]" y="[y+20]"
    text-anchor="middle"
    dominant-baseline="middle"
  >[Button Text]</text>
</g>
```

#### Input Fields

```xml
<g class="input-field">
  <rect
    x="[x]" y="[y]"
    width="[width]" height="40"
    rx="4"
    fill="white"
    stroke="#E5E7EB"
  />
  <text
    x="[x+16]" y="[y+20]"
    dominant-baseline="middle"
    fill="#6B7280"
  >[Placeholder]</text>
</g>
```

#### Container

```xml
<g class="container">
  <rect
    x="[x]" y="[y]"
    width="[width]" height="[height]"
    rx="8"
    fill="white"
    stroke="#E5E7EB"
  />
  <g class="content" transform="translate([x+16], [y+16])">
    <!-- Container content -->
  </g>
</g>
```

## Best Practices

### Layout

- Use consistent spacing (8px, 16px, 24px, 32px)
- Maintain clear visual hierarchy
- Group related elements
- Ensure proper alignment of elements
- Use whitespace effectively

### Text

- Use clear font hierarchy
- Ensure readable text sizes
- Maintain consistent text alignment
- Handle text overflow gracefully
- Use appropriate line height

### Components

- Keep components modular
- Use consistent styling
- Maintain proper spacing
- Ensure clear boundaries
- Follow accessibility guidelines

### Organization

- Use semantic grouping
- Name layers clearly
- Comment complex structures
- Maintain consistent structure
- Keep SVG code clean and readable
