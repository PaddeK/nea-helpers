'use strict';

const
    NymiApi = require('./NymiApi'),
    crypto = require('crypto'),
    NeaRequest = require('./NeaRequest');

class NeaRequestFactory
{
    /**
     * Create NeaRequest for accepting a provision pattern
     * @param {string} pattern
     * @param {string|null} [exchange = null]
     * @return {NeaRequest}
     */
    static acceptPattern (pattern, exchange = null)
    {
        return new NeaRequest({
            path: 'provision/pattern',
            exchange: exchange,
            request: {
                action: NymiApi.PatternAction.ACCEPT,
                pattern: pattern
            }
        });
    }

    /**
     * Create NeaRequest for rejecting a provision pattern
     * @param {string} pattern
     * @param {string|null} [exchange = null]
     * @return {NeaRequest}
     */
    static rejectPattern (pattern, exchange = null)
    {
        return new NeaRequest({
            path: 'provision/pattern',
            exchange: exchange,
            request: {
                action: NymiApi.PatternAction.REJECT,
                pattern: pattern
            }
        });
    }

    /**
     * Create NeaRequest for creating a symmetric key
     * @param {string} pid
     * @param {boolean} [guarded = false]
     * @param {string|null} [exchange = null]
     * @return {NeaRequest}
     */
    static createSymmetricKey (pid, guarded = false, exchange = null)
    {
        return new NeaRequest({
            path: 'symmetricKey/run',
            exchange: exchange,
            request: {
                pid: pid,
                guarded: !!guarded
            }
        });
    }

    /**
     * Create NeaRequest for retrieving a symmetric key
     * @param {string} pid
     * @param {string|null} [exchange = null]
     * @return {NeaRequest}
     */
    static getSymmetricKey (pid, exchange = null)
    {
        return new NeaRequest({
            path: 'symmetricKey/get',
            exchange: exchange,
            request: {
                pid: pid
            }
        });
    }

    /**
     * Create NeaRequest for starting provisioning
     * @param {string|null} [exchange = null]
     * @return {NeaRequest}
     */
    static provisionStart (exchange = null)
    {
        return new NeaRequest({
            path: 'provision/run/start',
            exchange: exchange
        });
    }

    /**
     * Create NeaRequest for stopping provisioning
     * @param {string|null} [exchange = null]
     * @return {NeaRequest}
     */
    static provisionStop (exchange = null)
    {
        return new NeaRequest({
            path: 'provision/run/stop',
            exchange: exchange
        });
    }

    /**
     * Create NeaRequest for retrieving info about Nymi bands in the vicinity
     * @param {string|null} [exchange = null]
     * @return {NeaRequest}
     */
    static getInfo (exchange = null)
    {
        return new NeaRequest({
            path: 'info/get',
            exchange: exchange
        });
    }

    /**
     * Create NeaRequest for retrieving about NymiApi initialization
     * @param {string|null} [exchange = null]
     * @return {NeaRequest}
     */
    static getInit (exchange = null)
    {
        return new NeaRequest({
            path: 'init/get',
            exchange: exchange
        });
    }

    /**
     * Create NeaRequest for enabling/disabling events
     * @param {boolean} [found = true]
     * @param {boolean} [presence = true]
     * @param {string|null} [exchange = null]
     * @return {NeaRequest}
     */
    static setEvents (found = true, presence = true, exchange = null)
    {
        return new NeaRequest({
            path: 'notifications/set',
            exchange: exchange,
            request: {
                onFoundChange: !!found,
                onPresenceChange: !!presence
            }
        });
    }

    /**
     * Create NeaRequest for retrieving event states
     * @param {string|null} [exchange = null]
     * @return {NeaRequest}
     */
    static getEvents (exchange = null)
    {
        return new NeaRequest({
            path: 'notifications/get',
            exchange: exchange
        });
    }

    /**
     * Create NeaRequest for generating random bytes
     * @param {string} pid
     * @param {string|null} [exchange = null]
     * @return {NeaRequest}
     */
    static getRandom (pid, exchange = null)
    {
        return new NeaRequest({
            path: 'random/run',
            exchange: exchange,
            request: {
                pid: pid
            }
        });
    }

    /**
     * Create NeaRequest for notifying a Nymi Band
     * @param {string} pid
     * @param {HapticNotification} type
     * @param {string|null} [exchange = null]
     * @return {NeaRequest}
     */
    static notifyBand (pid, type, exchange = null)
    {
        return new NeaRequest({
            path: 'buzz/run',
            exchange: exchange,
            request: {
                pid: pid,
                buzz: !!type
            }
        });
    }

    /**
     * Create NeaRequest for revoking a provision
     * @param {string} pid
     * @param {boolean} [onlyAuth = true]
     * @param {string|null} [exchange = null]
     * @return {NeaRequest}
     */
    static revokeProvision (pid, onlyAuth = true, exchange = null)
    {
        return new NeaRequest({
            path: 'revoke/run',
            exchange: exchange,
            request: {
                pid: pid,
                onlyIfAuthenticated: !!onlyAuth
            }
        });
    }

    /**
     * Create NeaRequest for creating a CDF key
     * @param {string} pid
     * @param {boolean} [guarded = false]
     * @param {string|null} [exchange = null]
     * @return {NeaRequest}
     */
    static createCdfKey (pid, guarded = false, exchange = null)
    {
        return new NeaRequest({
            path: 'cdf/run',
            exchange: exchange,
            request: {
                pid: pid,
                guarded: !!guarded
            }
        });
    }

    /**
     * Create NeaRequest for retrieving a CDF key
     * @see https://docs.microsoft.com/en-us/windows/uwp/security/companion-device-unlock
     * @param {string} pid
     * @param {string} srvNonce
     * @param {string} skNonce
     * @param {string} dkNonce
     * @param {string} HMACsrv
     * @param {string|null} [exchange = null]
     * @return {NeaRequest}
     */
    static getCdfKey (pid, srvNonce, skNonce, dkNonce, HMACsrv, exchange = null)
    {
        return new NeaRequest({
            path: 'cdf/get',
            exchange: exchange,
            request: {
                pid: pid,
                serviceNonce: srvNonce,
                sessionKeyNonce: skNonce,
                deviceKeyNonce: dkNonce,
                serviceNonceHMAC: HMACsrv
            }
        });
    }

    /**
     * Create NeaRequest for deletion of a Key or multiple Keys at once
     * @param {string} pid
     * @param {boolean} [cdf = false]
     * @param {boolean} [sign = false]
     * @param {boolean} [symmetric = false]
     * @param {boolean} [totp = false]
     * @param {boolean} [raSetup = false]
     * @param {string|null} [exchange = null]
     * @return {NeaRequest}
     */
    static deleteKey (pid, cdf = false, sign = false, symmetric = false, totp = false, raSetup = false, exchange = null)
    {
        return new NeaRequest({
            path: 'key/delete',
            exchange: exchange,
            request: {
                pid: pid,
                cdf: !!cdf,
                sign: !!sign,
                symmetric: !!symmetric,
                totp: !!totp,
                roamingAuthSetup: !!raSetup
            }
        });
    }

    /**
     * Create NeaRequest for setup signing
     * @param {string} pid
     * @param {string} curve
     * @param {string|null} [exchange = null]
     * @return {NeaRequest}
     */
    static signSetup (pid, curve, exchange = null)
    {
        return new NeaRequest({
            path: 'sign/setup',
            exchange: exchange,
            request: {
                pid: pid,
                curve: curve
            }
        });
    }

    /**
     * Create NeaRequest for signing a message
     * @param {string} pid
     * @param {string} message
     * @param {string|null} [hash = undefined]
     * @param {string|null} [exchange = null]
     * @return {NeaRequest}
     */
    static signMessage (pid, message, hash = null, exchange = null)
    {
        return new NeaRequest({
            path: 'sign/run',
            exchange: exchange,
            request: {
                pid: pid,
                hash: hash || crypto.createHash('sha256').update(message).digest('hex')
            }
        });
    }

    /**
     * Create NeaRequest for creating a TOTP key
     * @param {string} pid
     * @param {string} key
     * @param {boolean} [guarded = false]
     * @param {string|null} [exchange = null]
     * @return {NeaRequest}
     */
    static createTotp (pid, key, guarded = false, exchange = null)
    {
        return new NeaRequest({
            path: 'totp/run',
            exchange: exchange,
            request: {
                pid: pid,
                key: key,
                guarded: !!guarded
            }
        });
    }

    /**
     * Create NeaRequest for retrieving a TOTP
     * @param {string} pid
     * @param {string|null} [exchange = null]
     * @return {NeaRequest}
     */
    static getTotp (pid, exchange = null)
    {
        return new NeaRequest({
            path: 'totp/get',
            exchange: exchange,
            request: {
                pid: pid
            }
        });
    }

    /**
     * Create NeaRequest for Roaming Authentication setup
     * @param {string} pid
     * @param {string} publicKey
     * @param {string|null} [exchange = null]
     * @return {NeaRequest}
     */
    static setupRoamingAuth (pid, publicKey, exchange = null)
    {
        return new NeaRequest({
            path: 'roaming-auth-setup/run',
            exchange: exchange,
            request: {
                pid: pid,
                partnerPublicKey: publicKey
            }
        });
    }

    /**
     * Create NeaRequest for starting Roaming Authentication
     * @param {int} tid
     * @param {string|null} [exchange = null]
     * @return {NeaRequest}
     */
    static startRoamingAuth (tid, exchange = null)
    {
        return new NeaRequest({
            path: 'roaming-auth/run',
            exchange: exchange,
            request: {
                tid: ~~tid
            }
        });
    }

    /**
     * Create NeaRequest for completing Roaming Authentication
     * @param {string} partnerPublicKey
     * @param {string} serverNonce
     * @param {string} serverSignature
     * @param {string|null} [exchange = null]
     * @return {NeaRequest}
     */
    static completeRoamingAuth (partnerPublicKey, serverNonce, serverSignature, exchange = null)
    {
        return new NeaRequest({
            path:'roaming-auth-sig/run',
            exchange: exchange,
            request: {
                partnerPublicKey: partnerPublicKey,
                serverNonce: serverNonce,
                serverSignature: serverSignature
            }
        });
    }
}

module.exports = NeaRequestFactory;