const { config } = require('../../config')
const Sentry = require('@sentry/node')
const boom = require('boom')
const { isRequestAjaxOrApi } = require('../scripts/isRequestAjaxOrApi')

//Sentry Initialization
Sentry.init({ dsn: `https://${config.sentryDNS}@sentry.io/${config.sentryID}` });

function withErrorStack(err, stack, ) {
    if(config.dev) {
        return { ...err, stack }
    }
}

function wrapErrors(err, req, res, next) {
    if(!err.isBoom) {
        next(boom.badImplementation(err));
    }
    next(err);
}

function logError(err, req, res, next) {
    Sentry.captureException(err);
    console.error(err.stack);
    next(err);
}

function clientErrorHandler(err, req, res, next) {
    const {
        output: { statusCode, payload }
    } = err;
    //catch errors from ajax request or if an error occurs while streaming
    if(isRequestAjaxOrApi(req) || res.headersSent) {
        res.status(statusCode).json(withErrorStack(payload, err.stack))
    }else{
        next(err)
    }
}

function errorHandler(err, req, res, next) {
    //catch errors while streaming
    const {
        output: { statusCode, payload }
    } = err;
    if(!config.dev) {

        delete err.stack;
    }

    res.status(statusCode);
    res.render("error", withErrorStack(payload, err.stack))
}

module.exports = {
    logError,
    clientErrorHandler,
    errorHandler,
    wrapErrors
}