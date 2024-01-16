import Layout from '@/components/shared/Layout/Layout';
import Link from 'next/link';
import QuizWordMain from './QuizWordMain';
import styles from './QuizWord.module.scss';

export default function quizWord() {
  return (
    <Layout>
      <div>
        <QuizWordMain/>
      </div>
      <div>
        <Link href="/">
          <div className={styles.Btn}>
            Back to home
          </div>
        </Link>
      </div>
    </Layout>
  )
}