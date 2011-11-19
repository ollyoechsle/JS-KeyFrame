(function(jQuery) {

    function KeyFrame() {
        this.superclass.constructor.call(this);
        this._contextStack = [];
    }

    Object.extend(KeyFrame, CustomEvent);

    KeyFrame.prototype._contextStack = null;

    KeyFrame.prototype.withEventsFrom = function(eventListener) {
        eventListener.on("event", this.trigger.bind(this));
        return this;
    };

    KeyFrame.prototype.push = function(context) {
        this._deactivateCurrentContext();
        this._contextStack.push(context);
        this._activateCurrentContext();
    };

    KeyFrame.prototype.pop = function() {
        this._deactivateCurrentContext();
        this._contextStack.pop();
        this._activateCurrentContext();
    };

    KeyFrame.prototype._deactivateCurrentContext = function() {
        var context = this._getCurrentContext();
        context && context.deactivate();
    };

    KeyFrame.prototype._activateCurrentContext = function() {
        var context = this._getCurrentContext();
        context && context.activate();
    };

    KeyFrame.prototype._getCurrentContext = function() {
        if (this._contextStack.length > 0) {
            return this._contextStack[this._contextStack.length - 1];
        } else {
            return null;
        }
    };

    /**
     * Triggers an action
     * @param action The action string, eg "left" or "enter"
     * @return True, if an action took place
     */
    KeyFrame.prototype.trigger = function(action, event) {

        log("KeyFrame: triggering action : " + action);

        if (action == "esc") {
            this.pop();
        }

        var context = this._getCurrentContext();

        if (context) {
            log("Triggering on context " + context);
            var functionOrContext = context.trigger(action);
            switch (typeof functionOrContext) {
                case "object":
                    this.push(functionOrContext);
                    event.preventDefault();
                    return true;
                case "function":
                    functionOrContext();
                    event.preventDefault();
                    return true;
                case "string":
                    log("Firing: " + functionOrContext, context.getState());
                    this.fire(functionOrContext, context.getState());
                    return true;
            }
        }

        return false;

    };

    window.KeyFrame = KeyFrame;

})(jQuery);