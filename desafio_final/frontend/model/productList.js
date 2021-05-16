"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductList = void 0;
var ProductList = /** @class */ (function () {
    function ProductList() {
        this._list = [];
    }
    Object.defineProperty(ProductList, "Instance", {
        get: function () {
            return this._instance || (this._instance = new this());
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ProductList.prototype, "list", {
        get: function () {
            return this._list;
        },
        enumerable: false,
        configurable: true
    });
    ProductList.prototype.getSize = function () {
        return this._list.length;
    };
    return ProductList;
}());
exports.ProductList = ProductList;
