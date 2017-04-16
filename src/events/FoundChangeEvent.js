'use strict';

const BaseEvent = require('./BaseEvent');

class FoundChangeEvent extends BaseEvent
{
    /**
     * Instantiate a FoundChange event
     * @param {BaseEvent} event
     * @param {string} after
     * @param {string} before
     * @param {string} pid
     * @param {int} tid
     */
    constructor (event, after, before, pid, tid)
    {
        super(event.getResponse(), event.getKind());

        this._event = event;
        this._after = String(after);
        this._before = String(before);
        this._pid = String(pid);
        this._tid = ~~tid;
    }

    /**
     * Event getter
     * @return {BaseEvent}
     */
    getEvent ()
    {
        return this._event;
    }

    /**
     * After getter
     * @return {string}
     */
    getAfter ()
    {
        return this._after;
    }

    /**
     * Before getter
     * @return {string}
     */
    getBefore ()
    {
        return this._before;
    }

    /**
     * Pid getter
     * @return {string}
     */
    getPid ()
    {
        return this._pid;
    }

    /**
     * Tid getter
     * @return {int}
     */
    getTid ()
    {
        return this._tid;
    }
}

module.exports = FoundChangeEvent;