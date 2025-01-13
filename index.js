const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8050;
const logRequest = (req) => {
    const logMessage = `[${new Date().toISOString()}] ${req.method} ${req.url}\n`;
    fs.appendFile('log.txt', logMessage, (err) => {
        if (err) console.error('Error logging request:', err);
    });
};

const server = http.createServer((req, res) => {
    logRequest(req);
    switch (req.url) {
        case '/':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Welcome to the BarterX');
            break;

        case '/products':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Here are the products up for Sale in BarterX');
            break;

        case '/login':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Login to the BarterX');
            break;

        case '/signup':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Sign up to the BarterX');
            break;

        case '/profile':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Trader Profile');
            break;

        case '/cart':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Your Shopping Cart is here');
            break;

        case '/checkout':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end("Let's start shipping");
            break;

        case '/orders':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Your Orders are here');
            break;

        case '/categories':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Browse Categories');
            break;

        case '/chat':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Your Chat with fellow Traders');
            break;

        case '/contact':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Contact Us at');
            break;

        case '/about':
            fs.readFile(path.join(__dirname, 'public', 'about.html'), (err, content) => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: "File not found", statusCode: 404 }));
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(content);
                }
            });
            break;

        case '/api/products':
            res.writeHead(200,{"Content-Type":"application/json"})
            let products = [
                { "id": 1, "name": "Used Laptop", "price": 300 },
                { "id": 2, "name": "Second-hand Bicycle", "price": 50 }
            ]
            res.end(JSON.stringify(products))
            break;

        case '/logo':
            fs.readFile(path.join(__dirname, 'public', 'logo.jpg'), (err, content) => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: "File not found", statusCode: 404 }));
                } else {
                    res.writeHead(200, { 'Content-Type': 'image/jpg' });
                    res.end(content);
                }
                });
                break;
            
        
        case '/styles':
                fs.readFile(path.join(__dirname, 'public', 'styles.css'), (err, content) => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: "File not found", statusCode: 404 }));
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/css' });
                    res.end(content);
                }
            });
            break;
            
            
            default:
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: "Page not found", statusCode: 404 }));
                break;
            
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});