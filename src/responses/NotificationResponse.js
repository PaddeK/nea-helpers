'use strict';

const AcknowledgeResponse = require('./AcknowledgeResponse');

class NotificationResponse extends AcknowledgeResponse
{
    /**
     * Instantiate a Notification response
     * @param {AcknowledgeResponse} response
     * @param {NotificationInfo} notificationInfo
     */
    constructor (response, notificationInfo)
    {
        super(
            response.isCompleted(),
            response.getErrors(),
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