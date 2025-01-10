// Import the required modules
const http = require('http');
const fs = require('fs');

// Define the port
let PORT = 8050;

// Function to log requests to log.txt
const logRequest = (url) => {
    const logMessage = `${new Date().toISOString()} - Request to: ${url}\n`;
    fs.appendFile('log.txt', logMessage, (err) => {
        if (err) {
            console.error('Error logging request:', err);
        }
    });
};

// Create the server
const server = http.createServer((req, res) => {
    const url = req.url;
    logRequest(url); // Log the request

    res.writeHead(200, { 'Content-Type': 'text/plain' });

    switch (url) {
        case '/':
            res.end('Welcome to the BarterX');
            break;
        case '/products':
            res.end('Here are the products up for Sale in BarterX');
            break;
        case '/login':
            res.end('Login to the BarterX');
            break;
        case '/signup':
            res.end('Sign up to the BarterX');
            break;
        case '/profile':
            res.end('Trader Profile');
            break;
        case '/cart':
            res.end('Your Shopping Cart is here');
            break;
        case '/checkout':
            res.end("Let's start shipping");
            break;
        case '/orders':
            res.end('Your Orders are here');
            break;
        case '/categories':
            res.end('Browse Categories');
            break;
        case '/chat':
            res.end('Your Chat with fellow Traders');
            break;
        case '/contact':
            res.end('Contact Us at');
            break;
        case '/about':
            res.end('The modern approach to trading our commodities');
            break;
        default:
            res.end('Page not found');
            break;
    }
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
