$(document).ready(
    function() {

        $("#button_select_spirit").on(
            "click",
            function() {

                $("#input_spirit_select_search").val("");
                spirit_select_filter();
                $("#modal_spirits").modal("show");
            }
        );
    }
)

$(document).ready(
    function() {

        $("#button_close_modal_spirits").on(
            "click",
            function() {
                $("#modal_spirits").modal("hide");
            }
        );
    }
)

function generate_spirit_image_file_name(
    spirit_name,
    spirit_config
) {

    if ("alt_name" in spirit_config & "aspect_art" in spirit_config & spirit_config["aspect_art"] == "true") {
        var spirit_image_file_name = spirit_config[
            "alt_name"
        ].split(
            ' '
        ).join(
            '_'
        )
    }
    else if ("aspect_for" in spirit_config) {
        var spirit_image_file_name = spirit_config[
            "aspect_for"
        ].split(
            ' '
        ).join(
            '_'
        )
    }
    else {
        var spirit_image_file_name = spirit_name.split(
            ' '
        ).join(
            '_'
        )
    }

    return spirit_image_file_name;
}
function generate_encoded_spirit_image_url(
    spirit_name,
    spirit_config
) {

    var spirit_image_file_name = generate_spirit_image_file_name(
        spirit_name,
        spirit_config
    );

    new_url = encodeURI(
        "https://raw.githubusercontent.com/NoahBolohan/spirit-island-tracker/refs/heads/main/static/spirit_images/" + spirit_image_file_name + ".png"
    );

    return new_url.replace(
        /'/g,  "%27"
    ).replace(
        /\(/g, "%28"
    ).replace(
        /\)/g, "%29"
    );
}

function generate_spirit_button_name(
    spirit_name,
    spirit_config
) {

    var spirit_image_file_name = generate_spirit_image_file_name(
        spirit_name,
        spirit_config
    );

    if (
        "alt_name" in spirit_config
    ) {
        spirit_image_file_name = `${spirit_image_file_name}_${
        spirit_config["alt_name"].split(
                ' '
            ).join(
                '_'
            )
        }`
    }

    return spirit_image_file_name.replace(
        /'/g,  ''
    ).replace(
        /\(/g, ''
    ).replace(
        /\)/g, ''
    );
}

function generate_spirit_select_list_item_for_spirit(
    spirit_name,
    spirit_config
) {

    var spirit_button_name = generate_spirit_button_name(
        spirit_name,
        spirit_config
    );

    var list_item = $("<li>").attr(
        {
            id: spirit_name,
            class: "spirit_select_list_item"
        }
    );

    var button = $("<button>").attr(
        {
            class : "btn btn-outlineless",
            id : `button_${
                spirit_button_name
            }`,
            "style" : "padding : 0;"
        }
    )

    $("<img>").attr(
        {
            "src" : generate_encoded_spirit_image_url(
                spirit_name,
                spirit_config
            ),
            "style" : "width : 100%;"
        }
    ).appendTo(
        button
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

    $("<div>").attr(
        {
            class : `text-line ${dark_mode_flag}`
        }
    ).css(
        {
            "text-align" : "center",
            "font-size" : "max(1.3vh,1.3vw)",
            "height" : "4lh",
            "padding-top" : "max(0.8vh,0.8vw)"
        }
    ).text(
        spirit_name
    ).appendTo(
        button
    );

    button.appendTo(
        list_item
    );
    
    list_item.appendTo(
        `#list_spirit_select_buttons`
    );

    $(`#button_${spirit_button_name}`).on(
        "click",
        function() {

            $(`#button_select_spirit`).empty();
            $("#row_innate_power_cols").empty();
            $("#div_modals_innate_powers").empty();

            $("#spirit_island_tracker_body").data(
                "selected_spirit_config",
                spirit_config
            );
        
            $("<img>").attr(
                {
                    "src" : generate_encoded_spirit_image_url(
                        spirit_name,
                        spirit_config
                    ),
                    "style" : "width:100%;"
                }
            ).appendTo(
                `#button_select_spirit`
            );

            $(`#button_select_spirit`).removeClass(
                "btn-settings"
            );

            $(`#button_select_spirit`).addClass(
                "btn-outlineless"
            );

            // $("#col_innate_powers").css(
            //     "background-image",
            //     `url(${new_url})`
            // );

            // document.documentElement.setAttribute(
            //     "data-theme",
            //     spirit_name
            // );

            if ("innate_power_5" in spirit_config) {
                for (var i = 1; i <= 5; i++) {

                    parse_innate_power(
                        spirit_config[`innate_power_${i}`],
                        i,
                        6
                    ).appendTo(
                        "#row_innate_power_cols"
                    );
                }
            }
            else if ("innate_power_2" in spirit_config) {

                for (var i = 1; i <= 2; i++) {

                    parse_innate_power(
                        spirit_config[`innate_power_${i}`],
                        i,
                        6
                    ).appendTo(
                        "#row_innate_power_cols"
                    );
                }
            }
            else if ("innate_power_1" in spirit_config) {
                parse_innate_power(
                    spirit_config["innate_power_1"],
                    1,
                    6
                ).appendTo(
                    "#row_innate_power_cols"
                );
            }

            $(`#modal_spirits`).modal("hide");

            var theme = "none";

            if (
                "aspect_art" in spirit_config
            ) {
                theme = generate_spirit_image_file_name(
                    spirit_name,
                    spirit_config
                )
            } else if (
                "aspect_for" in spirit_config
            ) {
                theme =  spirit_config["aspect_for"].split(
                    ' '
                ).join(
                    '_'
                )
            }
            else {
                theme = generate_spirit_image_file_name(
                    spirit_name,
                    spirit_config
                )
            }

            switch_theme(
                theme
            );

            append_spirit_setup_to_modal(
                spirit_config
            );

            custom_show(
                "#button_setup"
            );

            check_tier_availabilities();

            const accepts_cookies = localStorage.getItem("accepts_cookies") ? localStorage.getItem("accepts_cookies") : null;

            if (accepts_cookies) {
                localStorage.setItem(
                    "spirit_button_name",
                    spirit_button_name
                );
            }
            
        }
    );
}

function append_spirit_setup_to_modal(
    spirit_config
) {
    $("#modal_setup_body").empty();

    $("#modal_setup_body").html(
        spirit_text_keyword_converter(
            spirit_config["setup"],
            18
        )
    );
}

$(document).ready(
    function() {
        $(`#list_spirit_select_buttons`).empty();

        $.ajax({
            url: "https://raw.githubusercontent.com/NoahBolohan/spirit-island-tracker/refs/heads/main/data/spirits.json",
            async: false,
            dataType: "json",
            success: function (json) {
                $.each(
                    json,
                    function(key, value) {

                        generate_spirit_select_list_item_for_spirit(
                            key,
                            value
                        );
                    }
                )
            }
        });

        const spirit_button_name = localStorage.getItem("spirit_button_name") ? localStorage.getItem("spirit_button_name") : null;

        if (spirit_button_name) {
            $(`#button_${spirit_button_name}`).trigger("click");
        }
    }
)

// Pseudo-code: https://www.w3schools.com/howto/howto_js_filter_lists.asp
// Convert to jQuery: https://stackoverflow.com/questions/4511652/looping-through-list-items-with-jquery
function spirit_select_filter() {

    var input = $("#input_spirit_select_search").val().toUpperCase();
    var spirit_select_list_items = $("#list_spirit_select_buttons li");
  
    spirit_select_list_items.each(function(idx, li) {

        var spirit_select_item = $(li);

        if (spirit_select_item.attr("id").toUpperCase().indexOf(input) > -1) {

            spirit_select_item.css(
                "display",
                ""
            );
        } else {

            spirit_select_item.css(
                "display",
                "none"
            );
        }
    })
};

$(document).ready(
    function() {

        $("#button_clear_spirit_select_search").on(
            "click",
            function() {
                $("#input_spirit_select_search").val("");
                spirit_select_filter();
            }
        );
    }
)