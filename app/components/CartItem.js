"use client"


export default function CartItem({ product }){
    return (
        <>
          <div className="relative flex justify-start w-full p-6 my-2 border">
             <img src={product?.url+'/150'} className="rounded-md w-[150px] h-[150px]"/>

             <div className="w-full pl-2 overflow-hidden">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center justify-between font-semibold w-[400px] text-[16px] underline">
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
                    <button className="text-blue-500 underline">
                        Remove
                    </button>
                    
                </div>
                     
             </div>
          </div>
        </>
    )
}