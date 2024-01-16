import Layout from '@/components/shared/Layout/Layout';
import Link from 'next/link';
import QuizMain from './QuizMain';
import styles from './Quiz.module.scss';

export default function quiz() {
  return (
    <Layout>
      <div>
        <QuizMain/>
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