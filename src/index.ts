"use strict";

import * as cheerio from "cheerio";
import * as juice from "juice";
import { get } from "request";

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

const BASE_URL = "http://proxylist.hidemyass.com/";

const TR_SELECTOR = "#listable > tbody > tr";

/**
 * Returns the anonymity level of the proxy.
 * @param {any} row - the table row
 * @param {any} $ - the DOM
 * @returns {string} the anonymity level
 */
function getAnonymityLevel(row, $): string {
    let element = $(row).children()[7];
    return $(element).text().trim();
}

/**
 * Returns the connection time of the proxy represented as an integer between 0 and 100, where 0 is the worst and 100 is the best.
 * @param {any} row - the table row
 * @param {any} $ - the DOM
 * @returns {number} the connection time
 */
function getConnectionTime(row, $): number {
    let element = $(row).children()[5];
    return parseInt($(element).find(".indicator").prop("style").width);
}

/**
 * Returns the country code of the proxy (ISO 3166-1 alpha-2).
 * @param {any} row - the table row
 * @param {any} $ - the DOM
 * @returns {string} the country code
 */
function getCountryCode(row, $): string {
    let element = $(row).children()[3];
    return $(element).attr("rel");
}

/**
 * Returns the host/IP address of the proxy.
 * @param {any} row - the table row
 * @param {any} $ - the DOM
 * @returns {string} the host/IP address
 */
function getHost(row, $): string {
    let element = $(row).children()[1];
    element = $(element).children()[0];
    $(element).children().filter(function () {
        let val = $(this);
        return val.css("display") === "none" || val.prop("tagName") !== "SPAN";
    }).remove();
    return $(element).text().trim();
}

/**
 * Returns the port of the proxy.
 * @param {any} row - the table row
 * @param {any} $ - the DOM
 * @returns {number} the port
 */
function getPort(row, $): number {
    let element = $(row).children()[2];
    return parseInt($(element).text().trim());
}

/**
 * Returns the speed of the proxy represented as an integer between 0 and 100, where 0 is the worst and 100 is the best.
 * @param {any} row - the table row
 * @param {any} $ - the DOM
 * @returns {number} the speed
 */
function getSpeed(row, $): number {
    let element = $(row).children()[4];
    return parseInt($(element).find(".indicator").prop("style").width);
}

/**
 * Returns the type of the proxy.
 * @param {any} row - the table row
 * @param {any} $ - the DOM
 * @returns {string} the type
 */
function getType(row, $): string {
    let element = $(row).children()[6];
    return $(element).text().trim();
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
export function getProxies(pageNumber: number, callback: (error?: Error, proxies?: IProxy[]) => void) {
    get(BASE_URL + pageNumber, (error, response, body) => {
        if (error) {
            return callback(error);
        }
        if (response.statusCode !== 200) {
            return callback(new Error("An error occurred while fetching the page."));
        }
        let html = juice(body);
        let $ = cheerio.load(html);
        let proxies: IProxy[] = [];
        $(TR_SELECTOR).each((index, row) => {
            proxies.push({
                anonymityLevel: getAnonymityLevel(row, $),
                connectionTime: getConnectionTime(row, $),
                countryCode: getCountryCode(row, $),
                host: getHost(row, $),
                port: getPort(row, $),
                speed: getSpeed(row, $),
                type: getType(row, $)
            });
        });
        callback(null, proxies);
    });
}