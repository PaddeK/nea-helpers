'use strict';

const AcknowledgementResponse = require('./../responses/AcknowledgementResponse');

class BaseEvent extends AcknowledgementResponse
{
    /**
     * Instantiate a Event
     * @param {AcknowledgementResponse} response
     * @param {string} kind
     */
    constructor (response, kind)
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

        this._response = response;
        this._kind = String(kind);
    }

    /**
     * Response getter
     * @return {AcknowledgementResponse}
     */
    getResponse ()
    {
        return this._response;
    }

    /**
     * Kind getter
     * @return {string}
     */
    getKind ()
    {
        return this._kind;
    }
}

module.exports = BaseEvent;