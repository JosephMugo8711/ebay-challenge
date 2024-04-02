"use client"

import MainLayout from "../layouts/MainLayout"
import SimilarProducts from "../components/SimilarProducts"
import CartItem from "../components/CartItem"
export default function Cart() {

    const products = {
        id: 2,
        title: "School Books",
        description: "The school book is a guide for students, offering clear explanations and information on various subjects to support their learning.",
        url: "https://picsum.photos/id/20",
        price: 1999
    }

    return(
        <>
           <MainLayout>
            <div className="max-w-[1200px] mx-auto mb-8 min-h-[300px]">
                <div className="my-4 text-2xl font-bold">Shopping Cart </div>
                <div className="relative flex items-baseline justify-between gap-2">
                    <div className="w-[65%]">
                        <CartItem key={products.id} product={products}/>
                    </div>
                    <div id="GoToCheckout" className="md:w-[33%] absolute top-0 right-0 m-2">
                        <div className="p-4 bg-white border">
                            
                            <button className="flex items-center justify-center w-full p-3 mt-4 font-semibold text-white bg-blue-600 rounded-full">
                                Go to Checkout
                            </button>

                            <div className="flex items-center justify-between mt-4 mb-1 text-sm">
                                <div>Items (3)</div>
                                <div>£12.99</div>
                            </div>
                            <div className="flex items-center justify-between mt-4 text-sm">
                                <div>Shipping</div>
                                <div>Free</div>
                            </div>

                            <div className="border-b border-gray-300"/>

                            <div className="flex items-center justify-between mt-4 mb-1 text-lg font-semibold">
                                <div>Subtotal</div>
                                <div>£12.99</div>
                            </div>
                            
                        </div>
                        
                    </div>
                    
                </div>
            </div>
              <SimilarProducts />
           </MainLayout>
        </>
    )
}