module.exports = function createBitmaxOption(verb, data) {
  const apiRoot = '/api/v1/';
  const qs = require('qs');
  const crypto = require('crypto');
  const apiKey = 'FJmvRPFktcTYDBF5GMKEnTbU';
  const apiSecret = '6XqCuE87TNN7GIB76GUlzZNETLbbYtVtCJr0Lh9rIbXrSe2o';

  const expires = new Date().getTime() + 60 * 1000; // 1 min in the future

  let query = '',
    postBody = '';
  if (verb === 'GET') query = '?' + qs.stringify(data);
  // Pre-compute the reqBody so we can be sure that we're using *exactly* the same body in the request
  // and in the signature. If you don't do this, you might get differently-sorted keys and blow the signature.
  else postBody = JSON.stringify(data);
  const signature = crypto
    .createHmac('sha256', apiSecret)
    .update('GET' + apiRoot + 'quote' + query + expires + JSON.stringify(data))
    .digest('hex');

  const headers = {
    'content-type': 'application/json',
    accept: 'application/json',
    // This example uses the 'expires' scheme. You can also use the 'nonce' scheme. See
    // https://www.bitmex.com/app/apiKeysUsage for more details.
    'api-expires': expires,
    'api-key': apiKey,
    'api-signature': signature
  };

  const requestOptions = {
    method: verb,
    headers
  };

  return requestOptions;
};
