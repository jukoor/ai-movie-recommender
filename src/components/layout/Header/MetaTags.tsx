import { FC, useEffect } from "react";
import { metaTranslations } from "../../../translations";

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
    updateOrCreateMetaTag("og:title", ogTitle || title || t.title);
    updateOrCreateMetaTag(
      "og:description",
      ogDescription || description || t.description
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
    updateOrCreateTwitterTag("title", ogTitle || title || t.title);
    updateOrCreateTwitterTag(
      "description",
      ogDescription || description || t.description
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
    t,
  ]);

  return null;
};
