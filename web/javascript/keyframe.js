(function(jQuery) {

    function KeyFrame() {
    }

    KeyFrame.prototype._currentContext = null;

    KeyFrame.prototype.withEventsFrom = function(eventListener) {
        eventListener.on("event", this.trigger.bind(this));
        return this;
    };

    KeyFrame.prototype.push = function(context) {
        this._currentContext = context;
        context.onActivate && context.onActivate();
    };

    KeyFrame.prototype.pop = function() {

    };

    /**
     * Triggers an action
     * @param action The action string, eg "left" or "enter"
     * @return True, if an action took place
     */
    KeyFrame.prototype.trigger = function(action) {

        console.log("KeyFrame: triggering action : " + action);

        if (this._currentContext) {
            console.log("Triggering on context");
            return this._currentContext.trigger(action);
        }

        return false;

    };

    window.KeyFrame = KeyFrame;

})(jQuery);