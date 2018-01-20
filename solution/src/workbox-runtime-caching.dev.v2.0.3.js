/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

this.workbox = this.workbox || {};
(function (exports) {
'use strict';

class ErrorFactory$1{constructor(a){this._errors=a;}createError(a,b){if(!(a in this._errors))throw new Error(`Unable to generate error '${a}'.`);let c=this._errors[a].replace(/\s+/g,' '),d=null;b&&(c+=` [${b.message}]`,d=b.stack);const e=new Error;return e.name=a,e.message=c,e.stack=d,e}}

const errors={"multiple-cache-will-update-plugins":'You cannot register more than one plugin that implements cacheWillUpdate.',"multiple-cached-response-will-be-used-plugins":'You cannot register more than one plugin that implements cachedResponseWillBeUsed.',"invalid-response-for-caching":'The fetched response could not be cached due to an invalid response code.',"no-response-received":'No response received; falling back to cache.',"bad-cache-id":`The 'cacheId' parameter must be a string with at least `+`one character.`};var ErrorFactory = new ErrorFactory$1(errors);

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var stackframe=createCommonjsModule(function(a){(function(b,c){'use strict';a.exports=c();})(commonjsGlobal,function(){'use strict';function a(a){return!isNaN(parseFloat(a))&&isFinite(a)}function b(a){return a[0].toUpperCase()+a.substring(1)}function c(a){return function(){return this[a]}}function d(a){if(a instanceof Object)for(var c=0;c<h.length;c++)a.hasOwnProperty(h[c])&&void 0!==a[h[c]]&&this['set'+b(h[c])](a[h[c]]);}var e=['isConstructor','isEval','isNative','isToplevel'],f=['columnNumber','lineNumber'],g=['fileName','functionName','source'],h=e.concat(f,g,['args']);d.prototype={getArgs:function(){return this.args},setArgs:function(a){if('[object Array]'!==Object.prototype.toString.call(a))throw new TypeError('Args must be an Array');this.args=a;},getEvalOrigin:function(){return this.evalOrigin},setEvalOrigin:function(a){if(a instanceof d)this.evalOrigin=a;else if(a instanceof Object)this.evalOrigin=new d(a);else throw new TypeError('Eval Origin must be an Object or StackFrame')},toString:function(){var b=this.getFunctionName()||'{anonymous}',c='('+(this.getArgs()||[]).join(',')+')',d=this.getFileName()?'@'+this.getFileName():'',e=a(this.getLineNumber())?':'+this.getLineNumber():'',f=a(this.getColumnNumber())?':'+this.getColumnNumber():'';return b+c+d+e+f}};for(var l=0;l<e.length;l++)d.prototype['get'+b(e[l])]=c(e[l]),d.prototype['set'+b(e[l])]=function(a){return function(b){this[a]=!!b;}}(e[l]);for(var i=0;i<f.length;i++)d.prototype['get'+b(f[i])]=c(f[i]),d.prototype['set'+b(f[i])]=function(b){return function(c){if(!a(c))throw new TypeError(b+' must be a Number');this[b]=+c;}}(f[i]);for(var j=0;j<g.length;j++)d.prototype['get'+b(g[j])]=c(g[j]),d.prototype['set'+b(g[j])]=function(a){return function(b){this[a]=b+'';}}(g[j]);return d});});

var errorStackParser=createCommonjsModule(function(a){(function(b,c){'use strict';a.exports=c(stackframe);})(commonjsGlobal,function(a){'use strict';var b=/(^|@)\S+\:\d+/,c=/^\s*at .*(\S+\:\d+|\(native\))/m,d=/^(eval@)?(\[native code\])?$/;return{parse:function(a){if('undefined'!=typeof a.stacktrace||'undefined'!=typeof a['opera#sourceloc'])return this.parseOpera(a);if(a.stack&&a.stack.match(c))return this.parseV8OrIE(a);if(a.stack)return this.parseFFOrSafari(a);throw new Error('Cannot parse given Error object')},extractLocation:function(a){if(-1===a.indexOf(':'))return[a];var b=/(.+?)(?:\:(\d+))?(?:\:(\d+))?$/,c=b.exec(a.replace(/[\(\)]/g,''));return[c[1],c[2]||void 0,c[3]||void 0]},parseV8OrIE:function(b){var d=b.stack.split('\n').filter(function(a){return!!a.match(c)},this);return d.map(function(b){-1<b.indexOf('(eval ')&&(b=b.replace(/eval code/g,'eval').replace(/(\(eval at [^\()]*)|(\)\,.*$)/g,''));var c=b.replace(/^\s+/,'').replace(/\(eval code/g,'(').split(/\s+/).slice(1),d=this.extractLocation(c.pop()),e=c.join(' ')||void 0,f=-1<['eval','<anonymous>'].indexOf(d[0])?void 0:d[0];return new a({functionName:e,fileName:f,lineNumber:d[1],columnNumber:d[2],source:b})},this)},parseFFOrSafari:function(b){var c=b.stack.split('\n').filter(function(a){return!a.match(d)},this);return c.map(function(b){if(-1<b.indexOf(' > eval')&&(b=b.replace(/ line (\d+)(?: > eval line \d+)* > eval\:\d+\:\d+/g,':$1')),-1===b.indexOf('@')&&-1===b.indexOf(':'))return new a({functionName:b});var c=b.split('@'),d=this.extractLocation(c.pop()),e=c.join('@')||void 0;return new a({functionName:e,fileName:d[0],lineNumber:d[1],columnNumber:d[2],source:b})},this)},parseOpera:function(a){return!a.stacktrace||-1<a.message.indexOf('\n')&&a.message.split('\n').length>a.stacktrace.split('\n').length?this.parseOpera9(a):a.stack?this.parseOpera11(a):this.parseOpera10(a)},parseOpera9:function(b){for(var c,d=/Line (\d+).*script (?:in )?(\S+)/i,e=b.message.split('\n'),f=[],g=2,h=e.length;g<h;g+=2)c=d.exec(e[g]),c&&f.push(new a({fileName:c[2],lineNumber:c[1],source:e[g]}));return f},parseOpera10:function(b){for(var c,d=/Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i,e=b.stacktrace.split('\n'),f=[],g=0,h=e.length;g<h;g+=2)c=d.exec(e[g]),c&&f.push(new a({functionName:c[3]||void 0,fileName:c[2],lineNumber:c[1],source:e[g]}));return f},parseOpera11:function(c){var d=c.stack.split('\n').filter(function(a){return!!a.match(b)&&!a.match(/^Error created at/)},this);return d.map(function(b){var c,d=b.split('@'),e=this.extractLocation(d.pop()),f=d.shift()||'',g=f.replace(/<anonymous function(: (\w+))?>/,'$2').replace(/\([^\)]*\)/g,'')||void 0;f.match(/\(([^\)]*)\)/)&&(c=f.replace(/^[^\(]+\(([^\)]*)\)$/,'$1'));var h=c===void 0||'[arguments not available]'===c?void 0:c.split(',');return new a({functionName:g,args:h,fileName:e[0],lineNumber:e[1],columnNumber:e[2],source:b})},this)}}});});

function atLeastOne(a){const b=Object.keys(a);b.some((b)=>a[b]!==void 0)||throwError('Please set at least one of the following parameters: '+b.map((a)=>`'${a}'`).join(', '));}function isInstance(a,b){const c=Object.keys(a).pop();a[c]instanceof b||throwError(`The '${c}' parameter must be an instance of
      '${b.name}'`);}function isType(a,b){const c=Object.keys(a).pop(),d=typeof a[c];d!==b&&throwError(`The '${c}' parameter has the wrong type. (Expected:
      ${b}, actual: ${d})`);}function isArrayOfType(a,b){const c=Object.keys(a).pop(),d=`The '${c}' parameter should be an array containing
    one or more '${b}' elements.`;Array.isArray(a[c])||throwError(d);for(let e of a[c])typeof e!==b&&throwError(d);}function throwError(a){a=a.replace(/\s+/g,' ');const b=new Error(a);b.name='assertion-failed';const c=errorStackParser.parse(b);throw 3<=c.length&&(b.message=`Invalid call to ${c[2].functionName}() — `+a),b}

class LogGroup{constructor(){this._logs=[],this._childGroups=[],this._isFallbackMode=!1;const a=/Firefox\/(\d*)\.\d*/.exec(navigator.userAgent);if(a)try{const b=parseInt(a[1],10);55>b&&(this._isFallbackMode=!0);}catch(a){this._isFallbackMode=!0;}/Edge\/\d*\.\d*/.exec(navigator.userAgent)&&(this._isFallbackMode=!0);}addPrimaryLog(a){this._primaryLog=a;}addLog(a){this._logs.push(a);}addChildGroup(a){0===a._logs.length||this._childGroups.push(a);}print(){return 0===this._logs.length&&0===this._childGroups.length?void this._printLogDetails(this._primaryLog):void(this._primaryLog&&(this._isFallbackMode?this._printLogDetails(this._primaryLog):console.groupCollapsed(...this._getLogContent(this._primaryLog))),this._logs.forEach((a)=>{this._printLogDetails(a);}),this._childGroups.forEach((a)=>{a.print();}),this._primaryLog&&!this._isFallbackMode&&console.groupEnd())}_printLogDetails(a){const b=a.logFunc?a.logFunc:console.log;b(...this._getLogContent(a));}_getLogContent(a){let b=a.message;this._isFallbackMode&&'string'==typeof b&&(b=b.replace(/%c/g,''));let c=[b];return!this._isFallbackMode&&a.colors&&(c=c.concat(a.colors)),a.args&&(c=c.concat(a.args)),c}}

function isDevBuild(){return`dev`==`dev`}

self.workbox=self.workbox||{},self.workbox.LOG_LEVEL=self.workbox.LOG_LEVEL||{none:-1,verbose:0,debug:1,warn:2,error:3};const LIGHT_GREY=`#bdc3c7`; const DARK_GREY=`#7f8c8d`; const LIGHT_GREEN=`#2ecc71`; const LIGHT_YELLOW=`#f1c40f`; const LIGHT_RED=`#e74c3c`; const LIGHT_BLUE=`#3498db`;class LogHelper{constructor(){this._defaultLogLevel=isDevBuild()?self.workbox.LOG_LEVEL.debug:self.workbox.LOG_LEVEL.warn;}log(a){this._printMessage(self.workbox.LOG_LEVEL.verbose,a);}debug(a){this._printMessage(self.workbox.LOG_LEVEL.debug,a);}warn(a){this._printMessage(self.workbox.LOG_LEVEL.warn,a);}error(a){this._printMessage(self.workbox.LOG_LEVEL.error,a);}_printMessage(a,b){if(this._shouldLogMessage(a,b)){const c=this._getAllLogGroups(a,b);c.print();}}_getAllLogGroups(a,b){const c=new LogGroup,d=this._getPrimaryMessageDetails(a,b);if(c.addPrimaryLog(d),b.error){const a={message:b.error,logFunc:console.error};c.addLog(a);}const e=new LogGroup;if(b.that&&b.that.constructor&&b.that.constructor.name){const a=b.that.constructor.name;e.addLog(this._getKeyValueDetails('class',a));}return b.data&&('object'!=typeof b.data||b.data instanceof Array?e.addLog(this._getKeyValueDetails('additionalData',b.data)):Object.keys(b.data).forEach((a)=>{e.addLog(this._getKeyValueDetails(a,b.data[a]));})),c.addChildGroup(e),c}_getKeyValueDetails(a,b){return{message:`%c${a}: `,colors:[`color: ${LIGHT_BLUE}`],args:b}}_getPrimaryMessageDetails(a,b){let c,d;a===self.workbox.LOG_LEVEL.verbose?(c='Info',d=LIGHT_GREY):a===self.workbox.LOG_LEVEL.debug?(c='Debug',d=LIGHT_GREEN):a===self.workbox.LOG_LEVEL.warn?(c='Warn',d=LIGHT_YELLOW):a===self.workbox.LOG_LEVEL.error?(c='Error',d=LIGHT_RED):void 0;let e=`%c🔧 %c[${c}]`;const f=[`color: ${LIGHT_GREY}`,`color: ${d}`];let g;return'string'==typeof b?g=b:b.message&&(g=b.message),g&&(g=g.replace(/\s+/g,' '),e+=`%c ${g}`,f.push(`color: ${DARK_GREY}; font-weight: normal`)),{message:e,colors:f}}_shouldLogMessage(a,b){if(!b)return!1;let c=this._defaultLogLevel;return self&&self.workbox&&'number'==typeof self.workbox.logLevel&&(c=self.workbox.logLevel),c===self.workbox.LOG_LEVEL.none||a<c?!1:!0}}var logHelper = new LogHelper;

class CacheableResponse{constructor({statuses:a,headers:b}={}){atLeastOne({statuses:a,headers:b}),a!==void 0&&isArrayOfType({statuses:a},'number'),b!==void 0&&isType({headers:b},'object'),this.statuses=a,this.headers=b;}isResponseCacheable({request:a,response:b}={}){isInstance({response:b},Response);let c=!0;if(this.statuses&&(c=this.statuses.includes(b.status)),this.headers&&c&&(c=Object.keys(this.headers).some((a)=>b.headers.get(a)===this.headers[a])),!c){const c={response:b};this.statuses&&(c['valid-status-codes']=JSON.stringify(this.statuses)),this.headers&&(c['valid-headers']=JSON.stringify(this.headers)),a&&(c.request=a),logHelper.debug({message:`The response does not meet the criteria for being added to the
          cache.`,data:c});}return c}}

class CacheableResponsePlugin extends CacheableResponse{cacheWillUpdate({request:a,response:b}={}){return this.isResponseCacheable({request:a,response:b})}}

const getDefaultCacheName=({cacheId:a}={})=>{let b=`workbox-runtime-caching`;return a&&(b=`${a}-${b}`),self&&self.registration&&(b+=`-${self.registration.scope}`),b};
const pluginCallbacks=['cacheDidUpdate','cachedResponseWillBeUsed','cacheWillUpdate','fetchDidFail','requestWillFetch'];

var cleanResponseCopy = (({response:a})=>{isInstance({response:a},Response);const b=a.clone(),c='body'in b?Promise.resolve(b.body):b.blob();return c.then((a)=>new Response(a,{headers:b.headers,status:b.status,statusText:b.statusText}))});

var asyncToGenerator = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

class RequestWrapper{constructor({cacheName:a,cacheId:b,plugins:c,fetchOptions:d,matchOptions:e}={}){if(b&&('string'!=typeof b||0===b.length))throw ErrorFactory.createError('bad-cache-id');a?(isType({cacheName:a},'string'),this.cacheName=a,b&&(this.cacheName=`${b}-${this.cacheName}`)):this.cacheName=getDefaultCacheName({cacheId:b}),d&&(isType({fetchOptions:d},'object'),this.fetchOptions=d),e&&(isType({matchOptions:e},'object'),this.matchOptions=e),this.plugins=new Map,c&&(isArrayOfType({plugins:c},'object'),c.forEach((a)=>{for(let b of pluginCallbacks)if('function'==typeof a[b]){if(!this.plugins.has(b))this.plugins.set(b,[]);else if('cacheWillUpdate'===b)throw ErrorFactory.createError('multiple-cache-will-update-plugins');else if('cachedResponseWillBeUsed'===b)throw ErrorFactory.createError('multiple-cached-response-will-be-used-plugins');this.plugins.get(b).push(a);}})),this.plugins.has('cacheWillUpdate')&&(this._userSpecifiedCachableResponsePlugin=this.plugins.get('cacheWillUpdate')[0]);}getDefaultCacheableResponsePlugin(){return this._defaultCacheableResponsePlugin||(this._defaultCacheableResponsePlugin=new CacheableResponsePlugin({statuses:[200]})),this._defaultCacheableResponsePlugin}getCache(){var a=this;return asyncToGenerator(function*(){return a._cache||(a._cache=yield caches.open(a.cacheName)),a._cache})()}match({request:a}){var b=this;return asyncToGenerator(function*(){atLeastOne({request:a});const c=yield b.getCache();let d=yield c.match(a,b.matchOptions);if(b.plugins.has('cachedResponseWillBeUsed')){const e=b.plugins.get('cachedResponseWillBeUsed')[0];d=yield e.cachedResponseWillBeUsed({request:a,cache:c,cachedResponse:d,matchOptions:b.matchOptions,cacheName:b.cacheName});}return d})()}fetch({request:a}){var b=this;return asyncToGenerator(function*(){'string'==typeof a?a=new Request(a):isInstance({request:a},Request);const c=b.plugins.has('fetchDidFail')?a.clone():null;if(b.plugins.has('requestWillFetch'))for(let c of b.plugins.get('requestWillFetch')){const b=yield c.requestWillFetch({request:a});isInstance({returnedRequest:b},Request),a=b;}try{return yield fetch(a,b.fetchOptions)}catch(a){if(b.plugins.has('fetchDidFail'))for(let a of b.plugins.get('fetchDidFail'))yield a.fetchDidFail({request:c.clone()});throw a}})()}fetchAndCache({request:a,waitOnCache:b,cacheKey:c,cacheResponsePlugin:d,cleanRedirects:e}){var f=this;return asyncToGenerator(function*(){atLeastOne({request:a});let g;const h=yield f.fetch({request:a}),i=f._userSpecifiedCachableResponsePlugin||d||f.getDefaultCacheableResponsePlugin(),j=yield i.cacheWillUpdate({request:a,response:h});if(j){const b=e&&h.redirected?yield cleanResponseCopy({response:h}):h.clone();g=f.getCache().then((()=>{var d=asyncToGenerator(function*(d){let e;const g=c||a;if('opaque'!==h.type&&f.plugins.has('cacheDidUpdate')&&(e=yield f.match({request:g})),yield d.put(g,b),f.plugins.has('cacheDidUpdate'))for(let a of f.plugins.get('cacheDidUpdate'))yield a.cacheDidUpdate({cacheName:f.cacheName,oldResponse:e,newResponse:b,url:'url'in g?g.url:g});});return function(){return d.apply(this,arguments)}})());}else if(!j&&b)throw ErrorFactory.createError('invalid-response-for-caching');return b&&g&&(yield g),h})()}}

class Handler{constructor({requestWrapper:a,waitOnCache:b}={}){this.requestWrapper=a?a:new RequestWrapper,this.waitOnCache=!!b;}handle({event:a,params:b}={}){throw Error('This abstract method must be implemented in a subclass.')}}

class CacheFirst extends Handler{handle({event:a}={}){var b=this;return asyncToGenerator(function*(){isInstance({event:a},FetchEvent);const c=yield b.requestWrapper.match({request:a.request});return c||(yield b.requestWrapper.fetchAndCache({request:a.request,waitOnCache:b.waitOnCache}))})()}}

class CacheOnly extends Handler{handle({event:a}={}){var b=this;return asyncToGenerator(function*(){return isInstance({event:a},FetchEvent),yield b.requestWrapper.match({request:a.request})})()}}

class NetworkFirst extends Handler{constructor(a={}){super(a),this._cacheablePlugin=new CacheableResponsePlugin({statuses:[0,200]});const{networkTimeoutSeconds:b}=a;b&&(isType({networkTimeoutSeconds:b},'number'),this.networkTimeoutSeconds=b);}handle({event:a}={}){var b=this;return asyncToGenerator(function*(){isInstance({event:a},FetchEvent);const c=[];let d;b.networkTimeoutSeconds&&c.push(new Promise(function(c){d=setTimeout(function(){c(b.requestWrapper.match({request:a.request}));},1e3*b.networkTimeoutSeconds);}));const e=b.requestWrapper.fetchAndCache({request:a.request,waitOnCache:b.waitOnCache,cacheResponsePlugin:b._cacheablePlugin}).then(function(a){return d&&clearTimeout(d),a?a:Promise.reject(ErrorFactory.createError('no-response-received'))}).catch(function(){return b.requestWrapper.match({request:a.request})});return c.push(e),Promise.race(c)})()}}

class NetworkOnly extends Handler{handle({event:a}={}){var b=this;return asyncToGenerator(function*(){return isInstance({event:a},FetchEvent),yield b.requestWrapper.fetch({request:a.request})})()}}

class StaleWhileRevalidate extends Handler{constructor(a={}){super(a),this._cacheablePlugin=new CacheableResponsePlugin({statuses:[0,200]});}handle({event:a}={}){var b=this;return asyncToGenerator(function*(){isInstance({event:a},FetchEvent);const c=b.requestWrapper.fetchAndCache({request:a.request,waitOnCache:b.waitOnCache,cacheResponsePlugin:b._cacheablePlugin}).catch(function(){return Response.error()}),d=yield b.requestWrapper.match({request:a.request});return d||(yield c)})()}}

exports.CacheFirst = CacheFirst;
exports.CacheOnly = CacheOnly;
exports.Handler = Handler;
exports.NetworkFirst = NetworkFirst;
exports.NetworkOnly = NetworkOnly;
exports.RequestWrapper = RequestWrapper;
exports.StaleWhileRevalidate = StaleWhileRevalidate;
exports.getDefaultCacheName = getDefaultCacheName;

}((this.workbox.runtimeCaching = this.workbox.runtimeCaching || {})));
//# sourceMappingURL=workbox-runtime-caching.dev.v2.0.3.js.map
