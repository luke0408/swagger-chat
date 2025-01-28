'use client';

import Link from 'next/link';
import { motion } from 'motion/react';

const MotionLink = motion(Link);

interface SNSItem {
  id: number;
  name: string;
  url: string;
  imgUrl: string;
}

interface SNSListProps {
  list: readonly SNSItem[];
}

export function SNSList({ list }: SNSListProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center pt-10"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.nav className="flex gap-3">
        {list.map((sns) => (
          <MotionLink
            key={sns.id}
            href={sns.url}
            className="flex h-10 w-10 cursor-pointer flex-col items-center justify-center md:h-12 md:w-12"
            variants={item}
            whileHover={{
              scale: 1.2,
              rotate: [0, -10, 10, -10, 0],
              transition: { duration: 0.5 },
            }}
            whileTap={{ scale: 0.9 }}
            target="_blank"
          >
            <motion.img
              src={sns.imgUrl}
              alt={sns.name}
              className="h-6 w-6 md:h-8 md:w-8"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            />
          </MotionLink>
        ))}
      </motion.nav>
    </motion.div>
  );
}

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
