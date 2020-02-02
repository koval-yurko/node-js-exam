const { Readable, Writable, Transform } = require('readable-stream');
const through = require('through2');
const from = require('from2');
const to = require('to2');
const split = require('split');

class MyRead extends Readable {
    _read(size) {
        this.__offset = this.__offset || 1;
        if (this.__offset === 100) {
            this.push(null);
        } else {
            this.push('data - ' + size * this.__offset + '\n');
        }
        this.__offset++;
    }
}

console.log('start 2');
const myR = new MyRead();

const upper = through((chunk, enc, cb) => {
    cb(null, chunk.toString().toUpperCase());
})

// myR
// .pipe(upper)
// .pipe(process.stdout);

// const d = myR.read(10);
// const d2 = myR.read(10);
// console.log(d.toString());
// console.log(d2.toString());


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


// myRead
// .pipe(upper)
// .pipe(tr)
// .pipe(tr2)
//.pipe(process.stdout);


/*
rs.on('data', (chunk) => {
    const writable = ws.write(chunk) if writable === false) {
    rs.pause()
    ws.once('drain', () => rs.resume()) }
});
*/

/*
readable.once('data', function (d) {

    console.log(d.toString());              // Outputs 1
    readable.pause();                       // Stops the stream from flowing
    readable.unshift(d);                    // Put the 1 back on the stream

    readable.on('data', function (d) {
        console.log(d.toString());          // Outputs 1,1,2,3...
    });

    readable.resume();                      // Start the stream flowing again

});
*/

// let i = 10;
// const rs3 = Readable({
//     read: () => {
//         setTimeout(function () {
//             rs3.push(i-- ? `data - ${i}` : null)
//         }, 100);
//     }
// });
// rs3.on('data', (data) => {
//     console.log(data.toString())
// });

// var i = 20
// const rs2 = Readable({
//     read: (size) => {
//         setImmediate(function () {
//             rs2.push(i-- ? Buffer.alloc(size) : null)
//         })
//     }
// })
// const ws2 = Writable({
//     write: (chunk, enc, cb) => {
//         console.log(ws2._writableState.length)
//         setTimeout(cb, 1)
//     }
// })

// rs2.on('data', (chunk) => {
//     // ws2.write(chunk);
//     const writable = ws2.write(chunk)
//     if (writable === false) {
//         rs2.pause()
//         ws2.once('drain', () => rs2.resume());
//     }
// });

// // rs2.pipe(ws2);


// fs.createReadStream(file)
//     .pipe(split())
//     .on('data', function (line) {
//       //each chunk now is a separate line!
//     })
