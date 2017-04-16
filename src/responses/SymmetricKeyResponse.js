'use strict';

const AcknowledgeResponse = require('./AcknowledgeResponse');

class SymmetricKeyResponse extends AcknowledgeResponse
{
    /**
     * Instantiate a SymmetricKey response
     * @param {AcknowledgeResponse} response
     * @param {string} key
     */
    constructor (response, key)
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

        this._key = String(key);
    }

    /**
     * Key getter
     * @param {string} [encoding = 'hex']
     * @return {Buffer|string}
     */
    getKey (encoding = 'hex')
    {
        if (encoding === 'hex') {
            return this._key;
        }
        //noinspection JSValidateTypes
        return Buffer.from(this._key, 'hex');
    }
}

module.exports = SymmetricKeyResponse;