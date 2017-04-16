'use strict';

const AcknowledgeResponse = require('./AcknowledgeResponse');

class ProvisionsChangedResponse extends AcknowledgeResponse
{
    /**
     * Instantiate a ProvisionsChanged response
     * @param {AcknowledgeResponse} response
     * @param {object} provisions
     */
    constructor (response, provisions)
    {
        super(
            response.isCompleted(),
            response.getErrors(),
            response.getRequest(),
            response.getExchange(),
            response.getPath(),
            response.isSuccessful()
        );

        this._provisions = provisions;
    }

    /**
     * Provisions getter
     * @return {object}
     */
    getProvisions ()
    {
        return this._provisions;
    }
}

module.exports = ProvisionsChangedResponse;