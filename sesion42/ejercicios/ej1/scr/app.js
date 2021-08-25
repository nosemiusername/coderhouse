import minimist from "minimist";
import express from "express";


// const args = minimist(process.env);
// // (function (val1, val2, op) {
// //     const res = eval(`${val1} ${op} ${val2}`);
// //     console.log(res);
// // })(process.argv[2], process.argv[3], process.argv[4])

// (function (val1, val2, op) {
//     const res = eval(`${op}(${val2},${val2})`);
//     console.log(res);
// })(args.n1, args.n2, args.op)
const PORT = process.env.PORT || 3000;
const app = express();

app.listen(PORT, () => { })