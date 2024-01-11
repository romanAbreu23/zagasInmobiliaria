import { Sequelize } from "sequelize";
import { validationResult } from 'express-validator';
import { Property, Price, Category, Image } from "../models/index.js";
import { isSeller, dateFormat } from "../helpers/index.js";
import { propertyPrice } from "../helpers/priceFormat.js";
import { sendMessage } from "../helpers/emails.js";

// const home = async (req, res) => {

//     const [ prices, categories, houses, departments ] = await Promise.all([
//         Price.findAll({ raw: true }),
//         Category.findAll({ raw: true }),
//         Property.findAll({
//             where: {
//                 categoryId: 1
//             },
//             include: [
//                 { model: Category, as: 'category' },
//                 { model: Price, as: 'price' }
//             ],
//             order: [
//                 ['createdAt', 'DESC']
//             ]
//         }),
//         Property.findAll({
//             where: {
//                 categoryId: 2
//             },
//             include: [
//                 { model: Category, as: 'category' },
//                 { model: Price, as: 'price' }
//             ],
//             order: [
//                 ['createdAt', 'DESC']
//             ]
//         })
//     ]);

//     res.render('home', {
//         pagina: 'Inicio',
//         categories,
//         prices,
//         houses,
//         departments
//     });
// };
const home = async (req, res) => {

    // Obtener las propiedades de la categoria
    const [ prices, categories, properties, images ] = await Promise.all([
        Price.findAll({ raw: true }),
        Category.findAll({ raw: true }),
        Property.findAll({
            limit: 32,
            where: {
                visible: true,
                published: true
            },
            include: [
                { model: Category, as: 'category' },
                { model: Price, as: 'price' },
                { model: Image, as: 'images' },
            ],
            order: [
                ['createdAt', 'DESC']
            ]
        })
    ]);

    res.render('home', {
        pagina: 'Inicio',
        csrfToken: req.csrfToken(),
        properties,
        categories,
        prices,
        user: req.user,
        propertyPrice,
        year: new Date().getFullYear()
    });
};

// Formulario de contacto
const contactForm = async (req, res) => {
    res.render('contactForm', {
        pagina: 'Contactanos',
        csrfToken: req.csrfToken(),
        data: {}
    })
};
// Enviar al correo
const contactMessage = async (req, res) => {

    // Validación 
    let result = validationResult(req);

    // Verificar que el resultado no este vacío
    if(!result.isEmpty()) {
        // Error
        return res.render('contactForm', {
            pagina: 'Contactanos',
            csrfToken: req.csrfToken(),
            errors: result.array(),
            data: req.body,
        })
    }

    // Obtener la información
    const { name, email, tel, subject, message } = req.body;

    // Envia email
    const contactMessage = sendMessage({
        name,
        email,
        tel,
        subject,
        message
    });

    if (contactMessage) {
        res.redirect('/');
    }
};

const map = async (req, res) => {

    const [ prices, categories, properties ] = await Promise.all([
        Price.findAll({ raw: true }),
        Category.findAll({ raw: true }),
        Property.findAll({ 
            where: {
                visible: true,
                published: true
            },
        })
    ]);

    res.render('map', {
        pagina: 'Mapa',
        csrfToken: req.csrfToken(),
        categories,
        prices,
        properties,
        user: req.user,
        propertyPrice
    });
};

const category = async (req, res) => {

    // Leer QueryString
    const { pagina: actualPage } = req.query;

    const expression = /^[1-9]$/;

    try {
        
        const { id } = req.params;

        if (!expression.test(actualPage)) {
            return res.redirect(`/categorias/${id}?pagina=1`);
        }

        // Limites y Offset para el paginador
        const limit = 16;
        const offset = ((actualPage * limit) - limit);

        // Comprobar que la categoria exista
        const category = await Category.findByPk(id);
        if (!category) {
            return res.redirect('/404');
        }

        const [ properties, total ] = await Promise.all([
            // Obtener las propiedades de la categoria
            Property.findAll({
                limit,
                offset,
                where: {
                    categoryId: id,
                    visible: true,
                    published: true
                },
                include: [
                    { model: Category, as: 'category' },
                    { model: Price, as: 'price' },
                    { model: Image, as: 'images' },
                ],
                order: [
                    ['createdAt', 'DESC']
                ]
            }),
            Property.count({
                where: {
                    categoryId: id,
                    visible: true,
                    published: true
                }
            })
        ]);

        res.render('category', {
            pagina: `${category.name}s`,
            csrfToken: req.csrfToken(),
            pages: Math.ceil(total / limit),
            actualPage: Number(actualPage),
            properties,
            id,
            total,
            offset,
            limit,
            user: req.user,
            propertyPrice
        });

    } catch (error) {
        console.log(error);
    }
};

const error = (req, res) => {
    res.render('404', {
        pagina: 'No encontrada',
        csrfToken: req.csrfToken(),
        user: req.user
    });
};

const search = async (req, res) => {
    const { search } = req.body;

    console.log(search)

    // Validar que search no este vacío
    if (!search) {
        return res.redirect('back');
    }

    // Consultar las propiedades
    const [ prices, categories, properties ] = await Promise.all([
        Price.findAll({ raw: true }),
        Category.findAll({ raw: true }),
        Property.findAll({
            where: {
                categoryId: {
                    [Sequelize.Op.like] : '%' + search + '%'
                }
            },
            include: [
                { model: Category, as: 'category' },
                { model: Price, as: 'price' }
            ]
        })
    ])

    res.render('search', {
        pagina: `Resultados de la busqueda`,
        csrfToken: req.csrfToken(),
        properties,
        categories,
        user: req.user
    })
};


export {
    home,
    contactForm,
    contactMessage,
    map,
    category,
    error,
    search
}