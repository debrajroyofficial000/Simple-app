import { createServer } from "http";
import path from "path";
import url from "url";
import fs from "fs";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// send file data
const sendFileData = (req, res, src) => {
  fs.readFile(path.join(__dirname, "public", src), "utf-8", (err, data) => {
    res.end(data);
  });
};

// GET --> / route handler
const homeRouteHandler = (req, res) => {
  sendFileData(req, res, "index.html");
};

// GET --> /about route handler
const aboutRouteHandler = (req, res) => {
  sendFileData(req, res, "about.html");
};
// GET --> /contact-me route handler
const contactRouteHandler = (req, res) => {
  sendFileData(req, res, "contact-me.html");
};
// GET --> error route handler
const errorRouteHandler = (req, res) => {
  sendFileData(req, res, "404.html");
};

// route content middleware
const routeContentMiddleware = (req, res, next) => {
  res.writeHead(202, { "Content-Type": "text/html" });
  next();
};

const server = createServer((req, res) => {
  routeContentMiddleware(req, res, () => {
    if (req.method === "GET") {
      if (req.url === "/") {
        homeRouteHandler(req, res);
      } else if (req.url === "/about") {
        aboutRouteHandler(req, res);
      } else if (req.url === "/contact-me") {
        contactRouteHandler(req, res);
      } else {
        errorRouteHandler(req, res);
      }
    }
  });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
