const app = require('express')()
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('./config/index.js');
const PORT = config.port;
const compression = require('compression');


app.get('/div', compression(), (req, res, next) => {
    const { value1, value2 } = req.query;
    const result = {};
    result.value = 0;
    const num1 = parseFloat(value1);
    const num2 = parseFloat(value2);

    if (!isNaN(num1) && !isNaN(num2)) {
        if (num2 == 0) warn("0 divition")
        if (num2 != 0) {
            result.value = num1 / num2;
        }
    } else error("Not numeric values")

    res.json(result);
})

app.get('/div-bloq', compression(), (req, res, next) => {
    console.log(req.query);
    const { value1, value2 } = req.query;
    const result = {};
    result.value = 0;
    const num1 = parseFloat(value1);
    const num2 = parseFloat(value2);

    if (!isNaN(num1) && !isNaN(num2)) {
        if (num2 == 0) warn("0 divition")
        if (num2 != 0) {
            result.value = num1 / num2;
            console.log(result);
        }
    } else error("Not numeric values")
    res.json(result);
})

app.listen(PORT, () => {
    console.log(`Application is listening at port ${PORT}`);
})
