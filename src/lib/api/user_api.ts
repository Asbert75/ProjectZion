import { BACKEND_BASE_URL, BACKEND_PORT } from '@/lib/util/constants';

import PocketBase from 'pocketbase';
const connection = new PocketBase(`${BACKEND_BASE_URL}:${BACKEND_PORT}`);

const UserApi = {
    login: async (username: string, password: string) => {
        return await connection.collection('users').authWithPassword(
            username,
            password
        )
            .then(res => res)
            .catch(error => error.data);
    },
    create: async (username: string, password: string, passwordConfirm: string) => {
        return await connection.collection('users').create({ username, password, passwordConfirm })
            .then(res => res)
            .catch(error => error.data);
    },
    getUser: async (username: string) => {
        return await connection.collection('users').getList(1, 50, {
            filter: `username = "${username}"`
        })
            .then(res => res)
            .catch(error => error.data);
    },
    getUserById: async (userId: string) => {
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