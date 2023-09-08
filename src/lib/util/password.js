import * as bcrypt from 'bcrypt';
const saltRounds = 10;

export default class Password {
    async Validate(givenPassword, storedPassword) {
        return bcrypt.compare(givenPassword, storedPassword)
            .then(res => {
                return res;
            })
            .catch(err => {
                console.log('Error hashing password:', err);
                return;
            });
    }
    
    async Hash(password) {
        return bcrypt.hash(password, saltRounds)
            .then(hash => {
                return hash;
            })
            .catch(err => {
                console.log('Error hashing password:', err);
                return;
            });
    }
}