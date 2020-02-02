const { Readable, Transform } = require('readable-stream');
const through = require('through2');
const from = require('from2');
const to = require('to2');

class MyRead extends Readable {
    /*
    read(chunk) {
        console.log('read: ' + chunk);
    }
    */
}

const upper = through((chunk, enc, cb) => {
    cb(null, chunk.toString().toUpperCase());
})

const data = new Buffer.from('test\n');
const data2 = new Buffer.from('test 2\n');
const myRead = Readable({
    read(size) {
        console.log('start read');
        this.offset = 0;
        for (let i = 0; i < 20; i++) {
            this.push('data - ' + size * this.offset + '\n');
            this.offset++;
        }

        this.push(null);
    }
});

const tr = Transform({
    objectMode: true,
    transform(chunk, enc, cb) {
        cb(null, { data: chunk.toString() });
    }
});

const tr2 = Transform({
    objectMode: true,
    transform(chunk, enc, cb) {
        console.log(typeof chunk, chunk);
        cb(null, chunk);
    }
});

/*
const r1 = myRead.read(50);
console.log('d - ' +r1);
const r2 = myRead.read(100);
console.log('d - ' + r2);
*/

/*
myRead.on('data', (data) => {
    console.log('d - ' + data);
})
*/


myRead
.pipe(upper)
.pipe(tr)
.pipe(tr2)
//.pipe(process.stdout);


/*
rs.on('data', (chunk) => {
    const writable = ws.write(chunk) if writable === false) {
    rs.pause()
    ws.once('drain', () => rs.resume()) }
});
*/
