'use strict';

const BaseEvent = require('./BaseEvent');

class ProvisionedEvent extends BaseEvent
{
    /**
     * Instantiate a Provisioned event
     * @param {BaseEvent} event
     * @param {NymiBandInfo} nymiBandInfo
     */
    constructor (event, nymiBandInfo)
    {
        super(event.getResponse(), event.getKind());

        this._nymiBandInfo = nymiBandInfo;
    }

    /**
     * NymiBandInfo getter
     * @return {NymiBandInfo}
     */
    getNymiBandInfo ()
    {
        return this._nymiBandInfo;
    }
}

module.exports = ProvisionedEvent;