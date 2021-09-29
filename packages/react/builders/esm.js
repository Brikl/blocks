const { nodeExternalsPlugin } = require('esbuild-node-externals');

const traverse = require('../../../tools/traverse')

require('esbuild')
  .build({
    entryPoints: traverse('./src'),
    outdir: './dist/esm',
    format: 'esm',
    bundle: true,
    minify: false,
    keepNames: true,
    target: ['es2019'],
    plugins: [nodeExternalsPlugin()]
  })
  .catch(() => process.exit(1))
