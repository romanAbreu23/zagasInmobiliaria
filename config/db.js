import Sequelize from "sequelize";
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD ?? '', {
    host: process.env.DB_HOST,
    // port: process.env.DB_PORT,
    port: 3307,
    dialect: 'mysql',
    define: {
        timestamps: true
    },
    pool: {
        max: 5, // Máximo de conexiones
        min: 0, // Mínimo de conexiones
        acquire: 30000, // Tiempo antes de marcar un error
        idle: 10000 // Tiempo antes de finalizar una conexión por inactividad 
    },
    operatorAliasses: false
});

export default db;