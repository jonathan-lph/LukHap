import Head from 'next/head'
import metadata from '@util/metadata.json'

export default function Home() {
  return (
    <div>
      <Head>
        <title>{metadata.document.title}</title>
        <meta name="description" content={metadata.document.desc} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
      </div>

    </div>
  )
}
