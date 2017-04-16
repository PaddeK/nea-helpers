'use strict';

class BaseResponse
{
    /**
     * Instantiate a Base response
     * @param {boolean} completed
     * @param {[string[]]} errors
     * @param {string} outcome
     * @param {object} request
     * @param {string} exchange
     * @param {string[]} operation
     * @param {string} path
     * @param {boolean} successful
     */
    constructor (completed, errors, outcome, request, exchange, operation, path, successful)
    {
        this._completed = !!completed;
        this._exchange = String(exchange);
        this._operation = operation || [];
        this._path = String(path);
        this._successful = !!successful;
        this._errors = errors || [];
        this._request = request || {};
        this._outcome = String(outcome || '');
    }

    /**
     * Outcome getter
     * @returns {string}
     */
    getOutcome ()
    {
        return this._outcome;
    }

    /**
     * Completed getter
     * @return {boolean}
     */
    isCompleted()
    {
        return this._completed;
    }

    /**
     * Exchange getter
     * @return {string}
     */
    getExchange()
    {
        return this._exchange;
    }

    /**
     * Operation getter
     * @return {string[]}
     */
    getOperation()
    {
        return this._operation;
    }

    /**
     * Path getter
     * @return {string}
     */
    getPath()
    {
        return this._path;
    }

    /**
     * Errors getter
     * @param {boolean} flatten
     * @return {[string[]]|string|null}
     */
    getErrors(flatten = true)
    {
        if (this._errors.length) {
            return flatten ? this._errors.reduce((p, c) => p.concat(c.join(' ')), []).join('. ') + '.' : this._errors;
        }
        return null;
    }

    /**
     * Request getter
     * @return {object}
     */
    getRequest()
    {
        return this._request;
    }

    /**
     * Successful getter
     * @return {boolean}
     */
    isSuccessful()
    {
        return this._successful;
    }
}

module.exports = BaseResponse;