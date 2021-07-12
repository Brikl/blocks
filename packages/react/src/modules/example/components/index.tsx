import { memo } from 'react'

import { Text } from '@chakra-ui/react'

import { useSomething } from '../services/useSomething'

export interface ExampleProps {
  start?: number
}

export const Example = memo<ExampleProps>(props => {
  const { start = 0 } = props

  const number = useSomething(start)

  return <Text>{number}</Text>
})
