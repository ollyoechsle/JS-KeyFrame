(function(KeyFrame, jQuery) {

    /**
     * Represents a context for navigating up and down a set of elements
     */
    function MenuContext(container, elementSelector) {
        this.superclass.constructor.call(this, this._generateMapping());
        this._jContainer = jQuery(container);
        this._elementSelector = elementSelector;
    }

    Object.extend(MenuContext, Context);

    /**
     * A jQuery object containing a bunch of elements.
     */
    MenuContext.prototype._jContainer = null;

    /**
     * A selector to locate individual elements within the container
     */
    MenuContext.prototype._elementSelector = null;

    /**
     * Internal representation of the current selected element index
     */
    MenuContext.prototype._index = null;

    /**
     * Produces a mapping to go up and down through the list of elements
     */
    MenuContext.prototype._generateMapping = function() {
        return {
            "up": this.goUp.bind(this),
            "down": this.goDown.bind(this),
            "enter": "menuSelected"
        }
    };

    /**
     * Gets the current state of the menu context - in this case which element is selected
     */
    MenuContext.prototype.getState = function() {
        return this._jContainer.find(".selected");
    };

    /**
     * Gets the elements belonging to the container
     */
    MenuContext.prototype._getElements = function() {
        return this._jContainer.find(this._elementSelector);
    };

    /**
     * Goes up. If nothing is currently selected, then it starts from the bottom.
     */
    MenuContext.prototype.goUp = function() {
        var elements = this._getElements();
        if (this._index == null) {
            this._index = elements.length - 1;
        } else {
            this._index--;
            if (this._index < 0) {
                this._index = elements.length - 1;
            }
        }
        elements.removeClass("selected").eq(this._index).addClass("selected");
    };

    /**
     * Goes down. If nothing is currently selected then it starts from the top.
     */
    MenuContext.prototype.goDown = function() {
        var elements = this._getElements();
        if (this._index == null) {
            this._index = 0;
        } else {
            this._index++;
            if (this._index > elements.length - 1) {
                this._index = 0;
            }
        }
        elements.removeClass("selected").eq(this._index).addClass("selected");
    };

    MenuContext.prototype.activate = function() {
        this._jContainer.addClass("activeContext");
    };

    MenuContext.prototype.deactivate = function() {
        this._jContainer.removeClass("activeContext");
    };

    window.MenuContext = MenuContext;

})(window.KeyFrame, jQuery);