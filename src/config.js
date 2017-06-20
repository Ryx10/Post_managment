export const baseConfig = {
    header: {
        title: 'Page management',
        logoSrc: 'http://via.placeholder.com/100x100'
    },
    api: {
        baseUrl: 'http://localhost:8000/',
        headers: {
            'Content-Type': 'application/json'
        }
    },
    routes: {
        new: 'new'
    },
    method: {
        POST: 'POST',
        PUT: 'PUT'
    }
};
export const ADDED = 'added';
export const UPDATED = 'updated';
