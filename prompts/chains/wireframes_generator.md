# SVG Wireframes Component Library

## Overview

This library provides a collection of SVG-based wireframe components for rapid prototyping and UI development. The components are designed to be modular, reusable, and easily customizable.

## Key Features

- **Responsive Components**: All components automatically scale and adapt to different viewport sizes
- **Interactive Elements**: Built-in hover states and click animations
- **Customizable Styles**: Global styling through CSS variables
- **Performance Optimized**: Uses SVG definitions for reusable elements
- **Accessibility Ready**: Structured for screen readers and keyboard navigation

## Architecture

The library is structured in three main sections:

1. **Core Definitions**: Global patterns, styles, and reusable elements
2. **Component Library**: Individual UI components
3. **Implementation Examples**: Sample layouts and responsive patterns

<!-- Core Wireframe Styles -->
<svg xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Common Patterns -->
    <pattern id="grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#ccc" stroke-width="0.5"/>
    </pattern>
    
    <!-- Wireframe Styles -->
    <style type="text/css">
      .wireframe-bg { fill: #f5f5f5; }
      .wireframe-border { fill: none; stroke: #666; stroke-width: 1; }
      .wireframe-text { fill: #333; font-family: system-ui, sans-serif; }
      .placeholder-image { fill: #ddd; }
      .interactive { cursor: pointer; }
      .interactive:hover { opacity: 0.8; }
    </style>

    <!-- Common Components -->

    <!-- Navigation Bar -->
    <!--
      The nav-bar component uses a layered approach:
      - Base rectangle for the container
      - Logo placeholder (100x30)
      - Avatar circle for user profile
      All elements use the wireframe-border class for consistent styling
    -->
    <g id="nav-bar">
      <rect width="100%" height="60" class="wireframe-border"/>
      <rect x="20" y="15" width="100" height="30" class="wireframe-border"/>
      <circle cx="50" cy="30" r="15" class="wireframe-border"/>
    </g>

    <!-- Hero Section -->
    <!--
      Hero section combines:
      - Full-width background image placeholder
      - Centered content container (80% width)
      - Responsive scaling through percentage-based dimensions
    -->
    <g id="hero-section">
      <rect width="100%" height="400" class="placeholder-image"/>
      <rect x="10%" y="150" width="80%" height="100" class="wireframe-border"/>
    </g>

    <!-- Form Elements -->
    <!--
      Form inputs feature:
      - Rounded corners (4px radius)
      - Standard height (40px)
      - Built-in label positioning
      - Focus states through .interactive class
    -->
    <g id="form-input">
      <rect width="200" height="40" rx="4" class="wireframe-border"/>
      <text x="10" y="25" class="wireframe-text" font-size="14">Input Label</text>
    </g>

    <!-- Button -->
    <g id="button">
      <rect width="120" height="40" rx="20" class="wireframe-border interactive"/>
      <text x="60" y="25" class="wireframe-text" text-anchor="middle">Button</text>
    </g>

    <!-- Card -->
    <g id="card">
      <rect width="300" height="400" rx="8" class="wireframe-border">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
      </rect>
      <rect x="20" y="20" width="260" height="160" class="placeholder-image"/>
      <rect x="20" y="200" width="260" height="20" class="wireframe-border"/>
      <rect x="20" y="240" width="200" height="20" class="wireframe-border"/>
    </g>

  </defs>
</svg>

<!-- Example Layout Implementation -->
<svg width="1200" height="800" viewBox="0 0 1200 800">
  <!-- Page Layout -->
  <rect width="100%" height="100%" fill="url(#grid-pattern)"/>
  
  <!-- Header Section -->
  <use href="#nav-bar" x="0" y="0" width="1200"/>
  
  <!-- Hero Section -->
  <use href="#hero-section" x="0" y="60"/>
  
  <!-- Content Grid -->
  <g transform="translate(0, 500)">
    <!-- Card Grid -->
    <use href="#card" x="50" y="0"/>
    <use href="#card" x="400" y="0"/>
    <use href="#card" x="750" y="0"/>
  </g>
  
  <!-- Form Section -->
  <g transform="translate(50, 200)">
    <use href="#form-input" x="0" y="0"/>
    <use href="#button" x="0" y="60"/>
  </g>
</svg>

<!-- Responsive Components -->
<svg width="100%" viewBox="0 0 360 640">
  <!-- Mobile Navigation -->
  <g id="mobile-nav">
    <rect width="360" height="50" class="wireframe-border"/>
    <rect x="20" y="15" width="30" height="20" class="wireframe-border interactive">
      <!-- Hamburger Menu Animation -->
      <animate attributeName="y" values="15;20;15" dur="1s" begin="click"/>
    </rect>
  </g>
  
  <!-- Mobile Card -->
  <g id="mobile-card" transform="translate(0, 60)">
    <rect width="340" height="200" rx="8" x="10" class="wireframe-border"/>
    <rect x="20" y="20" width="320" height="100" class="placeholder-image"/>
  </g>
</svg>

<!-- Interactive Elements -->
<svg width="200" height="200">
  <!-- Toggle Switch -->
  <g id="toggle-switch">
    <rect width="60" height="30" rx="15" class="wireframe-border"/>
    <circle cx="20" cy="15" r="12" class="wireframe-border interactive">
      <animate attributeName="cx" values="20;40;20" dur="0.3s" begin="click" fill="freeze"/>
    </circle>
  </g>
  
  <!-- Progress Indicator -->
  <g id="progress" transform="translate(0, 50)">
    <rect width="200" height="4" class="wireframe-border"/>
    <rect width="120" height="4" class="wireframe-border">
      <animate attributeName="width" values="0;120" dur="2s" repeatCount="indefinite"/>
    </rect>
  </g>
</svg>

<!-- Modal Component -->
<svg width="400" height="300">
  <g id="modal">
    <rect width="100%" height="100%" fill="rgba(0,0,0,0.5)"/>
    <rect x="50" y="50" width="300" height="200" rx="8" fill="white" class="wireframe-border">
      <animate attributeName="opacity" values="0;1" dur="0.3s" begin="0s" fill="freeze"/>
      <animate attributeName="transform" from="scale(0.8)" to="scale(1)" dur="0.3s" begin="0s" fill="freeze"/>
    </rect>
    <circle cx="330" cy="70" r="10" class="wireframe-border interactive"/>
  </g>
</svg>

---

# SVG Wireframe Implementation Guide

## Basic Usage

### Component Integration

```html
<!-- Import SVG definitions -->
<svg>
  <use href="#nav-bar" x="0" y="0" />
  <use href="#hero-section" x="0" y="60" />
</svg>
```

## Animation Patterns

### State Transitions

1. Hover States

```css
.interactive:hover {
  opacity: 0.8;
  transition: opacity 0.2s ease-in-out;
}
```

2. Click Feedback

```xml
<animate
  attributeName="transform"
  from="scale(1)"
  to="scale(0.95)"
  dur="0.1s"
  begin="click"
/>
```

### Loading States

1. Skeleton Loading

```xml
<rect>
  <animate
    attributeName="opacity"
    values="0.3;0.7;0.3"
    dur="1.5s"
    repeatCount="indefinite"
  />
</rect>
```

2. Progress Indicators

```xml
<circle>
  <animate
    attributeName="stroke-dashoffset"
    from="0"
    to="360"
    dur="2s"
    repeatCount="indefinite"
  />
</circle>
```

## Responsive Patterns

### Viewport Adjustments

```xml
<svg preserveAspectRatio="xMidYMid meet">
  <!-- Component content -->
</svg>
```

### Component Scaling

```xml
<g transform="scale(0.5)">
  <!-- Scaled component content -->
</g>
```

## Best Practices

1. Performance Optimization

- Use `<defs>` for reusable elements
- Implement `requestAnimationFrame` for complex animations
- Optimize paths using tools like SVGO

2. Accessibility

- Add `role="img"` to decorative SVGs
- Include `aria-label` for meaningful graphics
- Ensure sufficient color contrast

3. Responsive Design

- Use percentage-based dimensions
- Implement viewBox for scaling
- Create mobile-specific variants

4. Animation Guidelines

- Keep animations under 300ms for UI feedback
- Use ease-in-out for smooth transitions
- Respect reduced-motion preferences

```css
@media (prefers-reduced-motion: reduce) {
  .animate {
    animation: none;
  }
}
```

## Component Examples

### Modal Dialog

```xml
<g class="modal">
  <rect class="overlay"/>
  <g class="dialog">
    <rect class="background"/>
    <text class="title"/>
    <g class="content"/>
    <g class="actions"/>
  </g>
</g>
```

### Navigation Menu

```xml
<g class="nav">
  <rect class="background"/>
  <g class="menu-items">
    <g class="item" transform="translate(0,0)"/>
    <g class="item" transform="translate(0,40)"/>
  </g>
</g>
```

## Advanced Implementation Tips

### Component Composition

Components can be nested and combined to create complex layouts:

```xml
<g class="page-section">
  <use href="#nav-bar"/>
  <g class="content">
    <use href="#hero-section"/>
    <g class="card-grid">
      <use href="#card" x="0"/>
      <use href="#card" x="320"/>
    </g>
  </g>
</g>
```

### State Management

Components can maintain internal states using CSS classes:

```css
.is-active {
  stroke: var(--accent-color);
}
.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}
.is-loading {
  animation: pulse 2s infinite;
}
```

### Performance Optimization

1. Use `will-change` for frequently animated properties
2. Implement virtual scrolling for large lists
3. Lazy load off-screen components

### Theming

The library supports theming through CSS variables:

```css
:root {
  --wireframe-primary: #666;
  --wireframe-secondary: #ddd;
  --wireframe-accent: #0066cc;
  --animation-duration: 200ms;
}
```
