import { Button, Card, Code } from "@geist-ui/core"
import { useState } from "react"
import RefEq1 from "./refEq1"

import contents, { contentOptions } from "./data"
import RefEq2 from "./refEq2"
import Kanban1 from "./kanban1"

export default function Demo({ content }: contentOptions) {
  const [viewingCode, setViewingCode] = useState(true)

  return (
    <div className="relative z-0 w-full overflow-hidden lg:max-w-[50%]">
      {viewingCode && (
        <div className="absolute bottom-0 z-10 h-16 w-full rounded-b-md bg-gradient-to-t from-[#101010] via-[#101010]/90 to-[#101010]/10" />
      )}
      <Button
        onClick={() => setViewingCode((prev) => !prev)}
        scale={2 / 3}
        className="!absolute right-2 bottom-2 z-20"
        type="success"
        ghost>
        {viewingCode ? "Interactive Example" : "See Code"}
      </Button>
      {viewingCode ? (
        <Code
          className="h-72 overflow-y-auto"
          width="100%"
          block
          my={0}
          px={1}
          py={0}>
          {contents[content].code}
        </Code>
      ) : (
        <Example content={content} />
      )}
    </div>
  )
}

function Example({ content }: contentOptions) {
  if (content === "refEq1")
    return (
      <Card className="min-h-[18rem] w-full">
        <RefEq1 />
      </Card>
    )
  if (content === "refEq2")
    return (
      <Card className="min-h-[18rem] w-full">
        <RefEq2 />
      </Card>
    )
  if (content === "kanban1")
    return (
      <Card className="min-h-[18rem] w-full">
        <Kanban1 />
      </Card>
    )
  return null
}
