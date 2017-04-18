'use strict';

const AcknowledgementResponse = require('./AcknowledgementResponse');

class TotpResponse extends AcknowledgementResponse
{
    /**
     * Instantiate a TOTP response
     * @param {AcknowledgementResponse} response
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