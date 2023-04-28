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
    codeView: true,
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
    codeView: true,
  },
  reducer: {
    code: `
export default function ReducerExample() {
  const [items, dispatch] = useReducer(itemReducer, initialItems)

  return (
    <>
      <Button
        onClick={() =>
          dispatch({ type: "add", id: nanoid(), color: createColor })
        }>
        Add Item
      </Button>
      <ButtonGroup>
        ...
      </ButtonGroup>
      <div>
        {items.map((item) => (
          <Card key={item.id}>
            <Text>Item</Text>
            <Button
              type={item.color}
              icon={<RefreshCw />}
              onClick={() => {
                dispatch({ type: "edit", id: item.id, color: item.color })
              }}
            />
            <Button
              type={item.color}
              icon={<Trash />}
              onClick={() => {
                dispatch({ type: "delete", id: item.id })
              }}
            />
          </Card>
        ))}
      </div>
    </>
  )
}

const itemReducer = (items: ItemState[], action: Actions) => {
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
    
  `,
    heading: "State actions stored in a reducer",
    desc: "Reducers combine state change logic (different event handlers, etc.) into a single function, called by dispatches.",
    codeView: false,
  },
  kanban1: {
    code: `
const Board = () => {
  const [items, setItems] = useState([[1, 2, 3], [4, 5], [6]])

  const moveLeft = ({ item, col }: {...}) => {...}
  const moveRight = ({ item, col }: {...}) => {...}

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}>
      <SortableContext items={items[0]} >
        {items[0].map((item) => (
          <Item id={item} key={item} />
        ))}
      </SortableContext>
      <SortableContext items={items[1]} >
        {items[1].map((item) => (
          <Item id={item} key={item} />
        ))}
      </SortableContext>
      <SortableContext items={items[2]} >
        {items[2].map((item) => (
          <Item id={item} key={item} />
        ))}
      </SortableContext>
    </DndContext>
  )
}

const Item = ({id, ...} : {id: number, ...}) => {
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
    heading: "Unoptimized, re-renders entire board",
    desc: "The entire board re-renders for all updates. Unaffected items/columns always re-render, but it's often unnecessary.",
    codeView: true,
  },
  kanban2: {
    code: `
const Board = () => {
  const [items, setItems] = useState([[1, 2, 3], [4, 5], [6]])

  const moveLeft = ({ item, col }: {...}) => {...}
  const moveRight = ({ item, col }: {...}) => {...}

  const items0 = useMemo(() => items[0], [items])
  const items1 = useMemo(() => items[1], [items])
  const items2 = useMemo(() => items[2], [items])

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}>
      <Col col={0} items={items0} moveLeft={moveLeft} moveRight={moveRight} />
      <Col col={1} items={items1} moveLeft={moveLeft} moveRight={moveRight} />
      <Col col={2} items={items2} moveLeft={moveLeft} moveRight={moveRight} />
    </DndContext>
  )
}

const Col = memo(
  ({ items, col, moveLeft, moveRight }: { items: number[], col: 0 | 1 | 2, moveLeft: ({ item, col }: { item: number; col: 0 | 1 | 2 }) => void, moveRight: ({ item, col }: { item: number; col: 0 | 1 | 2 }) => void }) => {
    return (
      <Card>
        <SortableContext items={items} >
          {items.map((item) => (
            <Item
              id={item}
              moveLeft={moveLeft}
              moveRight={moveRight}
              col={col}
              key={item}
            />
          ))}
        </SortableContext>
      </Card>
    )
  }
)

const Item = ({id, ...} : {id: number, ...}) => {
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
    heading: "Memoizing components",
    desc: "Each column is memoized, stopping unnecessary re-renders. It takes an object prop, but memo() uses shallow comparison so it's not 'equal'. Using the useMemo hook caches the object correctly.",
    codeView: false,
  },
  kanban3: {
    code: `
const Board = () => {
  const [items, setItems] = useState([[1, 2, 3], [4, 5], [6]])

  const moveLeft = useCallback(({ item, col }: {...}) => {...}, [])
  const moveRight = useCallback(({ item, col }: {...}) => {...}, [])

  const items0 = useMemo(() => items[0], [items])
  const items1 = useMemo(() => items[1], [items])
  const items2 = useMemo(() => items[2], [items])

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}>
      <Col col={0} items={items0} moveLeft={moveLeft} moveRight={moveRight} />
      <Col col={1} items={items1} moveLeft={moveLeft} moveRight={moveRight} />
      <Col col={2} items={items2} moveLeft={moveLeft} moveRight={moveRight} />
    </DndContext>
  )
}

const Col = memo(
  ({ items, col, moveLeft, moveRight }: { items: number[], col: 0 | 1 | 2, moveLeft: ({ item, col }: { item: number; col: 0 | 1 | 2 }) => void, moveRight: ({ item, col }: { item: number; col: 0 | 1 | 2 }) => void }) => {
    return (
      <Card>
        <SortableContext items={items} >
          {items.map((item) => (
            <Item
              id={item}
              moveLeft={moveLeft}
              moveRight={moveRight}
              col={col}
              key={item}
            />
          ))}
        </SortableContext>
      </Card>
    )
  }
)

const Item = ({id, ...} : {id: number, ...}) => {
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
    heading: "Final optimization with useCallback",
    desc: "Like how defining objects returns a new object each time, defining functions does the same. Callbacks are memoized functions.",
    codeView: false,
  },
}

export type contentOptions = {
  content: "refEq1" | "refEq2" | "kanban1" | "kanban2" | "kanban3" | "reducer"
}

export default contents
