import {
  Button,
  ButtonGroup,
  Card,
  Divider,
  Dot,
  Select,
  Text,
} from "@geist-ui/core"
import { RefreshCw, Trash } from "lucide-react"
import { useReducer, useState } from "react"
import { nanoid } from "nanoid"

type ItemState = {
  id: string
  color: "error" | "success"
}

type Delete = {
  type: "delete"
  id: string
}

type AddEdit = {
  type: "add" | "edit"
  id: string
  color: "error" | "success"
}

type Actions = Delete | AddEdit

const initialItems: ItemState[] = [{ id: nanoid(), color: "error" }]

export default function ReducerExample() {
  const [items, dispatch] = useReducer<
    (itemArg: ItemState[], actions: Actions) => ItemState[]
  >(itemReducer, initialItems)

  const [createColor, setCreateColor] = useState<"success" | "error">("error")

  return (
    <>
      <Button
        onClick={() =>
          dispatch({ type: "add", id: nanoid(), color: createColor })
        }
        type={createColor}
        ghost>
        Add Item
      </Button>
      <ButtonGroup>
        <Button onClick={() => setCreateColor("error")}>
          <Dot type="error" className="[&>.label]:hidden " />
        </Button>
        <Button onClick={() => setCreateColor("success")}>
          <Dot type="success" className="[&>.label]:hidden " />
        </Button>
      </ButtonGroup>
      <Divider />
      <div className="mt-4 flex w-full space-x-2 overflow-x-auto">
        {items.map((item) => (
          <Card hoverable key={item.id}>
            <Card.Content
              className="flex"
              padding={0.3}
              paddingLeft={0.6}
              paddingRight={0.6}>
              <Text className="mb-0 mr-3">Item</Text>
              <Button
                padding={0.3}
                marginRight={0.5}
                type={item.color}
                scale={1 / 3}
                ghost
                icon={<RefreshCw />}
                auto
                onClick={() => {
                  dispatch({ type: "edit", id: item.id, color: item.color })
                }}
              />
              <Button
                padding={0.3}
                type={item.color}
                scale={1 / 3}
                ghost
                icon={<Trash />}
                auto
                onClick={() => {
                  dispatch({ type: "delete", id: item.id })
                }}
              />
            </Card.Content>
          </Card>
        ))}
      </div>
    </>
  )
}

const itemReducer = (items: ItemState[], action: Actions): ItemState[] => {
  switch (action.type) {
    case "add": {
      return [
        ...items,
        {
          id: action.id,
          color: action.color,
        },
      ]
    }
    case "edit": {
      return items.map((i) => {
        if (i.id === action.id) {
          return {
            ...i,
            color: action.color === "error" ? "success" : "error",
          }
        } else {
          return i
        }
      })
    }
    case "delete": {
      return items.filter((i) => i.id !== action.id)
    }
    default: {
      throw Error("Unknown action")
    }
  }
}
