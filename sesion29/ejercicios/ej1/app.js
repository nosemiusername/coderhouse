import cluster from 'cluster';
import http from 'http';
import numCPUsfrom from 'os';

const cpu = numCPUsfrom.cpus().length;


http.createServer((req, res) => {
    res.end('jjjj');
    console.log(process.pid);
}).listen(8000);


