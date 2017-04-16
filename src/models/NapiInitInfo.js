'use strict';

class NapiInitInfo
{
    /**
     * NapiInitInfo
     * @param {string} neaName
     * @param {boolean} inited
     * @param {string} host
     * @param {int} port
     * @param {SignatureAlgorithm} signatureAlgorithm
     */
    constructor (neaName, inited, host, port, signatureAlgorithm)
    {
        this._neaName = String(neaName);
        this._inited = !!inited;
        this._host = String(host);
        this._port = ~~port;
        this._signatureAlgorithm = signatureAlgorithm;
    }

    /**
     * NeaName getter
     * @return {string}
     */
    getNeaName ()
    {
        return this._neaName;
    }

    /**
     * Inited getter
     * @return {boolean}
     */
    isInited ()
    {
        return this._inited;
    }

    /**
     * Host getter
     * @return {string}
     */
    getHost ()
    {
        return this._host;
    }

    /**
     * Port getter
     * @return {int}
     */
    getPort ()
    {
        return this._port;
    }

    /**
     * SignatureAlgorithm getter
     * @return {SignatureAlgorithm}
     */
    getSignatureAlgorithm ()
    {
        return this._signatureAlgorithm;
    }
}

module.exports = NapiInitInfo;