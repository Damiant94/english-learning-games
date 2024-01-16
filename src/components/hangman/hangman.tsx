import Layout from '@/components/shared/Layout/Layout';
import HangmanMain from '@/components/hangman/HangmanMain';
import Link from 'next/link';
import styles from './Hangman.module.scss';


export default function hangman() {
  return (
    <Layout>
      <div>
        <HangmanMain/>
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