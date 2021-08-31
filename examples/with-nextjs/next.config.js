const { resolve } = require('path')

module.exports = {
    target: 'serverless',
    webpack(config) {
        config.resolve.alias = {
            ...config.resolve.alias,
            react: resolve('../../node_modules/react'),
            'react-dom': resolve('../../node_modules/react-dom')
        }

        return config
    }
}