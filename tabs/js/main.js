var throwEvent, on, setCSSVar, createElement;
(()=>{
    var defaults = {
        name: 'div',
        html: '',
        args: {},
    }, i, el;
    createElement = (options)=>{
        for(i in defaults){
            if(!options[i]) options[i] = defaults[i];
        }
        el = document.createElement(options.name);
        el.innerHTML = options.html;
        for(i in options.args){
            el.setAttribute(i, options.args[i]);
        }
        return el;
    }
})();
function appendToBody(element, callback){
    if(!document.body) setTimeout(()=>{appendToBody(element, callback)},10); else callback(document.body.appendChild(element));
}
(()=>{
    var eventsStorage = {},
        isFunction = function(obj) {
            return !!(obj && obj.constructor && obj.call && obj.apply);
        };
    throwEvent = (event)=>{
        if(eventsStorage[event]) eventsStorage[event].forEach((f)=>{
            try{
                f();
            } catch(e){
                console.error('Uncaught ' + e.stack);
            }
        });
        eventsStorage[event] = [];
    };
    on = (event, callback)=>{
        if(isFunction(callback)){
            if(eventsStorage[event]) eventsStorage[event].push(callback); else eventsStorage[event] = [callback];
        } else {
            console.error('Uncaught ' + (new TypeError('Seems like the callback is not an instance of function')).stack);
        }
    };
})();
(()=>{
    var vars = {};
    function setVar(name, val){
        if (!(/^\-\-/.test(name))) name = `--${name}`;
        vars[name] = val;
    }
    appendToBody(createElement({
        name: 'style'
    }), (stylesheet)=>{
        setCSSVar = (name, value)=>{
            setVar(name, value);
            var html = '';
            for(var i in vars){
                html += i + ':' + vars[i] + ';';
            }
            stylesheet.innerHTML = ':root{' + html + '}'
        }
    });
    setCSSVar = (name, value)=>{
        setVar(name, value);
    }
})();