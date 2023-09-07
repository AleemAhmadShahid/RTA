const BACKEND_URL = "http://rta.blessingconnectionsllc.com:3000";

const createPostRequest = async (formData , path) =>
{
    let response  = await fetch(BACKEND_URL + path, {
        method: 'POST',
        headers: setHeaders(),
        body: JSON.stringify(formData),
    });
    const status = response.status;
    response = await response.json();
    response.status = status;
    return response;

}

const createGetRequest = async (path,params) => 
{
  const baseUrl = BACKEND_URL + path;
  const url = `${baseUrl}${constructQueryString(params)}`;
  let response = await fetch(url, {headers:setHeaders()});
  const status = response.status;
  response = await response.json();
  response.status = status;
  return response;   
}

const constructQueryString = (paramsObject) =>
{
  const queryParams = [];

  for (const param in paramsObject) {
    if (paramsObject.hasOwnProperty(param)) {
      queryParams.push(`${encodeURIComponent(param)}=${encodeURIComponent(paramsObject[param])}`);
    }
  }

  return queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
}

const parseCookies = () => {
  const cookies = document.cookie.split('; ');
  const cookieObject = {};

  cookies.forEach((cookie) => {
    const [name, value] = cookie.split('=');
    cookieObject[name] = value;
  });

  return cookieObject;
}

const setHeaders = () =>
{
  const cookies = parseCookies();
  const token = cookies.token; 
  let headers =  
  {
    'Content-Type': 'application/json',
  };
  if (token && token!='') 
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`,
    };
  return headers;
}

export { createPostRequest, createGetRequest};