(function(KeyFrame, jQuery) {

    /**
     * Represents a context in which a key mapping performs particular actions
     * @param mapping The mapping of actions to functions
     */
    function Context(mapping) {
        this.mapping = mapping;
    }

    Context.prototype.mapping = null;

    Context.prototype.trigger = function(action) {

        if (this.mapping[action]) {
            return this.mapping[action];
        } else {
            console.log("Context: nothing matched " + action);
            return false;
        }

    };

    /**
     * Called when the context becomes active. You may wish to provide some visual cue to the user
     */
    Context.prototype.activate = function() {
        
    };

    /**
     * Called when this context is no longer active. You may wish to undo whatever you did in activate.
     */
    Context.prototype.deactivate = function() {

    };

    window.Context = Context;

})(window.KeyFrame, jQuery);