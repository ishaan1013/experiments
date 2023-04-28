import { Card, Link, Text } from "@geist-ui/core"

export const Header = () => {
  return (
    <>
      <Text h1>React Experiments</Text>
      <Card>
        <Card.Content>
          <Text className="m-0" p type="secondary">
            Contents
          </Text>
          <div className="mt-1 flex flex-col space-y-1">
            <Link href="#refeq" color underline>
              Referential Equality
            </Link>
            <Link href="#reducer" color underline>
              Reducer State Management
            </Link>
            <Link href="#board" color underline>
              Kanban Board Re-Renders
            </Link>
          </div>
        </Card.Content>
      </Card>
    </>
  )
}
