"use client"

import Link from "next/link"
import { AiOutlineSearch } from "react-icons/ai"

export default function MainHeader() {
    return(
        <>
          <div id="MainHeader" className="border-b"> 
            <div className="flex items-center justify-between w-full mx-auto max-w-[1200px]">
               <div className="flex items-center w-full bg-white">
                 <div className="flex lg:justify-start max-w-[1150px] justify-between gap-10  w-full px-3 py-5 mx-auto">
                    <Link href="/">
                        <img width="120" src="/images/logo.svg"/>
                    </Link>

                    <div className="w-full">
                        <div  className="relative">
                            <div className="flex items-center">
                                <div className="relative flex items-center w-full p-2 border-2 border-gray-900">

                                    <button className="flex items-center">
                                        <AiOutlineSearch  size={22}/> 
                                    </button>

                                    <input 
                                       className="w-full pl-3 text-sm placeholder-gray-400 focus:outline-none"
                                       placeholder="Search for anything"
                                       type="text"
                                    
                                    />
                                </div>
                                
                                <button className="flex items-center text-sm font-semibold bg-blue-600 text-white p-[11px] ml-2 px-14">
                                    Search
                                </button>

                                <div className="px-2 text-xs cursor-pointer hover:text-blue-500">
                                    Advanced
                                </div>
                                
                            </div>
                            
                        </div>
                        
                    </div>
                 </div>
               </div>  
            </div>

          </div>  
        </>
    )
}