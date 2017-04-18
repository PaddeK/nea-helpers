'use strict';

const AcknowledgementResponse = require('./AcknowledgementResponse');

class NotificationResponse extends AcknowledgementResponse
{
    /**
     * Instantiate a Notification response
     * @param {AcknowledgementResponse} response
     * @param {NotificationInfo} notificationInfo
     */
    constructor (response, notificationInfo)
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

        this._notificationInfo = notificationInfo;
    }

    /**
     * NotificationInfo getter
     * @return {NotificationInfo}
     */
    getNotificationInfo ()
    {
        return this._notificationInfo;
    }
}

module.exports = NotificationResponse;