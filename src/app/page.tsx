import Layout from "@/components/layout/layout";
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
      <ul>
        <Link href="/hangman">
          <li className="m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Hangman
          </li>
        </Link>
        <Link href="/quiz">
          <li className="m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Quiz
          </li>
        </Link>
      </ul>
    </Layout>
  )
}
