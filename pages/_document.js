import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta property="og:url" content="https://devcon2022.vercel.app/" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Devcon 2022" />
          <meta property="og:description" content="Spin Growth Devcon 2022" />
          <meta
            property="og:image"
            content="https://devcon2022.vercel.app/images/OG_Image.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
