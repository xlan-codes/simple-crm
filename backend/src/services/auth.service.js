import decode from 'jwt-decode';


export default class AuthService {

    constructor() {
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken()
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    isTokenExpired() {
        try {
            const token = this.getToken();
            if(token) {
                const decoded = decode(token);
                if (decoded.exp < Date.now() / 1000) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        }
        catch (err) {
            return true;
        }
    }

    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken)
    }

    getToken() {
        // Retrieves the user token from localStorage
        const t_string = localStorage.getItem('user')
        const token_obj = JSON.parse(t_string);
        return token_obj.access_token;
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
    }

    getProfile() {
        try {
            return decode(this.getToken());   
        } catch (error) {
            return null
        }

    }


    fetch(url, options) {
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken()
        }

        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json())
    }

    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}