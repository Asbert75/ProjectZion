import PocketBase from 'pocketbase';
const connection = new PocketBase('http://127.0.0.1:8090');

const RoleApi = {
    getRole: async (roleId: string) => {
        return await connection.collection('roles').getOne(`${roleId}`)
            .then(res => res)
            .catch(error => error.data);
    }
}

export default RoleApi;