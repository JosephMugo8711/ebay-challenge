"use client";

import MainLayout from "@/app/layouts/MainLayout";
import { Main } from "next/document";
import SimilarProducts from "@/app/components/SimilarProducts";
import { useCart } from "@/app/context/cart";
import { toast } from "react-toastify"

// Product component to display product details
export default function Product({ params }){

      // Use the useCart hook to access cart state and methods
    const cart = useCart()

    const product = {
          id: 2,
          title: "School Books",
          description: "The school book is a guide for students, offering clear explanations and information on various subjects to support their learning.",
          url: "https://picsum.photos/id/20",
          price: 1999
    }
    return (
        <>
          <MainLayout>
            <div className="max-w-[1200px] mx-auto">
                <div className="flex px-4 py-10">

                     {/* Display the product image if available */}

                    {product?.url
                         ? <img className="w-[40%] rounded-lg" src={product?.url+'/280'}/>
                         : <div className="w-[40%]"></div>  
                    }

                    <div className="w-full px-4">
                        <div className="text-xl font-bold">{product?.title}</div>
                        <div className="pt-2 text-sm text-gray-700">Brand New - Full Warranty</div>
                        
                        <div className="py-1 border-b"/>

                        <div className="pt-3 pb-2">
                            <div className="flex items-center">
                                Condition: <span className="font-bold text-[17px] ml-2">New</span>
                            </div>  
                        </div>

                        <div className="py-1 border-b"/>

                        <div className="pt-3">
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center">
                                    Price:
                                    {
                                        // If no price, show nothing
                                        // else if their is price show GBP 
                                        // Display price in GBP if available
                                        product?.price 
                                        ? <div className="font-bold text-[20px] ml-2">
                                            GBP £{(product?.price / 100).toFixed(2)} 
                                           </div>
                                    : null }  
                                </div>
                                
                                {/* Button to add/remove product from cart */}
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
                                    `}>
                                    {cart.isItemAdded ? 'Remove From Cart' : 'Add To Cart'}
                                </button>                           
                            </div>   
                        </div>

                        <div className="py-1 border-b"/> 
                                <div className="pt-3">
                                    <div className="pb-1 font-semibold">Description:</div>
                                    <div className="text-sm">{product?.description}</div>
                                </div>       
                    </div>

                </div>

            </div>
            
            <SimilarProducts />
            
          </MainLayout>
        </>
    )
}