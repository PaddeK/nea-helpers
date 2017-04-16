'use strict';

const
    path = require('path'),
    debug = require('debug')(__filename.split(path.sep).pop()),
    cluster = require('cluster'),
    NeaRequestFactory = require('./NeaRequestFactory'),
    NapiBindings = require('napi-bindings');

class NapiWorker
{
    /**
     * Creates a Worker instance.
     */
    constructor ()
    {
        this.putQueue = [];
        this.interval = 100;
        this.retry = 3;
        this.id = cluster.worker.id;
        this.intervalId = null;
        this.napi = null;

        process.on('message', this._onMessage.bind(this));
    }

    /**
     * @typedef {object} Message
     * @property {string} op        Operation to execute (init, put, quit).
     */
    /**
     * Handler that is called each time the WorkerManager sends a message.
     *
     * @param {Message} msg      The message from the WorkerManager (JSON).
     * @private
     * @return {*}
     */
    _onMessage (msg)
    {
        debug('[%d] incoming message: %o', this.id, msg);
        return typeof this[msg.op] === 'function' && this[msg.op].call(this, msg);
    }

    /**
     * @typedef {object} InitNeaMessage
     * @property {string} op            Operation to execute (init, put, quit).
     * @property {int} interval         Interval delay in ms to repeat call to jsonNapiGetTSD.
     * @property {int} retry            Number of retries if Napi fails to initialize.
     * @property {boolean} nymulator    Use Nymulator (true) or native (false) library.
     * @property {string} logDirectory
     * @property {LogLevel} log
     * @property {int} port
     * @property {string} host
     * @property {string} provisions
     * @property {string} neaName
     */
    /**
     * Initializes the managed NEA.
     *
     * Uses retry handling.
     *
     * @param {InitNeaMessage} msg      InitNeaMessage containing details to initialize the NEA.
     * @private
     * @return {void}
     */
    init (msg)
    {
        let init;

        this.interval = msg.interval || this.interval;
        this.retry = msg.retry || this.retry;
        this.napi = new NapiBindings(msg.nymulator || false);

        this.putQueue.unshift(NeaRequestFactory.getInit());

        while ((init = this._initNea(msg)) !== NapiBindings.ConfigOutcome.OKAY) {
            if (init !== NapiBindings.ConfigOutcome.FAILED_TO_INIT) {
                debug('NymiApi initialization error: %s', Object.keys(NapiBindings.ConfigOutcome)[init]);
                process.exit(1);
            }
        }
    }

    /**
     * Stops the managed NEA and exits the worker
     * @private
     * @return {void}
     */
    quit ()
    {
        this.napi.napiTerminate();
        cluster.worker.kill();
    }

    /**
     * Queues another message to send to the Napi
     *
     * @param {object} msg
     * @private
     * @return {void}
     */
    put (msg)
    {
        this.putQueue.unshift(msg.put);
    }

    /**
     * Initialize managed NEA
     *
     * @param {InitNeaMessage} msg
     * @private
     * @return {ConfigOutcome}
     */
    _initNea (msg)
    {
        if (this.retry--) {
            return this.napi.napiConfigure(msg.neaName, msg.logDirectory, msg.provisions, msg.log, msg.port, msg.host);
        }

        debug('NymiApi initialization failed');
        process.exit(1);
    }

    /**
     * Handles receiving and transmitting commands to Napi
     * @protected
     * @return {void}
     */
    run ()
    {
        let get, put;

        clearInterval(this.intervalId);

        if (this.napi !== null) {
            if(this.putQueue.length) {
                put = this.putQueue.pop();

                debug('[%d] put: %o', this.id, put);

                if(this.napi.napiPut(put) === NapiBindings.PutOutcome.NAPI_NOT_RUNNING) {
                    debug('[%d] put failed requeue', this.id);
                    this.putQueue.push(put);
                }
            }

            get = this.napi.napiTryGet();

            if(get.outcome === NapiBindings.GetOutcome.OKAY) {
                debug('[%d] got: %o', this.id, get);
                process.send(get.json);
            }
        }

        this.intervalId = setInterval(this.run.bind(this), this.interval);
    }
}

(new NapiWorker()).run();