#!/usr/bin/env node

import * as http from "http";
import * as url from "url";
import * as fs from "fs";

// export const hostname = process.env["HOSTNAME"];
// export const port = process.env["PORT"];
export const hostname = "127.0.0.1";
export const port = 8080;
export const server = http.createServer();

server.on("request", (request, response) => {

  // magic happens here!
  if (request.url !== undefined) {
    // If we are serving a valid URL, parse it to a string var
    var q = url.parse(request.url, true);
  }
  else {
    // Else, just point the server at index.html as a fallback
    var q = url.parse("/home.html", true);
  }

  var filename = "." + q.pathname;

  fs.readFile(filename, function (err, data) {

    // if error loading file, return 404 to end response
    if (err) {
      response.writeHead(404, { 'Content-Type': 'text/html' });
      console.log(`Server error (404) at http://${hostname}:${port}${request.url}`);
      return response.end("404 Not Found");
    }

    // else, write the data with an attached header and return
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(data);
    console.log(`Server running (200) at http://${hostname}:${port}${request.url}`);
    return response.end();
  });
});

server.listen(port, hostname, () => {
  console.log(`Server listening at http://${hostname}:${port}/`);
});

var myModule = require("bindings")("addon");
module.exports = myModule; // Just reexport it
