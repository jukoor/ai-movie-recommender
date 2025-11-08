import enTranslations from "./en.json";
import deTranslations from "./de.json";

// Export both translation objects
export { enTranslations, deTranslations };

// Export default (English) for backward compatibility
export const t = enTranslations;
export default enTranslations;

// Export individual sections for convenience (English by default for backward compatibility)
export const metaTranslations = enTranslations.meta;
export const headerTranslations = enTranslations.header;
export const footerTranslations = enTranslations.footer;
export const homeTranslations = enTranslations.home;
export const aboutTranslations = enTranslations.about;
export const byMoodTranslations = enTranslations.byMood;
export const favoritesTranslations = enTranslations.favorites;
export const aiRecommenderTranslations = enTranslations.aiRecommender;
export const movieCardTranslations = enTranslations.movieCard;
export const loginDialogTranslations = enTranslations.loginDialog;
export const deleteDialogTranslations = enTranslations.deleteDialog;
export const commonTranslations = enTranslations.common;
