'use strict';

const BaseEvent = require('./BaseEvent');

class GeneralErrorEvent extends BaseEvent
{
    /**
     * Instantiate a GeneralError event
     * @param {BaseEvent} event
     * @param {string} error
     */
    constructor (event, error)
    {
        super(event.getResponse(), event.getKind());

        this._error = String(error);
    }

    /**
     * Error getter
     * @return {string}
     */
    getError ()
    {
        return this._error;
    }
}

module.exports = GeneralErrorEvent;