'use strict';

class NapiConfigInfo
{
    /**
     * NapiConfigInfo
     * @param {string} commit
     * @param {boolean} detecting
     * @param {boolean} discovering
     * @param {string} ecodaemon
     * @param {boolean} finding
     * @param {boolean} net
     * @param {boolean} running
     * @param {string} version
     */
    constructor (commit, detecting, discovering, ecodaemon, finding, net, running, version)
    {
        this._commit = String(commit);
        this._detecting = !!detecting;
        this._discovering = !!discovering;
        this._ecodaemon = String(ecodaemon);
        this._finding = !!finding;
        this._net = !!net;
        this._running = !!running;
        this._version = String(version);
    }

    /**
     * Commit getter
     * @return {string}
     */
    getCommit ()
    {
        return this._commit;
    }

    /**
     * Detecting getter
     * @return {boolean}
     */
    isDetecting ()
    {
        return this._detecting;
    }

    /**
     * Discovering getter
     * @return {boolean}
     */
    isDiscovering ()
    {
        return this._discovering;
    }

    /**
     * Ecodaemon getter
     * @return {string}
     */
    getEcoDaemon ()
    {
        return this._ecodaemon;
    }

    /**
     * Finding getter
     * @return {boolean}
     */
    isFinding ()
    {
        return this._finding;
    }

    /**
     * Net getter
     * @return {boolean}
     */
    isNet ()
    {
        return this._net;
    }

    /**
     * Running getter
     * @return {boolean}
     */
    isRunning ()
    {
        return this._running;
    }

    /**
     * Version getter
     * @return {string}
     */
    getVersion ()
    {
        return this._version;
    }
}

module.exports = NapiConfigInfo;