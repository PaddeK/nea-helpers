'use strict';

class NeaResponse
{
    /**
     * Parse a raw response from NEA into a NeaResponse object.
     *
     * @param {string} rawMessage
     * @return {NeaResponse}
     */
    static parse (rawMessage)
    {
        return new NeaResponse(rawMessage);
    }

    /**
     * Creates a NeaResponse instance.
     *
     * @private
     * @constructor
     * @param {object} json
     */
    constructor (json)
    {
        this.completed = json.completed || false;
        this.exchange = json.exchange || '';
        this.path = json.path || '';
        this.operation = this.path.split('/');
        this.event = json.event || {};
        this.errors = json.errors || [];
        this.outcome = json.outcome || '';
        this.request = json.request ||{};
        this.response = json.response || {};
        this.successful = json.successful || false;
    }

    /**
     * Returns NeaResponse serialized to string
     * @return {string}
     */
    toString ()
    {
        return JSON.stringify({
            completed: this.completed,
            exchange: this.exchange,
            operation: this.operation,
            path: this.path,
            event: this.event,
            errors: this.errors,
            outcome: this.outcome,
            request: this.request,
            response: this.response,
            successful: this.successful
        });
    }
}

module.exports = NeaResponse;