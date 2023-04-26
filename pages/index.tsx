import { Text, Button, Link, Divider, Spacer, Card } from "@geist-ui/core"
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
        <Card>
          <Card.Content>
            <Text className="m-0" p type="secondary">
              Contents
            </Text>
            <div className="mt-1 flex flex-col space-y-1">
              <Link href="#" color underline>
                Referential Equality
              </Link>
              <Link href="#" color underline>
                Reducer State Management
              </Link>
              <Link href="#" color underline>
                Kanban Board Re-Renders
              </Link>
            </div>
          </Card.Content>
        </Card>

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
        <Text h2 id="refeq">
          Kanban Board Re-Renders
        </Text>
        <Section content="kanban1" />
        <Section content="kanban2" />
      </main>
      <footer className="flex w-full justify-center border-t border-t-[#111] pt-6">
        <div className="flex w-full max-w-screen-lg items-center justify-between">
          <div>
            <Text h3>React Experiments</Text>
            <div className="space-x-2">
              <Link
                target="_blank"
                rel="noreferrer"
                href="https://github.com/ishaan1013/experiments">
                <Button type="success" ghost icon={<Github />} auto />
              </Link>
              <Link
                target="_blank"
                rel="noreferrer"
                href="https://twitter.com/ishaandey_">
                <Button type="success" ghost icon={<Twitter />} auto />
              </Link>
            </div>
          </div>
          <Text p type="secondary">
            Using{" "}
            <Link
              target="_blank"
              rel="noreferrer"
              href="https://geist-ui.dev/"
              color
              underline>
              Geist UI
            </Link>
            ,&nbsp;
            <Link
              target="_blank"
              rel="noreferrer"
              href="https://dndkit.com/"
              color
              underline>
              @dnd-kit
            </Link>
          </Text>
        </div>
      </footer>
    </div>
  )
}
