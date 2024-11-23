# Development Guidelines

## Overview

This document outlines the development standards, best practices, and workflows for the Visual Text Transformer project.

## 1. Code Standards

### 1.1 TypeScript Guidelines

```typescript
// Use explicit types
interface User {
  id: string;
  email: string;
  preferences: UserPreferences;
}

// Use type unions instead of any
type VisualizationType = 'wordcloud' | 'chart' | 'mindmap';

// Use enums for fixed values
enum Status {
  DRAFT = 'draft',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  ERROR = 'error',
}

// Use async/await consistently
async function fetchUser(id: string): Promise<User> {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw new UserNotFoundError(id);
  }
}
```

### 1.2 React Guidelines

```typescript
// Functional Components
const VisualizationCard: React.FC<VisualizationProps> = ({
  data,
  onUpdate,
  className
}) => {
  // Use hooks at the top level
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  // Extract complex logic to custom hooks
  const { processData, error } = useDataProcessing(data);

  // Use memoization for expensive calculations
  const processedData = useMemo(() => processData(), [data]);

  return (
    <div className={cn('visualization-card', className)}>
      {/* Component JSX */}
    </div>
  );
};

// Custom Hooks
function useDataProcessing(data: VisualizationData) {
  const [error, setError] = useState<Error | null>(null);

  const processData = useCallback(() => {
    try {
      // Processing logic
      return processedData;
    } catch (err) {
      setError(err);
      return null;
    }
  }, [data]);

  return { processData, error };
}
```

### 1.3 CSS/Tailwind Guidelines

```typescript
// Use consistent class ordering
const buttonClasses = cn(
  // Layout
  'flex items-center justify-center',
  // Sizing
  'h-10 px-4',
  // Typography
  'text-sm font-medium',
  // Colors
  'bg-blue-500 text-white',
  // Borders
  'rounded-lg border border-transparent',
  // States
  'hover:bg-blue-600 focus:outline-none focus:ring-2',
  // Transitions
  'transition-colors duration-200',
  // Variants
  variant === 'secondary' && 'bg-gray-100 text-gray-900',
  // Custom classes
  className
);
```

## 2. Project Structure

### 2.1 Directory Organization

```
src/
├── app/                 # Next.js app directory
├── components/          # React components
│   ├── ui/             # Base UI components
│   ├── features/       # Feature-specific components
│   └── layouts/        # Layout components
├── hooks/              # Custom React hooks
├── lib/               # Utility functions
├── types/             # TypeScript types
└── styles/            # Global styles
```

### 2.2 Component Organization

```typescript
// Component Structure
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface Props {
  // Props interface
}

export function ComponentName({ prop1, prop2 }: Props) {
  // State
  const [state, setState] = useState();

  // Effects
  useEffect(() => {
    // Side effects
  }, [dependencies]);

  // Event handlers
  const handleEvent = () => {
    // Event logic
  };

  // Render helpers
  const renderItem = (item: Item) => {
    return (
      // JSX
    );
  };

  // Main render
  return (
    // JSX
  );
}
```

## 3. State Management

### 3.1 Local State

```typescript
// Use useState for simple state
const [value, setValue] = useState<string>('');

// Use useReducer for complex state
interface State {
  status: Status;
  data: VisualizationData | null;
  error: Error | null;
}

type Action =
  | { type: 'LOADING' }
  | { type: 'SUCCESS'; payload: VisualizationData }
  | { type: 'ERROR'; payload: Error };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, status: Status.LOADING };
    case 'SUCCESS':
      return {
        status: Status.SUCCESS,
        data: action.payload,
        error: null,
      };
    case 'ERROR':
      return {
        status: Status.ERROR,
        data: null,
        error: action.payload,
      };
    default:
      return state;
  }
};
```

### 3.2 Global State

```typescript
// Context Provider
interface AppState {
  theme: Theme;
  user: User | null;
  visualizations: Visualization[];
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => ({
    state,
    dispatch
  }), [state]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook for using context
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
```

## 4. Testing

### 4.1 Unit Tests

```typescript
// Component Test
describe('VisualizationCard', () => {
  it('renders correctly', () => {
    render(<VisualizationCard data={mockData} />);
    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('handles user interaction', async () => {
    const onUpdate = jest.fn();
    render(<VisualizationCard data={mockData} onUpdate={onUpdate} />);

    await userEvent.click(screen.getByRole('button'));
    expect(onUpdate).toHaveBeenCalled();
  });
});

// Hook Test
describe('useDataProcessing', () => {
  it('processes data correctly', () => {
    const { result } = renderHook(() => useDataProcessing(mockData));
    expect(result.current.processData()).toEqual(expectedResult);
  });

  it('handles errors', () => {
    const { result } = renderHook(() => useDataProcessing(invalidData));
    expect(result.current.error).toBeInstanceOf(Error);
  });
});
```

### 4.2 Integration Tests

```typescript
// API Integration Test
describe('Visualization API', () => {
  it('creates visualization', async () => {
    const response = await request(app).post('/api/visualizations').send(mockVisualizationData);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: expect.any(String),
      status: 'processing',
    });
  });
});
```

## 5. Performance Guidelines

### 5.1 React Performance

```typescript
// Use memo for expensive components
const ExpensiveComponent = memo(function ExpensiveComponent({ data }: Props) {
  return (
    // JSX
  );
}, (prevProps, nextProps) => {
  return isEqual(prevProps.data, nextProps.data);
});

// Use callback for handlers
const handleUpdate = useCallback((id: string, data: UpdateData) => {
  // Update logic
}, [dependencies]);

// Use transition for non-urgent updates
const [isPending, startTransition] = useTransition();
const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  startTransition(() => {
    setSearchResults(search(e.target.value));
  });
};
```

### 5.2 Data Loading

```typescript
// Implement data loading patterns
const useDataLoader = <T>(loader: () => Promise<T>, dependencies: any[] = []) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      try {
        setIsLoading(true);
        const result = await loader();
        if (mounted) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err);
          setData(null);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, dependencies);

  return { data, isLoading, error };
};
```

## 6. Error Handling

### 6.1 Error Boundaries

```typescript
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to service
    logger.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

### 6.2 API Error Handling

```typescript
// Custom error classes
class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Error handling middleware
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      error: {
        message: err.message,
        code: err.code,
      },
    });
  }

  // Default error response
  res.status(500).json({
    error: {
      message: 'Internal server error',
      code: 'INTERNAL_ERROR',
    },
  });
};
```

## 7. Documentation

### 7.1 Code Documentation

```typescript
/**
 * Processes visualization data and generates visual output
 * @param data - The input data to process
 * @param options - Processing options
 * @returns Processed visualization data
 * @throws {ValidationError} When input data is invalid
 * @throws {ProcessingError} When processing fails
 */
async function processVisualization(
  data: VisualizationData,
  options: ProcessingOptions
): Promise<ProcessedVisualization> {
  // Implementation
}
```

### 7.2 Component Documentation

````typescript
/**
 * VisualizationCard displays a visualization with controls
 *
 * @example
 * ```tsx
 * <VisualizationCard
 *   data={visualizationData}
 *   onUpdate={handleUpdate}
 *   className="custom-class"
 * />
 * ```
 */
interface VisualizationCardProps {
  /** The visualization data to display */
  data: VisualizationData;
  /** Callback when visualization is updated */
  onUpdate?: (data: VisualizationData) => void;
  /** Additional CSS classes */
  className?: string;
}
````

## 8. Git Workflow

### 8.1 Branch Naming

```
feature/add-visualization-export
bugfix/fix-processing-error
refactor/improve-performance
docs/update-api-docs
```

### 8.2 Commit Messages

```
feat: add visualization export functionality
fix: resolve processing error for large inputs
refactor: improve visualization rendering performance
docs: update API documentation
test: add tests for export functionality
```

## 9. Code Review

### 9.1 Review Checklist

1. Code Quality
   - Follows style guide
   - No unnecessary complexity
   - DRY principles followed
2. Testing
   - Unit tests included
   - Edge cases covered
   - Tests pass
3. Performance
   - No obvious performance issues
   - Proper memoization used
   - Resource usage considered
4. Security
   - Input validation
   - XSS prevention
   - Authentication/Authorization

### 9.2 Review Process

1. Create PR with description
2. Run automated checks
3. Request reviews
4. Address feedback
5. Update tests if needed
6. Merge when approved

## 10. Deployment

### 10.1 Pre-deployment Checklist

1. All tests pass
2. Build succeeds
3. No lint errors
4. Documentation updated
5. Change log updated
6. Performance verified
7. Security scan completed

### 10.2 Deployment Process

1. Create release branch
2. Run final tests
3. Build production assets
4. Deploy to staging
5. Verify staging
6. Deploy to production
7. Monitor metrics
