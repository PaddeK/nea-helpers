'use strict';

class NymiBandInfo
{
    /**
     * NymiBandInfo
     * @param {float} lastRssi
     * @param {float} smoothRssi
     * @param {string} fwVersion
     * @param {FoundState} found
     * @param {boolean} provisioned
     * @param {PresenceState} present
     * @param {float} lastContact
     * @param {int} tid
     * @param {ProvisionInfo} [provision = undefined]
     */
    constructor (lastRssi, smoothRssi, fwVersion, found, provisioned, present, lastContact, tid, provision = undefined)
    {
        this._lastRssi = lastRssi;
        this._smoothRssi = smoothRssi;
        this._firmwareVersion = String(fwVersion);
        this._found = found;
        this._isProvisioned = !!provisioned;
        this._present = present;
        this._sinceLastContact = lastContact;
        this._tid = ~~tid;
        this._provisionInfo = provision;
    }

    /**
     * RSSI getter
     * @param {boolean} smoothed
     * @return {number}
     */
    getRssi (smoothed = true)
    {
        return smoothed ? this._smoothRssi : this._lastRssi;
    }

    /**
     * FirmwareVersion getter
     * @return {string}
     */
    getFirmwareVersion ()
    {
        return this._firmwareVersion;
    }

    /**
     * FoundState getter
     * @return {FoundState}
     */
    getFound ()
    {
        return this._found;
    }

    /**
     * IsProvisioned getter
     * @return {boolean}
     */
    isProvisioned ()
    {
        return this._isProvisioned;
    }

    /**
     * PresenceState getter
     * @return {PresenceState}
     */
    getPresent ()
    {
        return this._present;
    }

    /**
     * SinceLastContact getter
     * @return {number}
     */
    getSinceLastContact ()
    {
        return this._sinceLastContact;
    }

    /**
     * TID getter
     * @return {int}
     */
    getTid ()
    {
        return this._tid;
    }

    /**
     * ProvisionInfo getter
     * @return {ProvisionInfo|undefined}
     */
    getProvisionInfo ()
    {
        return this._provisionInfo
    }
}

module.exports = NymiBandInfo;