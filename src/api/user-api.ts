import PocketBase from 'pocketbase'
const connection = new PocketBase('http://127.0.0.1:8090')
// const connection = new PocketBase(process.env.BACKEND_URL)

const UserApi = {
    login: async (username: string, password: string) => {
        return await connection.collection('users').authWithPassword(
            username,
            password
        )
            .then(res => res.record)
            .catch(error => error.data)
    },
    create: async (email: string, username: string, password: string) => {
        return await connection.collection('users').create({ email, username, password, passwordConfirm: password, emailVisibility: true })
            .then(res => res)
            .catch(error => error.data)
    },
    sendResetPasswordEmail: async (email: string) => {
        return await connection.collection('users').requestPasswordReset(email)
            .then(res => res)
            .catch(error => error.data)
    },
}

export default UserApi