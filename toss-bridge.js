var TossFramework = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // packages/toss-sdk-adapter/src/browser-entry.js
  var browser_entry_exports = {};
  __export(browser_entry_exports, {
    closeView: () => closeView,
    getOperationalEnvironment: () => getOperationalEnvironment,
    openGameCenterLeaderboard: () => openGameCenterLeaderboard,
    submitGameCenterLeaderBoardScore: () => submitGameCenterLeaderBoardScore
  });

  // packages/toss-sdk-adapter/src/bridge.js
  var _idCounter = 0;
  function nextId() {
    return "gbt_" + ++_idCounter + "_" + Date.now();
  }
  function getNativeWebView() {
    return typeof window !== "undefined" && window.ReactNativeWebView ? window.ReactNativeWebView : null;
  }
  function getEmitter() {
    return typeof window !== "undefined" && window.__GRANITE_NATIVE_EMITTER ? window.__GRANITE_NATIVE_EMITTER : null;
  }
  function getConstantMap() {
    return typeof window !== "undefined" && window.__CONSTANT_HANDLER_MAP ? window.__CONSTANT_HANDLER_MAP : {};
  }
  function createAsyncBridge(name) {
    return function(args) {
      return new Promise(function(resolve, reject) {
        const rn = getNativeWebView();
        if (!rn) {
          resolve(void 0);
          return;
        }
        const id = nextId();
        const emitter = getEmitter();
        let cleanup = function() {
        };
        if (emitter) {
          cleanup = emitter.on(name + ":" + id, function(result) {
            cleanup();
            if (result && result.error) {
              reject(result.error);
            } else {
              resolve(result && result.data !== void 0 ? result.data : result);
            }
          });
        }
        try {
          rn.postMessage(JSON.stringify({
            type: name,
            id,
            payload: args || {}
          }));
        } catch (err) {
          cleanup();
          reject(err);
        }
      });
    };
  }
  function createConstantBridge(name) {
    return function() {
      const map = getConstantMap();
      if (typeof map[name] === "function") {
        return map[name]();
      }
      return void 0;
    };
  }
  var getOperationalEnvironment = createConstantBridge("getOperationalEnvironment");
  var submitGameCenterLeaderBoardScore = createAsyncBridge("submitGameCenterLeaderBoardScore");
  var openGameCenterLeaderboard = createAsyncBridge("openGameCenterLeaderboard");
  var closeView = createAsyncBridge("closeView");
  return __toCommonJS(browser_entry_exports);
})();
