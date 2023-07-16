import Link from "next/link"
import { Card, Figure, Title, Excerpt } from "./PostCardStyle"

export const PostCard = () => {
  return (
    <Link href="/post/example" passHref>
      <Card>
        <Figure>
          <img alt="Post photo" src="/image1.jpg" />
        </Figure>
        <Title>Post title!</Title>
        <Excerpt>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua.
          </p>
        </Excerpt>
      </Card>
    </Link>
  )
}
