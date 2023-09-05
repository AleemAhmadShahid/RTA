const BACKEND_URL = "http://rta.blessingconnectionsllc.com:3000";

const createPostRequest = async (formData , path) =>
{
    let response  = await fetch(BACKEND_URL + path, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });
    const status = response.status;
    response = await response.json();
    response.status = status;
    return response;

}

export { createPostRequest};