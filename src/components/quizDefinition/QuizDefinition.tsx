import Layout from '@/components/shared/Layout/Layout';
import Link from 'next/link';
import QuizDefinitionMain from './QuizDefinitionMain';
import styles from './QuizDefinition.module.scss';

export default function quizDefinition() {
  return (
    <Layout>
      <div>
        <QuizDefinitionMain/>
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