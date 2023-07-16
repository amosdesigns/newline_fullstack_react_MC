import { Checkout } from "./Checkout"
import { render } from "@testing-library/react"
import { CheckoutList } from "./CheckoutList"
import { CheckoutForm } from "./CheckoutForm"
import { useCartContext } from "../CartContext"

jest.mock("../CartContext", () => ({
  useCartContext: jest.fn()
}))

const useCartContextMock = useCartContext as unknown as jest.Mock<
  Partial<ReturnType<typeof useCartContext>>
>

const products = [
  {
    name: "Product foo",
    price: 0,
    image: "image.png"
  }
]

describe("Checkout", () => {
  beforeEach(() => {
    useCartContextMock.mockReturnValue({
      products,
      removeFromCart: () => {},
      totalPrice: () => 55
    })
  })

  it("shows total price", () => {
    const { container } = render(<Checkout />)
    expect(container.innerHTML).toMatch("Total: 55 Zm")
  })

  it("passes products to CheckoutList", () => {
    const { container } = render(<Checkout />)
    expect(container.innerHTML).toMatch("Product foo")
  })

  it("renders checkout form", () => {
    const { getByTestId } = render(<Checkout />)
    expect(getByTestId("checkout-form")).toBeInTheDocument()
  })
})
