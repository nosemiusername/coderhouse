// import { exec } from 'child_process';
import { spawn } from 'child_process';

// const ls = exec('sh script.sh', (error, stdout, stderr) => {
//     if (error) console.log(error);
//     console.log(stdout);
//     console.log(stderr);
// })

// ls.on('exit', (code) => {
//     console.log(`Listo ${code}`);
// })

const child = spawn('find', ['.']);
child.stdout.on('data', data => {
    console.log('stdout', data.toString());
})
child.stderr.on('data', data => {
    console.log('stderr', data.toString());
})