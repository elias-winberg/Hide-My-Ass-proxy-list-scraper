"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio = require("cheerio");
var juice = require("juice");
var request_1 = require("request");
var BASE_URL = "http://proxylist.hidemyass.com/";
var TR_SELECTOR = "#listable > tbody > tr";
/**
 * Returns the anonymity level of the proxy.
 * @param {any} row - the table row - the table row
 * @param {any} $ - the DOM - the DOM
 * @returns {string} the anonymity level
 */
function getAnonymityLevel(row, $) {
    var element = $(row).children()[7];
    return $(element).text().trim();
}
/**
 * Returns the connection time of the proxy represented as an integer between 0 and 100, where 0 is the worst and 100 is the best.
 * @param {any} row - the table row
 * @param {any} $ - the DOM
 * @returns {number} the connection time
 */
function getConnectionTime(row, $) {
    var element = $(row).children()[5];
    return parseInt($(element).find(".indicator").prop("style").width);
}
/**
 * Returns the country code of the proxy (ISO 3166-1 alpha-2).
 * @param {any} row - the table row
 * @param {any} $ - the DOM
 * @returns {string} the country code
 */
function getCountryCode(row, $) {
    var element = $(row).children()[3];
    return $(element).attr("rel");
}
/**
 * Returns the host/IP address of the proxy.
 * @param {any} row - the table row
 * @param {any} $ - the DOM
 * @returns {string} the host/IP address
 */
function getHost(row, $) {
    var element = $(row).children()[1];
    element = $(element).children()[0];
    $(element).children().filter(function () {
        var val = $(this);
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
function getPort(row, $) {
    var element = $(row).children()[2];
    return parseInt($(element).text().trim());
}
/**
 * Returns the speed of the proxy represented as an integer between 0 and 100, where 0 is the worst and 100 is the best.
 * @param {any} row - the table row
 * @param {any} $ - the DOM
 * @returns {number} the speed
 */
function getSpeed(row, $) {
    var element = $(row).children()[4];
    return parseInt($(element).find(".indicator").prop("style").width);
}
/**
 * Returns the type of the proxy.
 * @param {any} row - the table row
 * @param {any} $ - the DOM
 * @returns {string} the type
 */
function getType(row, $) {
    var element = $(row).children()[6];
    return $(element).text().trim();
}
/**
 * Scrapes the specified page for proxies.
 * @export
 * @param {number} pageNumber - the page to scrape
 * @param {(error?: Error, proxies?: IProxy[]) => void} callback - the callback
 */
function getProxies(pageNumber, callback) {
    request_1.get(BASE_URL + pageNumber, function (error, response, body) {
        if (error) {
            return callback(error);
        }
        if (response.statusCode !== 200) {
            return callback(new Error("An error occurred while fetching the page."));
        }
        var html = juice(body);
        var $ = cheerio.load(html);
        var proxies = [];
        $(TR_SELECTOR).each(function (index, row) {
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
exports.getProxies = getProxies;
//# sourceMappingURL=index.js.map