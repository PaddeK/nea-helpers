'use strict';

const
    fs = require('fs'),
    NymiApi = require('./NymiApi'),
    path = require('path'),
    Utils = require('./Utils'),
    NEANameRgx = /^[a-zA-Z0-9-_ ]{6,}$/i;

class NeaConfig
{
    /**
     * Creates a NeaConfig instance.
     * @param {string} config
     */
    constructor (config)
    {
        let cnf;

        if (!Utils.isValidPath(path.dirname(config))) {
            throw new TypeError('Directory of given config is not valid');
        }

        if (!Utils.hasAccess(config, 'frw') || !fs.statSync(config).isFile() || !path.isAbsolute(config)) {
            throw new TypeError('Given config must be readable and writeable');
        }

        cnf = Utils.tryCatch(() => JSON.parse(fs.readFileSync(config, 'utf8')), false);

        if (cnf === false || !this.isValidConfig(cnf)) {
            throw new SyntaxError('Error while parsing or invalid config');
        }

        /**
         * @typedef {object} config
         * @property {string} neaName
         * @property {string} logDirectory
         * @property {int} logLevel
         * @property {int} port
         * @property {string} host
         * @property {boolean} nymulator
         * @property {int} retryCount
         * @property {int} interval
         */

        this._config = config;
        this._neaName = cnf.neaName;
        this._logDirectory = cnf.logDirectory || '.';
        this._logLevel = cnf.logLevel || NymiApi.LogLevel.NORMAL;
        this._port = cnf.port || -1;
        this._host = cnf.host || '';
        this._nymulator = cnf.nymulator || false;
        this._retryCount = cnf.retryCount || 3;
        this._interval = cnf.interval || 100;
    }

    /**
     * Nymulator getter
     * @return {boolean}
     */
    isNymulator ()
    {
        return this._nymulator;
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
     * RetryCount getter
     * @return {int}
     */
    getRetryCount ()
    {
        return this._retryCount;
    }

    /**
     * Interval getter
     * @return {int}
     */
    getInterval ()
    {
        return this._interval;
    }

    /**
     * LogLevel getter
     * @return {int}
     */
    getLogLevel ()
    {
        return this._logLevel;
    }

    /**
     * Name getter
     * @return {string}
     */
    getName ()
    {
        return this._neaName;
    }

    /**
     * LogDirectory getter
     * @return {string}
     */
    getLogDirectory ()
    {
        return this._logDirectory;
    }

    /**
     * Converts this object to string representation.
     * @override
     * @return {string}
     */
    toString ()
    {
        return JSON.stringify(this.toJson(), null, 4);
    }

    /**
     * Returns a JSON representation of this object
     * @returns {object}
     */
    toJson ()
    {
        return {
            neaName: this.getName(),
            logDirectory: this.getLogDirectory(),
            logLevel: this.getLogLevel(),
            port: this.getPort(),
            host: this.getHost(),
            nymulator: this.isNymulator(),
            retryCount: this.getRetryCount(),
            interval: this.getInterval()
        };
    }

    /**
     * Save this config
     * @return {void}
     */
    save ()
    {
        fs.writeFileSync(this._config, this.toString());
    }

    /**
     * @typedef {Object} Config
     * @property {string} neaName
     * @property {SignatureAlgorithm} sigAlgorithm
     * @property {int} port
     * @property {string} host
     * @property {int} logLevel
     * @property {boolean} nymulator
     */
    /**
     * Validate Config.json file of NEA
     *
     * @param {Config} config   Config.json of NEA.
     * @return {boolean}
     */
    isValidConfig (config)
    {
        let keys = ['logLevel', 'port', 'host', 'nymulator', 'neaName'],
            logLevels = NymiApi.LogLevel,
            ok = true;

        logLevels = Object.keys(logLevels).reduce((prev, cur) => prev.concat(logLevels[cur]), []);

        ok &= typeof config === 'object';
        ok &= keys.every(key => config[key] !== undefined);
        ok &= typeof config.neaName === 'string';
        ok &= NEANameRgx.test(config.neaName);
        ok &= config.neaName && config.neaName.length <= 18;
        ok &= config.nymulator === false || config.nymulator === true;
        ok &= config.host.length > 0;
        ok &= ['logLevel', 'port'].every(key => config[key] === ~~config[key]);
        ok &= logLevels.includes(config.logLevel);
        ok &= config.port >= 1024 && config.port <= 65535;

        return !!ok;
    }
}

module.exports = NeaConfig;