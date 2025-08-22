//Check local storage
const hide_cookie_modal = localStorage.getItem("hide_cookie_modal") ? localStorage.getItem("hide_cookie_modal") : null;

if (hide_cookie_modal) {
    document.documentElement.setAttribute(
        "data-wake_lock",
        $.parseJSON(current_wake_lock.toLowerCase())
    );
}

$(document).ready(
    function() {

        if (~hide_cookie_modal) {
            $("#modal_cookies").modal("show");
        }
    }
)

$(document).ready(
    function() {

        $("#button_close_modal_cookies").on(
            "click",
            function() {
                $("#modal_cookies").modal("hide");
            }
        );
    }
)

$(document).ready(
    function() {

        $("#button_cookies_accept").on(
            "click",
            function() {
                localStorage.setItem(
                    "hide_cookie_modal",
                    true
                );

                localStorage.setItem(
                    "accepts_cookies",
                    true
                );

                $("#modal_cookies").modal("hide");
            }
        );
    }
)

$(document).ready(
    function() {

        $("#button_cookies_deny_once").on(
            "click",
            function() {
                $("#modal_cookies").modal("hide");
            }
        );
    }
)

$(document).ready(
    function() {

        $("#button_cookies_deny_forever").on(
            "click",
            function() {

                localStorage.setItem(
                    "hide_cookie_modal",
                    true
                );
                
                $("#modal_cookies").modal("hide");
            }
        );
    }
)

const accepts_cookies = localStorage.getItem("accepts_cookies") ? localStorage.getItem("accepts_cookies") : null;