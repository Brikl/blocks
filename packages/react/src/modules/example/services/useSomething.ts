import { useState, useEffect } from 'react'

import { getSomething } from '@brikl/js'

export const useSomething = (start: number) => {
  const [number, setNumber] = useState(start)

  // increment the number every second
  useEffect(() => {
    setInterval(() => {
      setNumber(n => getSomething(n, 1))
    }, 1000)
  })

  return number
}
