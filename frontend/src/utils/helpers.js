export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('token', JSON.stringify(data.token));
        localStorage.setItem('user', JSON.stringify(data.user));
    }
    next();
};

export const getToken = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('token')) {
            return JSON.parse(localStorage.getItem('token'));
        } else {
            return false;
        }
    }
};

export const getUser = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('user')) {
            return JSON.parse(localStorage.getItem('user'));
        } else {
            return false;
        }
    }
};

export const logout = next => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
    next();
};
