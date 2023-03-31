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
    heading: "",
    desc: "",
  },
}

export type contentOptions = {
  content: "refEq1"
}

export default contents
