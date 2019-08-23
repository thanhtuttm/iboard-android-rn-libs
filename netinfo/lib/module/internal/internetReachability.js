var REACHABILITY_URL='https://clients3.google.com/generate_204';var LONG_TIMEOUT=60*1000;var SHORT_TIMEOUT=5*1000;var _subscriptions=new Set();var _isInternetReachable=null;var _currentInternetReachabilityCheckHandler=null;var _currentTimeoutHandle=null;function setIsInternetReachable(isInternetReachable){if(_isInternetReachable===isInternetReachable){return;}_isInternetReachable=isInternetReachable;_subscriptions.forEach(function(listener){listener(_isInternetReachable);});}function checkInternetReachability(){var hasCanceled=false;var promise=fetch(REACHABILITY_URL).then(function(response){if(!hasCanceled){setIsInternetReachable(response.status===204);var nextTimeoutInterval=_isInternetReachable?LONG_TIMEOUT:SHORT_TIMEOUT;_currentTimeoutHandle=setTimeout(checkInternetReachability,nextTimeoutInterval);}}).catch(function(){setIsInternetReachable(false);_currentTimeoutHandle=setTimeout(checkInternetReachability,SHORT_TIMEOUT);});return{promise:promise,cancel:function cancel(){hasCanceled=true;}};}function setExpectsConnection(expectsConnection){if(_currentInternetReachabilityCheckHandler!==null){_currentInternetReachabilityCheckHandler.cancel();_currentInternetReachabilityCheckHandler=null;}if(_currentTimeoutHandle!==null){clearTimeout(_currentTimeoutHandle);_currentTimeoutHandle=null;}if(expectsConnection){if(!_isInternetReachable){setIsInternetReachable(null);}_currentInternetReachabilityCheckHandler=checkInternetReachability();}else{setIsInternetReachable(false);}}export function clear(){if(_currentInternetReachabilityCheckHandler!==null){_currentInternetReachabilityCheckHandler.cancel();_currentInternetReachabilityCheckHandler=null;}if(_currentTimeoutHandle!==null){clearTimeout(_currentTimeoutHandle);_currentTimeoutHandle=null;}_subscriptions.clear();}export function update(state){if(typeof state.isInternetReachable==='boolean'){setIsInternetReachable(state.isInternetReachable);}else{setExpectsConnection(state.isConnected);}}export function currentState(){return _isInternetReachable;}export function addSubscription(listener){_subscriptions.add(listener);return function(){_subscriptions.delete(listener);};}export default{update:update,currentState:currentState,clear:clear,addSubscription:addSubscription};
//# sourceMappingURL=internetReachability.js.map