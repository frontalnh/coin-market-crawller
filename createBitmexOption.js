module.exports = function createBitmaxOption(tokenName) {
  const crypto = require('crypto');
  const apiKey = 'nKxJTgCo5p8iu3av9uU5pnnw';
  const apiSecret = 'Fa7iuw_-aA2olBXdsrV3Yg1P9g2K-IuLNVZB3XSCPCCtdl19';

  const expires = new Date().getTime() + 60 * 1000; // 1 min in the future
  console.log(expires);
  console.log(tokenName);
  const signature = crypto
    .createHmac('sha256', apiSecret)
    .update(
      'GET' + '/api/v1/quote?symbol=' + tokenName + '' + expires.toString()
    )
    .digest('hex');

  console.log(signature);
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
    method: 'GET',
    headers
  };

  return requestOptions;
};
