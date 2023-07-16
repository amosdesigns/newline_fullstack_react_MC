import { render, fireEvent } from "@testing-library/react"
import { ProductCard } from "./ProductCard"
import { Product } from "../shared/types"
import { useCartContext } from "../CartContext"

jest.mock("../CartContext", () => ({
  useCartContext: jest.fn()
}))

const useCartContextMock = useCartContext as unknown as jest.Mock<
  Partial<ReturnType<typeof useCartContext>>
>

const product: Product = {
  name: "Product foo",
  price: 55,
  image: "/test.jpg"
}

describe("ProductCard", () => {
  it("renders correctly", () => {
    useCartContextMock.mockReturnValue({
      addToCart: () => {},
      products: [product]
    })
    const { container, getByRole } = render(
      <ProductCard datum={product} />
    )

    expect(container.innerHTML).toMatch("Product foo")
    expect(container.innerHTML).toMatch("55 Zm")
    expect(getByRole("img")).toHaveAttribute("src", "/test.jpg")
  })

  describe("when the product is in the cart", () => {
    it("the 'Add to cart' button is disabled", () => {
      useCartContextMock.mockReturnValue({
        addToCart: () => {},
        products: [product]
      })

      const { getByRole } = render(<ProductCard datum={product} />)
      expect(getByRole("button")).toBeDisabled()
    })
  })

  describe("when the product is not in the cart", () => {
    describe("on 'Add to cart' click", () => {
      it("calls the 'addToCart' function", () => {
        const addToCart = jest.fn()
        useCartContextMock.mockReturnValue({
          addToCart,
          products: []
        })

        const { getByText } = render(<ProductCard datum={product} />)

        fireEvent.click(getByText("Add to cart"))
        expect(addToCart).toHaveBeenCalledWith(product)
      })
    })
  })
})
