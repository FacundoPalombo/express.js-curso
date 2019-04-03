const { config } = require('../../config')
const Sentry = require('@sentry/node')

//Sentry Initialization
Sentry.init({ dsn: `https://${config.sentryDNS}@sentry.io/${config.sentryID}` });

function logError(err, req, res, next) {
    Sentry.captureException(err);
    console.error(err.stack);
    next(err);
}

function clientErrorHandler(err, req, res, next) {
    //catch errors from ajax request
    if(req.xhr) {
        res.status(500).json({err: err})
    }else{
        next(err)
    }
}

function errorHandler(err, req, res, next) {
    //catch errors while streaming
    if(res.headersSent) {
        next(err);
    }
    if(!config.dev) {

        delete err.stack;
    }

    res.status(err.status || 500);
    res.render('error', {error: err})
}

module.exports = {
    logError,
    clientErrorHandler,
    errorHandler
}