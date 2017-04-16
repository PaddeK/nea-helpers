'use strict';

const
    /**
     * @const
     * @enum {string}
     */
    FoundState = {
        UNDETECTED: 'undetected',
        UNCLASPED: 'unclasped',
        UNPROVISIONABLE: 'unprovisionable',
        ANONYMOUS: 'anonymous',
        DISCOVERED: 'discovered',
        PROVISIONING: 'provisioning',
        IDENTIFIED: 'identified',
        AUTHENTICATED: 'authenticated'
    },
    /**
     * @const
     * @enum {string}
     */
    PresenceState = {
        YES: 'yes',
        LIKELY: 'likely',
        UNLIKELY: 'unlikely',
        NO: 'no'
    },
    /**
     * @const
     * @enum {boolean}
     */
    HapticNotification = {
        NEGATIVE: false,
        POSITIVE: true
    },
    /**
     * @const
     * @enum {string}
     */
    ProximityState = {
        NOT_READY: 'not_ready',
        UNDETECTABLE: 'undetectable',
        DETECTABLE: 'detectable',
        SPHERE1: 'sphere1',
        SPHERE2: 'sphere2',
        SPHERE3: 'sphere3',
        SPHERE4: 'sphere4'
    },
    /**
     * @const
     * @enum {string}
     */
    KeyType = {
        CDF: 'cdf',
        ROAMING_AUTH_SETUP: 'roamingAuthSetup',
        SIGNING: 'sign',
        SYMMETRIC: 'symmetric',
        TOTP: 'totp'
    },
    /**
     * @const
     * @enum {string}
     */
    PatternAction = {
        ACCEPT: 'accept',
        REJECT: 'reject'
    },
    /**
     * @const
     * @enum {string}
     */
    SignatureAlgorithm = {
        NIST256P: 'NIST256P',
        SECP256K: 'SECP256K'
    },
    /**
     * @const
     * @enum {int}
     */
    LogLevel = {
        NONE: 0,
        NORMAL: 1,
        INFO: 2,
        DEBUG: 3,
        VERBOSE: 4
    };

class NymiApi
{
    /**
     * FoundState
     * @static
     * @constructor
     * @return {{UNDETECTED: string, UNCLASPED: string, UNPROVISIONABLE: string, ANONYMOUS: string, DISCOVERED: string, PROVISIONING: string, IDENTIFIED: string, AUTHENTICATED: string}}
     */
    static get FoundState ()
    {
        return FoundState;
    }

    /**
     * PresenceState
     * @static
     * @constructor
     * @return {{YES: string, LIKELY: string, UNLIKELY: string, NO: string}}
     */
    static get PresenceState ()
    {
        return PresenceState;
    }

    /**
     * HapticNotification
     * @static
     * @constructor
     * @return {{NEGATIVE: boolean, POSITIVE: boolean}}
     */
    static get HapticNotification ()
    {
        return HapticNotification;
    }

    /**
     * ProximityState
     * @static
     * @constructor
     * @return {{NOT_READY: string, UNDETECTABLE: string, DETECTABLE: string, SPHERE1: string, SPHERE2: string, SPHERE3: string, SPHERE4: string}}
     */
    static get ProximityState ()
    {
        return ProximityState;
    }

    /**
     * PatternAction
     * @static
     * @constructor
     * @return {{ACCEPT: string, REJECT: string}}
     */
    static get PatternAction ()
    {
        return PatternAction;
    }

    /**
     * KeyType
     * @static
     * @constructor
     * @return {{CDF: string, ROAMING_AUTH_SETUP: string, SIGNING: string, SYMMETRIC: string, TOTP: string}}
     */
    static get KeyType ()
    {
        return KeyType;
    }

    /**
     * SignatureAlgorithm
     * @static
     * @constructor
     * @return {{NIST256P: string, SECP256K: string}}
     */
    static get SignatureAlgorithm ()
    {
        return SignatureAlgorithm;
    }

    /**
     * LogLevel
     * @static
     * @constructor
     * @return {{NONE: number, NORMAL: number, INFO: number, DEBUG: number, VERBOSE: number}}
     */
    static get LogLevel ()
    {
        return LogLevel;
    }
}

module.exports = NymiApi;