'use strict';

const BaseEvent = require('./BaseEvent');

class PatternEvent extends BaseEvent
{
    /**
     * Instantiate a FoundChange event
     * @param {BaseEvent} event
     * @param {string[]} patterns
     */
    constructor (event, patterns)
    {
        super(event.getResponse(), event.getKind());

        this._patterns = patterns;
    }

    /**
     * Patterns getter
     * @return {string[]}
     */
    getPatterns ()
    {
        return this._patterns;
    }

    /**
     * Get first Pattern
     * @param {int} [index = 0]
     * @param {boolean} [asInt = false]
     * @return {string|null}
     */
    getPatternAt (index = 0, asInt = false)
    {
        if (Array.isArray(this._patterns) && this._patterns.length > 0) {
            let pattern = this._patterns[~~index];

            if (asInt) {
                return pattern !== undefined ? parseInt(pattern.replace(/-/g, '0').replace(/\+/g, '1'), 2) : null;
            }

            return pattern !== undefined ? pattern : null;
        }
        return null;
    }
}

module.exports = PatternEvent;