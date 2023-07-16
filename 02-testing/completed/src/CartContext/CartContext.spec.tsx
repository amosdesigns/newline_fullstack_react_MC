import { render } from "@testing-library/react"
import { CartProvider, CartContext } from "./CartContext"
import { useCart } from "./useCart"

jest.mock("./useCart", () => ({
  useCart: jest.fn()
}))

const useCartMock = useCart as unknown as jest.Mock<
  Partial<ReturnType<typeof useCart>>
>

describe("CartProvider", () => {
  describe("when 'addToCart' is called", () => {
    it("adds product to products array", () => {
      const cartHookReturnValue = {
        products: [],
        totalPrice: () => 0,
        addToCart: () => {},
        removeFromCart: () => {},
        clearCart: () => {}
      }
      useCartMock.mockReturnValue(cartHookReturnValue)
      const mockChildrenFunction = jest.fn(() => null)

      render(
        <CartProvider useCartHook={() => cartHookReturnValue}>
          <CartContext.Consumer>
            {mockChildrenFunction}
          </CartContext.Consumer>
        </CartProvider>
      )

      expect(mockChildrenFunction).toHaveBeenCalledWith(
        cartHookReturnValue
      )
    })
  })
})
