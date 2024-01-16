import Layout from "@/components/shared/Layout/Layout";
import Link from 'next/link';
import styles from './page.module.scss';

export default function Home() {
  return (
    <Layout>
      <div>
        <Link href="/hangman">
          <div className={styles.Btn}>
            Hangman
          </div>
        </Link>
        <Link href="/quiz">
          <div className={styles.Btn}>
            English Quiz
          </div>
        </Link>
        <Link href="/quiz-reversed">
          <div className={styles.Btn}>
            English Quiz Reversed
          </div>
        </Link>
      </div>
    </Layout>
  )
}
