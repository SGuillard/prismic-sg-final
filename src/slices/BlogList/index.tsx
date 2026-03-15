import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { createClient } from "@/prismicio";

/**
 * Props for `BlogList`.
 */
export type BlogListProps = SliceComponentProps<Content.BlogListSlice>;

/**
 * Component for "BlogList" Slices.
 */
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

const BlogList = async ({ slice }: BlogListProps) => {
  const client = createClient();
  const posts = await client.getAllByType("blogpost", {
    orderings: {
      field: "document.first_publication_date",
      direction: "desc",
    },
  });

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="blog-list"
    >
      <div className="blog-list__header">
        <p className="blog-list__eyebrow">{slice?.primary?.title}</p>
        {slice?.primary?.intro ? (
          <div className="blog-list__intro">
            <PrismicRichText field={slice.primary.intro} />
          </div>
        ) : null}
        <h2 className="blog-list__title">Latest blog posts</h2>
      </div>

      {posts.length > 0 ? (
        <ul className="blog-list__grid">
          {posts.map((post) => (
            <li key={post.id} className="blog-list__item">
              <article className="blog-card">
                <p className="blog-card__date">
                  {post.first_publication_date
                    ? dateFormatter.format(new Date(post.first_publication_date))
                    : "Recently published"}
                </p>
                <h3 className="blog-card__title">
                  <PrismicNextLink document={post}>
                    {post.data.meta_title || post.uid}
                  </PrismicNextLink>
                </h3>
                {post.data.meta_description ? (
                  <p className="blog-card__description">
                    {post.data.meta_description}
                  </p>
                ) : null}
                <PrismicNextLink className="blog-card__cta" document={post}>
                  Read article &rarr;
                </PrismicNextLink>
              </article>
            </li>
          ))}
        </ul>
      ) : (
        <p className="blog-list__empty">
          No blog posts are available yet. Check back soon.
        </p>
      )}

      <style>
        {`
          .blog-list {
            padding: 3rem 1.25rem;
            background: linear-gradient(180deg, #f8f8ff 0%, #ffffff 100%);
          }

          .blog-list__header {
            margin: 0 auto 2rem;
            max-width: 72rem;
          }

          .blog-list__eyebrow {
            margin: 0;
            color: #4f46e5;
            font-weight: 600;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            font-size: 0.75rem;
          }

          .blog-list__title {
            margin: 0.375rem 0 0;
            font-size: clamp(1.6rem, 2.5vw, 2.2rem);
            line-height: 1.2;
            color: #111827;
          }

          .blog-list__intro :where(p) {
            margin: 0.5rem 0 0;
            color: #4b5563;
            font-size: 0.95rem;
            line-height: 1.5;
          }

          .blog-list__grid {
            list-style: none;
            margin: 0 auto;
            padding: 0;
            max-width: 72rem;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 1rem;
          }

          .blog-card {
            height: 100%;
            border-radius: 0.9rem;
            border: 1px solid #e5e7eb;
            background: #fff;
            padding: 1.2rem;
            display: grid;
            gap: 0.7rem;
            transition: transform 150ms ease, box-shadow 150ms ease;
            box-shadow: 0 1px 2px rgba(17, 24, 39, 0.04);
          }

          .blog-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 24px rgba(17, 24, 39, 0.08);
          }

          .blog-card__date {
            margin: 0;
            font-size: 0.8rem;
            color: #6b7280;
          }

          .blog-card__title {
            margin: 0;
            font-size: 1.1rem;
            line-height: 1.3;
          }

          .blog-card__title a {
            color: #111827;
            text-decoration: none;
          }

          .blog-card__title a:hover {
            color: #4338ca;
          }

          .blog-card__description {
            margin: 0;
            color: #4b5563;
            line-height: 1.5;
            font-size: 0.95rem;
          }

          .blog-card__cta {
            margin-top: auto;
            width: fit-content;
            font-size: 0.9rem;
            font-weight: 600;
            color: #3730a3;
            text-decoration: none;
          }

          .blog-card__cta:hover {
            color: #312e81;
          }

          .blog-list__empty {
            margin: 0 auto;
            max-width: 72rem;
            color: #4b5563;
          }
        `}
      </style>
    </section>
  );
};

export default BlogList;
