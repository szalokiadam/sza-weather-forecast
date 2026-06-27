import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="hu">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <body
        style={{
          margin: 0,
          padding: 0,
        }}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
