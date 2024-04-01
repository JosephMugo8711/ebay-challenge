"use client";

import CarouselCamp from "./components/CarouselComp";
import MainLayout from "./layouts/MainLayout"
import Product from "./components/Product";
export default function Home() {

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

    <MainLayout>
      <CarouselCamp />

      <div className="max-w-[1200px] mx-auto">
        <div className="px-4 mt-4 mb-6 text-2xl font-bold">Products</div>

        <div className="grid grid-cols-5 gap-4">
          {products.map(product => (
            <Product key={product.id} product={product}/>
          ))}
        </div>

        
      </div>


    </MainLayout>


  );
}
