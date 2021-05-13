"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var shoppingCartRoutes_1 = require("./router/shoppingCartRoutes");
var productRoutes_1 = require("./router/productRoutes");
var app = express_1.default();
app.use('/api/carrito', shoppingCartRoutes_1.shoppingCartRouter);
app.use('/api/productos', productRoutes_1.productRouter);
app.all('/*', function (req, res) {
    res.status(404).json({ error: -2, descripcion: "ruta " + req.url + " metodo " + req.method + " no implementado" });
});
app.listen(process.env.PORT || 8080);
