const { exec, spawn } = require('child_process');
const path = require('path');

async function execute(command) {
    return new Promise((resolve, reject) => {
        const cwd = path.resolve(__dirname, './root/');
        const options = { cwd: cwd, encoding: 'utf8' };
        exec(command, options, (err, stdout, stderr) => {
            if (err) {
                return reject(err);
            }
            resolve(stdout);
        })
    });

}

function spawnnn(command) {
    const cwd = path.resolve(__dirname, './');
    const options = { cwd: __dirname, encoding: 'utf8' };
    const cp = spawn(command, ['./test_cp.js'], { stdio: ['pipe', process.stdout, process.stderr] });

    cp.on('error', (err) => {
        console.log(err);
    });

    cp.stdin.write(Buffer.from('aaaaa'));
}

// process.stdout.on('data', (data) => {
//     console.log(data.toString());
// });

(function () {
    spawnnn('node');
})();


