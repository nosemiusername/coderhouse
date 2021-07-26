const sid = 'AC1ea5ddc4d9d01efd5a0b70689e862a68';
const auth = '858dfd98a273b76bedf78e5f99f488a9';

import twilio from 'twilio';

const client = twilio(sid, auth);

client.messages.create({
    body: 'hola',
    from: '+13475999449',
    to: '+56962464704'
})
    .then(message => console.log(message))
    .catch(console.log);

