'use strict';

const
    fs = require('fs'),
    fsConstMap = {
        f: fs.constants.F_OK,
        r: fs.constants.R_OK,
        w: fs.constants.W_OK,
        x: fs.constants.X_OK
    };

class Utils
{
    /**
     * Validates if given string is a path.
     *
     * @param {string} path
     * @static
     * @return {boolean}
     */
    static isValidPath (path)
    {
        let q, p, m, n, j = 0, i = 0, r = /(\\).|([@?!+*]\(.*\))/g, s = /(\\).|([*?]|\[.*]|{.*}|\(.*\|.*\)|^!)/;

        if (typeof path !== 'string' || path === '' || /[‘“!#$%&+^<=>`]/.test(path)) {
            return false;
        }

        // eslint-disable-next-line curly
        for (p = path; i < p.length; m = r.exec(p), i += !!(!m||m[2])*p.length, m &&(p = p.slice(m.index+m[0].length)));
        // eslint-disable-next-line curly
        for (q = path; j < q.length; n = s.exec(q), j += !!(!n||n[2])*q.length, n &&(q = q.slice(n.index+n[0].length)));

        return i <= p.length && j <= q.length;
    }

    /**
     * Try catch helper.
     *
     * @param {function} tryCallback
     * @param {*} [catchCallback]
     * @static
     * @return {*}
     */
    static tryCatch (tryCallback, catchCallback)
    {
        if (typeof tryCallback !== 'function') {
            throw new TypeError('tryCatch parameters invalid');
        }

        try {
            return tryCallback();
        } catch (err) {
            if (typeof catchCallback === 'function') {
                return catchCallback(err);
            }
            return catchCallback;
        }
    }

    /**
     * Checks if calling process has in mode defined access on path.
     *
     * @param {string} path
     * @param {number|string} mode
     * @static
     * @return {boolean}
     */
    static hasAccess (path, mode)
    {
        mode = /^[frwx]+$/.test(mode) ? [...mode].reduce((prev, cur) => prev | fsConstMap[cur], 0) : mode;
        return Utils.tryCatch(() => !fs.accessSync(path, mode), false);
    }

    /**
     * Convert Nymi provision pattern to int.
     * @param {string} pattern
     * @static
     * @return {Number}
     */
    static patternToInt (pattern)
    {
        return parseInt(pattern.replace(/-/g, '0').replace(/\+/g, '1'), 2);
    }

    /**
     * Convert int to Nymi provision pattern.
     * @param {number} int
     * @static
     * @return {string}
     */
    static intToPattern (int)
    {
        return (32 | ~~int >>> 0).toString(2).slice(1).replace(/0/g, '-').replace(/1/g, '+');
    }
}

module.exports = Utils;