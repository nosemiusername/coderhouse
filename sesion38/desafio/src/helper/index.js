import nodemailer from 'nodemailer';
import config from '../config/index.js'
import twilio from 'twilio';
import ejs from 'ejs';

function createSendMail(mailconfig) {
    const transporter = nodemailer.createTransport(mailconfig);

    return async function sendMail({ html, to, username }) {
        const mailOption = {
            from: config.from_mail,
            to: to,
            subject: `${config.subject_mail} ${to} ${username}`,
            html
        }
        return await transporter.sendMail(mailOption);
    }

}

function createSendMailEthereal() {
    return createSendMail(
        {
            host: config.ethereal_host,
            port: config.ethereal_port,
            auth: {
                user: config.ethereal_user,
                pass: config.ethereal_pass,
            }
        }
    );
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


export const sendMail = async (type = 'gmail', user, items) => {


    try {
        const __dirname = process.cwd();
        const html = await ejs.renderFile(`${__dirname}/src/views/mail.ejs`, { products: items, user });

        if (type == 'ethereal') {
            const sendGenericMail = createSendMailEthereal();
            const info = await sendGenericMail({ html, to: user.email, username: user.username });
            // console.log(info);
        } else if (type == 'gmail') {
            const sendGenericMail = createSendMailGmail();
            const info = await sendGenericMail({ html, to: user.email, username: user.username });
            // console.log(info);
        }
    } catch (error) {
        console.error(error);
    }
}

export const sendWzp = async (user) => {

    try {
        const client = twilio(config.twillio_sid, config.twillio_auth);
        const messages = {
            body: "msg",
            from: 'whatsapp:+14155238886',
            to: `whatsapp:+569${to}`,
        };

        const info = await client.messages.create(messages);
        console.log(info);
    } catch (error) {
        console.error(error);
    }
}
