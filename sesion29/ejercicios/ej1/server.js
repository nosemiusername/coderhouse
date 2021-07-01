import cluster from 'cluster';
import http from 'http';
import numCPUsfrom from 'os';

const cpu = numCPUsfrom.cpus().length;

if (cluster.isMaster) {
    for (let i = 0; i < cpu; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log("sss");
    });
} else {
    http.createServer((req, res) => {
        res.end('jjjj');
        console.log(process.pid);
    }).listen(8001);
}

