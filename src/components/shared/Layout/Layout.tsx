'use client';
import Link from "next/link";
import styles from "./Layout.module.scss";
import { usePathname } from 'next/navigation';
import React from 'react';
import inconsolata from '../../../styles/fonts';


export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {

  const pathname = usePathname();

  return (
    <div className={styles.Layout} style={inconsolata.style} data-testid='layout'>
      <div className={styles.Menu}>
        <Link href="/hangman">
          <div className={[styles.Btn, pathname === '/hangman' && styles.ActivatedRoute].join(' ')}>
            Hangman
          </div>
        </Link>
        <Link href="/quiz-word">
          <div className={[styles.Btn, pathname === '/quiz-word' && styles.ActivatedRoute].join(' ')}>
            Word Quiz
          </div>
        </Link>
        <Link href="/quiz-definition">
          <div className={[styles.Btn, pathname === '/quiz-definition' && styles.ActivatedRoute].join(' ')}>
            Definition Quiz
          </div>
        </Link>
      </div>
      {children}
    </div>
  )
}