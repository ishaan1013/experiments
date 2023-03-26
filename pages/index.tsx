import { Button, Code, Slider, Text } from "@geist-ui/core"
import Head from "next/head"

export default function Home() {
  return (
    <div className="relative h-screen max-w-screen-md overflow-hidden p-8">
      <Head>
        <title>React Experiments</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Code block my={0}>{`
import { someFunc, type BaseType } from './some-module.ts'

// BaseType is always guaranteed to be erased
// and someFunc will be preserved
export class Thing implements BaseType {
  someMethod() {
    someFunc()
  }
}
      `}</Code>
    </div>
  )
}
