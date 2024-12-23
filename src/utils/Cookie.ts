import Cookies from 'universal-cookie';

const cookies = new Cookies();

// Helper functions for cookie management
export const setCookie = (name: string, value: any, options = {}) => {
    cookies.set(name, value, {
        path: '/',
        secure: true,
        sameSite: 'strict',
        ...options
    });
};

export const getCookie = (name: string) => {
    return cookies.get(name);
};

export const removeCookie = (name: string) => {
    cookies.remove(name, { path: '/' });
};

export { cookies };