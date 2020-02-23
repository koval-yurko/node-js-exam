console.log('test_cp');
process.stdin.pipe(process.stdout);

setTimeout(() => {
    process.exit();
}, 1000);
