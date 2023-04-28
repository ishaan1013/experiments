import { Text, Divider } from "@geist-ui/core"
import Head from "next/head"
import { Section, Header, Footer } from "../components"

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-start overflow-hidden p-8">
      <Head>
        <title>React Experiments</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full max-w-screen-lg py-12">
        <Header />

        <Divider my={4} />
        <Text h2 id="refeq">
          Referential Equality
        </Text>
        <Section content="refEq1" />
        <Section content="refEq2" />

        <Divider my={4} />
        <Text h2 id="reducer">
          Reducer State Management
        </Text>
        <Section content="reducer" />

        <Divider my={4} />
        <Text h2 id="board">
          Kanban Board Re-Renders
        </Text>
        <Section content="kanban1" />
        <Section content="kanban2" />
        <Section content="kanban3" />
      </main>

      <Footer />
    </div>
  )
}
