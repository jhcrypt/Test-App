import { ComparisonData } from './types';

/**
 * Processes raw text input into structured comparison data
 */
export function parseComparisonText(text: string): ComparisonData | null {
  try {
    const cleanText = text.toLowerCase().trim();

    // Handle various input formats
    let subjects: string[] | null = null;

    // Format: "what's the difference between X and Y"
    // or "what is the difference between X and Y"
    if (cleanText.includes('difference between')) {
      const afterBetween = cleanText.split('difference between')[1];
      if (afterBetween) {
        subjects = afterBetween.split('and').map(s => s.trim());
      }
    }
    // Format: "differences between X and Y"
    else if (cleanText.includes('differences between')) {
      const afterBetween = cleanText.split('differences between')[1];
      if (afterBetween) {
        subjects = afterBetween.split('and').map(s => s.trim());
      }
    }
    // Format: "whats the difference in X and Y"
    else if (cleanText.includes('difference in')) {
      const afterIn = cleanText.split('difference in')[1];
      if (afterIn) {
        subjects = afterIn.split('and').map(s => s.trim());
      }
    }
    // Format: "comparing X and Y"
    else if (cleanText.includes('comparing')) {
      const match = cleanText.match(/comparing\s+([^and]+)\s+and\s+([^in\s]+)/i);
      if (match) {
        subjects = [match[1].trim(), match[2].trim()];
      }
    }

    // If we found subjects, create the comparison data
    if (subjects && subjects.length === 2 && subjects[0] && subjects[1]) {
      const [subject1, subject2] = subjects.map(s => s.charAt(0).toUpperCase() + s.slice(1));

      // Generate comparison data based on subjects
      const getComparisonData = (subject1: string, subject2: string) => {
        // Insurance comparison example
        if (subject1.includes('life') || subject2.includes('life')) {
          return {
            subject1,
            subject2,
            descriptions: {
              [subject1]: `A comprehensive overview of ${subject1.toLowerCase()}`,
              [subject2]: `A comprehensive overview of ${subject2.toLowerCase()}`,
            },
            aspects: [
              {
                title: 'Definition',
                values: {
                  [subject1]: `${subject1} is a type of life insurance that provides coverage for your entire life and includes a savings component.`,
                  [subject2]: `${subject2} provides coverage for a specific period and typically has lower premiums than whole life insurance.`,
                },
              },
              {
                title: 'Key Features',
                values: {
                  [subject1]:
                    'Permanent coverage, builds cash value, fixed premiums, potential dividends',
                  [subject2]:
                    'Temporary coverage, no cash value, lower premiums, convertible to whole life',
                },
              },
              {
                title: 'Benefits',
                values: {
                  [subject1]:
                    'Lifetime protection, investment component, tax advantages, estate planning tool',
                  [subject2]:
                    'Affordable coverage, simple structure, flexible terms, renewable options',
                },
              },
            ],
          };
        }

        // Generic comparison template
        return {
          subject1,
          subject2,
          descriptions: {
            [subject1]: `Key characteristics and features of ${subject1.toLowerCase()}`,
            [subject2]: `Key characteristics and features of ${subject2.toLowerCase()}`,
          },
          aspects: [
            {
              title: 'Definition',
              values: {
                [subject1]: `Basic characteristics and overview of ${subject1.toLowerCase()}`,
                [subject2]: `Basic characteristics and overview of ${subject2.toLowerCase()}`,
              },
            },
            {
              title: 'Key Features',
              values: {
                [subject1]: `Main features and attributes of ${subject1.toLowerCase()}`,
                [subject2]: `Main features and attributes of ${subject2.toLowerCase()}`,
              },
            },
            {
              title: 'Benefits',
              values: {
                [subject1]: `Primary advantages of ${subject1.toLowerCase()}`,
                [subject2]: `Primary advantages of ${subject2.toLowerCase()}`,
              },
            },
          ],
        };
      };

      return getComparisonData(subject1, subject2);
    }

    return null;
  } catch (error) {
    console.error('Error parsing comparison text:', error);
    return null;
  }
}

/**
 * Formats text for display by capitalizing first letter and trimming whitespace
 */
export function formatText(text: string): string {
  return text.trim().replace(/^\w/, c => c.toUpperCase());
}

/**
 * Generates a unique ID for elements
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/**
 * Debounces a function call
 */
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

/**
 * Validates comparison data structure
 */
export function validateComparisonData(data: ComparisonData): boolean {
  if (!data.subject1 || !data.subject2) return false;
  if (!data.descriptions[data.subject1] || !data.descriptions[data.subject2]) return false;
  if (!data.aspects.length) return false;

  return data.aspects.every(
    aspect => aspect.title && aspect.values[data.subject1] && aspect.values[data.subject2]
  );
}

/**
 * Extracts keywords from text
 */
export function extractKeywords(text: string): string[] {
  // Remove common words and punctuation
  const commonWords = new Set([
    'and',
    'or',
    'the',
    'a',
    'an',
    'in',
    'on',
    'at',
    'to',
    'for',
    'of',
    'with',
    'by',
  ]);

  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 2 && !commonWords.has(word));
}

/**
 * Calculates text similarity score (0-1)
 */
export function calculateSimilarity(text1: string, text2: string): number {
  const words1 = extractKeywords(text1);
  const words2 = extractKeywords(text2);

  // Create maps for word frequency
  const freq1: { [key: string]: boolean } = {};
  const freq2: { [key: string]: boolean } = {};

  words1.forEach(word => {
    freq1[word] = true;
  });
  words2.forEach(word => {
    freq2[word] = true;
  });

  // Count intersection and union
  let intersection = 0;
  let union = 0;

  // Count words in both sets
  Object.keys(freq1).forEach(word => {
    if (freq2[word]) {
      intersection++;
    }
    union++;
  });

  // Add words unique to second set
  Object.keys(freq2).forEach(word => {
    if (!freq1[word]) {
      union++;
    }
  });

  return intersection / union;
}

/**
 * Truncates text to a specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}
