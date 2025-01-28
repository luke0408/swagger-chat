'use client';

import { SNSList } from './sns-list';

//TODO
export const SNS_LIST = [
  {
    id: 1,
    name: 'Github',
    url: 'https://github.com/anonymousRecords',
    imgUrl: '/sns/github.png',
  },
  {
    id: 2,
    name: 'X',
    url: 'https://x.com/ARecords2022',
    imgUrl: '/sns/x.webp',
  },
  {
    id: 3,
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/serim-min-55882b238/',
    imgUrl: '/sns/linkedin.png',
  },
  {
    id: 4,
    name: 'Instagram',
    url: 'https://www.instagram.com/chapdo.dev/',
    imgUrl: '/sns/instagram.png',
  },
] as const;

export function LandingFooter() {
  return (
    <div className="container flex items-center justify-end px-6 py-2">
      <SNSList list={SNS_LIST} />
    </div>
  );
}
