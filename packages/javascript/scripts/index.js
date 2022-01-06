#!/usr/bin/env node
const { writeFileSync } = require('fs')
const { execSync } = require('child_process')
const { stdout } = require('process')

const createSchema = config => `schema: ${config.schema}${
  config.document ? `\ndocuments: ${config.document}` : ''
}
generates:
  ${__dirname}/../generated.ts:
    plugins:
      - typescript
      - typescript-operations
      - typed-document-node
`

const {
  argv: [_, __, ...args],
} = process

const codegen = () => {
  const document = args[1] ? `${process.cwd()}/${args[1]}` : undefined

  if (document) console.log('Generating code for document:', document)

  writeFileSync(
    `${__dirname}/../codegen.yml`,
    createSchema({
      schema: 'https://dev.internal-api.brikl.com/graphql/storefront/internal',
      document,
    })
  )

  try {
    execSync(`cd ${__dirname} && yarn graphql-codegen`, {
      cwd: __dirname,
      env: {
        ...process.env,
        NODE_NO_WARNINGS: 1,
      },
    })
  } catch (err) {
    stdout.write(err.stdout)
  }
}

if (args[0] === 'codegen') codegen()

// TODO: Programmatically generate a schema from a GraphQL endpoint
// import { codegen } from '@graphql-codegen/core'
// import {
//   getIntrospectionQuery,
//   IntrospectionQuery,
//   buildClientSchema,
//   parse,
//   printSchema,
// } from 'graphql'
// import fetch from 'node-fetch'

// const fetchSchema = async (url: string) =>
//   fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: getIntrospectionQuery(),
//   })
//     .then(res => res.json() as Promise<IntrospectionQuery>)
//     .then(response => {
//       const { __schema: schema } = response

//       if (schema) throw new Error('Invalid schema')

//       return parse(printSchema(buildClientSchema(response)))
//     })

// const main = async () => {
//   codegen({
//       filename: '',
//       plugins: [{
//           "typescript": {}
//       }],
//     schema: await fetchSchema(
//       'https://dev.internal-api.brikl.com/graphql/storefront/internal'
//     ),
//     documents: [
//       {
//         document: await fetchSchema(
//           'https://dev.internal-api.brikl.com/graphql/storefront/internal'
//         ),
//       },
//     ],
//   })
// }
