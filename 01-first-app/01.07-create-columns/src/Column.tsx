import { ColumnContainer, ColumnTitle, CardContainer } from "./styles"

type ColumnProps = {
  text: string
}

export const Column = ({ text }: ColumnProps) => {
  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      <CardContainer>Generate app scaffold</CardContainer>
      <CardContainer>Learn TypeScript</CardContainer>
      <CardContainer>Begin to use static typing</CardContainer>
    </ColumnContainer>
  )
}
