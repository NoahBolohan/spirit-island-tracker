function custom_show(div_id) {
    $(div_id).css(
        "visibility",
        "visible"
    );
    $(div_id).css(
        "max-height",
        "100%"
    );
}

function custom_hide(div_id) {
    $(div_id).css(
        "visibility",
        "hidden"
    );
    $(div_id).css(
        "max-height",
        "0"
    );
}

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

        $("#button_select_spirit").on(
            "click",
            function() {
                $("#modal_spirits").modal("show");
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

$(document).ready(
    function() {

        $.ajax({
            url: "https://raw.githubusercontent.com/NoahBolohan/spirit-island-tracker/refs/heads/main/data/spirits.json",
            async: false,
            dataType: "json",
            success: function (json) {
                $.each(
                    json,
                    function(key, value) {

                        $("#list_spirit_selection").append(
                            `<option value="${key}">`
                        );
                    }
                )
            }
        });

        $("#spirit_selection").prop("selectedIndex",0);
    }
)

function generate_spirit_select_button_for_spirit(
    spirit_name,
    spirit_config
) {

    var spirit_button_name = generate_spirit_button_name(
        spirit_name,
        spirit_config
    );

    var button = $("<button>").attr(
        {
            class : "col-3 btn btn-xs",
            id : `button_${
                spirit_button_name
            }`
        }
    )

    $(`#button_${spirit_button_name}`).data(
        "name",
        spirit_name
    );

    $(`#button_${spirit_button_name}`).data(
        "config",
        spirit_config
    )

    $("<img>").attr(
        {
            "src" : generate_encoded_spirit_image_url(
                spirit_name,
                spirit_config
            ),
            "class" : "col-3 p-0",
            "style" : "width : 100%"
        }
    ).appendTo(
        button
    );
    
    button.appendTo(
        `#div_spirit_select_buttons`
    );

    $(`#button_${spirit_button_name}`).on(
        "click",
        function() {

            $(`#button_select_spirit`).empty();
        
            $("<img>").attr(
                {
                    "src" : generate_encoded_spirit_image_url(
                        spirit_name,
                        spirit_config
                    ),
                    "style" : "width : 100%"
                }
            ).appendTo(
                `#button_select_spirit`
            );

            $(`#button_select_spirit`).css(
                {
                    "background-color": "transparent",
                    // "outline" : "none",
                    "border" : "none"
                }
            );

            $(`#modal_spirits`).modal("hide");
        }
    );
}


$(document).ready(
    function() {
        $(`#div_spirit_select_buttons`).empty();

        $.ajax({
            url: "https://raw.githubusercontent.com/NoahBolohan/spirit-island-tracker/refs/heads/main/data/spirits.json",
            async: false,
            dataType: "json",
            success: function (json) {
                $.each(
                    json,
                    function(key, value) {

                        generate_spirit_select_button_for_spirit(
                            key,
                            value
                        );
                    }
                )
            }
        });
    }
)