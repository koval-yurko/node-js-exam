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


const a = new Uint8Array(10);
a[0] = 1;
a[1] = 2;
const aB = a.buffer;

const buf = Buffer.from('d');
const view = new Uint8Array(buf.buffer);
console.log(view.byteLength);



const arr = new Uint16Array(2);

arr[0] = 5000;
arr[1] = 4000;

// Copies the contents of `arr`.
const buf1 = Buffer.from(arr);
// Shares memory with `arr`.
const buf2 = Buffer.from(arr.buffer);

console.log(buf.compare(buf2))

const b =10;
