"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
var productList_1 = require("./productList");
var Product = /** @class */ (function () {
    function Product(product) {
        var productList = productList_1.ProductList.Instance;
        this._id = productList.getSize() + 1;
        this._timestamp = Date.now();
        this._name = product.name;
        this._description = product.description;
        this._code = product.code;
        this._thumbnail = product.thumbnail;
        this._price = product.price;
        this._stock = product.stock;
        console.log(this);
    }
    Object.defineProperty(Product.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Product.prototype, "price", {
        get: function () {
            return this._price;
        },
        enumerable: false,
        configurable: true
    });
    // TODO: Implementar una forma mas elegante de actualizar 
    // sin tener que listarcada propiedad
    Product.prototype.update = function (newProduct) {
        this._timestamp = Date.now();
        this._name = newProduct.name;
        this._description = newProduct.description;
        this._code = newProduct.code;
        this._thumbnail = newProduct.thumbnail;
        this._price = newProduct.price;
        this._stock = newProduct.stock;
    };
    return Product;
}());
exports.Product = Product;
