# Quick Testing Reference

## 🚀 Running Tests

```bash
npm test              # Watch mode
npm run test:ui       # Visual UI interface
npm run test:coverage # Coverage report
```

## 📝 Basic Test Structure

```tsx
import { describe, it, expect } from "vitest";

describe("Feature name", () => {
  it("does something", () => {
    expect(result).toBe(expected);
  });
});
```

## 🎨 Component Testing

```tsx
import { render, screen } from "../test/test-utils"; // Use custom render!
import { MyComponent } from "./MyComponent";

it("renders correctly", () => {
  render(<MyComponent title="Hello" />);

  expect(screen.getByText("Hello")).toBeInTheDocument();
  expect(screen.getByRole("button")).toBeEnabled();
});
```

## 🔍 Common Queries

```tsx
// By role (preferred)
screen.getByRole("button", { name: "Submit" });
screen.getByRole("heading", { level: 1 });

// By text
screen.getByText("Welcome");
screen.getByText(/hello/i); // regex, case-insensitive

// By label (for forms)
screen.getByLabelText("Email");

// By test id (last resort)
screen.getByTestId("custom-element");
```

## ✅ Common Assertions

```tsx
// Existence
expect(element).toBeInTheDocument();
expect(element).toBeVisible();
expect(element).not.toBeInTheDocument();

// Content
expect(element).toHaveTextContent("Hello");
expect(element).toContainHTML("<span>");

// Attributes
expect(element).toHaveAttribute("href", "/about");
expect(element).toHaveClass("active");

// States
expect(button).toBeEnabled();
expect(button).toBeDisabled();
expect(input).toHaveValue("test@example.com");
```

## 👆 User Interactions

```tsx
import { userEvent } from "@testing-library/user-event";

it("handles clicks", async () => {
  const user = userEvent.setup();
  render(<MyButton />);

  await user.click(screen.getByRole("button"));

  expect(screen.getByText("Clicked!")).toBeInTheDocument();
});

it("handles typing", async () => {
  const user = userEvent.setup();
  render(<MyInput />);

  await user.type(screen.getByRole("textbox"), "Hello");

  expect(screen.getByRole("textbox")).toHaveValue("Hello");
});
```

## ⏱️ Async Testing

```tsx
import { waitFor } from "@testing-library/react";

it("loads data", async () => {
  render(<AsyncComponent />);

  // Wait for element to appear
  await waitFor(() => {
    expect(screen.getByText("Loaded")).toBeInTheDocument();
  });
});

// Or use findBy (combines getBy + waitFor)
const element = await screen.findByText("Loaded");
expect(element).toBeInTheDocument();
```

## 🎭 Mocking

```tsx
import { vi } from "vitest";

// Mock function
const mockFn = vi.fn();
mockFn.mockReturnValue("result");
mockFn.mockResolvedValue(Promise.resolve("result"));

// Mock module
vi.mock("axios", () => ({
  default: {
    get: vi.fn().mockResolvedValue({ data: {} }),
  },
}));
```

## 🌐 With Context

```tsx
// Use our custom render from test-utils!
import { render } from "../test/test-utils";

// It already wraps with LanguageContext
render(<MyComponent />);
```

## 💡 Tips

1. **Test user behavior**, not implementation
2. **Use semantic queries** (role, label, text)
3. **One assertion per test** when possible
4. **Descriptive test names** that explain the behavior
5. **Use test:ui** for debugging

## 📚 More Info

See [TESTING.md](./TESTING.md) for detailed guide
