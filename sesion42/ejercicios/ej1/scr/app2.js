import yargs from "yargs";

const { n1, n2, op } = yargs(process.argv.slice(2)).argv;
// (function (val1, val2, op) {
//     const res = eval(`${val1} ${op} ${val2}`);
//     console.log(res);
// })(process.argv[2], process.argv[3], process.argv[4])

(function (val1, val2, op) {
    const res = eval(`${val1} ${op} ${val2}`);
    console.log(res);
})(args.n1, args.n2, args.op)