'use strict';

const
    cluster = require('cluster'),
    path = require('path'),
    debug = require('debug')(__filename.split(path.sep).pop()),
    EventEmitter = require('events'),
    NeaResponseFactory = require('./NeaResponseFactory'),
    WorkerFile = path.resolve(__dirname, 'NapiWorker.js');

class Nea extends EventEmitter
{
    /**
     * Creates a NEA instance.
     * @param {NeaConfig} neaConfig
     * @param {object} storage
     * @type {object}
     * @property {function} read
     * @property {function} write
     */
    constructor (neaConfig, storage)
    {
        super();

        this._id = null;
        this._initialized = false;
        this._config = neaConfig;
        this._worker = null;
        this._storage = storage;

        if (typeof storage.read !== 'function' || typeof storage.write !== 'function') {
            throw new Error('Invalid storage provided');
        }

        cluster.setupMaster({exec: WorkerFile});
        cluster.on('online', worker => worker.send(worker.init));
        cluster.on('exit', worker => !worker.exitedAfterDisconnect && Promise.all([this.stop(), this.start()]));
    }

    /**
     * Id getter
     * @return {int}
     */
    getId ()
    {
        return this._id;
    }

    /**
     * Config getter
     * @return {NeaConfig}
     */
    getConfig ()
    {
        return this._config;
    }

    /**
     * Check if this NEA is running
     * @return {boolean}
     */
    isRunning ()
    {
        return this._worker && !this._worker.isDead();
    }

    /**
     * Spawns a new worker to manage a NEA
     *
     * @param {NeaConfig} config
     * @private
     * @return {cluster.Worker}
     */
    _spawnWorker (config)
    {
        let worker = cluster.fork();

        worker.init = {
            op: 'init',
            neaName: config.getName(),
            logDirectory: config.getLogDirectory(),
            port: config.getPort(),
            log: config.getLogLevel(),
            host: config.getHost(),
            nymulator: config.isNymulator(),
            retry: config.getRetryCount(),
            interval: config.getInterval(),
            provisions: this._storage.read()
        };
        return worker;
    }

    /**
     * Starts this NEA.
     *
     * @return {Promise}
     */
    start ()
    {
        return new Promise((resolve, reject) => {
            if (!this._initialized) {
                debug('Starting...');

                this._worker = this._spawnWorker(this._config);
                this._worker.on('message', this._onMessage.bind(this));

                this.once('InitGet', res => {
                    this._initialized = res.isSuccessful() && res.isCompleted();

                    debug('Started: %s', this._initialized.toString());

                    if (this._initialized) {
                        this._id = this._worker.id;
                        return resolve(res);
                    }

                    this._worker.removeAllListeners('message');
                    reject();
                });
            }
        });
    }

    /**
     * Stops this NEA.
     *
     * @return {Promise}
     */
    stop ()
    {
        return new Promise((resolve, reject) => {
            let timeout;

            if (this._worker !== null) {
                timeout = setTimeout(() => this._worker.kill(), 1000);

                this._worker.once('exit', (code, signal) => {
                    debug('Stopped: %s, %d', signal, code);

                    this._initialized = false;
                    clearTimeout(timeout);
                    resolve();
                });

                if (this._initialized || !this._worker.isDead()) {
                    debug('Stopping...');
                    this._worker.send({op: 'quit'});
                } else if (this._initialized && this._worker.isDead()) {
                    debug('Already stopped');
                    this._initialized = false;
                    resolve();
                }
            } else {
                debug('No worker to stop');
                reject();
            }
        });
    }

    /**
     * Send a NeaRequest to the NapiWorker
     * @param {NeaRequest} request
     * @return {*}
     * @fires Nea#event:Error
     */
    send (request)
    {
        if (this.isRunning()) {
            debug('Sending: %o', request);
            return this._worker.send({op: 'put', put: request});
        }
        /** @event Nea#Error @type {string} */
        this.emit('Error', 'Requested NEA is not running');
    }

    /**
     * Handles incoming messages from NapiWorker.
     *
     * @param {string} message
     * @private
     * @return {void}
     * @fires Nea#event:InitGet
     * @fires Nea#event:InfoGet
     * @fires Nea#event:NotificationsGet
     * @fires Nea#event:NotificationsSet
     * @fires Nea#event:NotificationsReportFoundChange
     * @fires Nea#event:NotificationsReportPresenceChange
     * @fires Nea#event:NotificationsReportGeneralError
     * @fires Nea#event:KeyDelete
     * @fires Nea#event:BuzzRun
     * @fires Nea#event:RevokeRun
     * @fires Nea#event:SignSetup
     * @fires Nea#event:SignRun
     * @fires Nea#event:RandomRun
     * @fires Nea#event:TotpRun
     * @fires Nea#event:TotpGet
     * @fires Nea#event:SymmetricKeyRun
     * @fires Nea#event:SymmetricKeyGet
     * @fires Nea#event:CdfRun
     * @fires Nea#event:CdfGet
     * @fires Nea#event:ProvisionRunStart
     * @fires Nea#event:ProvisionRunStop
     * @fires Nea#event:ProvisionPattern
     * @fires Nea#event:ProvisionReportPatterns
     * @fires Nea#event:ProvisionReportProvisioned
     * @fires Nea#event:RoamingAuthSetupRun
     * @fires Nea#event:RoamingAuthRun
     * @fires Nea#event:RoamingAuthReportNonce
     * @fires Nea#event:RoamingAuthSigRun
     * @fires Nea#event:Error
     * @fires Nea#event:ProvisionsChanged
     */
    _onMessage (message)
    {
        let response = NeaResponseFactory.parse(message);

        debug('Response: %o', response);

        if (response === null) {
            /** @event Nea#Error @type {string} */
            return this.emit('Error', 'Unsupported response ' + JSON.stringify(message));
        }

        switch (response.getPath()) {
            case 'init/get':
                /** @event Nea#InitGet @type {InitResponse} */
                this.emit('InitGet', response);
                break;
            case 'info/get':
                /** @event Nea#InfoGet @type {InfoResponse} */
                this.emit('InfoGet', response);
                break;
            case 'notifications/get':
                /** @event Nea#NotificationsGet @type {NotificationResponse} */
                this.emit('NotificationsGet', response);
                break;
            case 'notifications/set':
                /** @event Nea#NotificationsSet @type {NotificationResponse} */
                this.emit('NotificationsSet', response);
                break;
            case 'notifications/report/found-change':
                /** @event Nea#NotificationsReportFoundChange @type {FoundChangeEvent} */
                this.emit('NotificationsReportFoundChange', response);
                break;
            case 'notifications/report/presence-change':
                /** @event Nea#NotificationsReportPresenceChange @type {PresenceChangeEvent} */
                this.emit('NotificationsReportPresenceChange', response);
                break;
            case 'notifications/report/general-error':
                /** @event Nea#NotificationsReportGeneralError @type {GeneralErrorEvent} */
                this.emit('NotificationsReportGeneralError', response);
                break;
            case 'key/delete':
                /** @event Nea#KeyDelete @type {KeyDeleteResponse} */
                this.emit('KeyDelete', response);
                break;
            case 'buzz/run':
                /** @event Nea#BuzzRun @type {AcknowledgeResponse} */
                this.emit('BuzzRun', response);
                break;
            case 'revoke/run':
                /** @event Nea#RevokeRun @type {AcknowledgeResponse} */
                this.emit('RevokeRun', response);
                break;
            case 'sign/setup':
                /** @event Nea#SignSetup @type {AcknowledgeResponse} */
                this.emit('SignSetup', response);
                break;
            case 'sign/run':
                /** @event Nea#SignRun @type {SignatureResponse} */
                this.emit('SignRun', response);
                break;
            case 'random/run':
                /** @event Nea#RandomRun @type {RandomResponse} */
                this.emit('RandomRun', response);
                break;
            case 'totp/run':
                /** @event Nea#TotpRun @type {AcknowledgeResponse} */
                this.emit('TotpRun', response);
                break;
            case 'totp/get':
                /** @event Nea#TotpGet @type {TotpResponse} */
                this.emit('TotpGet', response);
                break;
            case 'symmetricKey/run':
                /** @event Nea#SymmetricKeyRun @type {AcknowledgeResponse} */
                this.emit('SymmetricKeyRun', response);
                break;
            case 'symmetricKey/get':
                /** @event Nea#SymmetricKeyGet @type {SymmetricKeyResponse} */
                this.emit('SymmetricKeyGet', response);
                break;
            case 'cdf/run':
                /** @event Nea#CdfRun @type {CdfRegistrationResponse} */
                this.emit('CdfRun', response);
                break;
            case 'cdf/get':
                /** @event Nea#CdfGet @type {CdfAuthResponse} */
                this.emit('CdfGet', response);
                break;
            case 'provision/run/start':
                /** @event Nea#ProvisionRunStart @type {AcknowledgeResponse} */
                this.emit('ProvisionRunStart', response);
                break;
            case 'provision/run/stop':
                /** @event Nea#ProvisionRunStop @type {AcknowledgeResponse} */
                this.emit('ProvisionRunStop', response);
                break;
            case 'provision/pattern':
                /** @event Nea#ProvisionPattern @type {AcknowledgeResponse} */
                this.emit('ProvisionPattern', response);
                break;
            case 'provision/report/patterns':
                /** @event Nea#ProvisionReportPatterns {PatternEvent} */
                this.emit('ProvisionReportPatterns', response);
                break;
            case 'provision/report/provisioned':
                /** @event Nea#ProvisionReportProvisioned @type {ProvisionedEvent} */
                this.emit('ProvisionReportProvisioned', response);
                break;
            case 'roaming-auth-setup/run':
                /** @event Nea#RoamingAuthSetupRun @type {RoamingAuthSetupResponse} */
                this.emit('RoamingAuthSetupRun', response);
                break;
            case 'roaming-auth/run':
                /** @event Nea#RoamingAuthRun @type {AcknowledgeResponse} */
                this.emit('RoamingAuthRun', response);
                break;
            case 'roaming-auth/report/nonce':
                /** @event Nea#RoamingAuthReportNonce @type {RoamingAuthNonceEvent} */
                this.emit('RoamingAuthReportNonce', response);
                break;
            case 'roaming-auth-sig/run':
                /** @event Nea#RoamingAuthSigRun @type {RoamingAuthSigResponse} */
                this.emit('RoamingAuthSigRun', response);
                break;
            case 'provisions/changed':
                /** @event Nea#ProvisionsChanged @type {ProvisionsChangedResponse} */
                this.emit('ProvisionsChanged', response);
                this._storage.write(response.getProvisions());
                break;
            default:
                /** @event Nea#Error @type {string} */
                this.emit('Error', 'Unknown path ' + response.getPath());
        }
    }
}

module.exports = Nea;