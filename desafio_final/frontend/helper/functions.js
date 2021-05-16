"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateCart = void 0;
var calculateCart = function (cart) {
    var sum = cart.list.map(function (element) { return element.price; })
        .reduce(function (accum, actual) { return accum + actual; }, 0);
    return __assign({ sum: sum, length: cart.getSize() }, cart);
};
exports.calculateCart = calculateCart;
