'use client'
import React, { useState, useEffect } from 'react'
import Logo from './logo'
import Account from './Account'
import SearchWithCategory from './SearchWithCategory'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/auth'

const Header = () => {

  const [showNavbar, setShowNavbar] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const route = usePathname()
  const auth = useAuth()

  const isHome = route === '/'

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      setShowNavbar(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);


  return (
    <nav className={`fixed top-0 left-0 max-h-18 z-20 transition-transform duration-300 w-screen bg-secondary text-bright h-full flex items-center border-b border-b-bright-300/20 justify-center ${showNavbar ? ' translate-y-0' : '-translate-y-full'}`}>
      <div className='lg:grid lg:grid-cols flex items-center justify-between lg:grid-cols-[200px_1fr_300px]  px-2 lg:max-w-7xl w-full h-full py-2'>
        <Logo />
        {!isHome ? <SearchWithCategory /> : <div />}
        <Account auth={auth} />
      </div>
    </nav>
  )
}

export default Header