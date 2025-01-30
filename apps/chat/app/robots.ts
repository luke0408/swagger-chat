export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://swagger-chat.vercel.app/sitemap.xml',
  };
}
