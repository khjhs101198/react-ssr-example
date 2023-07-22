// Because express can't understand JSX, so we must use babel to compile it.
require('@babel/register')({
    ignore: [/(node_modules)/],
    presets: ['@babel/preset-env', '@babel/preset-react']
})

// Import express server.
require('./server')