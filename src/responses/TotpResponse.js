'use strict';

const AcknowledgeResponse = require('./AcknowledgeResponse');

class TotpResponse extends AcknowledgeResponse
{
    /**
     * Instantiate a TOTP response
     * @param {AcknowledgeResponse} response
     * @param {string} totp
     */
    constructor (response, totp)
    {
        super(
            response.isCompleted(),
            response.getErrors(),
            response.getOutcome(),
            response.getRequest(),
            response.getExchange(),
            response.getPath(),
            response.isSuccessful()
        );

        this._totp = String(totp);
    }

    /**
     * TOTP getter
     * @return {string}
     */
    getTotp ()
    {
        return this._totp;
    }
}

module.exports = TotpResponse;