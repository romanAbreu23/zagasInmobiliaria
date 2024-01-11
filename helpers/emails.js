import { createTransport } from "../config/nodemailer.js";

const sendEmailVerification = async (datas) => {
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS
    );
    
    const { name, email, token } = datas;

    // Enviar el email
    const info = await transporter.sendMail({
        from: 'ZagasInmobiliaria <cuentas@zagas_inmobiliaria.com>',
        to: email,
        subject: 'ZagasInmobiliaria - Confirma tu cuenta',
        text: 'ZagasInmobiliaria - Confirma tu cuenta',
        html: `<p>Hola ${name}, confirma tu cuenta en Zagas Inmobiliaria</p>
        <p>Tu cuenta esta casi lista, solo debes confirmarla en el siguiente enlace</p>
        <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/confirmar-cuenta/${token}">
            Confirmar cuenta
        </a>
        <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>`
    })

    console.log('Mensaje enviado', info.messageId)
};

const sendEmailPasswordReset = async (datas) => {
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS
    );
    
    const { name, email, token } = datas;

    // Enviar el email
    const info = await transporter.sendMail({
        from: 'ZagasInmobiliaria <cuentas@zagas_inmobiliaria.com>',
        to: email,
        subject: 'ZagasInmobiliaria - Reestablece tu password',
        text: 'ZagasInmobiliaria - Reestablece tu password',
        html: `<p>Hola ${name}, has solicitado reestablecer tu password</p>
        <p>Sigue el siguiente enlace para generar un nuevo password</p>
        <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/olvide-password/${token}">
            Reestablecer password
        </a>
        <p>Si tu no solicitaste esto, puedes ignorar este mensaje</p>`
    })

    console.log('Mensaje enviado', info.messageId)
};

const sendMessage = async (datas) => {
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS
    );
    
    const { name, email, tel, subject, message } = datas;

    // Enviar el email
    const info = await transporter.sendMail({
        from: email,
        to: 'zagasinmobiliaria@email.com',
        subject: subject,
        text: `ZagasInmobiliaria - ${subject}`,
        html: `<p>Zagas Inmobiliaria, ${name} te ha contactado para ${subject}</p>
        <p>${message}</p>
        <p>Correo de contacto: ${email}</p>
        <p>Número de celular: ${tel}</p>`
    })

    console.log('Mensaje enviado', info.messageId)
}

export {
    sendEmailVerification,
    sendEmailPasswordReset,
    sendMessage
}