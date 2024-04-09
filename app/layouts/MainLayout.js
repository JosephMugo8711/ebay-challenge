'use client'


import TopMenu from './includes/TopMenu'
import MainHeader from './includes/MainHeader'
import SubMenu from './includes/SubMenu'
import Footer from './includes/Footer'
import Loading from '../components/Loading'
import { useEffect, useState } from 'react'

export default function MainLayout({ children }) {
    // State to manage the loading state of the application
    const [isLoading, setIsLoading] = useState(false)

    // Listen for storage events to update the loading state
    useEffect(() =>{
      window.addEventListener("storage", function () {
        let res = localStorage.getItem('isLoading')
        // Update the loading state based on the stored value
        res === 'false' ? setIsLoading(false) : setIsLoading(true)
      })
    })

    return (
      <>
        <div id="MainLayout" className='min-w-[1050px] max-w-[1300px] mx-auto'>
            <div>
              {/* Display the loading component if the application is loading */}
              {isLoading ? <Loading /> : <div></div>}
              <TopMenu />
              <MainHeader />
              <SubMenu />
            </div>

            <div>{children}</div>

            <div>
              <Footer />
            </div>
        </div>
      </>
    )
  }
