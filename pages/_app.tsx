import "../styles/globals.css"
import type { AppProps } from "next/app"
import { GeistProvider, CssBaseline } from "@geist-ui/core"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GeistProvider themeType={"dark"}>
      <CssBaseline />
      <Component {...pageProps} />
    </GeistProvider>
  )
}
