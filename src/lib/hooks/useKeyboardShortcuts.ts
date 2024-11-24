/**
 * @file: useKeyboardShortcuts.ts
 * @lastModified: [2024-11-24 05:02]
 * @backup: Use VSCode task "Create Backup" before major changes
 */
import { useEffect } from 'react';
import { KeyboardShortcut } from '../types';

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      // Don't trigger shortcuts when typing in input fields
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      shortcuts.forEach(shortcut => {
        const ctrlMatch = shortcut.ctrl ? event.ctrlKey || event.metaKey : true;
        const altMatch = shortcut.alt ? event.altKey : true;
        const shiftMatch = shortcut.shift ? event.shiftKey : true;
        const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase();

        if (ctrlMatch && altMatch && shiftMatch && keyMatch) {
          event.preventDefault();
          shortcut.handler();
        }
      });
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
}
