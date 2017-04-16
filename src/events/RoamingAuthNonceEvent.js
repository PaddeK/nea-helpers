'use strict';

const BaseEvent = require('./BaseEvent');

class RoamingAuthNonceEvent extends BaseEvent
{
    /**
     * Instantiate a RoamingAuthNonce event
     * @param {BaseEvent} event
     * @param {string} nymibandNonce
     */
    constructor (event, nymibandNonce)
    {
        super(event.getResponse(), event.getKind());

        this._nymibandNonce = nymibandNonce;
    }

    /**
     * NymiBandNonce getter
     * @return {NymiBandInfo}
     */
    getNymiBandNonce ()
    {
        return this._nymibandNonce;
    }
}

module.exports = RoamingAuthNonceEvent;