// const { createProxyMiddleware } = require('http-proxy-middleware');
// const express = require('express');
// const next = require('next');

// const dev = process.env.NODE_ENV !== 'production';
// const app = next({ dev });
// const handle = app.getRequestHandler();

// app.prepare().then(() => {
//   const server = express();

//   // Proxy API requests
//   server.use('/api', createProxyMiddleware({
//     target: 'https://your-backend-url.com', // Replace with your backend URL
//     changeOrigin: true
//   }));

//   server.all('*', (req, res) => {
//     return handle(req, res);
//   });

//   server.listen(3000, (err) => {
//     if (err) throw err;
//     console.log('> Ready on http://localhost:3000');
//   });
// });
