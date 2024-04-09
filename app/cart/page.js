"use client"

// Client-only imports to prevent Next.js hydration errors
import MainLayout from "../layouts/MainLayout"
import SimilarProducts from "../components/SimilarProducts"
import CartItem from "../components/CartItem"
import { useCart } from "../context/cart"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import useIsLoading from "../hooks/useIsLoading"
import ClientOnly from "../components/ClientOnly"

export default function Cart() {
  const router = useRouter()
  const cart = useCart()

  // useEffect to fetch cart data and calculate cart total
  useEffect(() => { 
    useIsLoading(true)
    cart.getCart() 
    cart.cartTotal()
    useIsLoading(false)
  }, [cart])

  // Function to navigate to checkout page
  const goToCheckout = () => {
    if (!cart.cartTotal()) {
      alert("You don't have any items in the cart.")
      return
    }
    router.push('/checkout')
  }

  return (
    <>
      <MainLayout>
        <div className="max-w-[1200px] mx-auto mb-8 min-h-[300px]">
          <div className="my-4 text-2xl font-bold">Shopping cart</div>
          <div className="relative flex items-baseline justify-between gap-2">
            <ClientOnly>
              <div className="w-[65%]">
                {cart.getCart().map(product => (
                  <CartItem key={product.id} product={product}/>
                ))}
              </div>
            </ClientOnly>

            <div id="GoToCheckout" className="md:w-[33%] absolute top-0 right-0 m-2">
              <ClientOnly>
                <div className="p-4 bg-white border">
                  <button 
                    onClick={() => goToCheckout()} 
                    className="flex items-center justify-center w-full p-3 mt-4 font-semibold text-white bg-blue-600 rounded-full"
                  >
                    Go to checkout
                  </button>

                  <div className="flex items-center justify-between mt-4 mb-1 text-sm">
                    <div>Items ({cart.getCart().length})</div>
                    <div>£{(cart.cartTotal() / 100).toFixed(2)}</div>
                  </div>
                  <div className="flex items-center justify-between mb-4 text-sm">
                    <div>Shipping:</div>
                    <div>Free</div>
                  </div>

                  <div className="border-b border-gray-300"/>

                  <div className="flex items-center justify-between mt-4 mb-1 text-lg font-semibold">
                    <div>Subtotal</div>
                    <div>£{(cart.cartTotal() / 100).toFixed(2)}</div>
                  </div>
                </div>
              </ClientOnly>
            </div>
          </div>
        </div>

        <SimilarProducts />
      </MainLayout>
    </>
  )
}
