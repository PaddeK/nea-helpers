'use strict';

class KeyTypeInfo
{
    /**
     * KeyTypeInfo
     * @param {boolean} cdf
     * @param {boolean} roamingAuthSetup
     * @param {boolean} signing
     * @param {boolean} symmetricKey
     * @param {boolean} totp
     */
    constructor(cdf, roamingAuthSetup, signing, symmetricKey, totp)
    {
        this._cdf = !!cdf;
        this._roamingAuthSetup = !!roamingAuthSetup;
        this._signing = !!signing;
        this._symmetricKey = !!symmetricKey;
        this._totp = !!totp;
    }

    /**
     * CDF getter
     * @return {boolean}
     */
    hasCdfEnabled ()
    {
        return this._cdf;
    }

    /**
     * RoamingAuthSetup getter
     * @return {boolean}
     */
    hasRoamingAuthSetupEnabled ()
    {
        return this._roamingAuthSetup;
    }

    /**
     * Signing getter
     * @return {boolean}
     */
    hasSigningEnabled ()
    {
        return this._signing;
    }

    /**
     * SymmetricKey getter
     * @return {boolean}
     */
    hasSymmetricKeyEnabled ()
    {
        return this._symmetricKey;
    }

    /**
     * TOTP getter
     * @return {boolean}
     */
    hasTotpEnabled ()
    {
        return this._totp;
    }
}

module.exports = KeyTypeInfo;