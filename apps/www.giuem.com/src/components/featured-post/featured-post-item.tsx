import { Post } from '../../types/post';
import { getPostUrl } from '../../utils/get-post-url';
import { Link } from '../link';

export type FeaturedPostItemProps = {
  post: Post;
};

// @TODO: optional excerpt

export const FeaturedPostItem: React.FC<FeaturedPostItemProps> = ({ post }) => {
  return (
    <article className="mt-16 mb-12 first:mt-0">
      <h2 className="sm:text-2xl text-2xl font-semibold">
        <Link
          className="sm:border-b-2 sm:border-gray-200 sm:hover:border-indigo-400 hover:bg-indigo-50 sm:dark:border-gray-700 sm:dark:hover:border-indigo-600 dark:hover:bg-indigo-900 transition-colors"
          href={getPostUrl(post.fields.slug)}
        >
          {post.frontmatter.title}
        </Link>
      </h2>
      {post.excerpt && (
        <h3 className="sm:text-lg sm:mt-4 text-base mt-3 text-gray-600 dark:text-gray-300 text-justify">
          {post.excerpt}
        </h3>
      )}
    </article>
  );
};
