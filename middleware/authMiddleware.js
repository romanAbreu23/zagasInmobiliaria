import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

const protectRoute = async (req, res, next) => {
    // Verificar si hay un Token
    const { _token } = req.cookies;
    if (!_token) {
        return res.redirect('/');
    }

    // Comprobar el Token
    try {
        const decoded = jwt.verify(_token, process.env.JWT_SECRET);
        const user = await User.scope('deletePassword').findByPk(decoded.id);

        // Almacenar al usuario al Req
        if (user) {
            req.user = user;

        } else {
            return res.redirect('/');
        }

        // Identificar que el usuario es un vendedor
        if (!user.seller) {
            return res.redirect('/');
        }

        return next();

    } catch (error) {
        return res.clearCookie('_token').redirect('/auth/login');
    }
};

export default protectRoute;