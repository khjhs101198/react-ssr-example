import express from 'express';
import { config } from 'dotenv';
import fs from 'fs';
import React from 'react';
import { renderToPipeableStream, renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from '../src/App';
import StreamingApp from '../src/StreamingApp';
import { findFilesMatchingPattern } from './utilities';
import path from 'path';

// Configure environment variables.
config();

// Express app.
const app = express();

// Specify static files directory and exclude index.html.
app.use(express.static('build', { index: false }));

// Streaming mode.
if (process.env.REACT_APP_MODE === 'stream') {
    // Handle all requests.
    app.get('/*', (req, res) => {
        const jsName = findFilesMatchingPattern(path.resolve(__dirname, '../build/static/js'), /\.js$/)[0];
        const cssName = findFilesMatchingPattern(path.resolve(__dirname, '../build/static/css'), /\.css$/)[0];

        const { pipe } = renderToPipeableStream(<StreamingApp location={req.url} cssName={cssName} />, {
            bootstrapScripts: ['/static/js/' + jsName],
            onShellReady() {
                res.setHeader('content-type', 'text/html');
                pipe(res);
            },
            onShellError() {
                res.statusCode = 500;
                res.setHeader('content-type', 'text/html');
                res.send('<h1>Something went wrong</h1>');
            },
            onError(error) {
                console.error(error);
            }
        });
    });
}

// Non-streaming mode.
if (process.env.REACT_APP_MODE === 'no-stream') {
    // Handle all requests.
    app.get('/*', (req, res) => {
        fs.readFile('build/index.html', 'utf8', (err, data) => {
            if (err) {
                console.log(err);

                return res.status(500).send('Something went wrong...');
            }

            const reactApp = (
                <StaticRouter location={req.url} context={{}}>
                    <App />
                </StaticRouter>
            );

            // Replace the div with the id root with the rendered React app.
            return res.send(data.replace('<div id="root"></div>', `<div id="root">${renderToString(reactApp)}</div>`));
        });
    });
}

// Start server.
app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port: 3000');
});