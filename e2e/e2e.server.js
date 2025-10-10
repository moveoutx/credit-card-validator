const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack.config');

console.log('Starting E2E server on port 9000...');

const server = new WebpackDevServer(webpack(config), {
    ...config.devServer,
    port: 9000
});

server.start().then(() => {
    console.log('E2E server is running on http://localhost:9000');
    if (process.send) {
        process.send('ok');
    }
}).catch((err) => {
    console.error('Failed to start E2E server:', err);
    process.exit(1);
});
