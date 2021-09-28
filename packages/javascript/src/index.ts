export { Storefront, __StorefrontContext, gql } from './core'

export { Amplify, Auth } from 'aws-amplify'

export type {
  CognitoConfig,
  ContextInitialize,
  StorefrontQuery,
  HeaderField,
  QueryOption,
  QueryResult,
  Edge,
  Edges,
} from './types'

import { Storefront } from './core'
export default Storefront
