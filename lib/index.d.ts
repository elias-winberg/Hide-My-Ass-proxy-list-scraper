/**
 * The IProxy interface represents Hide My Ass! proxies.
 * @export
 * @interface IProxy
 */
export interface IProxy {
    /**
     * The anonymity level.
     * @type {string}
     * @memberOf IProxy
     */
    anonymityLevel: string;
    /**
     * The connection time represented as an integer between 0 and 100, where 0 is the worst and 100 is the best.
     * @type {number}
     * @memberOf IProxy
     */
    connectionTime: number;
    /**
     * The country code (ISO 3166-1 alpha-2).
     * @type {string}
     * @memberOf IProxy
     */
    countryCode: string;
    /**
     * The host/IP address.
     * @type {string}
     * @memberOf IProxy
     */
    host: string;
    /**
     * The port number.
     * @type {number}
     * @memberOf IProxy
     */
    port: number;
    /**
     * The speed represented as an integer between 0 and 100, where 0 is the worst and 100 is the best.
     * @type {number}
     * @memberOf IProxy
     */
    speed: number;
    /**
     * The type.
     * @type {string}
     * @memberOf IProxy
     */
    type: string;
}
/**
 * Callback for [getProxies]{@link getProxies}.
 * @export
 * @callback GetProxiesCallback
 * @param {Error} [error] - the error, if any
 * @param {IProxy[]} [proxies] - the proxies
 */
/**
 * Scrapes the specified page for proxies.
 * @export
 * @param {number} pageNumber - the page to scrape
 * @param {GetProxiesCallback} callback - the callback
 */
export declare function getProxies(pageNumber: number, callback: (error?: Error, proxies?: IProxy[]) => void): void;
