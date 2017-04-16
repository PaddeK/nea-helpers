'use strict';

const FoundChangeEvent = require('./FoundChangeEvent');

class PresenceChangeEvent extends FoundChangeEvent
{
    /**
     * Instantiate a FoundChange event
     * @param {FoundChangeEvent} event
     * @param {boolean} authenticated
     * @param {float} age
     * @param {float} remaining
     */
    constructor (event, authenticated, age, remaining)
    {
        super(event.getEvent(), event.getAfter(), event.getBefore(), event.getPid(), event.getTid());

        this._authenticated = !!authenticated;
        this._age = age;
        this._remaining = remaining;
    }

    /**
     * Authenticated getter
     * @return {boolean}
     */
    isAuthenticated ()
    {
        return this._authenticated;
    }

    /**
     * Age getter
     * @return {float}
     */
    getAge ()
    {
        return this._age;
    }

    /**
     * Remaining getter
     * @return {float}
     */
    getRemaining ()
    {
        return this._remaining;
    }
}

module.exports = PresenceChangeEvent;