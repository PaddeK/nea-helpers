'use strict';

const AcknowledgeResponse = require('./AcknowledgeResponse');

class RandomResponse extends AcknowledgeResponse
{
    /**
     * Instantiate a PseudoRandomNumber response
     * @param {AcknowledgeResponse} response
     * @param {string} random
     */
    constructor (response, random)
    {
        super(
            response.isCompleted(),
            response.getErrors(),
            response.getRequest(),
            response.getExchange(),
            response.getPath(),
            response.isSuccessful()
        );

        this._random = String(random);
    }

    /**
     * Random getter
     * @param {string} [encoding = 'hex']
     * @return {Buffer|string}
     */
    getRandom (encoding = 'hex')
    {
        if (encoding === 'hex') {
            return this._random;
        }
        //noinspection JSValidateTypes
        return Buffer.from(this._random, 'hex');
    }
}

module.exports = RandomResponse;