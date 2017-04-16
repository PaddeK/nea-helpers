'use strict';

const AcknowledgeResponse = require('./AcknowledgeResponse');

class KeyDeleteResponse extends AcknowledgeResponse
{
    /**
     * Instantiate a Notification response
     * @param {AcknowledgeResponse} response
     * @param {KeyTypeInfo} keyTypeInfo
     */
    constructor (response, keyTypeInfo)
    {
        super(
            response.isCompleted(),
            response.getErrors(),
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