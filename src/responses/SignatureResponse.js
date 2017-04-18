'use strict';

const AcknowledgementResponse = require('./AcknowledgementResponse');

class SignatureResponse extends AcknowledgementResponse
{
    /**
     * Instantiate a Signature response
     * @param {AcknowledgementResponse} response
     * @param {string} signature
     * @param {string} verificationKey
     */
    constructor (response, signature, verificationKey)
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

        this._signature = String(signature);
        this._verificationKey = String(verificationKey);
    }

    /**
     * Signature getter
     * @param {string} [encoding = 'hex']
     * @return {Buffer|string}
     */
    getSignature (encoding = 'hex')
    {
        if (encoding === 'hex') {
            return this._signature;
        }
        //noinspection JSValidateTypes
        return Buffer.from(this._signature, 'hex');
    }

    /**
     * Verification key getter
     * @param {string} [encoding = 'hex']
     * @return {Buffer|string}
     */
    getVerificationKey (encoding = 'hex')
    {
        if (encoding === 'hex') {
            return this._verificationKey;
        }
        //noinspection JSValidateTypes
        return Buffer.from(this._verificationKey, 'hex');
    }
}

module.exports = SignatureResponse;