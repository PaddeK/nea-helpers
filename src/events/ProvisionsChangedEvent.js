'use strict';

const BaseEvent = require('./BaseEvent');

class ProvisionsChangedEvent extends BaseEvent
{
    /**
     * Instantiate a ProvisionsChanged response
     * @param {BaseEvent} event
     * @param {object} provisions
     */
    constructor (event, provisions)
    {
        super(event.getResponse(), event.getKind());

        this._provisions = provisions;
    }

    /**
     * Provisions getter
     * @return {object}
     */
    getProvisions ()
    {
        return this._provisions;
    }
}

module.exports = ProvisionsChangedEvent;