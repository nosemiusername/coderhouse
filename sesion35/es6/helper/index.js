import nodemailer from 'nodemailer';
import { config } from '../config/index.js'

const createSendMail = (mailconfig) => {
    const transporter = nodemailer.createTransport(mailconfig);

    return async function sendMail({ to, subject, text, html, attachment }) {
        const mailOption = { from: config.from_mail, to, subject, text, html, attachment }
        return await transporter.sendMail(mailOption);
    }

}

const createSendMailEthereal = () => {
    return createSendMail(
        {
            host: 'smtp.ehereal.email',
            port: 587,

        }
    );
}