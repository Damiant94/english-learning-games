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
        <Link href="/quiz-word">
          <div className={styles.Btn}>
            English Quiz Word
          </div>
        </Link>
        <Link href="/quiz-definition">
          <div className={styles.Btn}>
            English Quiz Definition
          </div>
        </Link>
      </div>
    </Layout>
  )
}
