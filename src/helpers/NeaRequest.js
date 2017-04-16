'use strict';

class NeaRequest
{
    /**
     * Create NeaRequest instance
     * @param {object} json
     */
    constructor (json)
    {
        this.path = json.path;
        this.exchange = this._exchange(json.exchange);
        this.request = json.request;
    }

    /**
     * Build exchange string for NeaRequest
     * @param {string} [string]
     * @return {string}
     * @private
     */
    _exchange (string)
    {
        return this.exchange || string || Date.now().toString();
    }

    /**
     * Returns NeaRequest serialized to string
     * @return {string}
     */
    toString ()
    {
        return JSON.stringify({
            path: this.path,
            exchange: this._exchange(),
            request: this.request
        });
    }
}

module.exports = NeaRequest;