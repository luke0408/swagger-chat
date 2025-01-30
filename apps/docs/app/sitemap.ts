import { getBlogPosts } from 'app/blog/utils';

export const baseUrl =
  process.env.SWAGGER_CHAT_DOCS_BASE_URL || 'https://portfolio-blog-starter.vercel.app';

type SitemapEntry = {
  url: string;
  lastModified: string;
};

export default async function sitemap(): Promise<SitemapEntry[]> {
  try {
    let blogs = getBlogPosts().map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.metadata.publishedAt).toISOString(),
    }));

    let routes = ['', '/blog'].map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString().split('T')[0],
    }));

    return [...routes, ...blogs];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}
