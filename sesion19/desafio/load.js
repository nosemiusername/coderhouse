//1) Agregar 10 documentos 2) Definir las claves de los docuemtentos
db = db.getSiblingDB("ecommerce");
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
function get_results(result) {
    print(tojson(result));
}
db.productos.insertMany([
    { name: "tv", price: random(100, 5000) },
    { name: "radio", price: random(100, 5000) },
    { name: "pc", price: random(100, 5000) },
    { name: "mouse", price: random(100, 5000) },
    { name: "teclado", price: random(100, 5000) },
    { name: "tableta", price: random(100, 5000) },
    { name: "monitor", price: random(100, 5000) },
    { name: "estufa", price: random(100, 5000) },
    { name: "silla", price: random(100, 5000) },
    { name: "basurero", price: random(100, 5000) },
]);
db.mensajes.insertMany([
    { name: "tv", price: random(100, 5000) },
    { name: "radio", price: random(100, 5000) },
    { name: "pc", price: random(100, 5000) },
    { name: "mouse", price: random(100, 5000) },
    { name: "teclado", price: random(100, 5000) },
    { name: "tableta", price: random(100, 5000) },
    { name: "monitor", price: random(100, 5000) },
    { name: "estufa", price: random(100, 5000) },
    { name: "silla", price: random(100, 5000) },
    { name: "basurero", price: random(100, 5000) },
]);
// 3) Listar todos los elementos en cada coleccion
db.productos.find().forEach(get_results);
db.mensajes.find().forEach(get_results);
// 4) MOstrar la cantidad de documentos
print(`Collection productos ${db.productos.count()}`);
print(`Collection mensajes ${db.mensajes.count()}`);
// 5bi) Agregar un producto 
db.productos.insertOne({ name: "pizarra", price: random(100, 5000) });
// 5bii) Menores a 1000
print('Menores de 1000');
db.productos.find({ "price": { $lt: 1000 } }).forEach(get_results);
// 5bii) Entre 1000 y 3000 
print('Entre 1000 y 3000');
db.productos.find({ "price": { $lt: 3000, $gt: 1000 } }).forEach(get_results);
// 5biii) Mayores de 3000
print('Mayores de 3000');
db.productos.find({ "price": { $gt: 3000 } }).forEach(get_results);
//5biv) Tercer mas alto
print('Tercer mas alto');
db.productos.find({}, { "name": 1, "_id": 0 }).sort({ price: 1 }).skip(2).limit(1).forEach(get_results);
//5c) Actualizar campo stock
db.productos.updateMany({ "price": { $gt: 100 } }, { $set: { "stock": 100 } });
//5d)
db.productos.updateMany({ "price": { $gt: 400 } }, { $set: { "stock": 0 } });
db.productos.deleteMany({ "price": { $lt: 1000 } });
// 6) Crear usuario pepe bloqueo para update, loguearse y intentar actualizar
db.createUser(
    {
        user: "pepe",
        pwd: "asd456",
        roles: [
            {
                role:"read", db:"ecommerce"
            }
        ]
    }
);
db.auth("pepe", "asd456");
db.productos.updateOne({ "price": { $gt: 400 } }, { $set: { "stock": 0 } });
//Se elimina para seguir en limpio
db.dropDatabase();
db.dropUser("pepe");
