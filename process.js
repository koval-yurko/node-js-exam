// node test.js a b
// console.log(process.argv);

// process.argv
// process.argv[0] - node
// process.argv[1] - test.js
// process.argv[2] - a
// process.argv[3] - b


process.on('unhandledRejection', (err) => {
    // here the 1 is a file descriptor for STDERR
    // process.exit([code])
    // https://nodejs.org/api/process.html#process_exit_codes
    process.exit(1);
  })

// SIGTERM
// SIGUSR1   kill -USR1 PID_OF_THE_NODE_JS_PROCESS
// https://nodejs.org/api/process.html#process_signal_events

process.on('SIGTERM', function onSigterm () {
    console.info('Got SIGTERM. Graceful shutdown start', new Date().toISOString())
    // start graceul shutdown here
    server.close(function onServerClosed (err) {
        if (err) {
          console.error(err)
          process.exit(1)
        }

        closeMyResources(function onResourcesClosed (err) {
          // error handling
          process.exit()
        })
      })
  })

process.cwd()

process.env

//  can send any POSIX signals to any processes
process.kill(pid, [signal])

// Docker signaling
// For example in our Alpine image: CMD ["node", "src"] works, CMD ["npm", "start"]

os.platform() // darwin freebsd linux openbsd win32
os.type() // Linux Darwin Windows_NT
