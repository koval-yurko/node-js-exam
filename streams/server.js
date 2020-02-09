const http = require('http');
const url = require('url');
const ws = require('ws')
const { Readable } = require('readable-stream');

// let i = 0;
// function test() {
//     console.log(i);
//     i++;
// }

// setInterval(() => {
//     test();
// }, 1000);

/*
(function (exports, require, module, __filename, __dirname) {
    // module code here
})
*/

class MyRead extends Readable {

    _read() {
        this.push('data\n');
        this.push(null);
    }

}



const server = http.createServer((req, res) => {
    const dd = req.read();
    console.log(dd);
    req.on('data', (d) => {
        console.log(d);
    });
    const mr = new MyRead();
    mr.pipe(res);
});
server.listen(7777);

const size = parseInt(req.headers['content-length'], 10);
const buffer = Buffer.allocUnsafe(size);
var pos = 0;

req
    .on('data', (chunk) => {
        const offset = pos + chunk.length;
        chunk.copy(buffer, pos);
        pos = offset;
    })
    .on('end', () => {
        const data = qs.parse(buffer.toString());
        console.log('User Posted: ', data)
        res.end('You Posted: ' + JSON.stringify(data));
    });


const app = fs.readFileSync('public/index.html');
const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html')
    res.end(app);
});
const wss = new ws.Server({server});

wss.on('connection', (socket) => {
    socket.on('message', (msg) => {
        console.log(`Received: ${msg}`)
        console.log(`From IP: ${socket.upgradeReq.connection.remoteAddress} `);
        if (msg === 'Hello') socket.send('Websockets!');
    })
});

// const dgram = require('dgram') - UDP sockets
