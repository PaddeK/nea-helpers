'use strict';

class NotificationInfo
{
    /**
     * NotificationInfo
     * @param {boolean} firmwareVersion
     * @param {boolean} foundChange
     * @param {boolean} generalError
     * @param {boolean} presenceChange
     * @param {boolean} provision
     */
    constructor (firmwareVersion, foundChange, generalError, presenceChange, provision)
    {
        this._onFirmwareVersion = !!firmwareVersion;
        this._onFoundChange = !!foundChange;
        this._onGeneralError = !!generalError;
        this._onPresenceChange = !!presenceChange;
        this._onProvision = !!provision;
    }

    /**
     * On FirmwareVersion getter
     * @return {boolean}
     */
    onFirmwareVersion ()
    {
        return this._onFirmwareVersion;
    }

    /**
     * On FoundChange getter
     * @return {boolean}
     */
    onFoundChange ()
    {
        return this._onFoundChange;
    }

    /**
     * On GeneralError getter
     * @return {boolean}
     */
    onGeneralError ()
    {
        return this._onGeneralError;
    }

    /**
     * On PresenceChange getter
     * @return {boolean}
     */
    onPresenceChange ()
    {
        return this._onPresenceChange;
    }

    /**
     * On Provision getter
     * @return {boolean}
     */
    onProvision ()
    {
        return this._onProvision;
    }

    /**
     * Return string representation
     * @return {string}
     */
    toString ()
    {
        return JSON.stringify(this.toJson(), null, 4);
    }

    /**
     * Returns json representation
     * @returns {object}
     */
    toJson ()
    {
        return {
            onFirmwareVersion: this.onFirmwareVersion(),
            onFoundChange: this.onFoundChange(),
            onPresenceChange: this.onPresenceChange(),
            onProvision: this.onProvision(),
            onGeneralError: this.onGeneralError()
        }
    }
}

module.exports = NotificationInfo;