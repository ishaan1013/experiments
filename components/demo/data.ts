const contents = {
  refEq1: {
    code: `
const [items, setItems] = useState(["item", "item"])

return (
  <>
    <div>
      {items.map((item, i) =>
        <div key={i}>{item}</div>
      )}
    </div>
    <button onClick={() => {
      const newItems = items
      newItems.push("item")
      setItems(newItems)
      console.log(newItems)
    }}>Add Item</button>
  </>
)
  `,
    heading: "No re-render (object)",
    desc: "Updating the array this way creates a shallow copy pointing to the same memory address. It doesn't re-render since React considers it unchanged, because of the unchanged memory location.",
  },
  refEq2: {
    code: `
const [items, setItems] = useState(["item", "item"])

return (
  <>
    <div>
      {items.map((item, i) =>
        <div key={i}>{item}</div>
      )}
    </div>
    <button onClick={() => {
      const newItems = [...items]
      newItems.push("item")
      setItems(newItems)
    }}>Add Item</button>
  </>
)
  `,
    heading: "Successful re-render",
    desc: "Using the spread operator creates a deep copy of the object. Points to a new memory location.",
  },
}

export type contentOptions = {
  content: "refEq1" | "refEq2"
}

export default contents
