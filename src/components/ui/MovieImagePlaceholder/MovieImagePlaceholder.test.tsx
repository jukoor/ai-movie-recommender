import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MovieImagePlaceholder } from "./MovieImagePlaceholder";
import { LanguageContext } from "../../../context/LanguageContext";
import enTranslations from "../../../translations/en.json";

// Mock language context with full translations
const mockLanguageContext = {
  t: enTranslations,
  language: "en" as const,
  setLanguage: () => {},
};

// Wrapper component that provides the LanguageContext
const renderWithLanguageContext = (ui: React.ReactElement) => {
  return render(
    <LanguageContext.Provider value={mockLanguageContext}>
      {ui}
    </LanguageContext.Provider>
  );
};

describe("MovieImagePlaceholder", () => {
  it("renders with title and default poster type", () => {
    renderWithLanguageContext(<MovieImagePlaceholder title="Test Movie" />);

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "aria-label",
      "Placeholder for Test Movie"
    );
    expect(screen.getByText("Test Movie")).toBeInTheDocument();
    expect(screen.getByText("No Image Available")).toBeInTheDocument();
  });

  it("renders with backdrop type", () => {
    renderWithLanguageContext(
      <MovieImagePlaceholder title="Backdrop Movie" type="backdrop" />
    );

    const placeholder = screen.getByRole("img");
    expect(placeholder).toHaveClass("aspect-video");
    expect(placeholder).not.toHaveClass("h-full");
  });

  it("renders with poster type", () => {
    renderWithLanguageContext(
      <MovieImagePlaceholder title="Poster Movie" type="poster" />
    );

    const placeholder = screen.getByRole("img");
    expect(placeholder).toHaveClass("h-full");
  });

  it("applies custom className", () => {
    renderWithLanguageContext(
      <MovieImagePlaceholder
        title="Custom Class Movie"
        className="custom-class"
      />
    );

    const placeholder = screen.getByRole("img");
    expect(placeholder).toHaveClass("custom-class");
  });

  it("displays the film icon", () => {
    renderWithLanguageContext(<MovieImagePlaceholder title="Icon Test" />);

    // The Film icon should be present and hidden from screen readers
    const filmIcon = screen
      .getByRole("img")
      .querySelector('[aria-hidden="true"]');
    expect(filmIcon).toBeInTheDocument();
  });
});
