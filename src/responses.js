const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const style = fs.readFileSync(`${__dirname}/../client/style.css`);

// function handling index page
const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });

  response.write(index);

  response.end();
};

// function handling style sheet
const getStyle = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });

  response.write(style);

  response.end();
};

// function to send response
const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });

  response.write(JSON.stringify(object));

  response.end();
};

// Takes request, response and an array of client requested mime types

// function for success status code
const getSuccess = (request, response) => {
  const success = {
    message: 'This is a successful response',
  };

  respondJSON(request, response, 200, success);
};

// function for bad request status code
const getBadR = (request, response, params) => {
  const badRequest = {
    message: 'This request has the required parameters',
  };

  if (!params.valid || params.valid !== 'true') {
    badRequest.message = 'Missing valid query parameter set to true';

    badRequest.id = 'badRequest';

    return respondJSON(request, response, 400, badRequest);
  }

  return respondJSON(request, response, 200, badRequest);
};

// function for unauthorized status code
const getUn = (request, response, params) => {
  const unauthorized = {
    message: 'You have successfully viewed the content',
  };

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    unauthorized.message = 'Missing valid query parameter set to yes';

    unauthorized.id = 'unauthorized';

    return respondJSON(request, response, 401, unauthorized);
  }

  return respondJSON(request, response, 200, unauthorized);
};

// function for forbidden status code
const getFor = (request, response) => {
  const forbidden = {
    message: 'You do not have access to this content.',
    id: 'forbidden',
  };

  respondJSON(request, response, 403, forbidden);
};

// function for internal error status code
const getIn = (request, response) => {
  const internal = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internalError',
  };

  respondJSON(request, response, 500, internal);
};

// function for not implemented status code
const getNot = (request, response) => {
  const notImplemented = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content',
    id: 'notImplemented',
  };

  respondJSON(request, response, 501, notImplemented);
};

// function for not show nothing was found
const anyElse = (request, response) => {
  const anythingElse = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  respondJSON(request, response, 404, anythingElse);
};

module.exports = {
  getSuccess,
  getBadR,
  getUn,
  getFor,
  getIn,
  getNot,
  anyElse,
  getStyle,
  getIndex,
};
