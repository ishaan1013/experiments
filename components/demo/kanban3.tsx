import { Button, Card, Text } from "@geist-ui/core"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { memo, useCallback, useMemo, useState } from "react"

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  PointerActivationConstraint,
  DragStartEvent,
} from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable"

export default function Kanban3() {
  const [items, setItems] = useState([[1, 2, 3], [4, 5], [6]])

  const [activeCol, setActiveCol] = useState(0)

  const activationConstraint: PointerActivationConstraint = {
    distance: 10,
  }

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const moveLeft = useCallback(
    ({ item, col }: { item: number; col: 0 | 1 | 2 }) => {
      setItems((items) => {
        const updated = items[col].filter((i) => i !== item)
        const newItems = []
        newItems.push(col === 0 ? updated : items[0])
        newItems.push(col === 1 ? updated : items[1])
        newItems.push(col === 2 ? updated : items[2])
        newItems[col - 1].push(item)

        console.log(newItems)
        return newItems
      })
    },
    [items]
  )

  const moveRight = useCallback(
    ({ item, col }: { item: number; col: 0 | 1 | 2 }) => {
      setItems((items) => {
        const updated = items[col].filter((i) => i !== item)
        const newItems = []
        newItems.push(col === 0 ? updated : items[0])
        newItems.push(col === 1 ? updated : items[1])
        newItems.push(col === 2 ? updated : items[2])
        newItems[col + 1].push(item)

        console.log(newItems)
        return newItems
      })
    },
    [items]
  )

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const on = items[0].find((item) => item === active.id)
      ? 0
      : items[1].find((item) => item === active.id)
      ? 1
      : 2
    setActiveCol(on)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setItems((items) => {
        const updated = arrayMove(
          items[activeCol],
          items[activeCol].indexOf(active.id as number),
          items[activeCol].indexOf(over.id as number)
        )

        const newItems = []
        newItems.push(activeCol === 0 ? updated : items[0])
        newItems.push(activeCol === 1 ? updated : items[1])
        newItems.push(activeCol === 2 ? updated : items[2])

        return newItems
      })
    }
  }

  const items0 = useMemo(() => items[0], [items])
  const items1 = useMemo(() => items[1], [items])
  const items2 = useMemo(() => items[2], [items])

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}>
      <div className="flex space-x-2">
        <Col col={0} items={items0} moveLeft={moveLeft} moveRight={moveRight} />
        <Col col={1} items={items1} moveLeft={moveLeft} moveRight={moveRight} />
        <Col col={2} items={items2} moveLeft={moveLeft} moveRight={moveRight} />
      </div>
    </DndContext>
  )
}

const Col = memo(
  ({
    items,
    col,
    moveLeft,
    moveRight,
  }: {
    items: number[]
    col: 0 | 1 | 2
    moveLeft: ({ item, col }: { item: number; col: 0 | 1 | 2 }) => void
    moveRight: ({ item, col }: { item: number; col: 0 | 1 | 2 }) => void
  }) => {
    return (
      <Card hoverable className="min-w-[90px]">
        <Card.Content padding={0.5} paddingBottom={0.3}>
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
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
        </Card.Content>
      </Card>
    )
  }
)

const Item = memo(
  ({
    id,
    col,
    moveLeft,
    moveRight,
  }: {
    id: number
    col: 0 | 1 | 2
    moveLeft: ({ item, col }: { item: number; col: 0 | 1 | 2 }) => void
    moveRight: ({ item, col }: { item: number; col: 0 | 1 | 2 }) => void
  }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: id })

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    }

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="mb-1 flex items-center rounded-md border border-[#111] bg-[#111111bf] px-4 py-2">
        <Text margin={0} className="pr-2 text-center">
          {id}
        </Text>
        <Button
          padding={0.3}
          type="success"
          onClick={
            col === 0
              ? () => moveRight({ item: id, col })
              : () => moveLeft({ item: id, col })
          }
          scale={1 / 3}
          ghost
          icon={col === 0 ? <ArrowRight /> : <ArrowLeft />}
          auto
        />
        {col === 1 && (
          <Button
            padding={0.3}
            type="success"
            onClick={() => moveRight({ item: id, col })}
            scale={1 / 3}
            ghost
            marginLeft={0.3}
            icon={<ArrowRight />}
            auto
          />
        )}
      </div>
    )
  }
)
