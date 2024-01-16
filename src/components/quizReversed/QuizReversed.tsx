import Layout from '@/components/shared/Layout/Layout';
import Link from 'next/link';
import QuizReversedMain from './QuizReversedMain';
import styles from './QuizReversed.module.scss';

export default function quiz() {
  return (
    <Layout>
      <div>
        <QuizReversedMain/>
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