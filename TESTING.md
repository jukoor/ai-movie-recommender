# Testing Guide

This project uses **Vitest** and **React Testing Library** for testing. This setup provides a fast, modern testing experience that integrates seamlessly with our Vite-based build.

## 🚀 Quick Start

### Running Tests

```bash
# Run all tests in watch mode
npm test

# Run tests with UI (visual interface)
npm run test:ui

# Generate coverage report
npm run test:coverage
```

## 📁 Test Structure

Tests are located next to the files they test:
```
src/
  components/
    ui/
      MovieImagePlaceholder/
        MovieImagePlaceholder.tsx
        MovieImagePlaceholder.test.tsx  ✅
  utils/
    api.tsx
    api.test.tsx  ✅
```

## 🧪 What to Test

### Components
- **Rendering**: Does the component render correctly with different props?
- **User Interactions**: Does the component respond to clicks, inputs, etc.?
- **Conditional Rendering**: Do different states show the correct UI?
- **Accessibility**: Are ARIA attributes and roles correct?

### Utilities
- **Function Logic**: Do utility functions return expected results?
- **Error Handling**: Are errors handled gracefully?
- **Edge Cases**: What happens with null, undefined, empty values?

## 📝 Writing Tests

### Component Test Example

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MyComponent } from "./MyComponent";

describe("MyComponent", () => {
  it("renders with correct text", () => {
    render(<MyComponent title="Hello" />);
    
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("handles button clicks", async () => {
    const { user } = render(<MyComponent />);
    const button = screen.getByRole("button");
    
    await user.click(button);
    
    expect(screen.getByText("Clicked!")).toBeInTheDocument();
  });
});
```

### Utility Test Example

```tsx
import { describe, it, expect } from "vitest";
import { formatDate } from "./dateUtils";

describe("formatDate", () => {
  it("formats date correctly", () => {
    const result = formatDate("2024-01-15");
    expect(result).toBe("January 15, 2024");
  });

  it("handles invalid dates", () => {
    const result = formatDate("invalid");
    expect(result).toBe("Invalid Date");
  });
});
```

### Testing with Context

When components use context (like `LanguageContext`), wrap them in a provider:

```tsx
import { LanguageContext } from "../../../context/LanguageContext";
import enTranslations from "../../../translations/en.json";

const mockContext = {
  t: enTranslations,
  language: "en" as const,
  setLanguage: () => {},
};

const renderWithContext = (ui: React.ReactElement) => {
  return render(
    <LanguageContext.Provider value={mockContext}>
      {ui}
    </LanguageContext.Provider>
  );
};

// Then use it
renderWithContext(<MyComponent />);
```

## 🎯 Testing Best Practices

### 1. Test User Behavior, Not Implementation
✅ **Good**: Test what the user sees and does
```tsx
expect(screen.getByText("Welcome")).toBeInTheDocument();
```

❌ **Bad**: Test internal state or implementation details
```tsx
expect(component.state.isLoading).toBe(false);
```

### 2. Use Semantic Queries
Prefer queries that reflect how users interact:
- `getByRole()` - for buttons, links, headings
- `getByLabelText()` - for form inputs
- `getByText()` - for visible text
- `getByTestId()` - as last resort

### 3. Keep Tests Simple and Focused
Each test should verify **one thing**:
```tsx
it("displays error message on invalid input", () => {
  // Test only the error message behavior
});

it("disables submit button on invalid input", () => {
  // Test only the button state
});
```

### 4. Use Descriptive Test Names
```tsx
// ✅ Clear and descriptive
it("displays loading spinner while fetching movies")

// ❌ Vague
it("works correctly")
```

## 🔧 Common Testing Patterns

### Mocking API Calls
```tsx
import { vi } from "vitest";
import axios from "axios";

vi.mock("axios");
const mockedAxios = vi.mocked(axios);

it("fetches data successfully", async () => {
  mockedAxios.get.mockResolvedValue({ data: { movies: [] } });
  
  // Test your component/function
});
```

### Testing Async Behavior
```tsx
import { waitFor } from "@testing-library/react";

it("loads data asynchronously", async () => {
  render(<AsyncComponent />);
  
  await waitFor(() => {
    expect(screen.getByText("Loaded!")).toBeInTheDocument();
  });
});
```

### Testing User Events
```tsx
import { userEvent } from "@testing-library/user-event";

it("handles form submission", async () => {
  const user = userEvent.setup();
  render(<Form />);
  
  await user.type(screen.getByLabelText("Email"), "test@example.com");
  await user.click(screen.getByRole("button", { name: "Submit" }));
  
  expect(screen.getByText("Success!")).toBeInTheDocument();
});
```

## 📊 Coverage Goals

Aim for meaningful coverage, not 100%:
- **Critical paths**: Authentication, data fetching, core features
- **Edge cases**: Error states, empty states, loading states
- **User flows**: Complete user journeys

Don't obsess over coverage numbers. Focus on testing what matters.

## 🔍 Debugging Tests

### Visual UI (Recommended)
```bash
npm run test:ui
```
Opens a browser interface where you can:
- See test results visually
- Debug failing tests
- Re-run specific tests
- View coverage

### Console Debugging
```tsx
import { screen } from "@testing-library/react";

// See the current DOM structure
screen.debug();

// Log specific elements
console.log(screen.getByRole("button"));
```

## 🚀 Extending the Test Setup

### Adding Global Test Utilities
Create helpers in `src/test/`:
```
src/test/
  setup.ts           # Global test setup
  test-utils.tsx     # Custom render functions
  mocks/             # Shared mocks
    mockData.ts
```

### Adding Custom Matchers
Add to `src/test/setup.ts`:
```tsx
import { expect } from "vitest";

expect.extend({
  toBeValidMovie(movie) {
    const pass = movie.id && movie.title;
    return {
      pass,
      message: () => `Expected ${movie} to be a valid movie`,
    };
  },
});
```

## 📚 Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [Common Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## 💡 Tips for Portfolio Projects

Since this is a portfolio project, focus on:
1. **Testing critical features** that showcase your skills
2. **Writing clean, readable tests** that demonstrate best practices
3. **Adding tests for complex logic** (API calls, state management)
4. **Including edge case tests** to show thoroughness

You don't need 100% coverage, but having **well-written tests for key features** shows professional development practices. 🎯
