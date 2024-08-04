import { useCallback, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Loader from '@/components/Loader';
import { SearchReposParams, useSearchReposQuery } from '@/services/githubApi';

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomQuery(): string {
  const languages = [
    'js',
    'ts',
    'python',
    'go',
    'java',
    'rust',
    'c',
    'c++',
    'ruby',
    'php',
    'swift',
    'kotlin',
    'shell',
    'dart',
    'r',
    'scala',
    'haskell',
    'lua',
    'perl',
    'elixir',
  ];
  return `language:${languages[Math.floor(Math.random() * languages.length)]}`;
}

function getRandomSort(): 'stars' | 'forks' | 'help-wanted-issues' | 'updated' {
  const sortOptions: ('stars' | 'forks' | 'help-wanted-issues' | 'updated')[] = ['stars', 'forks', 'help-wanted-issues', 'updated'];
  return sortOptions[Math.floor(Math.random() * sortOptions.length)];
}

export default function App() {
  const [params, setParams] = useState<SearchReposParams>({
    q: getRandomQuery(),
    sort: getRandomSort(),
    order: 'desc',
    per_page: 10,
    page: getRandomInt(10, 20),
  });

  const randomizeParams = useCallback(() => {
    setParams({
      q: getRandomQuery(),
      sort: getRandomSort(),
      order: 'desc',
      per_page: 10,
      page: getRandomInt(15, 20),
    });
  }, []);

  const { data, isLoading } = useSearchReposQuery(params);

  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center bg-black text-white justify-center p-24 pt-6">
      <div className="flex gap-3">
        <button
          className="mt-6 p-2 bg-white text-black font-semibold rounded-lg hover:bg-red-500 hover:border-red-500 hover:text-white hover:shadow-none transition duration-300"
          onClick={() => router.push('/')}
        >
          Home
        </button>
        <button
          className="mt-6 p-2 bg-white text-black font-semibold rounded-lg hover:bg-red-500 hover:border-red-500 hover:text-white hover:shadow-none transition duration-300"
          onClick={randomizeParams}
        >
          Show me some repos!
        </button>
      </div>

      {isLoading ? (
        <Loader color="red" />
      ) : (
        <div className="flex flex-wrap justify-center -mx-2">
          {data?.items.map(repo => (
            <Link
              href={repo.html_url}
              key={repo.id}
              className="border-2 hover:border-red-500 border-white bg-white text-black flex flex-col mx-2 p-4 max-w-md my-4 rounded-lg shadow-lg"
            >
              <div className="flex items-center mb-2">
                {repo.owner.avatar_url && (
                  <Image
                    src={repo.owner.avatar_url}
                    alt={repo.owner.login}
                    width={100}
                    height={100}
                    className="rounded-full object-cover"
                  />
                )}
                <div className="ml-4 flex flex-col flex-grow">
                  <h1 className="text-2xl font-bold">{repo.name}</h1>
                  <p className="text-ellipsis line-clamp-3 mt-2 mb-2">{repo.description}</p>
                  <p className="font-bold">{repo.stargazers_count} ⭐</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
