'use strict';

class ProvisionInfo
{
    /**
     * ProvisionInfo
     * @param {string} pid
     * @param {float} authWindow
     * @param {string[]} cmdQueue
     * @param {int} cmdsQueued
     * @param {boolean} approached
     * @param {ProximityState} proximity
     * @param {KeyTypeInfo} keyTypeInfo
     */
    constructor (pid, authWindow, cmdQueue, cmdsQueued, approached, proximity, keyTypeInfo)
    {
        this._pid = String(pid);
        this._authenticationWindowRemaining = authWindow;
        this._commandQueue = cmdQueue || [];
        this._commandsQueued = ~~cmdsQueued || 0;
        this._hasApproached = !!approached;
        this._proximity = proximity;
        this._keyTypeInfo = keyTypeInfo;
    }

    /**
     * PID getter
     * @return {string}
     */
    getPid ()
    {
        return this._pid;
    }

    /**
     * AuthenticationWindowRemaining getter
     * @return {float}
     */
    getAuthenticationWindowRemaining ()
    {
        return this._authenticationWindowRemaining;
    }

    /**
     * CommandQueue getter
     * @return {string[]}
     */
    getCommandQueue ()
    {
        return this._commandQueue;
    }

    /**
     * Command getter
     * @param {int} index
     * @return {string|null}
     */
    getCommandAt (index = 0)
    {
        if (Array.isArray(this._commandQueue) && this._commandQueue.length > 0) {
            return this._commandQueue[~~index] !== undefined ? this._commandQueue[~~index] : null;
        }
        return null;
    }

    /**
     * CommandsQueued getter
     * @return {int}
     */
    getCommandsQueued ()
    {
        return this._commandsQueued;
    }

    /**
     * Approached getter
     * @return {boolean}
     */
    hasApproached ()
    {
        return this._hasApproached;
    }

    /**
     * Proximity getter
     * @return {ProximityState}
     */
    getProximity ()
    {
        return this._proximity;
    }

    /**
     * KeyTypeInfo getter
     * @return {KeyTypeInfo}
     */
    getKeyTypeInfo ()
    {
        return this._keyTypeInfo;
    }
}

module.exports = ProvisionInfo;





























