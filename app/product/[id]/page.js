"use client";

import MainLayout from "../../layouts/MainLayout"
import SimilarProducts from "../../components/SimilarProducts"
import { useEffect, useState } from "react"
import useIsLoading from "../../hooks/useIsLoading"
import { useCart } from "../../context/cart"
import { toast } from "react-toastify"

// Product component to display product details
export default function Product({ params }){

      // Use the useCart hook to access cart state and methods
    const cart = useCart()
    // State to store the product details
    const [product, setProduct] = useState({})

    // Function to fetch the product details
    const getProduct = async () => {
        useIsLoading(true)
        setProduct({})

        const response = await fetch(`/api/product/${params.id}`)
        const prod = await response.json()
        setProduct(prod)
        cart.isItemAddedToCart(prod)
        useIsLoading(false)

    }

    // Fetch product details on component mount
    useEffect(() => { 
        getProduct() 
    }, [])

    return (
        <>
          <MainLayout>
            <div className="max-w-[1200px] mx-auto">
              <div className="flex px-4 py-10">
    
                {/* Product image */}
                {product?.url 
                  ? <img className="w-[40%] rounded-lg" src={product?.url+'/280'} /> 
                  : <div className="w-[40%]"></div> 
                }
    
                {/* Product details */}
                <div className="w-full px-4">
                  <div className="text-xl font-bold">{product?.title}</div>
                  <div className="pt-2 text-sm text-gray-700">Brand New - Full Warranty</div>
    
                  <div className="py-1 border-b" />
    
                  <div className="pt-3 pb-2">
                    <div className="flex items-center">
                      Condition: <span className="font-bold text-[17px] ml-2">New</span>
                    </div>
                  </div>
    
                  <div className="py-1 border-b" />
    
                  <div className="pt-3">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        Price: 
                        {/* 
                            // If no price, show nothing
                            // else if their is price show GBP 
                            // Display price in GBP if available
                        
                         */}
                        {product?.price 
                          ? <div className="font-bold text-[20px] ml-2">
                              GBP £{(product?.price / 100).toFixed(2)}
                            </div> 
                        : null }
                      </div>
                      
                      {/* Add to cart button */}
                      <button 
                        onClick={() => {
                          if (cart.isItemAdded) {
                            cart.removeFromCart(product)
                            toast.info('Removed from cart', { autoClose: 3000 })
                          } else {
                            cart.addToCart(product)
                            toast.success('Added to cart', { autoClose: 3000 })
                          }
                        }} 
                        className={`
                          text-white py-2 px-20 rounded-full cursor-pointer 
                          ${cart.isItemAdded ? 'bg-[#e9a321] hover:bg-[#bf851a]' : 'bg-[#3498C9] hover:bg-[#0054A0]'}
                        `}
                      >
                          {cart.isItemAdded ? 'Remove From Cart' : 'Add To Cart'}
                      </button>
                    </div>
                  </div>
    
                  <div className="py-1 border-b" />
    
                  {/* Product description */}
                  <div className="pt-3">
                    <div className="pb-1 font-semibold">Description:</div>
                    <div className="text-sm">{product?.description}</div>
                  </div>
    
                </div>
              </div>
            </div>
    
            {/* Display similar products */}
            <SimilarProducts />
    
          </MainLayout>
        </>
      )
    }