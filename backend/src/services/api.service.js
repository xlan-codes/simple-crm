
// export class ApiService {

import { CONSTANTS } from "../constants";

//     constructor() {

//     }

export function post(url, body) {
    return fetch( url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
        });
}

export function put(url, body) {
    return fetch( url, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
        });
}


export function get(url, body) {
    return fetch( url, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
        });
}


export function deleteRequest(url, body) {
    return fetch( url, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        }
        });
}

export function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${CONSTANTS.url}/auth/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            // window.location.reload("/dashboard");
            return user;
        });
}


function handleResponse(response) {
    return response.text().then(text => {
        debugger
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}




// }
