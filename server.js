#!/usr/bin/env node

const static = require('node-static');

const fileServer = new static.Server('./');

require('http').createServer(function (request, response) {
  request.addListener('end', function () {
    fileServer.serve(request, response, function (e, res) {
      if (e && (e.status === 404)) {
        fileServer.serveFile('./index.html', 200, {}, request, response);
      }
    });
  }).resume();
}).listen(process.env.PORT || 9595);
