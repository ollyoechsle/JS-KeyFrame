function log(){console&&console.log(arguments)}(function(){function a(){this._subscribers=[]}a.prototype._subscribers=null;a.prototype.on=function(d,c){var b=typeof c;if(b==="undefined"){throw new Error("CustomEvent: Subscriber cannot be undefined")}if(b!=="function"){throw new Error("CustomEvent: Subscriber must be a function")}this._subscribers.push({fn:c,event:d})};a.prototype.fire=function(f){for(var e=0,b=this._subscribers.length;e<b;e++){var g=this._subscribers[e];if(g.event===f){var d=[];for(var c=1;c<arguments.length;c++){d.push(arguments[c])}g.fn.apply(null,d)}}};a.prototype.un=function(f,d){var c,b=this._subscribers.length,e,g=[];for(c=0;c<b;c++){e=this._subscribers[c];if(e.fn===f||e.context===d){}else{g.push(e)}}this._subscribers=g};a.prototype.unsubscribeAll=function(){this._subscribers=[]};window.CustomEvent=a})();if(!Function.prototype.bind){Function.prototype.bind=function(b){if(typeof this!=="function"){throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable")}var a=Array.prototype.slice,f=a.call(arguments,1),e=this,c=function(){},d=function(){return e.apply(this instanceof c?this:b||window,f.concat(a.call(arguments)))};c.prototype=this.prototype;d.prototype=new c();return d}}Object.extend=function(c,a){var d=a.prototype;for(var b in d){if(d.hasOwnProperty(b)){c.prototype[b]=d[b]}}c.prototype.superclass=d};(function(d){function b(){this.superclass.constructor.apply(this);this._init()}Object.extend(b,CustomEvent);b.prototype.keyFrame=null;var c=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];var a={"38":"up","40":"down","37":"left","39":"right","13":"enter","9":"tab","27":"esc","190":".","191":"/"};b.prototype._init=function(){log("Initialing the keyboard",this._subscribers);d(document).keydown(this._handleKeyDown.bind(this))};b.prototype._handleKeyDown=function(e){var h=e.keyCode,f,g;if(h>=65&&h<=90){f=c[h-65]}else{if(h>=48&&h<=57){f=h-48}else{f=a[h]}}if(f!==undefined){g=this.fire("event",f,e)}};window.Keyboard=b})(jQuery);(function(a,c){function b(d){this.mapping=d}b.prototype.mapping=null;b.prototype.trigger=function(d){if(this.mapping[d]){return this.mapping[d]}else{log("Context: nothing matched "+d);return false}};b.prototype.getState=function(){return{}};b.prototype.activate=function(){};b.prototype.deactivate=function(){};window.Context=b})(window.KeyFrame,jQuery);(function(a,c){function b(d){this.superclass.constructor.call(this,{});this._jContainer=c(d)}Object.extend(b,Context);b.prototype._jContainer=null;b.prototype.activate=function(){this._jContainer.focus().select()};b.prototype.deactivate=function(){this._jContainer.blur()};window.FocusContext=b})(window.KeyFrame,jQuery);(function(b,c){function a(d,e){this.superclass.constructor.call(this,this._generateMapping());this._jContainer=c(d);this._elementSelector=e}Object.extend(a,Context);a.prototype._jContainer=null;a.prototype._elementSelector=null;a.prototype._index=null;a.prototype._generateMapping=function(){return{up:this.goUp.bind(this),down:this.goDown.bind(this),enter:"menuSelected"}};a.prototype.getState=function(){return this._jContainer.find(".selected")};a.prototype._getElements=function(){return this._jContainer.find(this._elementSelector)};a.prototype.goUp=function(){var d=this._getElements();if(this._index==null){this._index=d.length-1}else{this._index--;if(this._index<0){this._index=d.length-1}}d.removeClass("selected").eq(this._index).addClass("selected")};a.prototype.goDown=function(){var d=this._getElements();if(this._index==null){this._index=0}else{this._index++;if(this._index>d.length-1){this._index=0}}d.removeClass("selected").eq(this._index).addClass("selected")};a.prototype.activate=function(){this._jContainer.addClass("activeContext")};a.prototype.deactivate=function(){this._jContainer.removeClass("activeContext")};window.MenuContext=a})(window.KeyFrame,jQuery);(function(){function a(){log("Initialising KEYFRAME");var b=new Keyboard(),c=new KeyFrame().withEventsFrom(b);window.KF=c}jQuery(document).ready(a)})();(function(b){function a(){this.superclass.constructor.call(this);this._contextStack=[]}Object.extend(a,CustomEvent);a.prototype._contextStack=null;a.prototype.withEventsFrom=function(c){c.on("event",this.trigger.bind(this));return this};a.prototype.push=function(c){this._deactivateCurrentContext();this._contextStack.push(c);this._activateCurrentContext()};a.prototype.pop=function(){this._deactivateCurrentContext();this._contextStack.pop();this._activateCurrentContext()};a.prototype._deactivateCurrentContext=function(){var c=this._getCurrentContext();c&&c.deactivate()};a.prototype._activateCurrentContext=function(){var c=this._getCurrentContext();c&&c.activate()};a.prototype._getCurrentContext=function(){if(this._contextStack.length>0){return this._contextStack[this._contextStack.length-1]}else{return null}};a.prototype.trigger=function(f,e){log("KeyFrame: triggering action : "+f);if(f=="esc"){this.pop()}var d=this._getCurrentContext();if(d){log("Triggering on context "+d);var c=d.trigger(f);switch(typeof c){case"object":this.push(c);e.preventDefault();return true;case"function":c();e.preventDefault();return true;case"string":log("Firing: "+c,d.getState());this.fire(c,d.getState());return true}}return false};window.KeyFrame=a})(jQuery);