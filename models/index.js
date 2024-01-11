import Property from './Property.js';
import Image from './Image.js';
import Price from './Price.js';
import Category from './Category.js';
import User from './User.js';
import Message from './message.js';

Property.belongsTo(Price, { foreingKey: 'priceId' });
Property.belongsTo(Category, { foreingKey: 'categoryId' });
Property.belongsTo(User, { foreingKey: 'userId' });
Property.hasMany(Message, { foreingKey: 'propertyId' });
Property.hasMany(Message, { foreingKey: 'propertyId' });
Property.hasMany(Image, { foreingKey: 'propertyId' });

Image.belongsTo(Property, { foreingKey: 'propertyId' });
Image.belongsTo(User, { foreingKey: 'userId' });

Message.belongsTo(Property, { foreingKey: 'propertyId' });
Message.belongsTo(User, { foreingKey: 'userId' });

export {
    Property,
    Image,
    Price,
    Category,
    User,
    Message
}