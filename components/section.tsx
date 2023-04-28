import { Text } from "@geist-ui/core"
import Demo from "./demo"
import contents, { contentOptions } from "./demo/data"

export const Section = ({ content }: contentOptions) => {
  return (
    <div className="mt-8 flex w-full flex-col items-center justify-between space-y-4 lg:flex-row lg:space-y-0 lg:space-x-8 xl:space-x-12">
      <Demo content={content} />

      <div className="w-full lg:w-1/2">
        <Text h3>{contents[content].heading}</Text>
        <Text p>{contents[content].desc}</Text>
      </div>
    </div>
  )
}
