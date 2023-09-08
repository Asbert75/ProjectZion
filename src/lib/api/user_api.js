import LocalStorage from '@/lib/util/local-storage';
import { BACKEND_BASE_URL, BACKEND_PORT } from '@/lib/util/constants';

import PocketBase from 'pocketbase';
const connection = new PocketBase(`${BACKEND_BASE_URL}:${BACKEND_PORT}`);

const UserApi = {
    login: async (username, password) => {
        return await connection.collection('users').authWithPassword(
            username,
            password
        )
            .then(res => res)
            .catch(error => error.data);
    },
    create: async (username, password, passwordConfirm) => {
        return await connection.collection('users').create({ username, password, passwordConfirm })
            .then(res => res)
            .catch(error => error.data);
    },
    getUser: async (username) => {
        return await connection.collection('users').getList(1, 50, {
            filter: `username = "${username}"`
        })
            .then(res => res)
            .catch(error => error.data);
    },
    getUserById: async (userId) => {
        return await fetch(`${BACKEND_BASE_URL}:${BACKEND_PORT}/api/collections/users/records/${userId}`)
            .then(res => res.json())
            .then(res => res)
            .catch(error => error.data);
    },
    getUsers: async () => {
        return await fetch(`${BACKEND_BASE_URL}:${BACKEND_PORT}/api/collections/users/records?page=1&perPage=50&sort=username`)
            .then(res => res.json())
            .then(res => res)
            .catch(error => error.data);
    }
}

export default UserApi;