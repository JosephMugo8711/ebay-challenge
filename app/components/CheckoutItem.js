"use client"

import { usePathname } from "next/navigation"


export default function CheckoutItem({ product }){
    const pathname = usePathname()

    return (
        <>
           <div className="flex justify-start p-4 mb-2 border rounded-lg"> 
               <img src={product.url+'/150'}  className="rounded-md w-[150px] h-[150px]"/>

               <div className="pl-2 overflow-hidden">
                <div className="font-semibold">
                    { product.title }
                </div>

                <div className="text-lg font-semibold">
                    <span className="font-bold">£{(product?.price / 100).toFixed(2)}</span>
                </div>
                
                <div className="relative flex items-center text-[14px] text-gray-500">
                    <div className="line-through">£{((product?.price * 1.2) / 100).toFixed(2)} </div>
                    <div className="px-2">-</div>
                    <div className="line-through">20%</div>
                </div>

                <div className="mt-2 text-sm">
                    {product.description.substring(0, 130)}...
                    
                </div>

                {
                    pathname == '/cart' ?
                    <div className="flex justify-end w-full mt-2 text-sm text-blue-500 underline cursor-pointer">
                        Remove 
                    </div>
                        
                : null}
                
               </div>

           </div>

        </>
    )
}