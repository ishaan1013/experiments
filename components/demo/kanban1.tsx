import { Button, Card, Text } from "@geist-ui/core"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useState } from "react"

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  UniqueIdentifier,
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

type Item = {
  id: number
  col: 0 | 1 | 2
}

export default function Kanban1() {
  const [items, setItems] = useState<Item[][]>([
    [
      { id: 0, col: 0 },
      { id: 1, col: 0 },
    ],
    [{ id: 2, col: 1 }],
    [{ id: 3, col: 2 }],
  ])

  const [activeCol, setActiveCol] = useState(0)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const on =
      items[0].find((item) => item.id === active.id) ??
      items[1].find((item) => item.id === active.id) ??
      items[2].find((item) => item.id === active.id)
    if (on) setActiveCol(on.col)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    console.log(active, over)

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldItem = items[activeCol].find((item) => item.id === active.id)
        const newItem = items[activeCol].find((item) => item.id === over.id)
        if (oldItem && newItem) {
          const updated = arrayMove(
            items[activeCol],
            items[activeCol].indexOf(oldItem),
            items[activeCol].indexOf(newItem)
          )

          const newItems = []
          newItems.push(activeCol === 0 ? updated : items[0])
          newItems.push(activeCol === 1 ? updated : items[1])
          newItems.push(activeCol === 2 ? updated : items[2])

          return newItems
        }
        return items
      })
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}>
      <div className="flex items-start justify-start space-x-2">
        <Card hoverable>
          <Card.Content padding={0.5} paddingBottom={0.3}>
            <SortableContext
              items={items[0]}
              strategy={verticalListSortingStrategy}>
              {items[0].map((item, id) => (
                <Item id={item.id} col={item.col} key={item.id} />
              ))}
            </SortableContext>
          </Card.Content>
        </Card>
        <Card hoverable>
          <Card.Content padding={0.5} paddingBottom={0.3}>
            <SortableContext
              items={items[1]}
              strategy={verticalListSortingStrategy}>
              {items[1].map((item, id) => (
                <Item id={item.id} col={item.col} key={item.id} />
              ))}
            </SortableContext>
          </Card.Content>
        </Card>
        <Card hoverable>
          <Card.Content padding={0.5} paddingBottom={0.3}>
            <SortableContext
              items={items[2]}
              strategy={verticalListSortingStrategy}>
              {items[2].map((item, id) => (
                <Item id={item.id} col={item.col} key={item.id} />
              ))}
            </SortableContext>
          </Card.Content>
        </Card>
      </div>
    </DndContext>
  )
}

const Item = ({ id, col }: { id: number; col: 0 | 1 | 2 }) => {
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
        type="warning"
        scale={1 / 3}
        ghost
        icon={col === 0 ? <ArrowRight /> : <ArrowLeft />}
        auto
      />
      {col === 1 && (
        <Button
          padding={0.3}
          type="warning"
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
