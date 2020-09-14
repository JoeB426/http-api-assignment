const http = require('http'); // pull in the http server module
const url = require('url'); // pull in the url module
const query = require('querystring');
// pull in our response handler file
const responseHandler = require('./responses.js');

// set the port. process.env.PORT and NODE_PORT are for servers like heroku
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// key:value object to look up URL routes to specific functions
const urlStruct = {
  '/': responseHandler.getIndex,
  '/style.css': responseHandler.getStyle,
  '/success': responseHandler.getSuccess,
  '/badRequest': responseHandler.getBadR,
  '/unauthorized': responseHandler.getUn,
  '/forbidden': responseHandler.getFor,
  '/internal': responseHandler.getIn,
  '/notImplemented': responseHandler.getNot,
  anyElse: responseHandler.anyElse,
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  const params = query.parse(parsedUrl.query);
  // const acceptedTypes = request.headers.accept.split(',');

  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, params);
  } else {
    urlStruct.anyElse(request, response, params);
  }

// if (urlStruct[parsedUrl.pathname]) {
//     urlStruct[parsedUrl.pathname](request, response, params, acceptedTypes);
//   } else {
//     urlStruct.anyElse(request, response, params, acceptedTypes);
//   }

};

http.createServer(onRequest).listen(port);
console.log(`Listening on 127.0.0.1: ${port}`);
