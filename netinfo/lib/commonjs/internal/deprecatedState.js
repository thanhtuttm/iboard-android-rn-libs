var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.setup=setup;exports.tearDown=tearDown;exports.latest=latest;exports.add=add;exports.remove=remove;exports.default=void 0;var _state=_interopRequireDefault(require("./state"));var _deprecatedUtils=_interopRequireDefault(require("./deprecatedUtils"));var _isSetup=false;var _subscriptions=new Set();var _latestState=null;function _handler(state){var convertedState=_deprecatedUtils.default.convertState(state);_latestState=convertedState;_subscriptions.forEach(function(handler){return handler(convertedState);});}function setup(){if(_isSetup){return;}_state.default.add(_handler);}function tearDown(){if(!_isSetup){return;}_state.default.remove(_handler);_latestState=null;_subscriptions.clear();}function latest(){if(_latestState){return Promise.resolve(_latestState);}else{return _state.default.latest().then(function(state){_latestState=_deprecatedUtils.default.convertState(state);return _latestState;});}}function add(handler){_subscriptions.add(handler);if(_latestState){handler(_latestState);}else{latest().then(handler);}}function remove(handler){_subscriptions.delete(handler);}var _default={setup:setup,tearDown:tearDown,latest:latest,add:add,remove:remove};exports.default=_default;
//# sourceMappingURL=deprecatedState.js.map