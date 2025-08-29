function parse_innate_power(
    innate_power_config,
    innate_power_number, 
    col_width
) {

    var innate_power_col = $("<div>").attr(
        {
            class : `col-${col_width} m-0 mb-2`
        }
    )

    if (
        $("body").data(
            "colour_scheme"
        ) == "dark"
    ) {
        var dark_mode_flag = "dark-mode";
    } else {
        var dark_mode_flag = "";
    }

    var innate_power_card = $("<div>").attr(
        {
            class : `card margin-auto ${dark_mode_flag}`,
            id : `col_innate_power_${innate_power_number}`,
            style : "overflow: clip;"
        }
    ).appendTo(
        innate_power_col
    );

    for (const [key, value] of Object.entries(innate_power_config)) {
                    
        if (key == "name") {
            $("<div>").attr(
                    {
                        class : `card-header text-center ${dark_mode_flag}`,
                        style: "font-size : 13px"
                    }
                ).text(
                    value.toUpperCase()
                ).appendTo(
                    innate_power_card
                );
                
                var innate_power_card_body = $("<div>").attr(
                    {
                        class : `card-body p-1 ${dark_mode_flag}`
                    }
                );

            innate_power_card_body.appendTo(
                innate_power_card
            );
        }
        else if (key.includes("tier")) {
            parse_innate_tier(
                innate_power_number,
                key,
                value
            ).appendTo(innate_power_card_body);
        }
    }

    return innate_power_col;
}

function parse_innate_tier(
    innate_power_number,
    innate_power_tier,
    innate_power_tier_config
) {

    var tier_row = $("<div>").attr(
        {
            class : "row mb-1 mx-1 justify-content-center",
            id : `row_innate_power_${innate_power_number}_${innate_power_tier}`
        }
    );

    generate_element_threshold_button_for_tier(
        innate_power_number,
        innate_power_tier,
        innate_power_tier_config
    ).appendTo(
        tier_row
    );

    return tier_row;
}

function generate_element_threshold_button_for_tier(
    innate_power_number,
    innate_power_tier,
    innate_power_config
) {
    if (
        $("body").data(
            "colour_scheme"
        ) == "dark"
    ) {
        var dark_mode_flag = "dark-mode";
    } else {
        var dark_mode_flag = "";
    }

    var tier_button = $("<button>").attr(
        {
            class : `col btn btn-innate-tier ${dark_mode_flag}`,
            id : `button_innate_power_${innate_power_number}_${innate_power_tier}`,
            type : "button"
        }
    ).prop(
        "disabled",true
    );

    append_threshold_string(
        tier_button,
        innate_power_config["threshold"]
    );

    assign_modal_to_tier_button(
        innate_power_number,
        innate_power_tier,
        innate_power_config
    );

    $(`#button_close_modal_innate_power_${innate_power_number}_${innate_power_tier}`).on(
        "click",
        function() {
            $(`#modal_innate_power_${innate_power_number}_${innate_power_tier}`).modal("hide");
        }
    );

    tier_button.on(
        "click",
        function() {
            $(`#modal_innate_power_${innate_power_number}_${innate_power_tier}`).modal("show");
        }
    )

    return tier_button;
}

function append_threshold_string(
    div,
    threshold
) {
    
    $.each(
        threshold,
        function(element, count) {

            if (count != 0) {

                if (count > 0) {
                    $("<span>").attr(
                        {
                            style : "display: inline-block; vertical-align: middle;color: rgba(var(--font-color-light));"
                        }
                    ).html(
                        "&nbsp;" + count
                    ).appendTo(
                        div
                    );
                }
                
                if (element == "COST") {
                    $("<img>").attr(
                        {
                            src : `https://raw.githubusercontent.com/NoahBolohan/spirit-island-tracker/refs/heads/main/static/icons/${count}_cost.png`,
                            style: "height: 1.5em; display: inline-block; vertical-align: middle;"
                        }
                    ).appendTo(
                        div
                    );
                }
                else if (element == "BEASTS") {
                    $("<img>").attr(
                        {
                            src : "https://raw.githubusercontent.com/NoahBolohan/spirit-island-tracker/refs/heads/main/static/icons/beasts.svg",
                            style: "height: 1.3em; display: inline-block; vertical-align: middle;"
                        }
                    ).appendTo(
                        div
                    );
                }
                else if (element == "DESTROYED_PRESENCE") {
                    $("<img>").attr(
                        {
                            src : "https://raw.githubusercontent.com/NoahBolohan/spirit-island-tracker/refs/heads/main/static/icons/destroyed_presence.svg",
                            style: "height: max(1.9vh,1.9vw); display: inline-block; vertical-align: baseline;"
                        }
                    ).appendTo(
                        div
                    );
                }
                else if (element == "CARDS_IN_PLAY") {
                    $("<img>").attr(
                        {
                            src : "https://raw.githubusercontent.com/NoahBolohan/spirit-island-tracker/refs/heads/main/static/icons/power_card.svg",
                            style: "height: 1.5em; display: inline-block; vertical-align: middle;"
                        }
                    ).appendTo(
                        div
                    );
                }
                else {
                    $("<img>").attr(
                        {
                            src : `https://raw.githubusercontent.com/NoahBolohan/spirit-island-tracker/refs/heads/main/static/elements/${element}.png`,
                            style: "height: 1.5em; display: inline-block; vertical-align: middle;"
                        }
                    ).appendTo(
                        div
                    );
                }
            }
        }
    );

    return div;
}

function assign_modal_to_tier_button(
    innate_power_number,
    innate_power_tier,
    innate_power_config
) {

    if (
        $("body").data(
            "colour_scheme"
        ) == "dark"
    ) {
        var dark_mode_flag = "dark-mode";
    } else {
        var dark_mode_flag = "";
    }

    var modal_for_tier_button = $("<div>").attr(
        {
            class : `modal fade ${dark_mode_flag}`,
            id  : `modal_innate_power_${innate_power_number}_${innate_power_tier}`
        }
    );

    var modal_dialog =$("<div>").attr(
        {
            class : `modal-dialog modal-dialog-centered ${dark_mode_flag}`,
            role : "document"
        }
    ).appendTo(
        modal_for_tier_button
    );

    var modal_content =$("<div>").attr(
        {
            class : `modal-content ${dark_mode_flag}`
        }
    ).appendTo(
        modal_dialog
    );

    var modal_header = $("<div>").attr(
        {
            class: `modal-header justify-content-center ${dark_mode_flag}`
        }
    ).appendTo(
        modal_content
    );

    var modal_title = $("<div>").attr(
        {
            class: `modal-title ${dark_mode_flag}`
        }
    );
    
    append_threshold_string(
        modal_header,
        innate_power_config["threshold"]
    );

    $("<button>").attr(
        {
            class : `btn btn-settings ${dark_mode_flag}`,
            id : `button_close_modal_innate_power_${innate_power_number}_${innate_power_tier}`,
            style : "position:absolute;right:max(1.9vh,1.9vw);"
        }
    ).html(
        '<div class="close-x"></div>'
    ).appendTo(
        modal_header
    );

    $("<div>").attr(
        {
            class: `modal-body ${dark_mode_flag}`
        }
    ).html(
        spirit_text_keyword_converter(
            innate_power_config["effect"],
            18
        )
    ).appendTo(
        modal_content
    );

    // modal_content.appendTo(
    //     modal_for_tier_button
    // );

    modal_for_tier_button.appendTo(
        "#div_modals_innate_powers"
    );
}

function check_tier_availabilities() {

    $.each(
        $("#spirit_island_tracker_body").data(
            "selected_spirit_config",
        ),
        function(config_variable, value) {

            if (config_variable.includes("innate_power")) {

                $.each(
                    value,
                    function(ip_key, ip_value) {

                        if (ip_key.includes("tier")) {

                            var innate_tier_available = true;

                            $.each(
                                ip_value["threshold"],
                                function(element, element_threshold) {

                                    if (
                                        $(`#element_${element}`).data("counter") < element_threshold
                                    ) {
                                        innate_tier_available = false;
                                    }
                                }
                            )

                            if (innate_tier_available) {
                                $(`#button_${config_variable}_${ip_key}`).prop(
                                    "disabled",false
                                )
                            }
                            else {
                                $(`#button_${config_variable}_${ip_key}`).prop(
                                    "disabled",true
                                )
                            }
                        }
                    }
                )
            }
        }
    )
}