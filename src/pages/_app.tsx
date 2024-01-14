import '@/app/globals.scss';
import type { AppProps } from 'next/app'
import inconsolata from '../styles/fonts'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main style={inconsolata.style}>
      <Component {...pageProps} />
    </main>
  )
}
