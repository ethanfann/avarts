(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function corslite(url, callback, cors) {
    var sent = false;

    if (typeof window.XMLHttpRequest === 'undefined') {
        return callback(Error('Browser not supported'));
    }

    if (typeof cors === 'undefined') {
        var m = url.match(/^\s*https?:\/\/[^\/]*/);
        cors = m && (m[0] !== location.protocol + '//' + location.hostname +
                (location.port ? ':' + location.port : ''));
    }

    var x = new window.XMLHttpRequest();

    function isSuccessful(status) {
        return status >= 200 && status < 300 || status === 304;
    }

    if (cors && !('withCredentials' in x)) {
        // IE8-9
        x = new window.XDomainRequest();

        // Ensure callback is never called synchronously, i.e., before
        // x.send() returns (this has been observed in the wild).
        // See https://github.com/mapbox/mapbox.js/issues/472
        var original = callback;
        callback = function() {
            if (sent) {
                original.apply(this, arguments);
            } else {
                var that = this, args = arguments;
                setTimeout(function() {
                    original.apply(that, args);
                }, 0);
            }
        }
    }

    function loaded() {
        if (
            // XDomainRequest
            x.status === undefined ||
            // modern browsers
            isSuccessful(x.status)) callback.call(x, null, x);
        else callback.call(x, x, null);
    }

    // Both `onreadystatechange` and `onload` can fire. `onreadystatechange`
    // has [been supported for longer](http://stackoverflow.com/a/9181508/229001).
    if ('onload' in x) {
        x.onload = loaded;
    } else {
        x.onreadystatechange = function readystate() {
            if (x.readyState === 4) {
                loaded();
            }
        };
    }

    // Call the callback with the XMLHttpRequest object as an error and prevent
    // it from ever being called again by reassigning it to `noop`
    x.onerror = function error(evt) {
        // XDomainRequest provides no evt parameter
        callback.call(this, evt || true, null);
        callback = function() { };
    };

    // IE9 must have onprogress be set to a unique function.
    x.onprogress = function() { };

    x.ontimeout = function(evt) {
        callback.call(this, evt, null);
        callback = function() { };
    };

    x.onabort = function(evt) {
        callback.call(this, evt, null);
        callback = function() { };
    };

    // GET is the only supported HTTP Verb by XDomainRequest and is the
    // only one supported here.
    x.open('GET', url, true);

    // Send the request. Sending data is not supported.
    x.send(null);
    sent = true;

    return x;
}

if (typeof module !== 'undefined') module.exports = corslite;

},{}],2:[function(require,module,exports){
module.exports={
  "author": "Mapbox",
  "name": "mapbox.js",
  "description": "Mapbox plugin for Leaflet",
  "version": "3.3.1",
  "homepage": "http://mapbox.com/",
  "engines": {
    "node": ">=10"
  },
  "repository": {
    "type": "git",
    "url": "git://github.com/mapbox/mapbox.js.git"
  },
  "main": "src/index.js",
  "files": [
    "dist",
    "src",
    "*.md"
  ],
  "dependencies": {
    "@mapbox/corslite": "0.0.7",
    "@mapbox/sanitize-caja": "^0.1.4",
    "leaflet": "1.4.0",
    "mustache": "3.0.1"
  },
  "scripts": {
    "test": "eslint src && phantomjs node_modules/mocha-phantomjs-core/mocha-phantomjs-core.js test/index.html && mocha test/docs.js",
    "prepublishOnly": "npm run build",
    "build": "make"
  },
  "license": "BSD-3-Clause",
  "devDependencies": {
    "browserify": "^16.5.0",
    "clean-css-cli": "^4.3.0",
    "eslint": "^6.8.0",
    "expect.js": "0.3.1",
    "happen": "0.3.2",
    "marked": "^0.8.0",
    "minifyify": "^7.3.5",
    "minimist": "1.2.0",
    "mocha": "^7.0.1",
    "mocha-phantomjs-core": "2.1.2",
    "phantomjs-prebuilt": "2.1.16",
    "sinon": "7.2.4"
  },
  "optionalDependencies": {}
}

},{}],3:[function(require,module,exports){
'use strict';

module.exports = {
    HTTP_URL: 'http://api.mapbox.com',
    HTTPS_URL: 'https://api.mapbox.com',
    FORCE_HTTPS: true,
    REQUIRE_ACCESS_TOKEN: true,
    TEMPLATE_STYLES: {
        'mapbox.dark': 'mapbox/dark-v10',
        'mapbox.light': 'mapbox/light-v10',
        'mapbox.osm-bright': 'mapbox/bright-v9',
        'mapbox.outdoors': 'mapbox/outdoors-v11', 
        'mapbox.satellite': 'mapbox/satellite-v9',
        'mapbox.streets': 'mapbox/streets-v11', 
        'mapbox.streets-basic': 'mapbox/basic-v9',
        'mapbox.streets-satellite': 'mapbox/satellite-streets-v11'
    }
};

},{}],4:[function(require,module,exports){
'use strict';

var config = require('./config'),
    version = require('../package.json').version;

module.exports = function(path, accessToken) {
    accessToken = accessToken || L.mapbox.accessToken;

    if (!accessToken && config.REQUIRE_ACCESS_TOKEN) {
        throw new Error('An API access token is required to use Mapbox.js. ' +
            'See https://www.mapbox.com/mapbox.js/api/v' + version + '/api-access-tokens/');
    }

    var url = (document.location.protocol === 'https:' || config.FORCE_HTTPS) ? config.HTTPS_URL : config.HTTP_URL;
    url = url.replace(/\/v4$/, '');
    url += path;

    if (config.REQUIRE_ACCESS_TOKEN) {
        if (accessToken[0] === 's') {
            throw new Error('Use a public access token (pk.*) with Mapbox.js, not a secret access token (sk.*). ' +
                'See https://www.mapbox.com/mapbox.js/api/v' + version + '/api-access-tokens/');
        }

        url += url.indexOf('?') !== -1 ? '&access_token=' : '?access_token=';
        url += accessToken;
    }

    return url;
};

module.exports.tileJSON = function(urlOrMapID, accessToken) {

    if (urlOrMapID.indexOf('mapbox://styles') === 0) {
        throw new Error('Styles created with Mapbox Studio need to be used with ' +
            'L.mapbox.styleLayer, not L.mapbox.tileLayer');
    }

    if (urlOrMapID.indexOf('/') !== -1) return urlOrMapID;

    var url;
    if (urlOrMapID in config.TEMPLATE_STYLES) {
        url = module.exports('/styles/v1/' + config.TEMPLATE_STYLES[urlOrMapID], accessToken);
    } else {
        url = module.exports('/v4/' + urlOrMapID + '.json', accessToken);
    }

    // TileJSON requests need a secure flag appended to their URLs so
    // that the server knows to send SSL-ified resource references.
    if (url.indexOf('https') === 0)
        url += '&secure';

    return url;
};


module.exports.style = function(styleURL, accessToken) {
    if (styleURL.indexOf('mapbox://styles/') === -1) throw new Error('Incorrectly formatted Mapbox style at ' + styleURL);

    var ownerIDStyle = styleURL.split('mapbox://styles/')[1];
    var url = module.exports('/styles/v1/' + ownerIDStyle, accessToken);

    return url;
};

},{"../package.json":2,"./config":3}],5:[function(require,module,exports){
'use strict';

function utfDecode(c) {
    if (c >= 93) c--;
    if (c >= 35) c--;
    return c - 32;
}

module.exports = function(data) {
    return function(x, y) {
        if (!data) return;
        var idx = utfDecode(data.grid[y].charCodeAt(x)),
            key = data.keys[idx];
        return data.data[key];
    };
};

},{}],6:[function(require,module,exports){
window.internals = {
    url: require('./format_url'),
    config: require('./config'),
    util: require('./util'),
    grid: require('./grid'),
    request: require('./request')
};

},{"./config":3,"./format_url":4,"./grid":5,"./request":7,"./util":8}],7:[function(require,module,exports){
'use strict';

var corslite = require('@mapbox/corslite'),
    strict = require('./util').strict,
    config = require('./config');

var protocol = /^(https?:)?(?=\/\/(.|api)\.tiles\.mapbox\.com\/)/;

module.exports = function(url, callback) {
    strict(url, 'string');
    strict(callback, 'function');

    url = url.replace(protocol, function(match, protocol) {
        if (!('withCredentials' in new window.XMLHttpRequest())) {
            // XDomainRequest in use; doesn't support cross-protocol requests
            return document.location.protocol;
        } else if (protocol === 'https:' || document.location.protocol === 'https:' || config.FORCE_HTTPS) {
            return 'https:';
        } else {
            return 'http:';
        }
    });

    function onload(err, resp) {
        if (!err && resp) {
            resp = JSON.parse(resp.responseText);
        }
        callback(err, resp);
    }

    return corslite(url, onload);
};

},{"./config":3,"./util":8,"@mapbox/corslite":1}],8:[function(require,module,exports){
'use strict';

function contains(item, list) {
    if (!list || !list.length) return false;
    for (var i = 0; i < list.length; i++) {
        if (list[i] === item) return true;
    }
    return false;
}

var warnOnceHistory = {};

module.exports = {
    idUrl: function(_, t) {
        if (_.indexOf('/') === -1) t.loadID(_);
        else t.loadURL(_);
    },
    log: function(_) {
        /* eslint-disable no-console */
        if (typeof console === 'object' &&
            typeof console.error === 'function') {
            console.error(_);
        }
    },
    warn: function(_) {
        // avoid cluttering the console with duplicative warnings
        if (warnOnceHistory[_]) return;
        if (typeof console === 'object' && 
            typeof console.warn === 'function') {
            warnOnceHistory[_] = true;
            console.warn(_);
        }
        /* eslint-enable no-console */
    },
    strict: function(_, type) {
        if (typeof _ !== type) {
            throw new Error('Invalid argument: ' + type + ' expected');
        }
    },
    strict_instance: function(_, klass, name) {
        if (!(_ instanceof klass)) {
            throw new Error('Invalid argument: ' + name + ' expected');
        }
    },
    strict_oneof: function(_, values) {
        if (!contains(_, values)) {
            throw new Error('Invalid argument: ' + _ + ' given, valid values are ' +
                values.join(', '));
        }
    },
    strip_tags: function(_) {
        return _.replace(/<[^<]+>/g, '');
    },
    lbounds: function(_) {
        // leaflet-compatible bounds, since leaflet does not do geojson
        return new L.LatLngBounds([[_[1], _[0]], [_[3], _[2]]]);
    }
};

},{}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvQG1hcGJveC9jb3JzbGl0ZS9jb3JzbGl0ZS5qcyIsInBhY2thZ2UuanNvbiIsInNyYy9jb25maWcuanMiLCJzcmMvZm9ybWF0X3VybC5qcyIsInNyYy9ncmlkLmpzIiwic3JjL2ludGVybmFscy5qcyIsInNyYy9yZXF1ZXN0LmpzIiwic3JjL3V0aWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiZnVuY3Rpb24gY29yc2xpdGUodXJsLCBjYWxsYmFjaywgY29ycykge1xuICAgIHZhciBzZW50ID0gZmFsc2U7XG5cbiAgICBpZiAodHlwZW9mIHdpbmRvdy5YTUxIdHRwUmVxdWVzdCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKEVycm9yKCdCcm93c2VyIG5vdCBzdXBwb3J0ZWQnKSk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBjb3JzID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgbSA9IHVybC5tYXRjaCgvXlxccypodHRwcz86XFwvXFwvW15cXC9dKi8pO1xuICAgICAgICBjb3JzID0gbSAmJiAobVswXSAhPT0gbG9jYXRpb24ucHJvdG9jb2wgKyAnLy8nICsgbG9jYXRpb24uaG9zdG5hbWUgK1xuICAgICAgICAgICAgICAgIChsb2NhdGlvbi5wb3J0ID8gJzonICsgbG9jYXRpb24ucG9ydCA6ICcnKSk7XG4gICAgfVxuXG4gICAgdmFyIHggPSBuZXcgd2luZG93LlhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICBmdW5jdGlvbiBpc1N1Y2Nlc3NmdWwoc3RhdHVzKSB7XG4gICAgICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMCB8fCBzdGF0dXMgPT09IDMwNDtcbiAgICB9XG5cbiAgICBpZiAoY29ycyAmJiAhKCd3aXRoQ3JlZGVudGlhbHMnIGluIHgpKSB7XG4gICAgICAgIC8vIElFOC05XG4gICAgICAgIHggPSBuZXcgd2luZG93LlhEb21haW5SZXF1ZXN0KCk7XG5cbiAgICAgICAgLy8gRW5zdXJlIGNhbGxiYWNrIGlzIG5ldmVyIGNhbGxlZCBzeW5jaHJvbm91c2x5LCBpLmUuLCBiZWZvcmVcbiAgICAgICAgLy8geC5zZW5kKCkgcmV0dXJucyAodGhpcyBoYXMgYmVlbiBvYnNlcnZlZCBpbiB0aGUgd2lsZCkuXG4gICAgICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vbWFwYm94L21hcGJveC5qcy9pc3N1ZXMvNDcyXG4gICAgICAgIHZhciBvcmlnaW5hbCA9IGNhbGxiYWNrO1xuICAgICAgICBjYWxsYmFjayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHNlbnQpIHtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWwuYXBwbHkodGhhdCwgYXJncyk7XG4gICAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2FkZWQoKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIC8vIFhEb21haW5SZXF1ZXN0XG4gICAgICAgICAgICB4LnN0YXR1cyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAvLyBtb2Rlcm4gYnJvd3NlcnNcbiAgICAgICAgICAgIGlzU3VjY2Vzc2Z1bCh4LnN0YXR1cykpIGNhbGxiYWNrLmNhbGwoeCwgbnVsbCwgeCk7XG4gICAgICAgIGVsc2UgY2FsbGJhY2suY2FsbCh4LCB4LCBudWxsKTtcbiAgICB9XG5cbiAgICAvLyBCb3RoIGBvbnJlYWR5c3RhdGVjaGFuZ2VgIGFuZCBgb25sb2FkYCBjYW4gZmlyZS4gYG9ucmVhZHlzdGF0ZWNoYW5nZWBcbiAgICAvLyBoYXMgW2JlZW4gc3VwcG9ydGVkIGZvciBsb25nZXJdKGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzkxODE1MDgvMjI5MDAxKS5cbiAgICBpZiAoJ29ubG9hZCcgaW4geCkge1xuICAgICAgICB4Lm9ubG9hZCA9IGxvYWRlZDtcbiAgICB9IGVsc2Uge1xuICAgICAgICB4Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uIHJlYWR5c3RhdGUoKSB7XG4gICAgICAgICAgICBpZiAoeC5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgICAgICAgbG9hZGVkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gQ2FsbCB0aGUgY2FsbGJhY2sgd2l0aCB0aGUgWE1MSHR0cFJlcXVlc3Qgb2JqZWN0IGFzIGFuIGVycm9yIGFuZCBwcmV2ZW50XG4gICAgLy8gaXQgZnJvbSBldmVyIGJlaW5nIGNhbGxlZCBhZ2FpbiBieSByZWFzc2lnbmluZyBpdCB0byBgbm9vcGBcbiAgICB4Lm9uZXJyb3IgPSBmdW5jdGlvbiBlcnJvcihldnQpIHtcbiAgICAgICAgLy8gWERvbWFpblJlcXVlc3QgcHJvdmlkZXMgbm8gZXZ0IHBhcmFtZXRlclxuICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXMsIGV2dCB8fCB0cnVlLCBudWxsKTtcbiAgICAgICAgY2FsbGJhY2sgPSBmdW5jdGlvbigpIHsgfTtcbiAgICB9O1xuXG4gICAgLy8gSUU5IG11c3QgaGF2ZSBvbnByb2dyZXNzIGJlIHNldCB0byBhIHVuaXF1ZSBmdW5jdGlvbi5cbiAgICB4Lm9ucHJvZ3Jlc3MgPSBmdW5jdGlvbigpIHsgfTtcblxuICAgIHgub250aW1lb3V0ID0gZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwodGhpcywgZXZ0LCBudWxsKTtcbiAgICAgICAgY2FsbGJhY2sgPSBmdW5jdGlvbigpIHsgfTtcbiAgICB9O1xuXG4gICAgeC5vbmFib3J0ID0gZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwodGhpcywgZXZ0LCBudWxsKTtcbiAgICAgICAgY2FsbGJhY2sgPSBmdW5jdGlvbigpIHsgfTtcbiAgICB9O1xuXG4gICAgLy8gR0VUIGlzIHRoZSBvbmx5IHN1cHBvcnRlZCBIVFRQIFZlcmIgYnkgWERvbWFpblJlcXVlc3QgYW5kIGlzIHRoZVxuICAgIC8vIG9ubHkgb25lIHN1cHBvcnRlZCBoZXJlLlxuICAgIHgub3BlbignR0VUJywgdXJsLCB0cnVlKTtcblxuICAgIC8vIFNlbmQgdGhlIHJlcXVlc3QuIFNlbmRpbmcgZGF0YSBpcyBub3Qgc3VwcG9ydGVkLlxuICAgIHguc2VuZChudWxsKTtcbiAgICBzZW50ID0gdHJ1ZTtcblxuICAgIHJldHVybiB4O1xufVxuXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIG1vZHVsZS5leHBvcnRzID0gY29yc2xpdGU7XG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwiYXV0aG9yXCI6IFwiTWFwYm94XCIsXG4gIFwibmFtZVwiOiBcIm1hcGJveC5qc1wiLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiTWFwYm94IHBsdWdpbiBmb3IgTGVhZmxldFwiLFxuICBcInZlcnNpb25cIjogXCIzLjMuMVwiLFxuICBcImhvbWVwYWdlXCI6IFwiaHR0cDovL21hcGJveC5jb20vXCIsXG4gIFwiZW5naW5lc1wiOiB7XG4gICAgXCJub2RlXCI6IFwiPj0xMFwiXG4gIH0sXG4gIFwicmVwb3NpdG9yeVwiOiB7XG4gICAgXCJ0eXBlXCI6IFwiZ2l0XCIsXG4gICAgXCJ1cmxcIjogXCJnaXQ6Ly9naXRodWIuY29tL21hcGJveC9tYXBib3guanMuZ2l0XCJcbiAgfSxcbiAgXCJtYWluXCI6IFwic3JjL2luZGV4LmpzXCIsXG4gIFwiZmlsZXNcIjogW1xuICAgIFwiZGlzdFwiLFxuICAgIFwic3JjXCIsXG4gICAgXCIqLm1kXCJcbiAgXSxcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQG1hcGJveC9jb3JzbGl0ZVwiOiBcIjAuMC43XCIsXG4gICAgXCJAbWFwYm94L3Nhbml0aXplLWNhamFcIjogXCJeMC4xLjRcIixcbiAgICBcImxlYWZsZXRcIjogXCIxLjQuMFwiLFxuICAgIFwibXVzdGFjaGVcIjogXCIzLjAuMVwiXG4gIH0sXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJ0ZXN0XCI6IFwiZXNsaW50IHNyYyAmJiBwaGFudG9tanMgbm9kZV9tb2R1bGVzL21vY2hhLXBoYW50b21qcy1jb3JlL21vY2hhLXBoYW50b21qcy1jb3JlLmpzIHRlc3QvaW5kZXguaHRtbCAmJiBtb2NoYSB0ZXN0L2RvY3MuanNcIixcbiAgICBcInByZXB1Ymxpc2hPbmx5XCI6IFwibnBtIHJ1biBidWlsZFwiLFxuICAgIFwiYnVpbGRcIjogXCJtYWtlXCJcbiAgfSxcbiAgXCJsaWNlbnNlXCI6IFwiQlNELTMtQ2xhdXNlXCIsXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcImJyb3dzZXJpZnlcIjogXCJeMTYuNS4wXCIsXG4gICAgXCJjbGVhbi1jc3MtY2xpXCI6IFwiXjQuMy4wXCIsXG4gICAgXCJlc2xpbnRcIjogXCJeNi44LjBcIixcbiAgICBcImV4cGVjdC5qc1wiOiBcIjAuMy4xXCIsXG4gICAgXCJoYXBwZW5cIjogXCIwLjMuMlwiLFxuICAgIFwibWFya2VkXCI6IFwiXjAuOC4wXCIsXG4gICAgXCJtaW5pZnlpZnlcIjogXCJeNy4zLjVcIixcbiAgICBcIm1pbmltaXN0XCI6IFwiMS4yLjBcIixcbiAgICBcIm1vY2hhXCI6IFwiXjcuMC4xXCIsXG4gICAgXCJtb2NoYS1waGFudG9tanMtY29yZVwiOiBcIjIuMS4yXCIsXG4gICAgXCJwaGFudG9tanMtcHJlYnVpbHRcIjogXCIyLjEuMTZcIixcbiAgICBcInNpbm9uXCI6IFwiNy4yLjRcIlxuICB9LFxuICBcIm9wdGlvbmFsRGVwZW5kZW5jaWVzXCI6IHt9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIEhUVFBfVVJMOiAnaHR0cDovL2FwaS5tYXBib3guY29tJyxcbiAgICBIVFRQU19VUkw6ICdodHRwczovL2FwaS5tYXBib3guY29tJyxcbiAgICBGT1JDRV9IVFRQUzogdHJ1ZSxcbiAgICBSRVFVSVJFX0FDQ0VTU19UT0tFTjogdHJ1ZSxcbiAgICBURU1QTEFURV9TVFlMRVM6IHtcbiAgICAgICAgJ21hcGJveC5kYXJrJzogJ21hcGJveC9kYXJrLXYxMCcsXG4gICAgICAgICdtYXBib3gubGlnaHQnOiAnbWFwYm94L2xpZ2h0LXYxMCcsXG4gICAgICAgICdtYXBib3gub3NtLWJyaWdodCc6ICdtYXBib3gvYnJpZ2h0LXY5JyxcbiAgICAgICAgJ21hcGJveC5vdXRkb29ycyc6ICdtYXBib3gvb3V0ZG9vcnMtdjExJywgXG4gICAgICAgICdtYXBib3guc2F0ZWxsaXRlJzogJ21hcGJveC9zYXRlbGxpdGUtdjknLFxuICAgICAgICAnbWFwYm94LnN0cmVldHMnOiAnbWFwYm94L3N0cmVldHMtdjExJywgXG4gICAgICAgICdtYXBib3guc3RyZWV0cy1iYXNpYyc6ICdtYXBib3gvYmFzaWMtdjknLFxuICAgICAgICAnbWFwYm94LnN0cmVldHMtc2F0ZWxsaXRlJzogJ21hcGJveC9zYXRlbGxpdGUtc3RyZWV0cy12MTEnXG4gICAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNvbmZpZyA9IHJlcXVpcmUoJy4vY29uZmlnJyksXG4gICAgdmVyc2lvbiA9IHJlcXVpcmUoJy4uL3BhY2thZ2UuanNvbicpLnZlcnNpb247XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ocGF0aCwgYWNjZXNzVG9rZW4pIHtcbiAgICBhY2Nlc3NUb2tlbiA9IGFjY2Vzc1Rva2VuIHx8IEwubWFwYm94LmFjY2Vzc1Rva2VuO1xuXG4gICAgaWYgKCFhY2Nlc3NUb2tlbiAmJiBjb25maWcuUkVRVUlSRV9BQ0NFU1NfVE9LRU4pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbiBBUEkgYWNjZXNzIHRva2VuIGlzIHJlcXVpcmVkIHRvIHVzZSBNYXBib3guanMuICcgK1xuICAgICAgICAgICAgJ1NlZSBodHRwczovL3d3dy5tYXBib3guY29tL21hcGJveC5qcy9hcGkvdicgKyB2ZXJzaW9uICsgJy9hcGktYWNjZXNzLXRva2Vucy8nKTtcbiAgICB9XG5cbiAgICB2YXIgdXJsID0gKGRvY3VtZW50LmxvY2F0aW9uLnByb3RvY29sID09PSAnaHR0cHM6JyB8fCBjb25maWcuRk9SQ0VfSFRUUFMpID8gY29uZmlnLkhUVFBTX1VSTCA6IGNvbmZpZy5IVFRQX1VSTDtcbiAgICB1cmwgPSB1cmwucmVwbGFjZSgvXFwvdjQkLywgJycpO1xuICAgIHVybCArPSBwYXRoO1xuXG4gICAgaWYgKGNvbmZpZy5SRVFVSVJFX0FDQ0VTU19UT0tFTikge1xuICAgICAgICBpZiAoYWNjZXNzVG9rZW5bMF0gPT09ICdzJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVc2UgYSBwdWJsaWMgYWNjZXNzIHRva2VuIChway4qKSB3aXRoIE1hcGJveC5qcywgbm90IGEgc2VjcmV0IGFjY2VzcyB0b2tlbiAoc2suKikuICcgK1xuICAgICAgICAgICAgICAgICdTZWUgaHR0cHM6Ly93d3cubWFwYm94LmNvbS9tYXBib3guanMvYXBpL3YnICsgdmVyc2lvbiArICcvYXBpLWFjY2Vzcy10b2tlbnMvJyk7XG4gICAgICAgIH1cblxuICAgICAgICB1cmwgKz0gdXJsLmluZGV4T2YoJz8nKSAhPT0gLTEgPyAnJmFjY2Vzc190b2tlbj0nIDogJz9hY2Nlc3NfdG9rZW49JztcbiAgICAgICAgdXJsICs9IGFjY2Vzc1Rva2VuO1xuICAgIH1cblxuICAgIHJldHVybiB1cmw7XG59O1xuXG5tb2R1bGUuZXhwb3J0cy50aWxlSlNPTiA9IGZ1bmN0aW9uKHVybE9yTWFwSUQsIGFjY2Vzc1Rva2VuKSB7XG5cbiAgICBpZiAodXJsT3JNYXBJRC5pbmRleE9mKCdtYXBib3g6Ly9zdHlsZXMnKSA9PT0gMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N0eWxlcyBjcmVhdGVkIHdpdGggTWFwYm94IFN0dWRpbyBuZWVkIHRvIGJlIHVzZWQgd2l0aCAnICtcbiAgICAgICAgICAgICdMLm1hcGJveC5zdHlsZUxheWVyLCBub3QgTC5tYXBib3gudGlsZUxheWVyJyk7XG4gICAgfVxuXG4gICAgaWYgKHVybE9yTWFwSUQuaW5kZXhPZignLycpICE9PSAtMSkgcmV0dXJuIHVybE9yTWFwSUQ7XG5cbiAgICB2YXIgdXJsO1xuICAgIGlmICh1cmxPck1hcElEIGluIGNvbmZpZy5URU1QTEFURV9TVFlMRVMpIHtcbiAgICAgICAgdXJsID0gbW9kdWxlLmV4cG9ydHMoJy9zdHlsZXMvdjEvJyArIGNvbmZpZy5URU1QTEFURV9TVFlMRVNbdXJsT3JNYXBJRF0sIGFjY2Vzc1Rva2VuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB1cmwgPSBtb2R1bGUuZXhwb3J0cygnL3Y0LycgKyB1cmxPck1hcElEICsgJy5qc29uJywgYWNjZXNzVG9rZW4pO1xuICAgIH1cblxuICAgIC8vIFRpbGVKU09OIHJlcXVlc3RzIG5lZWQgYSBzZWN1cmUgZmxhZyBhcHBlbmRlZCB0byB0aGVpciBVUkxzIHNvXG4gICAgLy8gdGhhdCB0aGUgc2VydmVyIGtub3dzIHRvIHNlbmQgU1NMLWlmaWVkIHJlc291cmNlIHJlZmVyZW5jZXMuXG4gICAgaWYgKHVybC5pbmRleE9mKCdodHRwcycpID09PSAwKVxuICAgICAgICB1cmwgKz0gJyZzZWN1cmUnO1xuXG4gICAgcmV0dXJuIHVybDtcbn07XG5cblxubW9kdWxlLmV4cG9ydHMuc3R5bGUgPSBmdW5jdGlvbihzdHlsZVVSTCwgYWNjZXNzVG9rZW4pIHtcbiAgICBpZiAoc3R5bGVVUkwuaW5kZXhPZignbWFwYm94Oi8vc3R5bGVzLycpID09PSAtMSkgdGhyb3cgbmV3IEVycm9yKCdJbmNvcnJlY3RseSBmb3JtYXR0ZWQgTWFwYm94IHN0eWxlIGF0ICcgKyBzdHlsZVVSTCk7XG5cbiAgICB2YXIgb3duZXJJRFN0eWxlID0gc3R5bGVVUkwuc3BsaXQoJ21hcGJveDovL3N0eWxlcy8nKVsxXTtcbiAgICB2YXIgdXJsID0gbW9kdWxlLmV4cG9ydHMoJy9zdHlsZXMvdjEvJyArIG93bmVySURTdHlsZSwgYWNjZXNzVG9rZW4pO1xuXG4gICAgcmV0dXJuIHVybDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIHV0ZkRlY29kZShjKSB7XG4gICAgaWYgKGMgPj0gOTMpIGMtLTtcbiAgICBpZiAoYyA+PSAzNSkgYy0tO1xuICAgIHJldHVybiBjIC0gMzI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZGF0YSkge1xuICAgIHJldHVybiBmdW5jdGlvbih4LCB5KSB7XG4gICAgICAgIGlmICghZGF0YSkgcmV0dXJuO1xuICAgICAgICB2YXIgaWR4ID0gdXRmRGVjb2RlKGRhdGEuZ3JpZFt5XS5jaGFyQ29kZUF0KHgpKSxcbiAgICAgICAgICAgIGtleSA9IGRhdGEua2V5c1tpZHhdO1xuICAgICAgICByZXR1cm4gZGF0YS5kYXRhW2tleV07XG4gICAgfTtcbn07XG4iLCJ3aW5kb3cuaW50ZXJuYWxzID0ge1xuICAgIHVybDogcmVxdWlyZSgnLi9mb3JtYXRfdXJsJyksXG4gICAgY29uZmlnOiByZXF1aXJlKCcuL2NvbmZpZycpLFxuICAgIHV0aWw6IHJlcXVpcmUoJy4vdXRpbCcpLFxuICAgIGdyaWQ6IHJlcXVpcmUoJy4vZ3JpZCcpLFxuICAgIHJlcXVlc3Q6IHJlcXVpcmUoJy4vcmVxdWVzdCcpXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY29yc2xpdGUgPSByZXF1aXJlKCdAbWFwYm94L2NvcnNsaXRlJyksXG4gICAgc3RyaWN0ID0gcmVxdWlyZSgnLi91dGlsJykuc3RyaWN0LFxuICAgIGNvbmZpZyA9IHJlcXVpcmUoJy4vY29uZmlnJyk7XG5cbnZhciBwcm90b2NvbCA9IC9eKGh0dHBzPzopPyg/PVxcL1xcLygufGFwaSlcXC50aWxlc1xcLm1hcGJveFxcLmNvbVxcLykvO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHVybCwgY2FsbGJhY2spIHtcbiAgICBzdHJpY3QodXJsLCAnc3RyaW5nJyk7XG4gICAgc3RyaWN0KGNhbGxiYWNrLCAnZnVuY3Rpb24nKTtcblxuICAgIHVybCA9IHVybC5yZXBsYWNlKHByb3RvY29sLCBmdW5jdGlvbihtYXRjaCwgcHJvdG9jb2wpIHtcbiAgICAgICAgaWYgKCEoJ3dpdGhDcmVkZW50aWFscycgaW4gbmV3IHdpbmRvdy5YTUxIdHRwUmVxdWVzdCgpKSkge1xuICAgICAgICAgICAgLy8gWERvbWFpblJlcXVlc3QgaW4gdXNlOyBkb2Vzbid0IHN1cHBvcnQgY3Jvc3MtcHJvdG9jb2wgcmVxdWVzdHNcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5sb2NhdGlvbi5wcm90b2NvbDtcbiAgICAgICAgfSBlbHNlIGlmIChwcm90b2NvbCA9PT0gJ2h0dHBzOicgfHwgZG9jdW1lbnQubG9jYXRpb24ucHJvdG9jb2wgPT09ICdodHRwczonIHx8IGNvbmZpZy5GT1JDRV9IVFRQUykge1xuICAgICAgICAgICAgcmV0dXJuICdodHRwczonO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICdodHRwOic7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIG9ubG9hZChlcnIsIHJlc3ApIHtcbiAgICAgICAgaWYgKCFlcnIgJiYgcmVzcCkge1xuICAgICAgICAgICAgcmVzcCA9IEpTT04ucGFyc2UocmVzcC5yZXNwb25zZVRleHQpO1xuICAgICAgICB9XG4gICAgICAgIGNhbGxiYWNrKGVyciwgcmVzcCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvcnNsaXRlKHVybCwgb25sb2FkKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGNvbnRhaW5zKGl0ZW0sIGxpc3QpIHtcbiAgICBpZiAoIWxpc3QgfHwgIWxpc3QubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChsaXN0W2ldID09PSBpdGVtKSByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG52YXIgd2Fybk9uY2VIaXN0b3J5ID0ge307XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGlkVXJsOiBmdW5jdGlvbihfLCB0KSB7XG4gICAgICAgIGlmIChfLmluZGV4T2YoJy8nKSA9PT0gLTEpIHQubG9hZElEKF8pO1xuICAgICAgICBlbHNlIHQubG9hZFVSTChfKTtcbiAgICB9LFxuICAgIGxvZzogZnVuY3Rpb24oXykge1xuICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG4gICAgICAgIGlmICh0eXBlb2YgY29uc29sZSA9PT0gJ29iamVjdCcgJiZcbiAgICAgICAgICAgIHR5cGVvZiBjb25zb2xlLmVycm9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKF8pO1xuICAgICAgICB9XG4gICAgfSxcbiAgICB3YXJuOiBmdW5jdGlvbihfKSB7XG4gICAgICAgIC8vIGF2b2lkIGNsdXR0ZXJpbmcgdGhlIGNvbnNvbGUgd2l0aCBkdXBsaWNhdGl2ZSB3YXJuaW5nc1xuICAgICAgICBpZiAod2Fybk9uY2VIaXN0b3J5W19dKSByZXR1cm47XG4gICAgICAgIGlmICh0eXBlb2YgY29uc29sZSA9PT0gJ29iamVjdCcgJiYgXG4gICAgICAgICAgICB0eXBlb2YgY29uc29sZS53YXJuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB3YXJuT25jZUhpc3RvcnlbX10gPSB0cnVlO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKF8pO1xuICAgICAgICB9XG4gICAgICAgIC8qIGVzbGludC1lbmFibGUgbm8tY29uc29sZSAqL1xuICAgIH0sXG4gICAgc3RyaWN0OiBmdW5jdGlvbihfLCB0eXBlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgXyAhPT0gdHlwZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGFyZ3VtZW50OiAnICsgdHlwZSArICcgZXhwZWN0ZWQnKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgc3RyaWN0X2luc3RhbmNlOiBmdW5jdGlvbihfLCBrbGFzcywgbmFtZSkge1xuICAgICAgICBpZiAoIShfIGluc3RhbmNlb2Yga2xhc3MpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXJndW1lbnQ6ICcgKyBuYW1lICsgJyBleHBlY3RlZCcpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBzdHJpY3Rfb25lb2Y6IGZ1bmN0aW9uKF8sIHZhbHVlcykge1xuICAgICAgICBpZiAoIWNvbnRhaW5zKF8sIHZhbHVlcykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudDogJyArIF8gKyAnIGdpdmVuLCB2YWxpZCB2YWx1ZXMgYXJlICcgK1xuICAgICAgICAgICAgICAgIHZhbHVlcy5qb2luKCcsICcpKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgc3RyaXBfdGFnczogZnVuY3Rpb24oXykge1xuICAgICAgICByZXR1cm4gXy5yZXBsYWNlKC88W148XSs+L2csICcnKTtcbiAgICB9LFxuICAgIGxib3VuZHM6IGZ1bmN0aW9uKF8pIHtcbiAgICAgICAgLy8gbGVhZmxldC1jb21wYXRpYmxlIGJvdW5kcywgc2luY2UgbGVhZmxldCBkb2VzIG5vdCBkbyBnZW9qc29uXG4gICAgICAgIHJldHVybiBuZXcgTC5MYXRMbmdCb3VuZHMoW1tfWzFdLCBfWzBdXSwgW19bM10sIF9bMl1dXSk7XG4gICAgfVxufTtcbiJdfQ==
