import { render, RenderOptions } from "@testing-library/react";
import { ReactElement } from "react";
import { LanguageContext } from "../context/LanguageContext";
import enTranslations from "../translations/en.json";

/**
 * Custom render function that wraps components with required providers.
 *
 * Usage:
 *   import { render, screen } from "../test/test-utils";
 *   render(<MyComponent />);
 *
 * This automatically provides:
 * - LanguageContext with English translations
 *
 * Extend this file to add more global providers as needed (Auth, Theme, etc.)
 */

const mockLanguageContext = {
  t: enTranslations,
  language: "en" as const,
  setLanguage: () => {},
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  // Add any custom options here in the future
}

export function renderWithProviders(
  ui: ReactElement,
  options?: CustomRenderOptions
) {
  return render(
    <LanguageContext.Provider value={mockLanguageContext}>
      {ui}
    </LanguageContext.Provider>,
    options
  );
}

// Re-export everything from testing library
export * from "@testing-library/react";
export { renderWithProviders as render };
