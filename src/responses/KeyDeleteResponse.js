'use strict';

const AcknowledgementResponse = require('./AcknowledgementResponse');

class KeyDeleteResponse extends AcknowledgementResponse
{
    /**
     * Instantiate a Notification response
     * @param {AcknowledgementResponse} response
     * @param {KeyTypeInfo} keyTypeInfo
     */
    constructor (response, keyTypeInfo)
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

        this._keyTypeInfo = keyTypeInfo;
    }

    /**
     * KeyTypeInfo getter
     * @return {KeyTypeInfo}
     */
    getKeyTypeInfo ()
    {
        return this._keyTypeInfo;
    }
}

module.exports = KeyDeleteResponse;