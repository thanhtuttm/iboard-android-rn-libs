import _objectSpread from"@babel/runtime/helpers/objectSpread";import InternetReachability from'./internetReachability';import NativeInterface from'./nativeInterface';export function convertState(input){if(typeof input.isInternetReachable==='boolean'){return input;}else{return _objectSpread({},input,{isInternetReachable:InternetReachability.currentState()});}}export function currentState(){return NativeInterface.getCurrentState();}export default{convertState:convertState,currentState:currentState};
//# sourceMappingURL=utils.js.map