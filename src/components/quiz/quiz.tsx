import Layout from '@/components/shared/Layout/Layout';
import Link from 'next/link';
import QuizMain from './QuizMain';

export default function quiz() {
  return (
    <Layout>
      <div>
        <QuizMain/>
      </div>
      <div>
        <Link href="/">
          <div className="m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Back to home
          </div>
        </Link>
      </div>
    </Layout>
  )
}