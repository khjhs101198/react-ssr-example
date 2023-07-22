import React from 'react';
import { Route, Routes } from 'react-router';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { StaticRouter } from 'react-router-dom/server';
import { BrowserRouter } from 'react-router-dom';

function StreamingApp({ location, cssName, server = true }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Web site created using create-react-app" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="stylesheet" href={'/static/css/' + cssName}></link>
        <title>Streaming App</title>
      </head>
      <body>
        {
          server &&
          (
            <StaticRouter location={location} context={{}}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </StaticRouter>
          )
        }
        {
          !server &&
          (
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </BrowserRouter>
          )
        }
      </body>
    </html>
  );
}


export default StreamingApp;
