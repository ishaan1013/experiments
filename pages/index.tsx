import { Button, Code, Slider, Text } from "@geist-ui/core"
import Head from "next/head"
import Section from "../components/section"

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-start overflow-hidden p-8">
      <Head>
        <title>React Experiments</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full max-w-screen-lg">
        <Section />
      </main>
    </div>
  )
}
