import Cookies from "universal-cookie";

// const BASE_URL = "http://localhost:3001";

const getHeaders = () => {
    const cookies = new Cookies();
    const jwt = cookies.get("jwt");

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`
    }

    return headers;
}

const getHeadersForm = () => {
    const cookies = new Cookies();
    const jwt = cookies.get("jwt");

    const headers = {
        "Authorization": `Bearer ${jwt}`
    }

    return headers;
}


const get = (path) => {
    return fetch(BASE_URL + path, {
        headers: getHeaders(),
    })
    .then(res => res.json())
    .catch(err => {
        return Promise.reject("Error")
    });
}

const post = (path, data) => {
    return fetch(BASE_URL + path, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(data)
    })
    .then(res => {
        const hasEmptyBody = res.headers.get('content-length') === '0' || !res.headers.has('content-length');

        if (hasEmptyBody) {
            return Promise.resolve({});
        }

        return res.json();
    })
    .then(res => {
        if (res.error)
            return Promise.reject(res);

        return Promise.resolve(res);
    });
}

const postForm = (path, data) => {
    return fetch(BASE_URL + path, {
        method: "POST",
        headers: getHeadersForm(),
        body: data
    })
    .then(res => {
        const hasEmptyBody = res.headers.get('content-length') === '0' || !res.headers.has('content-length');

        if (hasEmptyBody) {
            return Promise.resolve({});
        }

        return res.json();
    })
    .then(res => {
        if (res.error)
            return Promise.reject(res);

        return Promise.resolve(res);
    });
}

const put = (path, data) => {
    return fetch(BASE_URL + path, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(data)
    });
}

const putForm = (path, data) => {
    return fetch(BASE_URL + path, {
        method: "PUT",
        headers: getHeadersForm(),
        body: data
    });
}

const remove = (path, data) => {
    return fetch(BASE_URL + path, {
        method: "DELETE",
        headers: getHeaders(),
    });
}

export const backend = {
    get,
    post,
    put,
    remove,
    postForm,
    putForm
};


 


