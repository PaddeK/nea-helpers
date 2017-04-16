'use strict';

const AcknowledgeResponse = require('./../responses/AcknowledgeResponse');

class BaseEvent extends AcknowledgeResponse
{
    /**
     * Instantiate a Event
     * @param {AcknowledgeResponse} response
     * @param {string} kind
     */
    constructor (response, kind)
    {
        super(
            response.isCompleted(),
            response.getErrors(),
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
     * @return {AcknowledgeResponse}
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