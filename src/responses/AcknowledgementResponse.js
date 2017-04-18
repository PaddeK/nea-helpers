'use strict';

const BaseResponse = require('./BaseResponse');

class AcknowledgementResponse extends BaseResponse
{
    /**
     * Instantiate a Acknowledgement response
     * @param {boolean} completed
     * @param {[string[]]} errors
     * @param {string} outcome
     * @param {object} request
     * @param {string} exchange
     * @param {string} path
     * @param {boolean} successful
     */
    constructor (completed, errors, outcome, request, exchange, path, successful)
    {
        super(completed, errors, outcome, request, exchange, path.split('/'), path, successful);
    }
}

module.exports = AcknowledgementResponse;