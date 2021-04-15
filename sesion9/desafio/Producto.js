"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Producto = /** @class */ (function () {
    function Producto() {
        this._list = [];
    }
    Object.defineProperty(Producto.prototype, "list", {
        /**
         * obtener todos los productos
         */
        get: function () {
            return this._list;
        },
        /**
         * agregar un nuevo producto
         */
        set: function (value) {
            value.id = (this._list.length || 0) + 1;
            this._list.push(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     * @param value: id del producto que se quiere retornar
     * @returns producto
     */
    Producto.prototype.getProductById = function (value) {
        return this._list.filter(function (element) { return element.id === value; })[0];
    };
    return Producto;
}());
exports.Producto = Producto;
