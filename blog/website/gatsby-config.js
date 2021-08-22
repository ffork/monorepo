const BLOG_NAME = 'x Homology';

module.exports = {
  siteMetadata: {
    title: BLOG_NAME,
    titleTemplate: '%s | Blog @ GIUEM',
    description:
      'GIUEM(@giuemcom) 的博客，平常会简单开箱测评买到的科技数码产品，也会记录分享日常的折腾奇奇怪怪的东西，技术向的文章会偏前端、信息安全',
    siteUrl: 'https://www.giuem.com',
    image: '',
    author: {
      name: 'giuem',
    },
    social: {
      twitter: '@giuemcom',
      github: '@giuem',
    },
    nav: [
      {
        title: '主页',
        href: '/',
      },
      {
        title: '文章',
        href: '/archives/',
      },
      {
        title: '链接',
        href: '/links/',
      },
      {
        title: '关于',
        href: '/about/',
      },
    ],
    links: require('./contents/links.json'),
  },
  plugins: [
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    // "gatsby-plugin-sitemap",
    // {
    //   resolve: "gatsby-plugin-manifest",
    //   options: {
    //     icon: "src/images/icon.png",
    //   },
    // },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `./contents/posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `./contents/pages`,
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              icon: false,
            },
          },
        ],
      },
    },

    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-plugin-typescript`,
    },
    `gatsby-plugin-postcss`,
    'gatsby-plugin-pnpm',
    // "@giuem/gatsby-plugin-webpack-bundle-analyzer",
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map((edge) => {
                const url = `${site.siteMetadata.siteUrl}/${edge.node.fields.slug}/`;

                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url,
                  guid: url,
                  custom_elements: [{ 'content:encoded': edge.node.html }],
                });
              });
            },
            query: `
            {
              allMdx(
                sort: { order: DESC, fields: [frontmatter___date] },
              ) {
                edges {
                  node {
                    excerpt
                    html
                    fields { slug }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            }
          `,
            output: '/rss.xml',
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
    },
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        workboxConfig: {
          globPatterns: ['**/icons*'],
        },
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: BLOG_NAME,
        short_name: BLOG_NAME,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#4F46E5`,
        icon: 'static/logo.svg',
        cache_busting_mode: 'none',
        theme_color_in_head: false,
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-102578664-1',
        enableWebVitalsTracking: true,
      },
    },
  ],
  flags: {
    FAST_DEV: true,
    DEV_SSR: false,
  },
};
