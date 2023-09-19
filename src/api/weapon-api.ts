import PocketBase from 'pocketbase';
const connection = new PocketBase('http://127.0.0.1:8090');

const WeaponApi = {
    getWeapons: async () => {
        return await connection.collection('weapons').getFullList({
            sort: 'category,priority',
        })
            .then(res => res)
            .catch(error => error.data)
    },
    getCategories: async () => {
        return await connection.collection('weaponCategories').getFullList({
            sort: 'priority',
        })
            .then(res => res)
            .catch(error => error.data)
    },
    getRestrictionTypes: async () => {
        return await connection.collection('weaponRestrictionTypes').getFullList({
            sort: 'name',
        })
            .then(res => res)
            .catch(error => error.data)
    }
}

export default WeaponApi;