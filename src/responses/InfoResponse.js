'use strict';

const
    NymiApi = require('./../helpers/NymiApi'),
    AcknowledgeResponse = require('./AcknowledgeResponse');

class InfoResponse extends AcknowledgeResponse
{
    /**
     * Instantiate a Info response
     * @param {AcknowledgeResponse} response
     * @param {NapiConfigInfo} napiConfigInfo
     * @param {NymiBandInfo[]} nymiBandInfos
     * @param {object} provisionMap
     * @param {string[]} provisions
     * @param {string[]} provisionsPresent
     * @param {int[]} tidIndex
     */
    constructor (response, napiConfigInfo, nymiBandInfos, provisionMap, provisions, provisionsPresent, tidIndex)
    {
        super(
            response.isCompleted(),
            response.getErrors(),
            response.getRequest(),
            response.getExchange(),
            response.getPath(),
            response.isSuccessful()
        );

        this._napiConfigInfo = napiConfigInfo;
        this._nymiBandInfos = nymiBandInfos || [];
        this._provisionMap = provisionMap || {};
        this._provisions = provisions || [];
        this._provisionsPresent = provisionsPresent || [];
        this._tidIndex = tidIndex || [];
    }

    /**
     * NapiConfigInfo getter
     * @return {NapiConfigInfo}
     */
    getNapiConfig ()
    {
        return this._napiConfigInfo;
    }

    /**
     * NymiBand getter
     * @param {boolean} [onlyAuthenticated = false]
     * @param {boolean} [onlyPresent = false]
     * @param {boolean} [onlyProvisioned = false]
     * @return {NymiBandInfo[]}
     */
    getNymiBands (onlyAuthenticated = false, onlyPresent = false, onlyProvisioned = false)
    {
        if (onlyAuthenticated || onlyPresent || onlyProvisioned) {
            return this._nymiBandInfos.filter(band => {
                let ok = true,
                    pid = band.isProvisioned() ? band.getProvisionInfo().getPid() : null;

                ok &= onlyProvisioned ? this._provisions.includes(pid) : ok;
                ok &= onlyPresent ? this._provisionsPresent.includes(pid) : ok;
                ok &= onlyAuthenticated ? band.getFound() === NymiApi.FoundState.AUTHENTICATED : ok;

                return !!ok;
            });
        }

        return this._nymiBandInfos;
    }

    /**
     * Get closest NymiBand judged by its smoothed RSSI values
     * @param {NymiBandInfo[]} bands
     * @return {NymiBandInfo|undefined}
     */
    getClosestBand (bands = this._nymiBandInfos)
    {
        return bands.sort((a, b) => a.getRssi() - b.getRssi()).pop();
    }

    /**
     * NymiBand by pid getter
     * @param {string} pid
     * @return {NymiBandInfo|undefined}
     */
    getNymiBandByPid (pid)
    {
        return this._nymiBandInfos.find(band => band.getPid() === pid);
    }

    /**
     * NymiBand by tid getter
     * @param {int} tid
     * @return {NymiBandInfo|undefined}
     */
    getNymiBandByTid (tid)
    {
        return this._nymiBandInfos.find(band => band.getTid() === tid);
    }

    /**
     * ProvisionMap getter
     * @return {Object}
     */
    getProvisionMap ()
    {
        return this._provisionMap;
    }

    /**
     * Provisions getter
     * @return {string[]}
     */
    getProvisions ()
    {
        return this._provisions;
    }

    /**
     * Present provisions getter
     * @return {string[]}
     */
    getPresentProvisions ()
    {
        return this._provisionsPresent;
    }

    /**
     * Tid index getter
     * @return {int[]}
     */
    getTidIndex ()
    {
        return this._tidIndex;
    }
}

module.exports = InfoResponse;