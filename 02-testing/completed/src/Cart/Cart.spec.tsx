import { Cart } from "./Cart"
import { fireEvent } from "@testing-library/react"
import { CartItemProps } from "./CartItem"
import { useCartContext } from "../CartContext"

jest.mock("../CartContext", () => ({
  useCartContext: jest.fn()
}))

const useCartContextMock = useCartContext as unknown as jest.Mock<
  Partial<ReturnType<typeof useCartContext>>
>

jest.mock("./CartItem", () => ({
  CartItem: ({ product }: CartItemProps) => {
    const { name, price, image } = product
    return (
      <div>
        {name} {price} {image}
      </div>
    )
  }
}))

describe("Cart", () => {
  describe("without products", () => {
    beforeEach(() => {
      useCartContextMock.mockReturnValue({
        products: []
      })
    })

    it("renders empty cart message", () => {
      const { container } = renderWithRouter(() => <Cart />)
      expect(container.innerHTML).toMatch("Your cart is empty.")
    })

    describe("on 'Back to main page' click", () => {
      it("redirects to '/'", () => {
        const { getByText, history } = renderWithRouter(() => (
          <Cart />
        ))

        fireEvent.click(getByText("Back to main page."))

        expect(history.location.pathname).toBe("/")
      })
    })
  })

  describe("with products", () => {
    beforeEach(() => {
      const products = [
        {
          name: "Product foo",
          price: 100,
          image: "/image/foo_source.png"
        },
        {
          name: "Product bar",
          price: 100,
          image: "/image/bar_source.png"
        }
      ]

      useCartContextMock.mockReturnValue({
        products,
        totalPrice: () => 55
      })
    })

    it("renders cart products list with total price", () => {
      const { container } = renderWithRouter(() => <Cart />)

      expect(container.innerHTML).toMatch(
        "Product foo 100 /image/foo_source.png"
      )
      expect(container.innerHTML).toMatch(
        "Product bar 100 /image/bar_source.png"
      )
      expect(container.innerHTML).toMatch("Total: 55 Zm")
    })

    describe("on 'go to checkout' click", () => {
      it("redirects to '/checkout'", () => {
        const { getByText, history } = renderWithRouter(() => (
          <Cart />
        ))

        fireEvent.click(getByText("Go to checkout"))

        expect(history.location.pathname).toBe("/checkout")
      })
    })
  })
})
