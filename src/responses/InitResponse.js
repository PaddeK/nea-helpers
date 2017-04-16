'use strict';

const AcknowledgeResponse = require('./AcknowledgeResponse');

class InitResponse extends AcknowledgeResponse
{
    /**
     * Instantiate a Init response
     * @param {AcknowledgeResponse} response
     * @param {NapiInitInfo} napiInitInfo
     */
    constructor (response, napiInitInfo)
    {
        super(
            response.isCompleted(),
            response.getErrors(),
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