import { KeyboardShortcut } from './types';

export const getDefaultShortcuts = (handlers: {
  onTransform: () => void;
  onExport?: () => void;
  onReset?: () => void;
}): KeyboardShortcut[] => [
  // Transform shortcut
  {
    key: 'Enter',
    handler: handlers.onTransform,
    ctrl: true,
    description: 'Transform text to visualization',
  },

  // Export shortcut (if handler provided)
  ...(handlers.onExport
    ? [
        {
          key: 's',
          handler: handlers.onExport,
          ctrl: true,
          description: 'Export visualization',
        },
      ]
    : []),

  // Reset shortcut (if handler provided)
  ...(handlers.onReset
    ? [
        {
          key: 'r',
          handler: handlers.onReset,
          ctrl: true,
          description: 'Reset to default state',
        },
      ]
    : []),
];

export const getShortcutDisplay = (shortcut: KeyboardShortcut): string => {
  const parts: string[] = [];

  if (shortcut.ctrl) {
    parts.push('Ctrl');
  }
  if (shortcut.alt) {
    parts.push('Alt');
  }
  if (shortcut.shift) {
    parts.push('Shift');
  }

  parts.push(shortcut.key.toUpperCase());

  return parts.join(' + ');
};

export const isShortcutMatch = (event: KeyboardEvent, shortcut: KeyboardShortcut): boolean => {
  const keyMatches = event.key.toLowerCase() === shortcut.key.toLowerCase();
  const ctrlMatches = shortcut.ctrl ? event.ctrlKey || event.metaKey : true;
  const altMatches = shortcut.alt ? event.altKey : true;
  const shiftMatches = shortcut.shift ? event.shiftKey : true;

  return keyMatches && ctrlMatches && altMatches && shiftMatches;
};

export const getShortcutHints = (shortcuts: KeyboardShortcut[]): string[] => {
  return shortcuts.map(shortcut => {
    const display = getShortcutDisplay(shortcut);
    return `${display}: ${(shortcut as any).description || 'No description'}`;
  });
};

// Helper to check if we're in an input field
export const isInputElement = (element: HTMLElement): boolean => {
  const tagName = element.tagName.toLowerCase();
  return tagName === 'input' || tagName === 'textarea' || element.isContentEditable;
};

// Helper to check if shortcut should be prevented in current context
export const shouldPreventShortcut = (
  event: KeyboardEvent,
  shortcut: KeyboardShortcut
): boolean => {
  const target = event.target as HTMLElement;

  // Always allow Ctrl/Cmd + Enter in text areas
  if (
    shortcut.key.toLowerCase() === 'enter' &&
    shortcut.ctrl &&
    target.tagName.toLowerCase() === 'textarea'
  ) {
    return false;
  }

  // Prevent other shortcuts in input elements
  return isInputElement(target);
};
