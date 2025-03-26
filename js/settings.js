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

        $("#button_toggle_screen_sleep").on(
            "click",
            function() {
                if (!wakeLockEnabled) {
                    noSleep.enable(); // keep the screen on!
                    wakeLockEnabled = true;
                } else {
                    noSleep.disable(); // let the screen turn off.
                    wakeLockEnabled = false;
                }
            }
        )
    }
)

$(document).ready(

    function() {

        $("#button_toggle_innate_powers_row").on(
            "click",
            function() {
                if($("#button_toggle_innate_powers_row").is(":checked")) {

                    $("#row_innate_powers").css(
                        {
                            "position" : "",
                            "left" : ""
                        }
                        
                    )

                    $("#col_innate_powers").css(
                        {
                            "position" : "",
                            "left" : ""
                        }
                        
                    )

                    $("#row_innate_power_cols").css(
                        {
                            "position" : "",
                            "left" : ""
                        }
                        
                    )

                    // custom_show(
                    //     "#row_innate_powers"
                    // );
                    // custom_show(
                    //     "#row_innate_power_cols"
                    // );
                }
                else {

                    $("#row_innate_powers").css(
                        {
                            "position" : "absolute",
                            "left" : "-99999px"
                        }
                        
                    )

                    $("#col_innate_powers").css(
                        {
                            "position" : "absolute",
                            "left" : "-99999px"
                        }
                        
                    )

                    $("#row_innate_power_cols").css(
                        {
                            "position" : "absolute",
                            "left" : "-99999px"
                        }
                        
                    )

                    // custom_hide(
                    //     "#row_innate_powers"
                    // );
                    // custom_hide(
                    //     "#row_innate_power_cols"
                    // );
                }
            }
        )
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

    $("#col_innate_powers").css(
        {
            "background-image" : ``,
        }
    );
}

function reset_adversary_selection() {

    $(`#button_remove_leading_adversary`).click();
}

function reset_innate_power_row() {

    $("#row_innate_powers").attr(
        "style",
        `background-image : none;`
    );

    $("#row_innate_power_cols").empty();
    $("#div_modals_innate_powers").empty();

    var placeholder_row_innate_power_cols = $("<p>").attr(
        {
            style : "margin: 5px 5px 0px 5px;"
        }
    );

    var fear_object = $("<object>").attr(
        {
            data : "static/icons/fear.svg",
            height : "15px"
        }
    );

    placeholder_row_innate_power_cols.append(
        fear_object.clone()
    );

    placeholder_row_innate_power_cols.append(
        " Select a Spirit to display their innate powers "
    );

    placeholder_row_innate_power_cols.append(
        fear_object.clone()
    );

    placeholder_row_innate_power_cols.appendTo(
        $("#row_innate_power_cols")
    );
}

$(document).ready(
    function() {

        $("#button_reset_selections").on(
            "click",
            function() {

                reset_innate_power_row()
                reset_spirit_selction();
                reset_adversary_selection();
            }
        );
    }
)