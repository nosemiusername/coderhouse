var Color = /** @class */ (function () {
    function Color() {
    }
    Color.prototype.getColor = function () {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return [r, g, b];
    };
    ;
    return Color;
}());
var color = new Color();
console.log("" + color.getColor());
