import {store} from '../redux/store';
import { clearUser } from '../redux/userSlice';

const BACKEND_URL = "https://api.remoteteamworkadministration.us";


const createRequest = async (url , options) =>
{
    let response  = await fetch(url , options);
    const status = response.status;
    response = await response.json();
    response.status = status;

    if (
      response.status === 401 &&
      (response.error === "Invalid or expired token" ||
      response.error === "No token provided")
    )
      store.dispatch(clearUser());
    return response;

}

const createPostRequest = async (formData , path) =>
{
    return await createRequest(BACKEND_URL + path, {
        method: 'POST',
        headers: setHeaders(),
        body: JSON.stringify(formData),
    });
}

const createPutRequest = async (formData , path) =>
{
    return await createRequest(BACKEND_URL + path, {
        method: 'PUT',
        headers: setHeaders(),
        body: JSON.stringify(formData),
    });
}


const createGetRequest = async (path,params) => 
{
  const baseUrl = BACKEND_URL + path;
  const url = `${baseUrl}${constructQueryString(params)}`;
  return await createRequest(url, {headers:setHeaders()});
}

const createDeleteRequest = async (path) =>
{
    return await createRequest( BACKEND_URL + path, {
        method: 'DELETE',
        headers: setHeaders()
    });

}

const createfileUploadRequest = async (formData) =>
{
    return await createRequest(BACKEND_URL + '/api/upload/', {
        method: 'POST',
        body: formData,
    });
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
  return {token: localStorage.getItem('token')};
}

const setHeaders = () =>
{
  const cookies = parseCookies();
  const token = cookies.token; 
  let headers =  
  {
    'Content-Type': 'application/json',
  };
  if (token && token!=='') 
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`,
    };
  return headers;
}

export { 
  createPostRequest, 
  createGetRequest, 
  createPutRequest, 
  createfileUploadRequest, 
  createDeleteRequest
};