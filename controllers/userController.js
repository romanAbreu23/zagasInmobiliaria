import { check, validationResult } from "express-validator";
import bcrypt from 'bcrypt';
import User from "../models/User.js";
import { generateJWT, generateId } from "../helpers/tokens.js";
import { sendEmailVerification, sendEmailPasswordReset } from "../helpers/emails.js";

const loginForm = (req, res) => {
    res.render('auth/login', {
        pagina: 'Iniciar Sesión',
        csrfToken: req.csrfToken()
    })
};
const loginAuth = async (req, res) => {
    // Validación
    await check('email').isEmail().withMessage('El email es obligatorio').run(req);
    await check('password').notEmpty().withMessage('El password es obligatorio').run(req);

    let result = validationResult(req);

    // Verificar que el resultado este vacío
    if(!result.isEmpty()) {
        // Error
        return res.render('auth/login', {
            pagina: 'Iniciar Sesión',
            csrfToken: req.csrfToken(),
            errors: result.array()
        })
    }

    const { email, password, seller } = req.body;
    // Comprobar si el usuario existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.render('auth/login', {
            pagina: 'Iniciar Sesión',
            csrfToken: req.csrfToken(),
            errors: [{ msg: 'El usuario no existe' }]
        })
    }

    // Comprobar si el usuario esta confirmado
    if (!user.confirm) {
        return res.render('auth/login', {
            pagina: 'Iniciar Sesión',
            csrfToken: req.csrfToken(),
            errors: [{ msg: 'Tu cuenta no ha sido confirmada' }]
        })
    }

    // Revisar el password
    if (!user.verifyPassword(password)) {
        return res.render('auth/login', {
            pagina: 'Iniciar Sesión',
            csrfToken: req.csrfToken(),
            errors: [{ msg: 'El password es incorrecto' }]
        })
    }

    // Autenticar al usuario
    const token = generateJWT({ id: user.id, name: user.name });

    // Almacenar en un cookie
    if (user.seller) {
        return res.cookie('_token', token, {
            httpOnly: true,
            // secure: true // Con certificado SSL
            // sameSite: true // Con certificado SSL
        }).redirect('/mis-propiedades');
    } else {
        return res.cookie('_token', token, {
            httpOnly: true,
            // secure: true // Con certificado SSL
            // sameSite: true // Con certificado SSL
        }).redirect('/');
    }

};

const registerForm = (req, res) => {
    res.render('auth/register', {
        pagina: 'Crear Cuenta',
        csrfToken: req.csrfToken()
    })
};

const register = async (req, res) => {
    // Validación
    await check('name').
        notEmpty().withMessage('El nombre es obligatorio').
        isLength({ max: 16 }).withMessage('El nombre puede tener un máximo de 16 caracteres').run(req);
    await check('email').isEmail().withMessage('Eso no parece un email').run(req);
    await check('password').isLength({ min: 8 }).withMessage('El password debe contener mínimo 8 caracteres').run(req);
    await check('repeat_password').equals('password').withMessage('Los passwords no son iguales').run(req);

    let result = validationResult(req);

    // Verificar que el resultado este vacío
    if(!result.isEmpty()) {
        // Error
        return res.render('auth/register', {
            pagina: 'Crear Cuenta',
            csrfToken: req.csrfToken(),
            errors: result.array(),
            user: {
                name: req.body.name,
                email: req.body.email
            }
        })
    }

    // Extraer los datos
    const { name, email, password } = req.body;

    // Verificar que el usuario no este duplicado
    const userExist = await User.findOne({ where: { email } });

    if (userExist) {
        return res.render('auth/register', {
            pagina: 'Crear Cuenta',
            csrfToken: req.csrfToken(),
            errors: [{ msg: 'Este usuario ya tiene una cuenta' }],
            user: {
                name,
                email
            }
        })
    }

    // Almacenar un usuario
    const user = await User.create({
        name,
        email,
        password,
        token: generateId()
    });

    // Envia email de confirmación
    sendEmailVerification({
        name: user.name,
        email: user.email,
        token: user.token
    });

    // Mostrar mensaje de confirmación
    res.render('templates/message', {
        pagina: 'Cuenta Creada Correctamente',
        message: 'Hemos enviado un email de confirmación, presiona en el enlace'
    });

};

// Funcion que comprueba una cuenta
const confirmAccount = async (req, res) => {
    const { token } = req.params;

    // Verificar si el token es válidad
    const user = await User.findOne({ where: { token } });

    if (!user) {
        return res.render('auth/confirmAccount', {
            pagina: 'Error al Confirmar Tu Cuenta',
            message: 'Hubo un error al confirmar tu cuenta, intenta de nuevo',
            error: true
        });
    }

    // Confirmar la cuenta
    user.token = null;
    user.confirm = true;
    await user.save();

    return res.render('auth/confirmAccount', {
        pagina: 'Cuenta Confirmada',
        message: 'Tu cuenta ha sido confirmada, ya puedes iniciar sesión. ¡Bienvenido!'
    });
};

const forgotPasswordForm = (req, res) => {
    res.render('auth/forgotPassword', {
        pagina: 'Recupera Tu Acceso',
        csrfToken: req.csrfToken()
    })
};

const resetPassword = async (req, res) => {
    // Validación
    await check('email').isEmail().withMessage('Eso no parece un email').run(req);

    let result = validationResult(req);

    // Verificar que el resultado este vacío
    if(!result.isEmpty()) {
        // Errores
        return res.render('auth/forgotPassword', {
            pagina: 'Recupera Tu Acceso',
            csrfToken: req.csrfToken(),
            errors: result.array()
        })
    }

    // Buscar el usuario
    const { email } = req.body;

    const user = await User.findOne({ where: { email } })

    if (!user) {
        return res.render('auth/forgotPassword', {
            pagina: 'Recupera Tu Acceso',
            csrfToken: req.csrfToken(),
            errors: [{ msg: 'El email no pertenece a ningún usuario' }]
        })
    }

    // Generar un token y enviar el email
    user.token = generateId();
    await user.save();

    // Enviar un email
    sendEmailPasswordReset({
        name: user.name,
        email: user.email,
        token: user.token
    });

    // Renderizar un email
    res.render('templates/message', {
        pagina: 'Reestablece Tu Password',
        message: 'Hemos enviado un email con las instrucciones, revisa tu email'
    });
};

const checkToken = async (req, res) => {
    const { token } = req.params;

    const user = await User.findOne({ where: { token } })
    if(!user) {
        return res.render('auth/confirmAccount', {
            pagina: 'Reestablece Tu Password',
            message: 'Hubo un error al validar tu información, intenta de nuevo',
            error: true
        })
    }

    // Mostrar formulario para modificar el password
    res.render('auth/resetPassword', {
        pagina: 'Reestablece Tu Password',
        csrfToken: req.csrfToken()
    })
};

const newPassword = async (req, res) => {
    // Validar el password
    await check('password').isLength({ min: 8 }).withMessage('El password debe contener mínimo 8 caracteres').run(req);

    let result = validationResult(req);

    // Verificar que el resultado este vacío
    if(!result.isEmpty()) {
        // Error
        return res.render('auth/resetPassword', {
            pagina: 'Reestablece Tu Password',
            csrfToken: req.csrfToken(),
            errors: result.array()
        })
    }

    const { token } = req.params;
    const { password } = req.body;

    // Identificar quién hace el cambio
    const user = await User.findOne({ where: { token } });

    // Hashear el nuevo password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.token = null;

    await user.save();

    res.render('auth/confirmAccount', {
        pagina: 'Password Actualizado',
        message: 'Has reestablecido tu password, ya puedes iniciar sesión. ¡Bienvenido de vuelta!'
    });
};

const logout = async (req, res) => {
    return res.clearCookie('_token').status(200).redirect('/')
};

export {
    loginForm,
    loginAuth,
    registerForm,
    register,
    confirmAccount,
    forgotPasswordForm,
    resetPassword,
    checkToken,
    newPassword,
    logout
}