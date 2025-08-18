import { FC, useEffect } from "react";

interface PageTitleProps {
  title: string;
}

export const PageTitle: FC<PageTitleProps> = ({ title }) => {
  const titleAppendix = "// Popcorn AI";

  useEffect(() => {
    document.title = `${title} ${titleAppendix}`;
  }, [title]);

  return <></>;
};
