# Hide My Ass! proxy list scraper
A Node.js library for scraping the Hide My Ass! proxy list

## Example

```js
"use strict";

const {
    getProxies
} = require("hma-proxy-list-scraper");

getProxies(1, (error, proxies) => {
    if (error) {
        throw error;
    }
    console.dir(proxies);
});
```

## Functions

<dl>
<dt><a href="#getAnonymityLevel">getAnonymityLevel(row, $)</a> ⇒ <code>string</code></dt>
<dd><p>Returns the anonymity level of the proxy.</p>
</dd>
<dt><a href="#getConnectionTime">getConnectionTime(row, $)</a> ⇒ <code>number</code></dt>
<dd><p>Returns the connection time of the proxy represented as an integer between 0 and 100, where 0 is the worst and 100 is the best.</p>
</dd>
<dt><a href="#getCountryCode">getCountryCode(row, $)</a> ⇒ <code>string</code></dt>
<dd><p>Returns the country code of the proxy (ISO 3166-1 alpha-2).</p>
</dd>
<dt><a href="#getHost">getHost(row, $)</a> ⇒ <code>string</code></dt>
<dd><p>Returns the host/IP address of the proxy.</p>
</dd>
<dt><a href="#getPort">getPort(row, $)</a> ⇒ <code>number</code></dt>
<dd><p>Returns the port of the proxy.</p>
</dd>
<dt><a href="#getSpeed">getSpeed(row, $)</a> ⇒ <code>number</code></dt>
<dd><p>Returns the speed of the proxy represented as an integer between 0 and 100, where 0 is the worst and 100 is the best.</p>
</dd>
<dt><a href="#getType">getType(row, $)</a> ⇒ <code>string</code></dt>
<dd><p>Returns the type of the proxy.</p>
</dd>
<dt><a href="#getProxies">getProxies(pageNumber, callback)</a></dt>
<dd><p>Scrapes the specified page for proxies.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#GetProxiesCallback">GetProxiesCallback</a> : <code>function</code></dt>
<dd><p>Callback for <a href="#getProxies">getProxies</a>.</p>
</dd>
</dl>

<a name="getAnonymityLevel"></a>

## getAnonymityLevel(row, $) ⇒ <code>string</code>
Returns the anonymity level of the proxy.

**Kind**: global function  
**Returns**: <code>string</code> - the anonymity level  

| Param | Type | Description |
| --- | --- | --- |
| row | <code>any</code> | the table row |
| $ | <code>any</code> | the DOM |

<a name="getConnectionTime"></a>

## getConnectionTime(row, $) ⇒ <code>number</code>
Returns the connection time of the proxy represented as an integer between 0 and 100, where 0 is the worst and 100 is the best.

**Kind**: global function  
**Returns**: <code>number</code> - the connection time  

| Param | Type | Description |
| --- | --- | --- |
| row | <code>any</code> | the table row |
| $ | <code>any</code> | the DOM |

<a name="getCountryCode"></a>

## getCountryCode(row, $) ⇒ <code>string</code>
Returns the country code of the proxy (ISO 3166-1 alpha-2).

**Kind**: global function  
**Returns**: <code>string</code> - the country code  

| Param | Type | Description |
| --- | --- | --- |
| row | <code>any</code> | the table row |
| $ | <code>any</code> | the DOM |

<a name="getHost"></a>

## getHost(row, $) ⇒ <code>string</code>
Returns the host/IP address of the proxy.

**Kind**: global function  
**Returns**: <code>string</code> - the host/IP address  

| Param | Type | Description |
| --- | --- | --- |
| row | <code>any</code> | the table row |
| $ | <code>any</code> | the DOM |

<a name="getPort"></a>

## getPort(row, $) ⇒ <code>number</code>
Returns the port of the proxy.

**Kind**: global function  
**Returns**: <code>number</code> - the port  

| Param | Type | Description |
| --- | --- | --- |
| row | <code>any</code> | the table row |
| $ | <code>any</code> | the DOM |

<a name="getSpeed"></a>

## getSpeed(row, $) ⇒ <code>number</code>
Returns the speed of the proxy represented as an integer between 0 and 100, where 0 is the worst and 100 is the best.

**Kind**: global function  
**Returns**: <code>number</code> - the speed  

| Param | Type | Description |
| --- | --- | --- |
| row | <code>any</code> | the table row |
| $ | <code>any</code> | the DOM |

<a name="getType"></a>

## getType(row, $) ⇒ <code>string</code>
Returns the type of the proxy.

**Kind**: global function  
**Returns**: <code>string</code> - the type  

| Param | Type | Description |
| --- | --- | --- |
| row | <code>any</code> | the table row |
| $ | <code>any</code> | the DOM |

<a name="getProxies"></a>

## getProxies(pageNumber, callback)
Scrapes the specified page for proxies.

**Kind**: global function  
**Export**:   

| Param | Type | Description |
| --- | --- | --- |
| pageNumber | <code>number</code> | the page to scrape |
| callback | <code>[GetProxiesCallback](#GetProxiesCallback)</code> | the callback |

<a name="GetProxiesCallback"></a>

## GetProxiesCallback : <code>function</code>
Callback for [getProxies](#getProxies).

**Kind**: global typedef  
**Export**:   

| Param | Type | Description |
| --- | --- | --- |
| [error] | <code>Error</code> | the error, if any |
| [proxies] | <code>Array.&lt;IProxy&gt;</code> | the proxies |

