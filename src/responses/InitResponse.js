'use strict';

const AcknowledgementResponse = require('./AcknowledgementResponse');

/**
 * {@link AcknowledgementResponse}
 */
class InitResponse extends AcknowledgementResponse
{
    /**
     * Instantiate a Init response
     * @param {AcknowledgementResponse} response
     * @param {NapiInitInfo} napiInitInfo
     */
    constructor (response, napiInitInfo)
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

        this._napiInitInfo = napiInitInfo;
    }

    /**
     * InitInfo getter
     * @return {NapiInitInfo}
     */
    getNapiInitInfo ()
    {
        return this._napiInitInfo;
    }
}

module.exports = InitResponse;