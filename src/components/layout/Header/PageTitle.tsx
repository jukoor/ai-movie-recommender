import { FC, useEffect } from "react";
import { useLanguage } from "../../../context/LanguageContext";

interface PageTitleProps {
  title: string;
}

export const PageTitle: FC<PageTitleProps> = ({ title }) => {
  const { t } = useLanguage();
  const titleAppendix = t.meta.titleAppendix;

  useEffect(() => {
    document.title = `${title} ${titleAppendix}`;
  }, [title, titleAppendix]);

  return <></>;
};
