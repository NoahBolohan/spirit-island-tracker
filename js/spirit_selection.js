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

function generate_encoded_spirit_image_url(
    spirit_name,
    spirit_config
) {

    if ("alt_name" in spirit_config & "aspect_art" in spirit_config & spirit_config["aspect_art"] == "true") {
        var spirit_image_file_name = spirit_config[
            "alt_name"
        ]
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

    if ("alt_name" in spirit_config & "aspect_art" in spirit_config & spirit_config["aspect_art"] == "true") {
        var spirit_image_file_name = spirit_config[
            "alt_name"
        ]
    }
    else if ("aspect_for" in spirit_config) {
        var spirit_image_file_name = spirit_config[
            "aspect_for"
        ].split(
            ' '
        ).join(
            '_'
        ) + '_' + spirit_config[
            "alt_name"
        ]
    }
    else {
        var spirit_image_file_name = spirit_name.split(
            ' '
        ).join(
            '_'
        )
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
            class : "btn btn-xs",
            id : `button_${
                spirit_button_name
            }`,
            "style" : "padding : 0px;"
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

    $("<div>").css(
        {
            "text-align" : "center",
            "font-size" : "0.7em",
            "height" : "4lh",
            "padding-top" : "5px"
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

            $(`#button_select_spirit`).css(
                {
                    "background-color": "transparent",
                    "border" : "none"
                }
            );

            $("#col_innate_powers").css(
                "background-image",
                `url(${new_url})`
            );

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
        }
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