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

$(document).ready(
    $(document).on(
        "change",
        "#spirit_selection",
        function() {

            $.ajax({
                url: "https://raw.githubusercontent.com/NoahBolohan/spirit-island-tracker/refs/heads/main/data/spirits.json",
                async: false,
                dataType: "json",
                success: function (json) {
                    if ($("#spirit_selection").val() in json) {

                        var spirit_config = json[
                            $("#spirit_selection").val()
                        ]
    
                        $("#spirit_selection").data(
                            "spirit_config",
                            spirit_config
                        )
    
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
                            var spirit_image_file_name = $("#spirit_selection").val().split(
                                ' '
                            ).join(
                                '_'
                            )
                        }
    
                        var new_url = encodeURI(
                            "https://raw.githubusercontent.com/NoahBolohan/spirit-island-tracker/refs/heads/main/static/spirit_images/" + spirit_image_file_name + ".png"
                        );
    
                        new_url = new_url.replace(
                            /'/g, '%27'
                        ).replace(
                            /\(/g, "%28"
                        ).replace(
                            /\)/g, "%29"
                        );
    
                        $("#card_spirit").attr(
                            "style",
                            `background-image : url(${new_url}); background-size: center; background-size: cover; background-color: rgba(255,255,255,0.4); background-blend-mode: lighten;`
                        );
                    }
                }
            });
        }
    )
)