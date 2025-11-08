import { FC, useEffect } from "react";
import { metaTranslations } from "../../../translations";

interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string;
}

export const MetaTags: FC<MetaTagsProps> = ({
  title,
  description,
  keywords,
}) => {
  const t = metaTranslations;

  useEffect(() => {
    // Update document title
    const pageTitle = title || t.title;
    document.title = pageTitle;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description || t.description);
    }

    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute("content", keywords || t.keywords);
    }

    // Update html lang attribute
    document.documentElement.lang = t.language;
  }, [title, description, keywords, t]);

  return null;
};
