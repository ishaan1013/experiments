import { Text, Button, Link, Divider } from "@geist-ui/core"
import Head from "next/head"
import { Github, Twitter } from "lucide-react"
import Section from "../components/section"

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-start overflow-hidden p-8">
      <Head>
        <title>React Experiments</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full max-w-screen-lg py-12">
        <Text h1>React Experiments</Text>
        <Link href="#" color underline>
          Referential Equality
        </Link>
        <div className="mt-4 space-x-2">
          <Button type="success" ghost icon={<Github />} auto />
          <Button type="success" ghost icon={<Twitter />} auto />
        </div>

        <Divider my={4} />
        <Text h2 id="refeq">
          Referential Equality
        </Text>
        <Section content="refEq1" />
      </main>
    </div>
  )
}
