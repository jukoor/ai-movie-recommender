# Translation System Documentation

## Overview

The application now has a centralized translation system using a single JSON file that makes it easy to translate text content into multiple languages. All text content has been extracted into a structured translation file.

## Structure

```
src/translations/
├── index.ts              # TypeScript helper with exports
└── en.json               # English translations (all content)
```

The `en.json` file contains all translations organized by section:

- `meta` - HTML meta tags (title, description, keywords, language)
- `header` - Header/Navigation translations
- `footer` - Footer translations
- `home` - Home page translations
- `about` - About page translations
- `byMood` - By Mood page translations
- `favorites` - Favorites page translations
- `aiRecommender` - AI Recommender component translations
- `movieCard` - Movie Card component translations
- `loginDialog` - Login Dialog translations
- `deleteDialog` - Delete Dialog translations
- `common` - Common/shared translations

## Usage

### Importing Translations

```typescript
// Import specific section translations
import { headerTranslations, footerTranslations } from "../translations";

// Or import the full translations object
import translations from "../translations";
```

### Using Translations in Components

```typescript
import { headerTranslations } from "../translations";

export const MyComponent = () => {
  const t = headerTranslations;

  return (
    <div>
      <h1>{t.navigation.home}</h1>
      <p>{t.logo.tagline}</p>
    </div>
  );
};
```

### HTML Meta Tags

The application automatically updates HTML meta tags based on the translations:

```typescript
// Meta tags are automatically set from translations
// Located in src/components/layout/Header/MetaTags.tsx

// Override meta tags for specific pages (optional):
import { MetaTags } from "./components/layout/Header/MetaTags";

<MetaTags
  title="Custom Page Title"
  description="Custom page description"
  keywords="custom, keywords"
/>;
```

The `meta` section in translations includes:

- `title` - Browser tab title and SEO title
- `description` - Page meta description for SEO
- `keywords` - SEO keywords
- `author` - Content author
- `language` - HTML lang attribute

## Adding a New Language

To add a new language (e.g., German):

1. Create a new file: `src/translations/de.json`
2. Copy the structure from `src/translations/en.json`
3. Translate all the string values (keep the keys identical)
4. Update `src/translations/index.ts` to support language switching

Example German translation (`de.json`):

```json
{
  "meta": {
    "title": "PopcornAI - KI-gestützte Filmempfehlungen",
    "description": "KI-Filmempfehler - Entdecke deinen nächsten Lieblingsfilm mit KI-gestützten personalisierten Empfehlungen",
    "keywords": "KI, Film, Empfehlung, Kino, Filmentdeckung",
    "author": "Julian Orth",
    "language": "de"
  },
  "header": {
    "navigation": {
      "home": "Startseite",
      "byMood": "Nach Stimmung",
      "favorites": "Favoriten",
      "about": "Über uns"
    },
    "auth": {
      "login": "Anmelden",
      "logout": "Abmelden"
    }
  }
}
```

## Translation Structure Overview

### en.json Structure

The JSON file is organized hierarchically:

```json
{
  "header": {
    "navigation": { ... },
    "auth": { ... },
    "ariaLabels": { ... },
    "toast": { ... },
    "logo": { ... }
  },
  "footer": { ... },
  "home": {
    "hero": { ... },
    "features": { ... },
    "aiPicks": { ... }
  }
  // ... other sections
}
```

## Best Practices

1. **Keep keys consistent** across all language files
2. **Use nested objects** for logical grouping in the JSON structure
3. **Include context** in key names (e.g., `auth.loginButton` not just `button`)
4. **Document pluralization rules** for complex languages
5. **Test all translations** in the UI to ensure proper formatting
6. **Validate JSON** syntax after editing translation files
7. **Use a single source of truth** - the JSON file

## Implementing Language Switching

To implement dynamic language switching:

```typescript
// 1. Load multiple language files
import enTranslations from "./translations/en.json";
import deTranslations from "./translations/de.json";

// 2. Create a language context
import { createContext, useState } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  const translations = {
    en: enTranslations,
    de: deTranslations,
    // ... other languages
  };

  const getTranslation = (section) => translations[language][section];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
        getTranslation,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

// 3. Use in components
const { t, language, setLanguage } = useContext(LanguageContext);

// 4. Switch languages
<button onClick={() => setLanguage("de")}>Deutsch</button>;
```

## Benefits of JSON Format

- **Easy to edit** - Standard JSON format works with any editor
- **Version control friendly** - Single file is easier to track changes
- **Tooling support** - Many translation management tools support JSON
- **Validation** - JSON schema validation ensures structure consistency
- **No build required** - Direct import in TypeScript/JavaScript
- **Smaller bundle** - Single JSON file vs multiple TypeScript modules

## Future Enhancements

- [ ] Add language detection based on browser settings
- [ ] Implement RTL (Right-to-Left) support for Arabic, Hebrew, etc.
- [ ] Add date/number formatting based on locale
- [ ] Create a translation management interface
- [ ] Add missing translations detection in development mode
- [ ] Integrate with translation services (Google Translate API, etc.)
- [ ] Add pluralization helper functions for complex cases
