"use client"

import debounce from 'lodash/debounce';
import Link from "next/link";
import { useState } from "react";
import { AiOutlineSearch } from 'react-icons/ai'
import { BiLoaderCircle } from 'react-icons/bi'

export default function MainHeader() {

    // State to store search results
    const [items, setItems] = useState([])
    // State to track if a search is in progress
    const [isSearching, setIsSearching] = useState(null)

    // Debounced function to handle search input
    const handleSearchName = debounce(async (event) => {
        // If search input is empty, clear items and return
        if (event.target.value == "") {
            setItems([])
            return
        }

        // Set searching state to true
        setIsSearching(true)

        try {
            // Fetch search results from API
            const response = await fetch(`/api/products/search-by-name/${event.target.value}`)
            const result = await response.json()

            // If results are found, set items and set searching state to false
            if (result) {
                setItems(result)
                setIsSearching(false)
                return
            }
            // If no results found, clear items and set searching state to false
            setItems([])
            setIsSearching(false)
        } catch (error) {
            // Log and alert any errors that occur during search
            console.log(error)
            alert(error)
        }
    }, 500)
    
    return (
        <>
            <div id="MainHeader" className="border-b">
                <nav className="flex items-center justify-between w-full mx-auto max-w-[1200px]">
                    <div className="flex items-center w-full bg-white">
                        <div className="flex lg:justify-start justify-between gap-10 max-w-[1150px] w-full px-3 py-5 mx-auto">
                            <Link href="/">
                                <img width="120" src="/images/logo.svg" />
                            </Link>

                            <div className="w-full">
                                <div className="relative">
                                    {/* Search input */}
                                    <div className="flex items-center">
                                        <div className="relative flex items-center w-full p-2 border-2 border-gray-900">
                                            
                                            <button className="flex items-center">
                                                <AiOutlineSearch size={22}/>
                                            </button>

                                            <input 
                                                className="w-full pl-3 text-sm placeholder-gray-400 focus:outline-none"
                                                onChange={handleSearchName}
                                                placeholder="Search for anything"
                                                type="text"
                                            />

                                            {/* Loading spinner */}
                                            {isSearching ? <BiLoaderCircle className="mr-2 animate-spin" size={22} /> : null}
                                        
                                            {/* Display search results */}
                                            {items.length > 0 ?
                                                <div className="absolute bg-white max-w-[910px] h-auto w-full z-20 left-0 top-12 border p-1">
                                                    {items.map((item) => (
                                                        <div className="p-1" key={item.id}>
                                                            <Link 
                                                                href={`/product/${item?.id}`}
                                                                className="flex items-center justify-between w-full p-1 px-2 cursor-pointer hover:bg-gray-200"
                                                            >
                                                                <div className="flex items-center">
                                                                    <img className="rounded-md" width="40" src={item?.url+'/40'} />
                                                                    <div className="ml-2 truncate">{ item?.title }</div>
                                                                </div>
                                                                <div className="truncate">£{ (item?.price / 100).toFixed(2) }</div>
                                                            </Link>
                                                        </div>
                                                    ))}
                                                </div>
                                            : null}

                                        </div>

                                        <button className="flex items-center bg-blue-600 text-sm font-semibold text-white p-[11px] ml-2 px-14">
                                            Search
                                        </button>

                                        {/* Advanced search link */}
                                        <div className="px-2 text-xs cursor-pointer hover:text-blue-500">Advanced</div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}