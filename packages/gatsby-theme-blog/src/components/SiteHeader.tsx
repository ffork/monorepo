import { graphql, useStaticQuery } from "gatsby";
import { SiteHeaderNav } from "./SiteHeaderNav";
import { SiteHeaderTitle } from "./SiteHeaderTitle";

type SiteHeaderProps = {
  isPostPage?: boolean;
};

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  isPostPage = false,
}) => {
  const {
    site: {
      siteMetadata: { title, nav: navItems },
    },
  } = useStaticQuery<{
    site: { siteMetadata: Pick<SiteMetadata, "nav" | "title"> };
  }>(graphql`
    query {
      site {
        siteMetadata {
          title
          nav {
            href
            title
          }
        }
      }
    }
  `);

  return (
    <header className="flex items-center flex-wrap justify-between mt-10 mb-24 h-12">
      <SiteHeaderTitle title={title} isPostPage={isPostPage} />
      <SiteHeaderNav items={navItems} />
    </header>
  );
};
