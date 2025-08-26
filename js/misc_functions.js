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

function spirit_text_keyword_converter(
    string,
    max_size
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

    var input_string_array = string.split(
        /(\:|\(|\)|\/|\<|\>|\.|\,|\s+)/
    );

    var return_html_array = [`<p class="text-line ${dark_mode_flag}" style="margin-bottom: 0px;">`];

    $.ajax({
        url: 'https://raw.githubusercontent.com/NoahBolohan/spirit-island-tracker/refs/heads/main/data/config.json',
        async: false,
        dataType: 'json',
        success: function (json) {
            $.each(
                input_string_array,
                function(key, value) {
                    
                    if (value in json["keywords"]) {
                        return_html_array.push(
                            // `<object data="static/icons/${json["keywords"][value]}" height="${height}px"></object>`
                            // `<object data="static/icons/${json["keywords"][value]}" style="max-height: ${max_size}px; max-width: ${max_size}px;"></object>`
                            `<object data="static/icons/${
                                json["keywords"][value]["file_name"]
                            }" style="max-height: ${max_size}px; max-width: ${max_size}px;display: inline-block; vertical-align: baseline;"></object>`
                        )
                    }
                    else {
                        return_html_array.push(
                            value
                        )
                    }
                }
            )
        }
    });

    return_html_array.push(
        "</p>"
    )

    var return_html_string = return_html_array.join("");

    return return_html_string;
}