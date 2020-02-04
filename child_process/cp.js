process.on('message', (m, handler) => {
    console.log('CHILD got message:', m);
    console.log('CHILD handler type:', typeof handler);
});

process.send('start', (a) => { return a + a; });
