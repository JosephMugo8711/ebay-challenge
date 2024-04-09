"use client"
import { useEffect, useState } from "react"
import ProductComp from "./Product"
import { BiLoader } from 'react-icons/bi'

export default function SimilarProducts () {

  // State to store the list of similar products
  const [products, setProducts] = useState([])

  // Function to fetch random products
  const getRandomProducts = async () => {
    try {
      const response = await fetch('/api/products/get-random')
      const result = await response.json()

      if (result) {
        setProducts(result)
        return
      }

      setProducts([])
    } catch (error) {
      console.log(error)
      alert(error)
    }
  }

  // Fetch random products on component mount
  useEffect(() => { getRandomProducts() }, [])

  return ( 
    <>
        <div>
            {/* Divider */}
            <div className="border-b py-1 max-w-[1200px] mx-auto" />

            <div className="max-w-[1200px] mx-auto">
                <div className="py-2 mt-4 text-2xl font-bold">Similar sponsored items</div>

                {/* Display loading spinner if products are loading */}
                {products.length > 0 ?
                  <div className="grid grid-cols-5 gap-4">
                    {/* Display each product */}
                    {products.map(product => (
                        <ProductComp key={product.id} product={product} />
                    ))}
                  </div>
                : <div className="flex items-center justify-center">
                      <div className="flex items-center justify-center gap-4 font-semibold">
                          <BiLoader size={30} className="text-blue-400 animate-spin"/>
                          Loading Products...
                      </div>
                  </div>}
            </div>
        </div>
    </>
  );
};