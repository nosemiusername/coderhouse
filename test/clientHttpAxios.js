import axios from 'axios';
const url = "http://localhost:8080/api";

//Get all products
(async function (url) {
    try {
        const response = await axios.get(`${url}/products`);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
})(url);

(async function (url) {
    try {
        const response = await axios.get(`${url}/product/90324/show`);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
})(url);


(async function (url) {
    var data = JSON.stringify({
        "productName": "Casa loca en el mar",
        "department": "Casa",
        "price": 7412,
        "stock": 228
    });

    var config = {
        method: 'put',
        url: 'http://localhost:8080/api/product/58585/update',
        data: data
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
})(url)

