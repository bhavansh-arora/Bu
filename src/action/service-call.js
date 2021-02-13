import axios from 'axios';

export function serviceCall(requestData) {
  return new Promise((resolve, reject) => {
    let baseUrl = 'https://api-buca.herokuapp.com';
    let targetUrl = requestData.parms
      ? `${baseUrl}/${requestData.parms}`
      : baseUrl;
    const request = {
      url: `${targetUrl}`,
      method: requestData.method || 'GET',
      headers: {'Content-Type': 'application/json'},
      data: requestData.body || {},
    };
    axios(request)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error.response ? error.response : error);
      });
  });
}
