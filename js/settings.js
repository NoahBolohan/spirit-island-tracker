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

$(document).ready(
    function() {

        $("#button_setup").on(
            "click",
            function() {
                $("#modal_setup").modal("show");
            }
        );
    }
)

$(document).ready(
    function() {

        $("#button_close_modal_setup").on(
            "click",
            function() {
                $("#modal_setup").modal("hide");
            }
        );
    }
)

$(document).ready(
    function() {

        $("#button_invader_rules").on(
            "click",
            function() {
                $("#modal_invader_rules").modal("show");
            }
        );
    }
)

$(document).ready(
    function() {

        $("#button_close_modal_invader_rules").on(
            "click",
            function() {
                $("#modal_invader_rules").modal("hide");
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

                screen_sleep_content();
            }
        )
    }
)

function screen_sleep_content() {
    if (!wakeLockEnabled) {
        noSleep.enable(); // keep the screen on!
        wakeLockEnabled = true;

        const accepts_cookies = localStorage.getItem("accepts_cookies") ? localStorage.getItem("accepts_cookies") : null;

        if (accepts_cookies) {
            localStorage.setItem(
                "prevent_screen_sleep",
                true
            );
        }
    } else {
        noSleep.disable(); // let the screen turn off.
        wakeLockEnabled = false;
        localStorage.removeItem(
            "prevent_screen_sleep"
        );
    }
}

$(document).ready(
    function() {

        const prevent_screen_sleep = localStorage.getItem("prevent_screen_sleep") ? localStorage.getItem("prevent_screen_sleep") : null;

        if (prevent_screen_sleep) {
            $("#button_toggle_screen_sleep").prop(
                "checked",
                true
            );

            screen_sleep_content();
        }
    }
)

$(document).ready(

    function() {

        $("#button_toggle_innate_powers_row").on(
            "click",
            function() {
                toggle_innate_powers_row_content();
            }
        )
    }
)

function toggle_innate_powers_row_content() {

    if(
        $("#button_toggle_innate_powers_row").is(":checked")
    ) {

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

        localStorage.removeItem(
            "hide_innate_powers_row"
        );
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

        const accepts_cookies = localStorage.getItem("accepts_cookies") ? localStorage.getItem("accepts_cookies") : null;

        if (accepts_cookies) {
            localStorage.setItem(
                "hide_innate_powers_row",
                true
            );
        }
    }
}

$(document).ready(
    function() {

        const hide_innate_powers_row = localStorage.getItem("hide_innate_powers_row") ? localStorage.getItem("hide_innate_powers_row") : null;

        if (hide_innate_powers_row) {
            $("#button_toggle_innate_powers_row").prop(
                "checked",
                false
            );

            toggle_innate_powers_row_content();
        }
    }
)

function reset_spirit_selection() {

    $("#button_select_spirit").empty();

    if (
        $("body").data(
            "colour_scheme"
        ) == "dark"
    ) {
        var dark_mode_flag = "dark-mode";
    } else {
        var dark_mode_flag = "";
    }

    $("#button_select_spirit").attr(
        {
            class : `p-0 btn btn-settings ${dark_mode_flag}`,
            id : "button_select_spirit"
        }
    ).text(
        "Select spirit"
    );
    
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

    localStorage.removeItem(
        "spirit_button_name"
    );

    custom_hide(
        "#button_setup"
    );
}

function reset_adversary_selection() {

    $(`#button_remove_leading_adversary`).click();

    localStorage.removeItem(
        "leading_adversary_button_name"
    );

    localStorage.removeItem(
        "leading_adversary_level"
    );

    localStorage.removeItem(
        "supporting_adversary_button_name"
    );

    localStorage.removeItem(
        "supporting_adversary_level"
    );
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
            class: "col m-0 mb-1 d-flex justify-content-center"
        }
    );

    if (
        $("body").data(
            "colour_scheme"
        ) == "dark"
    ) {
        var dark_mode_flag = "dark-mode";
    } else {
        var dark_mode_flag = "";
    }

    var placeholder_row_innate_power_cols = $("<p>").attr(
        {
            class: `col m-0 mb-1 d-flex justify-content-center text-line ${dark_mode_flag}`
        }
    );

    var fear_object = $("<img>").attr(
        {
            class: "svg",
            src : "https://raw.githubusercontent.com/NoahBolohan/spirit-island-tracker/86920873d14d49cb59716c9b04930e996d66b930/static/icons/fear.svg",
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
                reset_spirit_selection();
                reset_adversary_selection();
                if (
                    $("#button_toggle_lock_element_tracker").data("lock_status") == "locked"
                ) {
                    unlock_element_tracker();

                    localStorage.removeItem(
                        "lock_element_tracker"
                    );
                }
                
                $.getJSON("https://raw.githubusercontent.com/NoahBolohan/spirit-island-tracker/refs/heads/main/data/config.json", function(data) {

                    $.each(
                        data["elements"],
                        function(key, element) {

                            reset_element_tracker(
                                element
                            );
                        }
                    );
                });

                reset_score();
                
                switch_theme(
                    "default"
                );

                switch_font_color();
            }
        );
    }
)

$(document).ready(
    function() {

        $("#button_compute_score").on(
            "click",
            function() {
                $("#modal_compute_score").modal("show");
            }
        );
    }
)

$(document).ready(
    function() {

        $("#button_close_modal_compute_score").on(
            "click",
            function() {
                $("#modal_compute_score").modal("hide");
            }
        );
    }
)

// Score calculator
function score_calculator() {

    var total_score = 0;

    // if ($("#col_select_scenario").val() != "Second Wave") {
        
        // Score-checking based on victory
        if ($("#checkbox_win").is(":checked")) {
            
            // Add score for difficulty
            total_score += 5*$("#col_difficulty_number").text();

            // Add score for winning
            total_score += 10;

            // Add score for remaining invader cards in the deck
            total_score += 2*$("#text_invader_cards_in_deck").val();
        }
        else {

            // Add score for difficulty
            total_score += 2*$("#col_difficulty_number").text();

            // Add score for remaining invader cards in the deck
            total_score += 1*$("#text_invader_cards_not_in_deck").val();
        }

        // Add score for remaining Dahan
        total_score += Math.floor($("#text_remaining_dahan").val()/$("#text_n_players").val());

        // Remove score for blight on the island
        total_score -= Math.floor($("#text_blight_on_island").val()/$("#text_n_players").val());

        // Assign the score value to the score display div
        $("#col_score_number").text(
            total_score
        )
    // }
}

// Set an event listener for computing score on n playuers change
$(document).ready(
    function() {
        $("#text_n_players").on(
            "change",
            score_calculator
        )
    }
)

// Set an event listener for computing score on victory change
$(document).ready(
    function() {
        $("#checkbox_win").on(
            "change",
            score_calculator
        )
    }
)

// Set an event listener for computing score on invader cards in deck change
$(document).ready(
    function() {
        $("#text_invader_cards_in_deck").on(
            "change",
            score_calculator
        )
    }
)

// Set an event listener for computing score on invader cards not in deck change
$(document).ready(
    function() {
        $("#text_invader_cards_not_in_deck").on(
            "change",
            score_calculator
        )
    }
)

// Set an event listener for computing score on remaining Dahan change
$(document).ready(
    function() {
        $("#text_remaining_dahan").on(
            "change",
            score_calculator
        )
    }
)

// Set an event listener for computing score on blight on island change
$(document).ready(
    function() {
        $("#text_blight_on_island").on(
            "change",
            score_calculator
        )
    }
)

function reset_score() {
    $("#text_n_players").val("");
    $("#checkbox_win").prop("checked", false);
    $("#text_invader_cards_in_deck").val("");
    $("#text_invader_cards_not_in_deck").val("");
    $("#text_remaining_dahan").val("");
    $("#text_blight_on_island").val("");
    
    $("#col_score_number").text(
        0
    )
}

$(document).ready(
    function() {

        $("#button_reset_score").on(
            "click",
            function() {
                reset_score();
            }
        );
    }
)

const theme = localStorage.getItem("theme") ? localStorage.getItem("theme") : "default";

document.documentElement.setAttribute(
    "data-theme",
    theme
);

$(document).ready(
    function() {
        switch_theme(
            document.documentElement.getAttribute(
                "data-theme"
            )
        )
    }
)

function switch_theme(theme) {
    document.documentElement.setAttribute(
        "data-theme",
        theme
    );

    switch_font_color();

    const accepts_cookies = localStorage.getItem("accepts_cookies") ? localStorage.getItem("accepts_cookies") : null;

    if (accepts_cookies) {
        localStorage.setItem(
            "theme",
            theme
        );
    }
}

function switch_font_color() {

    if (
        $("body").data(
            "colour_scheme"
        ) == "dark"
    ) {
        var font_color = "--font-color-light";
    } else {
        var font_color = "--font-color-dark";
    }

    rgb_triple = window.getComputedStyle(document.body).getPropertyValue(font_color).split(',');

    let color = new Color(
        rgb_triple[0], rgb_triple[1], rgb_triple[2]
    );
    let solver = new Solver(color);
    let result = solver.solve()
    let filterCSS = result.filter;

    $(".svg").attr("style", filterCSS);
}

$(document).ready(

    function() {
        switch_font_color();
    }
)

$(document).ready(

    function() {

        $("#button_dark_mode").on(
            "click",
            function() {

                dark_mode_content();
            }
        )
    }
)

function dark_mode_content() {

    if(
        $("#button_dark_mode").is(":checked")
    ) {
        $("body").data(
            "colour_scheme",
            "dark"
        );
        
        $("body").addClass(
            "dark-mode-body"
        );
        $("input").addClass(
            "dark-mode-input"
        );

        const accepts_cookies = localStorage.getItem("accepts_cookies") ? localStorage.getItem("accepts_cookies") : null;

        if (accepts_cookies) {
            localStorage.setItem(
                "dark_mode",
                true
            );
        }
    } else {
        $("body").data(
            "colour_scheme",
            "light"
        );
        
        $("body").removeClass(
            "dark-mode-body"
        );
        $("input").removeClass(
            "dark-mode-input"
        );

        const accepts_cookies = localStorage.getItem("accepts_cookies") ? localStorage.getItem("accepts_cookies") : null;

        if (accepts_cookies) {
            localStorage.removeItem(
                "dark_mode"
            );
        }
    }

    $.each(
        [
            ".card",
            ".card-header",
            ".card-body",
            ".table-body",
            ".table-header",
            ".modal-content",
            ".modal-title",
            ".modal-header",
            ".settings-label",
            ".btn-lock-elements",
            ".btn-reset-elements",
            ".btn-settings",
            ".btn-reset-page",
            ".btn-innate-tier",
            ".text-line",
            ".slider",
            ".plus",
            ".plus-border",
            ".plus-inner",
            ".minus",
            ".minus-border",
            ".minus-inner",
            ".hr2",
            ".close-x"
        ],
        function (
            idx,
            val
        ) {
            if(
                $("#button_dark_mode").is(":checked")
            ) {
                $(val).addClass(
                    "dark-mode"
                )
            } else {
                $(val).removeClass(
                    "dark-mode"
                )
            }

        }
    )

    switch_font_color();
}

$(document).ready(
    function() {

        const dark_mode = localStorage.getItem("dark_mode") ? localStorage.getItem("dark_mode") : null;

        if (dark_mode) {
            $("#button_dark_mode").prop(
                "checked",
                true
            );

            dark_mode_content();
        }
    }
)


$(document).ready(
    function() {

        $("#button_about").on(
            "click",
            function() {
                $("#modal_about").modal("show");
            }
        );
    }
)

$(document).ready(
    function() {

        $("#button_close_modal_about").on(
            "click",
            function() {
                $("#modal_about").modal("hide");
            }
        );
    }
)

