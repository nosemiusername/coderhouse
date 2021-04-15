"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
app.use(express_1.default.json());
var PORT = 3000;
// app.use('/api', apiRoutes);
app.get('/api/productos', function (req, res) {
    var listOfProducts = req.body;
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
app.listen(PORT);
