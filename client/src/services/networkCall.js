export const BASE_URL_LOCAL = "http://localhost:3000";
export const BASE_URL_CLOUD = "https://student-connect-kec.herokuapp.com";
 
export default function makeNetworkCall(endPoint, method, body) {
    return fetch(`${BASE_URL_LOCAL}/${endPoint}`, {
      credentials: "include",
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
}