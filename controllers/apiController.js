import { Property, Price, Category, Image } from "../models/index.js";

const properties = async (req, res) => {

    const properties = await Property.findAll({
        where: {
            visible: true,
            published: true
        },
        include: [
            { model: Price, as: 'price' },
            { model: Category, as: 'category' },
            { model: Image, as: 'images' },
        ]
    });

    res.json(properties);
};

export {
    properties
}