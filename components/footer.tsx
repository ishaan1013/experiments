import { Button, Card, Link, Text } from "@geist-ui/core"
import { Github, Twitter } from "lucide-react"

export const Footer = () => {
  return (
    <>
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
    </>
  )
}
