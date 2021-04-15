"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var Producto_1 = require("./Producto");
var apiRoutes = function () {
    var apiRoute = express_1.default.Router();
    apiRoute.use(express_1.default.json());
    apiRoute.use(express_1.default.urlencoded({ extended: true }));
    var products = new Producto_1.Producto();
    /**
     * Listar en forma total
     */
    apiRoute.get('/productos', function (req, res) {
        var listOfProducts = products.list;
        var status = 200;
        var result;
        if (listOfProducts.length) {
            status = 200;
            result = listOfProducts;
        }
        else {
            status = 404;
            result = { 'error': 'no hay productos cargados' };
        }
        res.status(status).json(result);
    });
    /**
     * Listar en forma individual
     */
    apiRoute.get('/productos/:id', function (req, res) {
        var id = parseInt(req.params.id);
        var status = 200;
        var result = {};
        if (isNumber(id)) {
            var product = products.getProductById(id);
            if (product) {
                status = 200;
                result = product;
            }
            else {
                status = 404;
                result = { 'error': 'producto no encontrado' };
            }
        }
        else {
            status = 404;
            result = { 'error': 'valor no valido de id de producto' };
        }
        res.status(status).json(result);
    });
    /**
     * Almacenar productos
     */
    apiRoute.post('/productos', function (req, res) {
        products.list = req.body;
        console.log(req.body);
        res.status(200).json({ 'message': 'producto cargado correctamente' });
    });
    var isNumber = function (value) {
        return !isNaN(value);
    };
};
exports.apiRoutes = apiRoutes;
