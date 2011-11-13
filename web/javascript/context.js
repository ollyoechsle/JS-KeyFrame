(function(KeyFrame, jQuery) {

    /**
     * Represents a context in which a key mapping performs particular actions
     * @param mapping The mapping of actions to functions
     * @param onActivate A callback that is executed when the context activates
     * @param onDeactivate A callback that is executed when the context is deactivated
     */
    function Context(mapping, onActivate, onDeactivate) {
        this.mapping = mapping;
        this.onActivate = onActivate;
        this.onDeactivate = onDeactivate;
    }

    Context.prototype.mapping = null;
    Context.prototype.onActivate = null;
    Context.prototype.onDeactivate = null;

    Context.prototype.trigger = function(action) {

        if (this.mapping[action]) {
            this.mapping[action]();
            return true;
        } else {
            console.log("Context: nothing matched " + action);
            return false;
        }

    };

    window.Context = Context;

})(window.KeyFrame, jQuery);