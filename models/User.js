import { DataTypes, Sequelize } from "sequelize";
import bcrypt from 'bcrypt';
import db from '../config/db.js'

const User = db.define('users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    seller: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    token: DataTypes.STRING,
    confirm: DataTypes.BOOLEAN
}, {
    hooks: {
        beforeCreate: async function(user) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }
    },
    scopes: {
        deletePassword: {
            attributes: {
                exclude: ['password', 'token', 'confirm', 'createdAt', 'updatedAt']
            }
        }
    }
});

// Métodos personalizados
User.prototype.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

export default User;