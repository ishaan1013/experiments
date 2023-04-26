import { Button, Card, Text } from "@geist-ui/core"
import { Reducer, useReducer, useState } from "react"

type ItemState = {
  id: number
  color: "red" | "blue"
}

type Delete = {
  type: "delete"
  id: number
}

type AddEdit = {
  type: "add" | "edit"
  id: number
  color: "red" | "blue"
}

type Actions = Delete | AddEdit

const initialItems: ItemState[] = [{ id: 0, color: "red" }]

export default function ReducerExample() {
  const [items, dispatch] = useReducer<
    (itemArg: ItemState[], actions: Actions) => ItemState[]
  >(itemReducer, initialItems)

  return (
    <>
      <Button
        onClick={() =>
          dispatch({ type: "add", id: items.length, color: "red" })
        }>
        Add Item
      </Button>
      <div className="mt-4 flex w-full space-x-2 overflow-x-auto">
        {items.map((item, i) => (
          <div
            className="rounded-md border border-[#e00] bg-[#111111bf] px-4 py-2"
            key={i}>
            Item {item.id}
          </div>
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
            color: action.color === "red" ? "blue" : "red",
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
