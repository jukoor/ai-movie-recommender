import { FC, useEffect } from "react";
import { useLanguage } from "../../../context/LanguageContext";

interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: "summary" | "summary_large_image" | "app" | "player";
  canonical?: string;
}

export const MetaTags: FC<MetaTagsProps> = ({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  twitterCard = "summary_large_image",
  canonical,
}) => {
  const { t } = useLanguage();
  const metaT = t.meta;

  useEffect(() => {
    // Note: Document title is handled by PageTitle component
    // This component only manages meta tags

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description || metaT.description);
    }

    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute("content", keywords || metaT.keywords);
    }

    // Update html lang attribute
    document.documentElement.lang = metaT.language;

    // Update or create Open Graph meta tags
    const updateOrCreateMetaTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    // Open Graph tags
    updateOrCreateMetaTag("og:title", ogTitle || title || metaT.title);
    updateOrCreateMetaTag(
      "og:description",
      ogDescription || description || metaT.description
    );
    if (ogImage) {
      updateOrCreateMetaTag("og:image", ogImage);
    }
    if (ogUrl) {
      updateOrCreateMetaTag("og:url", ogUrl);
    }

    // Twitter Card tags
    const updateOrCreateTwitterTag = (name: string, content: string) => {
      let tag = document.querySelector(`meta[property="twitter:${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", `twitter:${name}`);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    updateOrCreateTwitterTag("card", twitterCard);
    updateOrCreateTwitterTag("title", ogTitle || title || metaT.title);
    updateOrCreateTwitterTag(
      "description",
      ogDescription || description || metaT.description
    );
    if (ogImage) {
      updateOrCreateTwitterTag("image", ogImage);
    }
    if (ogUrl) {
      updateOrCreateTwitterTag("url", ogUrl);
    }

    // Update canonical link
    if (canonical) {
      let canonicalLink = document.querySelector(
        'link[rel="canonical"]'
      ) as HTMLLinkElement;
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.href = canonical;
    }
  }, [
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl,
    twitterCard,
    canonical,
    metaT,
  ]);

  return null;
};
