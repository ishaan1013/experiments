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
    desc: "The entire board re-renders for all updates. Unaffected items/columns always re-render, but it's often unnecessary.",
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
    heading: "Optimizing with memoization",
    desc: "Each column is memoized to re-render only when directly updated. It takes an object prop, and memo() uses shallow comparison (the object won't be cached). The useMemo hook fixes this, and caches the object properly.",
  },
}

export type contentOptions = {
  content: "refEq1" | "refEq2" | "kanban1" | "kanban2"
}

export default contents
