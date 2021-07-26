import nodemailer from 'nodemailer';

const subject = process.argv[2] || "hola";
const msj = process.argv[3] || "hola";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rafael.mascayano@imatec.cl',
        pass: 'EsoesloqueTenis870-3'
    }
});


const mailOptions = {
    from: 'rafael.mascayano@imatec.cl',
    to: 'nosemimail@gmail.com',
    subject: subject,
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=<device-width>, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
         <h1>bienvenido</h1>
         <p>${msj}</p>
    </body>
    </html>`
};

transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
        console.log(err);
        return err;
    }
    console.log(info);
})



