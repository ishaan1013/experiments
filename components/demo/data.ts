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
    desc: "Creates a shallow copy pointing to the same memory location. No re-render since React considers it unchanged (same address).",
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
  kanban1: {
    code: `
const Board = () => {
  const [items, setItems] = useState([[1, 2, 3], [4, 5], [6]])

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}>
      <SortableContext
        items={items[0]}
        strategy={verticalListSortingStrategy}>
        {items[0].map((item) => (
          <Item id={item} key={item} />
        ))}
      </SortableContext>
      <SortableContext
        items={items[1]}
        strategy={verticalListSortingStrategy}>
        {items[1].map((item) => (
          <Item id={item} key={item} />
        ))}
      </SortableContext>
      <SortableContext
        items={items[2]}
        strategy={verticalListSortingStrategy}>
        {items[2].map((item) => (
          <Item id={item} key={item} />
        ))}
      </SortableContext>
    </DndContext>
  )
}

const Item = ({id} : {id: number}) => {
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}>
      <Text>
        {id}
      </Text>
      <Button
        onClick={...}
        icon={... ? <ArrowRight /> : <ArrowLeft />}
      />
      <Button
        onClick={...}
        icon={... ? <ArrowRight /> : <ArrowLeft />}
      />
    </div>
  )
}
  `,
    heading: "Re-renders entire board (expensive)",
    desc: "The entire board re-renders for all updates. For example with sorting items within a column, all columns update.",
  },
  kanban2: {
    code: `
const Board = () => {
  const [items, setItems] = useState([[1, 2, 3], [4, 5], [6]])

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}>
      <SortableContext
        items={items[0]}
        strategy={verticalListSortingStrategy}>
        {items[0].map((item) => (
          <Item id={item} key={item} />
        ))}
      </SortableContext>
      <SortableContext
        items={items[1]}
        strategy={verticalListSortingStrategy}>
        {items[1].map((item) => (
          <Item id={item} key={item} />
        ))}
      </SortableContext>
      <SortableContext
        items={items[2]}
        strategy={verticalListSortingStrategy}>
        {items[2].map((item) => (
          <Item id={item} key={item} />
        ))}
      </SortableContext>
    </DndContext>
  )
}

const Item = ({id} : {id: number}) => {
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}>
      <Text>
        {id}
      </Text>
      <Button
        onClick={...}
        icon={... ? <ArrowRight /> : <ArrowLeft />}
      />
      <Button
        onClick={...}
        icon={... ? <ArrowRight /> : <ArrowLeft />}
      />
    </div>
  )
}
  `,
    heading: "Re-renders only necessary components",
    desc: "Sorting within a single column re-renders just that section, and moving between columns only updates the 2 sections involved.",
  },
}

export type contentOptions = {
  content: "refEq1" | "refEq2" | "kanban1" | "kanban2"
}

export default contents
