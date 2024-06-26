"use client"

// Client-only imports to prevent Next.js hydration errors
import { useCart } from "../context/cart"
import { toast } from "react-toastify"

export default function CartItem({ product }) {
  const cart = useCart()

  // Function to remove item from cart
  const removeItemFromCart = () => {
    let res = confirm(`Are you sure you want to remove this? "${product.title}"`)
    if (res) {
        cart.removeFromCart(product)
        toast.info('Removed from cart', { autoClose: 3000 })
    }
  }

  return (
    <>
      <div className="relative flex justify-start w-full p-6 my-2 border">
        <img src={product?.url+'/150'} className="rounded-md w-[150px] h-[150px]" />

        <div className="w-full pl-2 overflow-hidden">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center font-semibold justify-between w-[400px] text-[16px] underline">
              {product?.title}
            </div>
            <div className="text-lg font-bold">
              £{(product?.price / 100).toFixed(2)}
            </div>
          </div>

          <div className="mt-2 font-semibold">
            NEW
          </div>

          <div className="mt-2 text-sm">
            {product?.description.substring(0, 150)}...
          </div>

          <div className="absolute bottom-0 right-0 p-4 text-sm">
            <button onClick={() => removeItemFromCart()} className="text-blue-500 underline">
              Remove
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
