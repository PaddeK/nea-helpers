'use strict';

const AcknowledgeResponse = require('./AcknowledgeResponse');

class RoamingAuthSetupResponse extends AcknowledgeResponse
{
    /**
     * Instantiate a Signature response
     * @param {AcknowledgeResponse} response
     * @param {string} raKey
     * @param {string} raKeyId
     */
    constructor (response, raKey, raKeyId)
    {
        super(
            response.isCompleted(),
            response.getErrors(),
            response.getRequest(),
            response.getExchange(),
            response.getPath(),
            response.isSuccessful()
        );

        this._RAKey = String(raKey);
        this._RAKeyId = String(raKeyId);
    }

    /**
     * Roaming Authentication Key getter
     * @param {string} [encoding = 'hex']
     * @return {Buffer|string}
     */
    getRoamingAuthKey (encoding = 'hex')
    {
        if (encoding === 'hex') {
            return this._RAKey;
        }
        //noinspection JSValidateTypes
        return Buffer.from(this._RAKey, 'hex');
    }

    /**
     * Roaming Authentication KeyID getter
     * @param {string} [encoding = 'hex']
     * @return {Buffer|string}
     */
    getRoamingAuthKeyId (encoding = 'hex')
    {
        if (encoding === 'hex') {
            return this._RAKeyId;
        }
        //noinspection JSValidateTypes
        return Buffer.from(this._RAKeyId, 'hex');
    }
}

module.exports = RoamingAuthSetupResponse;
