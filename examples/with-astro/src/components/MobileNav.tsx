import { useState } from 'react'

export const MobileNav = () => {
  const [showNav, setShowNav] = useState(false)
  return (
    <div class="block md:hidden w-full flex-1">
      <div className="flex justify-between w-full py-2 h-16">
        <a href="/" class="block">
          <img
            src="/assets/brikl-logo.png"
            class="max-h-full max-w-32 w-full"
          />
        </a>
        <button
          className="p-2"
          onClick={() => {
            setShowNav(s => !s)
          }}
        >
          Click me
        </button>
      </div>
      {showNav && (
        <div class="absolute left-0 top-16 w-screen bg-white shadow-md">
          <h3 class="p-2">Design Studio</h3>
          <h3 class="p-2">How It Works</h3>
          <h3 class="p-2">Contact</h3>
          <h3 class="p-2">Size & Price</h3>
        </div>
      )}
    </div>
  )
}
