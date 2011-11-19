(function() {

    function init() {

        log("Initialising JS-KeyFrame");

        var
                keyboard = new Keyboard(),
                keyframe = new KeyFrame().withEventsFrom(keyboard);

        window.KF = keyframe;
        
    }

    jQuery(document).ready(init);

})();