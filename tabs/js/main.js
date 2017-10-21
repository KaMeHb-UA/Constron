var throwEvent, on;
(()=>{
    var eventsStorage = {},
        isFunction = function(obj) {
            return !!(obj && obj.constructor && obj.call && obj.apply);
        };
    throwEvent = (event)=>{
        if(eventsStorage[event]) eventsStorage[event].forEach((f)=>{
            f();
        });
    };
    on = (event, callback)=>{
        if(isFunction(callback)){
            if(eventsStorage[event]) eventsStorage[event].push(callback); else eventsStorage[event] = [callback];
        } else {
            console.error('Uncaught ' + (new TypeError('Seems like the callback is not an instance of function')).stack);
        }
    };
})();