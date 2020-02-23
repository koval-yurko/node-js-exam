const fs = require('fs');
const path = require('path');
const cwd = process.cwd();

// node -p "Buffer.allocUnsafe(1e6).toString()" > file.dat

// fs.readFileSync()

// fs.writeFileSyn()

// fs.appendFileSync()

fs.readFile(path.join(cwd, 'file.dat'), (err, bytes) => {
    if (err) { console.error(err); process.exit(1); }
    const clean = bytes.filter(n => n)
    fs.writeFile(path.join(cwd, 'clean.dat'), clean, (err) => {
        if (err) { console.error(err); process.exit(1); }
        fs.appendFile(
            path.join(cwd, 'log.txt'),
            (new Date) + ' ' + (bytes.length - clean.length) + ' bytes removed\n'
        )
    })
});

fs.createReadStream(path.join(cwd, 'file.dat'))
.on('end', function () { log(this.total) })
.pipe(fs.createWriteStream(path.join(cwd, 'clean.dat')))

function log(total) {
    fs.appendFile(
        path.join(cwd, 'log.txt'),
        (new Date) + ' ' + total + ' bytes removed\n'
    )
}

// fs.readdirSync
// fs.statSync
// stats.isDirectory()

// Stats
/*
isFile
isDirectory
isBlockDevice
isCharacterDevice
isFIFO
isSocket
isSymbolicLink // lstat
*/

// When an lstat command comes across a symlink, it stats the symlink itself,
// rather than the file it points to

// fs.acces
// fs.F_OK (default), fs.R_OK , fs.W_OK and fs.X_OK
// fs.access('/usr/local/bin/node', fs.R_OK | fs.W_OK | fs.X_OK, console.log)

// fs.watc - OS spesific - method is unreliable
// fs.watchFil - with polling - method is slow, CPU intensive and only watches an individual file.
// npm install chokidar

