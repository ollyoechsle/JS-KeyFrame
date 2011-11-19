(function() {

    function init() {

        log("Initialising KEYFRAME");

        var
                keyboard = new Keyboard(),
                keyframe = new KeyFrame().withEventsFrom(keyboard);

        window.KF = keyframe;
        
    }

    jQuery(document).ready(init);

})();