import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="See your favourite memories from the event"
          />
          <meta property="og:site_name" content="meguesta-v1.vercel.app" />
          <meta
            property="og:description"
            content="See your favourite memories from the event"
          />
          <meta property="og:title" content="Meguesta" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Meguesta" />
          <meta
            name="twitter:description"
            content="See your favourite memories from the event"
          />
        </Head>
        <body className="bg-black antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
