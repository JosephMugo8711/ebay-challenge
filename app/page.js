"use client"

import { useEffect, useState } from 'react';
import CarouselComp from './components/CarouselComp'
import Product from './components/Product';
import MainLayout from './layouts/MainLayout';
import useIsLoading from "@/app/hooks/useIsLoading"

export default function Home() {

  // State to store the list of products
  const [products, setProducts] = useState([])

  // Function to fetch the list of products
  const getProducts = async () => {
    useIsLoading(true)

    const response = await fetch('/api/products')
    const prods = await response.json()

    setProducts([])
    setProducts(prods)
    useIsLoading(false)
  }

  // Fetch the list of products on component mount
  useEffect(() => { getProducts() }, [])

  return (
    <>
        <MainLayout>
          {/* Display carousel */}
          <CarouselComp />

          <div className="max-w-[1200px] mx-auto">
            <div className="px-4 mt-4 mb-6 text-2xl font-bold">Products</div>

            {/* Display products in a grid */}
            <div className="grid grid-cols-5 gap-4">
              {products.map(product => (
                <Product key={product.id} product={product} />
              ))}
            </div>
          </div>
        </MainLayout>
    </>
  )
}
