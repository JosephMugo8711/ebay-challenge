"use client"

import Link from "next/link";
import { CiDeliveryTruck } from 'react-icons/ci'
import MainLayout from "../layouts/MainLayout";
import { useUser } from "../context/user";
import useIsLoading from "../hooks/useIsLoading";
import { useState, useEffect } from "react";
import { toast } from "react-toastify"
import moment from "moment";


export default function Orders() {

    const { user } = useUser() 
    const [orders, setOrders] = useState([])

    // Function to fetch user's orders
    const getOrders = async () => {
        try {
            if (!user || !user.id) return
            const response = await fetch("/api/orders")
            const result = await response.json()
            setOrders(result)
            useIsLoading(false)
        } catch (error) {
            toast.error('Something went wrong?', { autoClose: 3000 })
            useIsLoading(false)
        }
    }

    // Fetch user's orders on component mount or user change
    useEffect(() => {
        useIsLoading(true)
        getOrders()
    }, [user])
    
    return (
        <>
            {/* Main layout for the component */}
            <MainLayout>
                <div id="OrdersPage" className="mt-4 max-w-[1200px] mx-auto px-2 min-h-[50vh]">
                    <div className="bg-white w-full p-6 min-h-[150px]">
                        <div className="flex items-center text-xl">
                            {/* Delivery truck icon */}
                            <CiDeliveryTruck className="text-green-500" size={35}/>
                            <span className="pl-4">Orders</span>
                        </div>
                        {/* Render message if no orders */}
                        {orders.length < 1 ?
                            <div className="flex items-center justify-center">
                                You have no order history
                            </div>
                        : null}

                        {/* Map through user's orders and render details */}
                        {orders.map(order => (
                            <div key={order?.id} className="text-sm pl-[50px]">
                                <div className="py-1 border-b">
                                    <div className="pt-2">
                                        <span className="mr-2 font-bold">Stripe ID:</span>
                                        {order?.stripe_id}
                                    </div>

                                    <div className="pt-2">
                                        <span className="mr-2 font-bold">Delivery Address:</span>
                                        {order?.name}, {order?.address}, {order?.zipcode}, {order?.city}, {order?.country}
                                    </div>

                                    <div className="pt-2">
                                        <span className="mr-2 font-bold">Total:</span>
                                        £{order?.total / 100}
                                    </div>

                                    <div className="pt-2">
                                        <span className="mr-2 font-bold">Order Created:</span>
                                        {moment(order?.created_at).calendar()}
                                    </div>

                                    <div className="py-2">
                                        <span className="mr-2 font-bold">Delivery Time:</span>
                                        {moment(order?.created_at).add(3, 'days').calendar()}
                                    </div>

                                    <div className="flex items-center gap-4">
                                        {/* Map through order items and render details */}
                                        {order?.orderItem.map(item => (
                                            <div key={item.id} className="flex items-center">
                                                {/* Link to product details page */}
                                                <Link 
                                                    className="py-1 font-bold text-blue-500 hover:underline" 
                                                    href={`/product/${item.product_id}`}
                                                >
                                                    <img className="rounded" width="120" src={item.product.url+'/120'} />
                                                    {item.product.title}
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </MainLayout>
        </>
    )
}