import { SNSList } from './sns-list';

export const SNS_LIST = [
  {
    id: 1,
    name: 'Github',
    url: 'https://github.com/anonymousRecords/swagger-chat',
    imgUrl: '/sns/github.png',
  },
  {
    id: 2,
    name: 'X',
    url: 'https://x.com/swagger_chat',
    imgUrl: '/sns/x.webp',
  },
  {
    id: 3,
    name: 'BlueSky',
    url: 'https://bsky.app/profile/swaggerchat.bsky.social',
    imgUrl: '/sns/bluesky.png',
  },
  {
    id: 4,
    name: 'Instagram',
    url: 'https://www.instagram.com/swagger.chat/',
    imgUrl: '/sns/instagram.png',
  },
  {
    id: 5,
    name: 'Discord',
    url: 'https://discord.gg/rMW7F43e',
    imgUrl: '/sns/discord.png',
  },
] as const;

export function LandingFooter() {
  return (
    <div className="container flex items-center justify-end px-6 py-2">
      <SNSList list={SNS_LIST} />
    </div>
  );
}
