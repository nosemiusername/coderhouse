import { denormalize } from 'normalizr';
import { normalize, schema } from 'normalizr';
import util from 'util';

const empresa = [
  {
    autor: {
      email: 'a@a.cl',
      alias: 'rafa',
      avatar: 'http://www.rafa.com/img.png'
    },
    text: 'hola',
    fecha: "2021-06-12T23:20:30.427Z"
  },
  {
    autor: {
      email: 'a@a.cl',
      alias: 'rafa',
      avatar: 'http://www.rafa.com/img.png'
    },
    text: 'hola',
    fecha: "2021-06-12T23:24:25.310Z"
  },
  {
    autor: {
      email: 'a@a.cl',
      alias: 'rafa',
      avatar: 'http://www.rafa.com/img.png'
    },
    text: 'hola',
    fecha: "2021-06-12T23:27:02.515Z"
  },
  {
    autor: {
      email: 'a@a.cl',
      alias: 'rafa',
      avatar: 'http://www.rafa.com/img.png'
    },
    text: 'hola',
    fecha: "2021-06-12T23:39:44.946Z"
  }
]

const autorSchema = new schema.Entity('autor', {}, {idAttribute:'email',});
const chatSchema = new schema.Entity('chat', {
  autor:autorSchema,
}, {idAttribute:'fecha', });

const chats = new schema.Array(chatSchema);
const normaliZedEmpledados = normalize(empresa, chats);
// console.log(util.inspect(normaliZedEmpledados, false, 12, true));
// console.log(JSON.stringify(normaliZedEmpledados).length);
const deNormaliZedEmpledados = denormalize(normaliZedEmpledados.result, chats, normaliZedEmpledados.entities);
console.log(util.inspect(deNormaliZedEmpledados, false, 12, true));
console.log(JSON.stringify(deNormaliZedEmpledados).length);
