"use client"

import MainLayout from "../layouts/MainLayout"
import CheckoutItem from "../components/CheckoutItem"

export default function Checkout() {

    const product = {
        id: 2,
        title: "School Books",
        description: "The school book is a guide for students, offering clear explanations and information on various subjects to support their learning.",
        url: "https://picsum.photos/id/20",
        price: 1999
    }

    return(
        <>

           <MainLayout>
             <div id="CheckoutPage" className="mt-4 max-w-[1100px] mx-auto">
                <div className="mt-4 mb-4 text-2xl font-bold">
                    Checkout
                </div>
                <div className="relative flex items-baseline justify-between w-full gap-4 mx-auto">
                    <div className="w-[65%]">
                        <div className="p-4 bg-white border rounded-lg">

                            <div className="mb-2 text-xl font-semibold">Shipping Address</div>
                            <div>
                                <ul className="mt-2 text-sm">
                                    <li>Name: test</li>
                                    <li>Address: test</li>
                                    <li>Zipcode: test</li>
                                    <li>City: test</li>
                                    <li>Country: test</li> 
                                </ul>
                            </div>
                        </div>
                        <div id="Items" className="mt-4 bg-white rounded-lg">
                        <CheckoutItem key={product.id} product={product}/>
                        </div>
                    </div>

                    <div id="PlaceOrder" className="relative -top-[6px] w-[35%] border rounded-lg">
                        <div className="p-4">
                            <div className="flex items-baseline justify-between mb-1 text-sm">
                                <div>Items (3)</div>
                                <div>£12.99</div>
                            </div>
                            <div className="flex items-center justify-between mb-4 text-sm">
                                <div>Shipping:</div>
                                <div>Free</div>
                            </div>

                            <div className="border-t"/>

                            <div className="flex items-center justify-between my-4">
                                <div className="font-semibold">Order total</div>
                                <div className="text-2xl font-semibold">
                                   £12.99  
                                </div>
                            </div>
                            
                            <form>
                                <div className="p-2 border border-gray-500 rounded-sm" id="card-element"/>

                                <p id="card-error"
                                   role="alert"
                                   className="relative font-semibold text-center text-red-700 top-2"
                                />

                                <button type="submit" className="w-full p-3 mt-4 text-lg font-semibold text-white bg-blue-600 rounded-full">
                                    Confirm and pay
                                </button> 
                            </form>     
                        </div>
                        <div className="flex items-center justify-center gap-2 p-4 border-t">
                            <img width={50} src="/images/logo.svg"/>
                            <div className="mt-2 mb-2 font-light">MONEY BACK GUARANTEE</div>
                        </div>
                    </div>
                    
                </div>

             </div>
           </MainLayout>
        </>
    )
}