import bcrypt from 'bcrypt';

const users = [
    {
        name: 'Román',
        email: 'correo@correo.com',
        confirm: 1,
        password: bcrypt.hashSync('password', 10)
    }
]

export default users;