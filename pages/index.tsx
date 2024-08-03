import { useRouter } from 'next/router';

import { Exo } from 'next/font/google';

const exo = Exo({ subsets: ['latin'] });

export default function Home() {
  const router = useRouter();
  return (
    <main className={`flex min-h-screen flex-col items-center bg-black text-white justify-center p-24 ${exo.className}`}>
      <h2 className="font-bold text-4xl">RepoRoulette 🎲</h2>
      <p className="mt-3 text-lg text-center mx-auto max-w-xl">
        Discover random, fascinating repositories on GitHub. Click the button below to get started and explore new projects!
      </p>
      <button
        className="mt-6 p-2  bg-white text-black font-semibold rounded-lg hover:bg-red-500 hover:border-red-500 hover:text-white  hover:shadow-none transition duration-300"
        onClick={() => router.push('/repo')}
      >
        Show Me Some Repos!
      </button>
    </main>
  );
}
