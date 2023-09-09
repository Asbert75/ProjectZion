import PocketBase from 'pocketbase';
const connection = new PocketBase('http://127.0.0.1:8090');

const UserApi = {
    login: async (username: string, password: string) => {
        return await connection.collection('users').authWithPassword(
            username,
            password
        )
            .then(res => res.record)
            .catch(error => error.data);
    },
    create: async (email: string, username: string, password: string) => {
        return await connection.collection('users').create({ email, username, password, passwordConfirm: password, emailVisibility: true })
            .then(res => res)
            .catch(error => error.data);
    },
    sendResetPasswordEmail: async (email: string) => {
        return await connection.collection('users').requestPasswordReset(email)
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
        return await fetch(`${process.env.BACKEND_URL}/api/collections/users/records/${userId}`)
            .then(res => res.json())
            .then(res => res)
            .catch(error => error.data);
    },
    getUsers: async () => {
        return await fetch(`${process.env.BACKEND_URL}/api/collections/users/records?page=1&perPage=50&sort=username`)
            .then(res => res.json())
            .then(res => res)
            .catch(error => error.data);
    }
}

export default UserApi;