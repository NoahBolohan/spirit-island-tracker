
// https://github.com/richtr/NoSleep.js

var noSleep = new NoSleep();
var wakeLockEnabled = false;

$(document).ready(

    function() {

        var toggleEl = document.querySelector("#button_toggle_screen_sleep");

        toggleEl.addEventListener('click', function() {
            if (!wakeLockEnabled) {
              noSleep.enable(); // keep the screen on!
              wakeLockEnabled = true;
            } else {
              noSleep.disable(); // let the screen turn off.
              wakeLockEnabled = false;
            }
          }, false);
    }
)