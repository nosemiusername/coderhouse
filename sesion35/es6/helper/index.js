import nodemailer from 'nodemailer';
import config from '../config/index.js'
import twilio from 'twilio';

function createSendMail(mailconfig) {
    const transporter = nodemailer.createTransport(mailconfig);

    return async function sendMail({ html }) {
        const mailOption = { from: config.from_mail, to: config.admin_mail, subject: config.subject_mail, html }
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


export const sendMail = async (type = 'ethereal', op, name, timestamp, attachment) => {

    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Status App</title>
    </head>
    <body>
        <h1>${op}</h1>
        <div>
            <span style='display:block'>Nombre: ${name}</span>
            <span style='display:block'>Hora: ${timestamp}</span>
            <img src='${attachment}'/>  
        </div>
    </body>
    </html>
    `
    try {
        if (type == 'ethereal') {
            const sendGenericMail = createSendMailEthereal();
            const info = await sendGenericMail({ html });
            // console.log(info);
        } else if (type == 'gmail') {
            const sendGenericMail = createSendMailGmail();
            const info = await sendGenericMail({ html });
            // console.log(info);
        }
    } catch (error) {
        console.error(error);
    }
}

export const sendSMS = async (text) => {

    try {
        const client = twilio(config.twillio_sid, config.twillio_auth);

        const messages = {
            body: text,
            from: config.twillio_from,
            to: config.twillio_to,
        };

        const info = await client.messages.create(messages);

        console.log(info);
    } catch (error) {
        console.error(error);
    }
}
