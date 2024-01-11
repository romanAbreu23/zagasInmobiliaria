import { exit } from 'node:process';
import colors from 'colors';
import categories from "./categories.js";
import prices from "./prices.js";
import users from "./users.js";
import db from '../config/db.js';
import { Category, Price, User } from '../models/index.js';

const importData = async () => {
    try {
        // Autenticar
        await db.authenticate();

        // Generar las columnas
        await db.sync();

        // Insertar los datos
        await Promise.all([
            Category.bulkCreate(categories),
            Price.bulkCreate(prices),
            User.bulkCreate(users),
        ]);

        console.log(colors.yellow('Datos importados correctamente'));
        exit();

    } catch (error) {
        console.log(error);
        exit(1);
    }
};

const deleteData = async () => {
    try {

        await db.sync({ force: true });
        console.log(colors.green('Datos eliminados correctamente'));
        exit();

    } catch (error) {
        console.log(error);
        exit(1);
    }
}

if (process.argv[2] === '-i') {
    importData();
}
if (process.argv[2] === '-d') {
    deleteData();
}