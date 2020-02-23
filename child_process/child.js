const {
    exec, // shel ('cmd.exe') + exec comand limited + check result
    execFile, // exec command limited + check result
    spawn, // command execute with long running and huge output + stream I/O comunication
    fork, // spawn nodejs process with comunication
} = require('child_process');

// events
// disconnect, error, close, exit and message.

// const spawn_CP = spawn('node', ['--version'], { cwd: undefined, env: process.env });
const spawn_CP = spawn('ipconfig', [], { cwd: undefined, env: process.env });
// spawn_CP.stdout.pipe(process.stdout);
// spawn_CP.stdout.on('data', (data) => {
//     console.log('spawn data \n' + data);
// });

// const exec_CP = exec('node --version', { cwd: undefined, env: process.env });
const exec_CP = exec('ipconfig', { cwd: undefined, env: process.env });
// exec_CP.stdout.pipe(process.stdout);
// exec_CP.stdout.on('data', (data) => {
//     console.log('exec data \n' + data);
// });

const fork_CP = fork('./cp.js', { cwd: __dirname, env: process.env });

fork_CP.on('message', (m, h) => {
    console.log('message', m);
    console.log('h', typeof h);
    fork_CP.send('some text', (a) => { return a * 10; })
})

console.log('a');
