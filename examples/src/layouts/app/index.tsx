import type { FunctionComponent } from 'react'

import Link from 'next/link'
import dynamic from 'next/dynamic'

const NextNprogress = dynamic(() => import('nextjs-progressbar'))

const AppLayout: FunctionComponent = ({ children }) => {
  return (
    <>
      <NextNprogress
        color="#000"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow
      />
      <nav className="sticky top-0 w-full h-[52px] bg-white px-4">
        <div className="flex flex-row items-center w-full max-w-[1280px] mx-auto h-full">
          <Link href="/">
            <a>
              <img
                className="h-[40px]"
                src="https://cdn.mybrikl.com/630d0cbc-a125-4537-9258-ca830009765a/media/brikllogopng-ahaat5qow.png?auto=compress&ixlib=react-9.3.0&h=50&w=150"
                alt="BRIKL"
              />
            </a>
          </Link>
        </div>
      </nav>
      {children}
    </>
  )
}

export default AppLayout
