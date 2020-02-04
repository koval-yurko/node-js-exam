/*

Array like view

var buffer = new ArrayBuffer(8); // Uint8Array
var view   = new Int32Array(buffer);

new TypedArray(); // new in ES2017
new TypedArray(length);
new TypedArray(typedArray);
new TypedArray(object);
new TypedArray(buffer [, byteOffset [, length]]);

where TypedArray is one of:

Int8Array();
Uint8Array();
Uint8ClampedArray();
Int16Array();
Uint16Array();
Int32Array();
Uint32Array();
Float32Array(); // float, 0....7
Float64Array(); // double, 0.... 15
BigInt64Array();
BigUint64Array();

*/


const a = new Uint8Array(10); // length 10, bytesLengts 10
a.fill(1);
const aB = a.buffer;
a.forEach((el) => {
    console.log(el, ' 8');
});

const a16 = new Uint16Array(a.buffer); // length 5, bytesLengts 10
const a16A = a16.buffer;

a16.forEach((el) => {
    console.log(el, ' 16');
});

a16.fill(2);

a.forEach((el) => {
    console.log(el, ' 8');
});

const bb = a.slice(0, 4); // copy
bb.forEach((el) => {
    console.log(el, ' 8 s');
});
bb.fill(3);

a.forEach((el) => {
    console.log(el, ' 8');
});
console.log(bb.BYTES_PER_ELEMENT);

const bc = new Uint16Array(a.buffer, 2, 3) // share, // length 3, bytesLengts 6
bc.forEach((el) => {
    console.log(el, ' 16 share');
});
bc.fill(4);

a.forEach((el) => {
    console.log(el, ' 8');
});


const buf = Buffer.from('d');
console.log(buf instanceof Uint8Array);
console.log(buf[0], ' 0');

// Copies the contents of `arr`.
const viewCopy = new Uint8Array(buf); // Copies the contents of `arr`.
console.log(viewCopy instanceof Uint8Array);
console.log(viewCopy[0], ' 0');
console.log(buf[0] === viewCopy[0], " equal");
buf[0] = 10;
console.log(buf[0] !== viewCopy[0], " no equal");
console.log(buf.byteLength === viewCopy.byteLength, " equal 2");
console.log(buf.length === viewCopy.length, " equal 3");

// Shares memory with `arr`.
const viewCopy2 = new Uint8Array(buf.buffer); // Shares memory with `arr`.
viewCopy2.fill(0);
console.log(viewCopy2[0], ' 0');
console.log(buf[0], ' 0 origin');
console.log(viewCopy[0], ' 0 copy');

// DataView == TypedArray over ArrayBuffer
// const dV = new DataView();


const arr = new Uint16Array(2);

arr[0] = 5000;
arr[1] = 4000;

// Copies the contents of `arr`.
const buf1 = Buffer.from(arr);
// Shares memory with `arr`.
const buf2 = Buffer.from(arr.buffer);

console.log(buf.compare(buf2))

const b =10;
