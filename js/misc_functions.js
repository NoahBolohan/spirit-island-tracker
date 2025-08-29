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
    max_size,
    style="none",
    id="none"
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
        /(\:|\(|\)|\/|\>|\'|\.|\,|\s+)/
    );
    // alert(input_string_array)

    var return_html_array = [`<span id="${id}" class="text-line ${dark_mode_flag}" style="margin-bottom: 0;${style}">`];


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
                            `<img class="svg ${dark_mode_flag}" src="static/icons/${
                                json["keywords"][value]["file_name"]
                            }"></img>`
                        )
                    }
                    else if (value == "<em") {
                        return_html_array.push(
                            `<em class="text-line ${dark_mode_flag}"`
                        )
                    }
                    else if (value == "<b") {
                        return_html_array.push(
                            `<b class="text-line ${dark_mode_flag}"`
                        )
                    }
                    else if (value == "<u") {
                        return_html_array.push(
                            `<u class="text-line ${dark_mode_flag}"`
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
        "</span>"
    )

    var return_html_string = return_html_array.join("");

    return return_html_string;
}