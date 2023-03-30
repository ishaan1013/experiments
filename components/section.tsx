import { Code, Text } from "@geist-ui/core"

export default function Section() {
  return (
    <div className="flex w-full flex-col items-center justify-between space-y-4 lg:flex-row lg:space-y-0 lg:space-x-8">
      <div className="w-full lg:w-1/2">
        <Code width="100%" block my={0} px={1} py={0}>
          {/* <SyntaxHighlighter language="typescript" style={irBlack} customStyle={""}> */}
          {`
import { someFunc, type BaseType } from './some-module.ts'

// BaseType is always guaranteed to be erased
// and someFunc will be preserved
export class Thing implements BaseType {
  someMethod() {
    someFunc()
  }
}
          `}
          {/* </SyntaxHighlighter> */}
        </Code>
      </div>
      <div className="w-full lg:w-1/2">
        <Text h2>Test</Text>
        <Text p>abcdefabcdefabcdef</Text>
      </div>
    </div>
  )
}
