import Document, { Html, Head, Main, NextScript } from "next/document";

function MyDocument() {
  return (
    <Html lang="en">
      <Head />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <link rel="shortcut icon" href="/favicon.ico" />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async function (ctx) {
  console.log("Server is rendering a page");
  const initialProps = await Document.getInitialProps(ctx);
  return { ...initialProps };
};

export default MyDocument;
