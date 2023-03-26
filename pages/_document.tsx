import { Fragment } from "react"
import Document, {
  Html,
  Head,
  Main,
  DocumentContext,
  NextScript,
} from "next/document"
import { CssBaseline } from "@geist-ui/core"

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    const styles = CssBaseline.flush()

    return {
      ...initialProps,
      styles: [
        <Fragment key="1">
          {initialProps.styles}
          {styles}
        </Fragment>,
      ],
    }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
