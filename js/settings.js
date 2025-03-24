$(document).ready(
    function() {

        $("#button_settings").on(
            "click",
            function() {
                $("#modal_settings").modal("show");
            }
        );
    }
)

$(document).ready(
    function() {

        $("#button_close_modal_settings").on(
            "click",
            function() {
                $("#modal_settings").modal("hide");
            }
        );
    }
)

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

function reset_spirit_selction() {

    $("#button_select_spirit").empty();

    $("#button_select_spirit").attr(
        {
            class : "p-0 btn btn-xs btn-info",
            id : "button_select_spirit"
        }
    ).html(
        "&#x2795;"
    )

    $("#button_select_spirit").css(
        {
            "background-color": "",
            "border" : ""
        }
    );
}

function reset_adversary_selction() {

    $("#button_select_adversary").empty();

    $("#button_select_adversary").attr(
        {
            class : "p-0 btn btn-xs btn-info",
            id : "button_select_adversary"
        }
    ).html(
        "&#x2795;"
    )

    $("#button_select_adversary").css(
        {
            "background-color": "",
            "border" : ""
        }
    );
}
$(document).ready(
    function() {

        $("#button_reset_selections").on(
            "click",
            function() {
                
                reset_spirit_selction();
                reset_adversary_selction();
            }
        );
    }
)