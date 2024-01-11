import { DataTypes } from "sequelize";
import db from '../config/db.js'

const Property = db.define('properties', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    landArea: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    builtArea: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    realPrice: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    bedrooms: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    wc: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    garage: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sellRent: {
        type: DataTypes.STRING(25),
        allowNull: false,
    },
    pets: {
        type: DataTypes.STRING(25),
        allowNull: false,
    },
    pool: {
        type: DataTypes.STRING(25),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    city: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    lat: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lng: {
        type: DataTypes.STRING,
        allowNull: false
    },
    published: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    visible: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

export default Property;