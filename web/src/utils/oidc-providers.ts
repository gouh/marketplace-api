/* eslint-disable no-async-promise-executor */
import {validateEmail} from './helpers';
import axios from 'axios';
export const authLogin = (email: string, password: string) => {
    return new Promise(async (res, rej) => {
        try {
            const loginResponse = await axios.post(
                import.meta.env.VITE_API_URL_BASE + '/auth/login',
                {
                    email: email,
                    password: password
                },
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    }
                }
            );
            const authentication = {
                isAdmin: loginResponse.data.data.isAdmin,
                token: loginResponse.data.data.token,
                profile: {email: email}
            };
            localStorage.setItem(
                'authentication',
                JSON.stringify(authentication)
            );
            res(authentication);
        } catch (err) {
            return rej({message: 'Las credenciales son incorrectas!'});
        }
    });
};

export const signup = (email: string, password: string, rePassword: string) => {
    return new Promise(async (res, rej) => {
        if (validateEmail(email)) {
            return rej({message: 'Introduzca un email valido.'});
        }

        if (password !== rePassword) {
            return rej({message: 'Las contrasenas no coinciden.'});
        }

        try {
            await axios.post(
                import.meta.env.VITE_API_URL_BASE + '/auth/signup',
                {
                    email: email,
                    password: password
                },
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    }
                }
            );
            return res({profile: {email: email}});
        } catch (err) {
            return rej({message: 'Intente de nuevo por favor.'});
        }
    });
};

export const getAuthStatus = () => {
    return new Promise(async (res) => {
        try {
            let authentication = localStorage.getItem('authentication');
            if (authentication) {
                authentication = JSON.parse(authentication);
                return res(authentication);
            }
            return res(undefined);
        } catch (error) {
            return res(undefined);
        }
    });
};
