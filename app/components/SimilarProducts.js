"use client"

import ProductComp from "./Product"
import {BiLoader} from "react-icons/bi"


export default function SimilarProducts(){

    const products = [
        {
          id: 1,
          title: "Brown Bag",
          description: "",
          url: "https://picsum.photos/id/7",
          price: 2500
        },
        {
          id: 2,
          title: "School Books",
          description: "",
          url: "https://picsum.photos/id/20",
          price: 1999
        },
      ]
    return (
        <>
           <div>
              <div className="py-1 border-b max-w-[1200px] mx-auto"/>
              <div className="max-w-[1200px] mx-auto" >
                <div className="py-2 mt-4 text-2xl font-bold">
                    Similar sponsored items
                </div>
                
                {products.length > 0 ? 
                    <div className="grid grid-cols-5 gap-4">
                        {
                            products.map(product => (
                                <ProductComp key={product.id} product={product} />
                            ))
                        }
                        
                    </div>
                :  <div className="flex items-center justify-center">
                     <div className="flex items-center justify-center gap-4 font-semibold">
                        <BiLoader  size={30} className="text-blue-400 animate-spin"/>
                        Loading Products......
                        
                     </div>
                    
                </div>                }
                
              </div>
           </div>
        </>
    )
}