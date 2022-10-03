import Link from 'next/link'
import React, { useContext } from 'react'
import { shortenAddr } from '../utils/shortAddress'
import { Web3Context } from '../context/Web3Context'

const Header = () => {
  const { address, connect, disconnect } = useContext(Web3Context)

  const handleConnect = () => {
    if (address && address !== '') {
      disconnect()
    } else {
      connect()
    }
  }

  return (
    <header className="absolute sticky top-0 z-50 flex flex-col items-center justify-center w-auto h-20 px-8 border-b md:flex md:flex-row bg-primary border-secondary">
      <nav className="flex items-center justify-center w-full">
        <div className="flex items-center flex-auto">
          <div className="flex items-center "></div>
          <Link href="/">
            <img // eslint-disable-line
              className="w-auto h-12 px-2 py-2 border rounded cursor-pointer hover:border-fontColor hover:w-auto border-terciary"
              src="/images/MyLogo.png"
              alt="Change your logo here"
            />
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          <div className="block ml-2 "></div>
          <div className="items-center justify-end space-x-4 md:inline-flex">
            <button
              className="h-12 px-4 py-2 text-base text-fontColor border rounded bg-primary border-terciary hover:border-fontColor"
              onClick={ handleConnect }
            >
              {address && address !== '' ? shortenAddr(address) : 'Connect Wallet'}
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
