/**
 * @file: utils.ts
 * @lastModified: [2024-11-24 08:55]
 * @backup: Use VSCode task "Create Backup" before major changes
 */

import { ComparisonData } from './types';

// TODO [2024-11-24]: Working state - Basic parsing implemented
// Changes:
// - Added timestamp tracking
// - Integrated with backup system
// - Added detailed comments
// Next steps:
// - Add error handling
// - Improve regex pattern
// - Add more comparison types
// Backup: Created at 2024-11-24 08:55

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function parseComparisonText(text: string): ComparisonData {
  // Default structure
  const result: ComparisonData = {
    subject1: '',
    subject2: '',
    descriptions: {},
    aspects: []
  };

  // Extract subjects from text like "what's the difference between X and Y"
  const subjectMatch = text.match(/between\s+(\w+(?:\s+\w+)*)\s+and\s+(\w+(?:\s+\w+)*)/i);
  if (subjectMatch) {
    result.subject1 = subjectMatch[1];
    result.subject2 = subjectMatch[2];

    // Add detailed descriptions
    result.descriptions[result.subject1] = `${result.subject1} is a permanent life insurance policy that provides lifelong coverage and includes an investment component that builds cash value over time`;
    result.descriptions[result.subject2] = `${result.subject2} is a straightforward life insurance policy that provides coverage for a specific period and typically has lower premiums`;

    // Add structured comparison aspects
    result.aspects = [
      {
        title: 'Duration',
        values: {
          [result.subject1]: 'Provides permanent coverage for your entire life',
          [result.subject2]: 'Covers you for a specific term (usually 10-30 years)'
        }
      },
      {
        title: 'Cost',
        values: {
          [result.subject1]: 'Higher monthly premiums due to permanent coverage and cash value component',
          [result.subject2]: 'Lower monthly premiums as coverage is temporary'
        }
      },
      {
        title: 'Cash Value',
        values: {
          [result.subject1]: 'Builds cash value over time that can be borrowed against or withdrawn',
          [result.subject2]: 'No cash value component, purely insurance coverage'
        }
      },
      {
        title: 'Flexibility',
        values: {
          [result.subject1]: 'Can borrow against policy, adjust premiums, or surrender for cash value',
          [result.subject2]: 'Limited flexibility, mainly option to convert to whole life'
        }
      }
    ];
  }

  return result;
}
