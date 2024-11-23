# UX Sitemap Structure for Business Ontology Generator

uxsitemap:
views:
uniqueViews:
UV_LANDING:
title: "Landing Page"
extendedDescription: "Initial entry point featuring a clean, professional interface with industry domain selection dropdown, business model template selection, and a prominent 'Start' button. Includes brief product description, key features overview, and getting started guidance. The page should establish trust and guide users toward beginning their ontology generation journey."
notes: "Must be responsive and load quickly. Should clearly communicate the product's value proposition."
role: "Serves as the entry point and initial configuration hub for new sessions. Enables users to set up their working context before entering the main workspace."

      UV_WORKSPACE:
        title: "Main Workspace"
        extendedDescription: "Primary working environment combining chat interface, visualization area, and control panels. Left side features the chat interface with message composition and history. Center area displays the interactive knowledge graph visualization with zoom/pan controls. Right side contains the property inspector and configuration panels. All panels are resizable and can be collapsed."
        notes: "Core workspace where users spend most of their time. Must be highly responsive and support efficient workflows."
        role: "Central hub for all ontology generation and manipulation activities. Integrates all core features into a cohesive workspace."

      UV_CHAT:
        title: "Chat Interface"
        extendedDescription: "Dedicated chat area with message composition at bottom, scrollable message history above. Includes context indicators, typing status, and message timestamps. Features clear threading of conversation, with system responses clearly distinguished from user inputs. Includes quick actions for context reset and history navigation."
        notes: "Must handle real-time updates smoothly and preserve context effectively."
        role: "Primary input mechanism for natural language processing and ontology generation. Facilitates conversation flow and maintains context."

      UV_GRAPH:
        title: "Knowledge Graph View"
        extendedDescription: "Interactive visualization area displaying the ontology as a node-edge graph. Features zoom/pan controls, node/edge selection, and interactive manipulation capabilities. Includes layout controls, filtering options, and detail view toggle. Supports both automatic and manual node positioning."
        notes: "Performance critical for large graphs. Must maintain responsiveness during interactions."
        role: "Visualizes the generated ontology and enables direct manipulation of the knowledge structure."

      UV_EXPORT:
        title: "Export Interface"
        extendedDescription: "Export configuration panel with format selection, options configuration, and preview capability. Includes file naming, batch export controls, and progress indication. Features success/error feedback and download management."
        notes: "Should handle large exports gracefully and provide clear progress feedback."
        role: "Enables users to extract and save their work in various formats for external use."

      UV_SETTINGS:
        title: "Settings Panel"
        extendedDescription: "Configuration interface for workspace and system settings. Includes visualization preferences, chat behavior settings, and interface customization options. Features apply/reset controls and setting preview where applicable."
        notes: "Settings should persist across sessions and provide immediate feedback when changed."
        role: "Allows users to customize their working environment and system behavior preferences."

    globalSharedViews:
      GV_HEADER:
        title: "Global Header"
        extendedDescription: "Top navigation bar containing project title, main navigation menu, session status, and quick actions. Includes user preferences access and help system trigger. Features breadcrumb navigation for current context."
        notes: "Should remain accessible at all times and clearly indicate current system state."
        role: "Provides consistent navigation and system status across all views."
        sharedByViews: ["UV_LANDING", "UV_WORKSPACE", "UV_SETTINGS", "UV_EXPORT"]
        relativePosition: "Fixed at top of viewport"

      GV_TOOLBAR:
        title: "Tool Control Bar"
        extendedDescription: "Context-sensitive toolbar providing relevant actions for current view and selected elements. Includes common operations, view controls, and quick settings access. Features clear icons with tooltips and keyboard shortcut indicators."
        notes: "Must update dynamically based on context and maintain consistent positioning."
        role: "Provides quick access to context-relevant tools and actions."
        sharedByViews: ["UV_WORKSPACE", "UV_GRAPH"]
        relativePosition: "Below header, adjusts based on view context"

      GV_STATUS:
        title: "Status Bar"
        extendedDescription: "Bottom information bar showing system status, current operation progress, and quick metrics. Includes error/warning notifications and background task indicators. Features expandable details for additional information."
        notes: "Should provide clear, non-intrusive feedback without disrupting workflow."
        role: "Communicates system state and operation status to users."
        sharedByViews: ["UV_WORKSPACE", "UV_CHAT", "UV_GRAPH", "UV_EXPORT"]
        relativePosition: "Fixed at bottom of viewport"

      GV_HELP:
        title: "Help System"
        extendedDescription: "Contextual help overlay system providing feature guidance, keyboard shortcuts, and best practices. Includes interactive tutorials, tooltips, and documentation access. Features search capability and quick navigation."
        notes: "Should be easily accessible but non-intrusive during normal operation."
        role: "Provides user assistance and feature documentation."
        sharedByViews: ["UV_LANDING", "UV_WORKSPACE", "UV_CHAT", "UV_GRAPH", "UV_EXPORT", "UV_SETTINGS"]
        relativePosition: "Overlay system, activated on demand"

crossLinks: - sourceViewId: "UV_LANDING"
targetViewId: "UV_WORKSPACE"
intent: "Begin Session"
actionDescription: "User completes initial configuration and starts new session"

    - sourceViewId: "UV_WORKSPACE"
      targetViewId: "UV_CHAT"
      intent: "Input Processing"
      actionDescription: "User enters natural language input for processing"

    - sourceViewId: "UV_CHAT"
      targetViewId: "UV_GRAPH"
      intent: "Visualization Update"
      actionDescription: "System updates graph based on processed input"

    - sourceViewId: "UV_WORKSPACE"
      targetViewId: "UV_EXPORT"
      intent: "Export Results"
      actionDescription: "User initiates export of current work"

    - sourceViewId: "UV_WORKSPACE"
      targetViewId: "UV_SETTINGS"
      intent: "Configure System"
      actionDescription: "User accesses system configuration"

    - sourceViewId: "GV_HEADER"
      targetViewId: "UV_SETTINGS"
      intent: "Quick Settings"
      actionDescription: "User accesses settings from global header"

    - sourceViewId: "GV_TOOLBAR"
      targetViewId: "UV_GRAPH"
      intent: "View Control"
      actionDescription: "User manipulates graph view using toolbar controls"

    - sourceViewId: "GV_HELP"
      targetViewId: "UV_WORKSPACE"
      intent: "Feature Guidance"
      actionDescription: "User accesses contextual help for current view"
