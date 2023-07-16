import { Home } from "./Home"
import { Category } from "../shared/types"
import { render } from "@testing-library/react"
import { ProductCardProps } from "./ProductCard"
import { useProducts } from "./useProducts"

jest.mock("./ProductCard", () => ({
  ProductCard: ({ datum }: ProductCardProps) => {
    const { name, price, image } = datum
    return (
      <div>
        {name} {price} {image}
      </div>
    )
  }
}))

jest.mock("./useProducts", () => ({
  useProducts: jest.fn()
}))

const useProductsMock = useProducts as unknown as jest.Mock<
  Partial<ReturnType<typeof useProducts>>
>

describe("Home", () => {
  describe("while loading", () => {
    it("renders loader", () => {
      useProductsMock.mockReturnValue({
        categories: [],
        isLoading: true,
        error: false
      })

      const { container } = render(<Home />)

      expect(container.innerHTML).toMatch("Loading")
    })
  })

  describe("with data", () => {
    it("renders categories with products", () => {
      const category: Category = {
        name: "Category Foo",
        items: [
          {
            name: "Product foo",
            price: 55,
            image: "/test.jpg"
          }
        ]
      }

      useProductsMock.mockReturnValue({
        categories: [category],
        isLoading: false,
        error: false
      })

      const { container } = render(
        <Home />
      )

      expect(container.innerHTML).toMatch("Category Foo")
      expect(container.innerHTML).toMatch("Product foo 55 /test.jpg")
    })
  })

  describe("with error", () => {
    it("renders error message", () => {
      useProductsMock.mockReturnValue({
        categories: [],
        isLoading: false,
        error: true
      })

      const { container } = render(
        <Home />
      )

      expect(container.innerHTML).toMatch("Error")
    })
  })
})
