const fs = require('fs');

const server = Bun.serve({
  port: 8050,
  fetch(req) {
    const url = new URL(req.url);
    const method = req.method;
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${method} ${url.pathname}\n`;

    try {
      // Ensure log file is appended safely
      fs.appendFileSync("log.txt", logMessage, { flag: "a" });
    } catch (err) {
      console.error("Error writing to log file:", err);
    }

    switch (url.pathname) {
      case "/":
        return new Response("Welcome to BarterX");

      case "/products":
        return new Response("Here are the products up for sale in BarterX");

      case "/login":
        return new Response("Login to BarterX");

      case "/signup":
        return new Response("Sign up to BarterX");

      case "/profile":
        return new Response("Trader Profile");

      case "/cart":
        return new Response("Your Shopping Cart is here");

      case "/checkout":
        return new Response("Let's start shipping");

      case "/orders":
        return new Response("Your Orders are here");

      case "/api/products":
        const apiData = [
          { id: 1, name: "Used Laptop", price: 300 },
          { id: 2, name: "Second-hand Bicycle", price: 50 },
        ];
        return new Response(JSON.stringify(apiData), {
          headers: { "Content-Type": "application/json" },
        });

      case "/categories":
        return new Response("Browse Categories");

      case "/chat":
        return new Response("Your Chat with fellow Traders");

      case "/contact":
        return new Response("Contact Us at");

      case "/about":
        try {
          const file = Bun.file("./public/about.html");
          return new Response(file, { headers: { "Content-Type": "text/html" } });
        } catch {
          return new Response("About file not found", { status: 404 });
        }

      case "/styles":
        try {
          const file = Bun.file("./public/styles.css");
          return new Response(file, { headers: { "Content-Type": "text/css" } });
        } catch {
          return new Response("Stylesheet not found", { status: 404 });
        }

      default:
        return new Response(
          JSON.stringify({ error: "Page not found", statusCode: 404 }),
          {
            status: 404,
            headers: { "Content-Type": "application/json" },
          }
        );
    }
  },
});

console.log(`Server is running at http://localhost:${server.port}`);
