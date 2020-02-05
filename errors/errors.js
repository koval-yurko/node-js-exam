class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = 'CustomError';

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError)
        }
    }
}

process.on('unhandledRejection', error => {
    // Will print "unhandledRejection err is not defined"
    console.log('unhandledRejection', error.message);
  });
