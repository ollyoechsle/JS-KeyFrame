(function(KeyFrame, jQuery) {

    /**
     * Represents a context for navigating up and down a set of elements
     */
    function FocusContext(container) {
        this.superclass.constructor.call(this, {});
        this._jContainer = jQuery(container);
    }

    Object.extend(FocusContext, Context);

    /**
     * A jQuery object
     */
    FocusContext.prototype._jContainer = null;

    FocusContext.prototype.activate = function() {
        this._jContainer.focus().select();
    };

    FocusContext.prototype.deactivate = function() {
        this._jContainer.blur();
    };

    window.FocusContext = FocusContext;

})(window.KeyFrame, jQuery);