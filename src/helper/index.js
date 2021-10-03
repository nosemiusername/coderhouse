import nodemailer from 'nodemailer';
import config from '../config/index.js'
import ejs from 'ejs';

function createSendMail(mailconfig) {
    const transporter = nodemailer.createTransport(mailconfig);
    return async function sendMail({ html, to, subject }) {
        const mailOption = {
            from: config.from_mail,
            to: to,
            bcc: config.admin_email,
            subject: `${config.subject_mail} ${subject} `,
            html
        }
        return await transporter.sendMail(mailOption);
    }
}

function createSendMailGmail() {
    return createSendMail(
        {
            service: config.gmail_service,
            auth: {
                user: config.gmail_user,
                pass: config.gmail_pass,
            }
        });
}


export const sendMail = async (user, items = null, subject) => {
    try {
        const __dirname = process.cwd();
        const html = await ejs.renderFile(`${__dirname}/src/views/mail.ejs`, { products: items, user, subject });

        const sendGenericMail = createSendMailGmail();
        const info = await sendGenericMail({ html, to: user.email, username: user.username, subject });
        console.log(info);

    } catch (error) {
        console.error(error);
    }
}

