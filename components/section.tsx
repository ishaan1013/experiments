import { Text } from "@geist-ui/core"
import Demo from "./demo"
import { contentOptions } from "./demo/data"

const Section = ({ content }: contentOptions) => {
  return (
    <div className="flex w-full flex-col items-center justify-between space-y-4 lg:flex-row lg:space-y-0 lg:space-x-8 xl:space-x-12">
      <Demo content={content} />

      <div className="w-full lg:w-1/2">
        <Text h3>Failed referential equality</Text>
        <Text p>
          Updating the array in state creates a shallow copy pointing to the
          same memory address. It doesn't re-render since React considers it
          unchanged, because of the unchanged memory location.
        </Text>
      </div>
    </div>
  )
}

export default Section
