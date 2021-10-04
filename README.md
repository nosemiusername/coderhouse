# Introduccion 🤚🏻

## Desafio

Desarrollo del backend de una aplicación de e-commerce para poder vender productos de un rubro a elección.

## Curso

Coderhouse, comision11875

# Consideraciones 🤔

Sobre el punto de "Se implementará una API RESTful con los verbos get, post, put y delete ...", se implemento API RESTful solo para la creación de itemes, pues se entendia que era la unica parte del desafio que no tenia CRUD desde interfaz web. Este es el mecanismo que se dipondrīa para administración de stock.

Sobre el punto "Debe brindar al frontend un mecanismo de ingreso autorizado al sistema basado en JWT..." se implemento para la api del punto anterior, y para el caso de la interfaz web se utilizo passport con estrategia local.

Sobre el punto "El cliente tendrá una sesión activa de usuario con tiempo de expiración configurable..." se aplicó variable de ambiente tanto para el tiempo de expiración de JWT como de la sesion de la app web.

Sobre el punto "Dos opciones para el frontend: ..." se aplicó EJS, PUG y Handlebars.

Sobre el punto "Se dispondrá de un archivo de configuración externo ... vista construida con handlebars" se ofusco aquellas variables sensibles.

Respecto a los nombres de las colecciones, atributos, mensajes de error y comentarios de código, se hizo en inglés. Solo la interfaz web esta en español

Respecto al carrito, una vez que se da la orden de pagar, se cambia de estado a pagado (no se elimina) y se genera una orden.

No se aplicó DTO ni Repository dado que la estructura de datos en la BD exigia el timestamp de la operacion y no se encontro otro atributo para el cual fuera aplicarse el patron de diseño.

No se aplicó ninguno de los requisitos extras.

# Despliegue 🚀

## Introducción

La aplicación se encuentra desplegada en heroku en http://contigosalud.herokuapp.com/
Si quieres desplegarla a nivel local seguir las siguientes instrucciones.

## Configuración

Para ejecutar a nivel local se debe completar el archivo .env.example y renombrar a production.env o development.env

```
PORT=Puerto de node
CLUSTER_MODE=true o false
GMAIL_SERVICE=gmail
GMAIL_USER=usuario de la cuenta
GMAIL_PASS=password de la cuenta
SUBJECT_MAIL=asunto de los mails. Para el caso en prod se puso "Notificación de"
MONGO_URI=uri de mongo local, atlas u otro servicio en la nube
MONGO_MAX_AGE=tiempo de expiración de la sesion
FLAG_DB=tipo de base datos. Por lo pronto solo esta MongoDB
SALTROUNDS=Numero para la generacion del salt
TOKEN_SECRET=token para firmar el mensaje con jwt
JWT_MAX_AGE=tiempo de expiracion del token
ADMIN_EMAIL=correo con copia oculta al cual se envian las notificaciones
```

## Instalación de paquetes

Ejecutar en la raiz del proyecto

```
npm i
```

## Ejecucín de aplicación

```
npm run ambiente
```

Donde ambiente puede ser production o development.

## Prueba de la aplicacion web

Luego de registrarse, se desplegará el listado de productos disponibles los cuales podrá agregar al carro. Ademas podra:

- Actualizar la cantidad de itemes de producto del carrito
- Eliminar el carrito
- Ver antecedentes de la cuenta
- Ver los mensajes que ha enviado por chat
- Ver todos los mensajes del chat y enviar mensaje
- Ver los valores de la configuracion del ambiente (uri/info)
- Ver las variables de ambiente (uri/enviroment)

## Prueba de la API RESTful

Se adjunta colección de postman para recrear los distintos metodos sobre Item.
