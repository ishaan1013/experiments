import { Button, Card, Text } from "@geist-ui/core"
import { useState } from "react"

export default function RefEq1() {
  const [items, setItems] = useState(["item", "item"])

  return (
    <Card className="min-h-[18rem] w-full">
      <div className="mb-4 flex w-full space-x-2 overflow-x-auto">
        {items.map((item, i) => (
          <div
            className="rounded-md border border-[#111] bg-[#111111bf] px-4 py-2"
            key={i}>
            {item}
          </div>
        ))}
      </div>
      <Button
        onClick={() => {
          const newItems = items
          newItems.push("item")
          setItems(newItems)
          console.log(newItems)
        }}>
        Add Item
      </Button>
      <Text p>Check the console for updates</Text>
    </Card>
  )
}
