import Image from 'next/image';
import { BlogPosts } from 'components/posts';

export default function Page() {
  return (
    <section>
      <div className="mb-8 flex items-center">
        <Image
          src="/profile.png"
          alt="profile image"
          width={100}
          height={100}
          className="mr-4 rounded-full"
        />
        <h1 className="text-2xl font-semibold tracking-tighter">My Portfolio</h1>
      </div>
      <p className="mb-4">
        {`Hello! This blog is created using `}
        <a
          href="https://github.com/notionpresso"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-blue-600 underline transition duration-300 ease-in-out hover:text-blue-800"
        >
          Notionpresso
        </a>
        {`. I'm efficiently managing content by utilizing Notion as a CMS. 
        I'll be sharing stories about development, technology, and daily life. 
        Stay tuned and thanks for your interest!`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
